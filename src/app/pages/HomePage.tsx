import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { HeroSection } from '../components/HeroSection';
import WhyChooseUs from '../components/WhyChoseUS';
import FourFeatureSection from '../components/FourFeatures';
import LogoMarquee from '../components/LogoMarquee';

// --- TYPES ---
interface Product {
  id: number | string;
  title: string;
  brand: string;
  flavors?: string[];
}

interface QuickOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    title: string;
    brand: string;
    imageUrl: string;
    variants: string[];
  };
}

// --- IMAGE HELPERS ---
const possibleExtensions = ["jpg", "jpeg", "png", "webp"];

const getFolderName = (title: string) => {
  return title.trim().replace(/\s+/g, "_").replace(/[()&%#.+,!]/g, "_");
};

const generateImageUrls = (productTitle: string): string[] => {
  const folderName = getFolderName(productTitle);
  const urls: string[] = [];
  for (let ext of possibleExtensions) urls.push(`/product-images/${folderName}/1.${ext}`);
  return urls;
};

// --- MODAL COMPONENT ---
const QuickOrderModal: React.FC<QuickOrderModalProps> = ({ isOpen, onClose, product }) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  if (!isOpen) return null;

  const updateQty = (flavor: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [flavor]: Math.max(0, (prev[flavor] || 0) + delta)
    }));
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-[#1a1a24] rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-white/10 animate-in fade-in zoom-in duration-200">
        <div className="bg-[#003366] text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-black uppercase tracking-tighter">Wholesale Quick Order</h2>
          <button onClick={onClose} className="hover:rotate-90 transition-transform cursor-pointer">
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <div className="flex gap-4 mb-6 border-b border-gray-100 dark:border-white/5 pb-6">
            <img src={product.imageUrl} className="w-20 h-20 object-contain bg-white rounded p-1" alt="" />
            <div>
              <p className="text-cyan-500 font-bold text-xs uppercase">{product.brand}</p>
              <h3 className="text-xl font-black dark:text-white uppercase tracking-tight">{product.title}</h3>
              <p className="text-red-600 text-[10px] font-bold mt-1">LOG IN TO VIEW WHOLESALE PRICES</p>
            </div>
          </div>
          <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2">
            {product.variants.length > 0 ? product.variants.map((v) => (
              <div key={v} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-transparent hover:border-cyan-500/30 transition-all">
                <span className="font-bold text-sm dark:text-gray-200">{v}</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-300 dark:border-white/20 rounded-md overflow-hidden bg-white dark:bg-transparent">
                    <button onClick={() => updateQty(v, -1)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer">
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-bold text-sm dark:text-white">{quantities[v] || 0}</span>
                    <button onClick={() => updateQty(v, 1)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer">
                      <Plus size={14} />
                    </button>
                  </div>
                  <button onClick={() => setQuantities(prev => ({...prev, [v]: 0}))} className="text-gray-400 hover:text-red-500 cursor-pointer">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )) : <p className="text-center py-4 text-gray-400">No variants available</p>}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <button className="bg-[#56A3D1] hover:bg-[#458db8] text-white py-3 rounded-lg font-black uppercase text-xs tracking-widest shadow-lg transition-colors cursor-pointer">
              Add to Bulk Order
            </button>
            <button onClick={() => setQuantities({})} className="bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-black uppercase text-xs tracking-widest transition-colors cursor-pointer">
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

// --- HOME PAGE COMPONENT ---
export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState<(Product & { imageUrls: string[] })[]>([]);
  const [newArrivals, setNewArrivals] = useState<(Product & { imageUrls: string[] })[]>([]);
  const [bestSellers, setBestSellers] = useState<(Product & { imageUrls: string[] })[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isQuickOrderOpen, setIsQuickOrderOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // --- IMAGE FALLBACK STATE ---
  const [imageIndices, setImageIndices] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:5000/api/products/home');
        const json = await res.json();
        const mapWithImages = (items: any[]) => items.map(p => ({ ...p, imageUrls: generateImageUrls(p.title) }));
        const featured = mapWithImages(json.data.featured).slice(0, 15);
        const newArrivals = mapWithImages(json.data.newArrivals).slice(0, 10);
        const bestSellers = mapWithImages(json.data.bestSellers).slice(0, 10);
        setFeaturedProducts(featured);
        setNewArrivals(newArrivals);
        setBestSellers(bestSellers);

        // initialize image indices
        const initialIndices: Record<string, number> = {};
        [...featured, ...newArrivals, ...bestSellers].forEach(
          (p) => (initialIndices[p.id.toString()] = 0)
        );
        setImageIndices(initialIndices);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  const handleProductClick = (product: Product) => navigate(`/product/${product.id}`);

  const handleQuickOrder = (product: any) => {
    setSelectedProduct(product);
    setIsQuickOrderOpen(true);
  };

  // --- IMAGE FALLBACK HANDLERS ---
  const handleImageError = (productId: string | number) => {
    setImageIndices((prev) => {
      const allProducts = [...featuredProducts, ...newArrivals, ...bestSellers];
      const product = allProducts.find((p) => p.id.toString() === productId.toString());
      if (!product) return prev;

      const maxIndex = product.imageUrls.length - 1;
      const nextIndex = Math.min((prev[productId.toString()] ?? 0) + 1, maxIndex);

      return {
        ...prev,
        [productId.toString()]: nextIndex,
      };
    });
  };

  const getCurrentImage = (product: Product & { imageUrls: string[] }) => {
    const index = imageIndices[product.id.toString()] ?? 0;
    return product.imageUrls[index] || "/product-placeholder.png";
  };

  // --- RENDER ROWS ---
  const renderRows = (products: any[]) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
      {products.map(product => (
        <div
          key={product.id}
          className="group relative flex flex-col bg-white dark:bg-[#1a1a24] border border-gray-200 dark:border-white/10 rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:z-20 hover:border-cyan-400/50 dark:hover:border-pink-500/50 hover:shadow-[0_0_20px_rgba(0,188,212,0.4)] dark:hover:shadow-[0_0_25px_rgba(236,72,153,0.3)]"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 shadow-[0_0_20px_rgba(236,72,153,0.3)] bg-gradient-to-br from-cyan-500/5 to-pink-500/10" />

          <div 
            onClick={() => handleProductClick(product)}
            className="relative aspect-[4/3] bg-[#fcfcfd] dark:bg-[#12121a] flex items-center justify-center p-4 cursor-pointer overflow-hidden z-10"
          >
            <img
              src={getCurrentImage(product)}
              alt={product.title}
              onError={() => handleImageError(product.id)}
              className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          <div className="px-3 py-2 flex flex-col flex-grow z-10 text-center relative bg-white dark:bg-[#1a1a24]">
            <p className="text-[9px] uppercase tracking-[0.1em] text-cyan-500 dark:text-cyan-400 font-bold">
              {product.brand}
            </p>
            <h3 className="text-[12px] font-bold text-gray-800 dark:text-gray-100 line-clamp-1 mb-2">
              {product.title}
            </h3>
            
            <Link 
              to="/login" 
              className="flex items-center justify-center gap-1.5 py-1 border border-pink-500/40 rounded bg-pink-500/5 hover:bg-pink-500/10 group-hover:shadow-[0_0_10px_rgba(236,72,153,0.4)] transition-all cursor-pointer"
            >
              <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse shadow-[0_0_5px_#ec4899]" />
              <span className="text-[9px] font-black text-pink-600 dark:text-pink-400 uppercase tracking-tighter">
                Login to view prices
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2 p-3 pt-0 z-10 bg-white dark:bg-[#1a1a24]">
            <button 
              onClick={() => handleProductClick(product)}
              className="py-1.5 text-[10px] font-black text-white bg-[#00bcd4] hover:bg-[#00acc1] rounded transition-all uppercase shadow-[0_2px_10px_rgba(0,188,212,0.3)] cursor-pointer"
            >
              View Product
            </button>
            <button 
              onClick={() => handleQuickOrder(product)}
              className="py-1.5 text-[10px] font-black text-white bg-[#e47cbb] hover:bg-[#a4106b] rounded transition-all uppercase shadow-[0_2px_10px_rgba(101, 31, 79, 0.3)] cursor-pointer"
            >
              Quick Order
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0f] text-pink-500 font-black uppercase tracking-widest text-xs">Syncing Catalog...</div>;

  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#0a0a0f] dark:text-white transition-colors">
      <HeroSection />
    
      <section className="py-10 px-6 max-w-7xl mx-auto">
        <h2 className="font-['Archivo_Black'] font-bold text-4xl md:text-5xl uppercase tracking-tighter mb-8 border-l-8 border-cyan-500 pl-4">
          Featured Products
        </h2>
        {renderRows(featuredProducts)}
        <FourFeatureSection/>
        <h2 className="font-['Archivo_Black'] font-bold text-4xl md:text-5xl uppercase tracking-tighter my-8 border-l-8 border-pink-500 pl-4">
          New Arrivals
        </h2>
        {renderRows(newArrivals)}
        <h2 className="font-['Archivo_Black'] font-bold text-4xl md:text-5xl uppercase tracking-tighter my-8 border-l-8 border-cyan-500 pl-4">
          Best Sellers
        </h2>
        {renderRows(bestSellers)}
      </section>

      {/* QUICK ORDER MODAL PORTAL */}
      {selectedProduct && (
        <QuickOrderModal 
          isOpen={isQuickOrderOpen}
          onClose={() => setIsQuickOrderOpen(false)}
          product={{
            title: selectedProduct.title,
            brand: selectedProduct.brand,
            imageUrl: getCurrentImage(selectedProduct),
            variants: selectedProduct.flavors || ["Standard Variant"]
          }}
        />
      )}
      
      <WhyChooseUs />
      <LogoMarquee />
    </div>
  );
};
