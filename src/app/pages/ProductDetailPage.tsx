import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TriangleAlert, Plus, Minus, X, Trash2 } from "lucide-react";

// --- TYPES ---
interface Product {
  id: number;
  title: string;
  brand: string;
  sku?: string;
  description?: string;
  flavors?: string[];
  categories?: string[];
}

interface QuickOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    title: string;
    brand: string;
    imageUrl: string;
    variants: string[]; // Using your flavors as variants
  };
}

const possibleExtensions = ["jpg", "jpeg", "png"];

// --- QUICK ORDER MODAL COMPONENT ---
const QuickOrderModal: React.FC<QuickOrderModalProps> = ({ isOpen, onClose, product }) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  if (!isOpen) return null;

  const updateQty = (flavor: string, val: number) => {
    setQuantities((prev) => ({ ...prev, [flavor]: Math.max(0, val) }));
  };

  const handleRequest = () => {
    const selectedItems = Object.entries(quantities).filter(([_, qty]) => qty > 0);
    console.log("Submitting Order for:", selectedItems);
    alert(`Requesting ${selectedItems.length} items. Check console for data.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-[#003366] text-white px-6 py-3 flex justify-between items-center">
          <h2 className="text-xl font-bold uppercase tracking-tight">Quick Order</h2>
          <button onClick={onClose} className="hover:scale-110 transition-transform cursor-pointer">
            <X size={28} />
          </button>
        </div>

        <div className="p-6">
          {/* Product Info Block */}
          <div className="flex gap-6 mb-8 items-center">
            <div className="w-28 h-28 border border-gray-100 rounded p-2 bg-white shrink-0">
              <img src={product.imageUrl} alt={product.title} className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{product.title} By {product.brand}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-1 h-5 bg-red-600"></span>
                <span className="text-red-600 font-bold text-sm uppercase">Login to view prices</span>
              </div>
            </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-12 border-b-2 border-black pb-2 px-2 font-bold text-gray-700">
            <div className="col-span-8">Nicotine / Flavor</div>
            <div className="col-span-4 text-right pr-12">Quantity</div>
          </div>

          {/* Variants List */}
          <div className="max-h-[350px] overflow-y-auto">
            {product.variants.map((flavor) => (
              <div key={flavor} className="grid grid-cols-12 items-center py-4 px-2 border-b border-gray-100 hover:bg-gray-50">
                <div className="col-span-8 flex items-center gap-2">
                  <span className="font-bold text-gray-900">{flavor}</span>
                  <span className="w-[1px] h-4 bg-red-600"></span>
                  <span className="text-red-600 text-xs font-bold uppercase">Login to view prices</span>
                </div>
                <div className="col-span-4 flex items-center justify-end gap-2">
                  <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                    <input 
                      type="number" 
                      value={quantities[flavor] || 0}
                      onChange={(e) => updateQty(flavor, parseInt(e.target.value) || 0)}
                      className="w-12 text-center py-1 font-bold outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button onClick={() => updateQty(flavor, (quantities[flavor] || 0) - 1)} className="px-2 py-1 border-l border-gray-300 hover:bg-gray-100">
                      <Minus size={14} />
                    </button>
                    <button onClick={() => updateQty(flavor, (quantities[flavor] || 0) + 1)} className="px-2 py-1 border-l border-gray-300 hover:bg-gray-100">
                      <Plus size={14} />
                    </button>
                  </div>
                  <button onClick={() => updateQty(flavor, 0)} className="text-gray-300 hover:text-red-500 transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 mt-8">
            <button 
              onClick={handleRequest}
              className="bg-[#56A3D1] hover:bg-[#4892bc] text-white px-8 py-2.5 rounded font-bold transition-colors cursor-pointer"
            >
              Request product
            </button>
            <button 
              onClick={() => setQuantities({})}
              className="bg-[#71767A] hover:bg-[#5f6367] text-white px-8 py-2.5 rounded font-bold transition-colors cursor-pointer"
            >
              Clear all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PRODUCT DETAIL PAGE ---
export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [quantity, setQuantity] = useState(1);
  const [selectedFlavor, setSelectedFlavor] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  
  // Modal State
  const [isQuickOrderOpen, setIsQuickOrderOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/product/${id}`);
        const json = await res.json();

        if (!res.ok) {
          setError(json.message || "Failed to load product");
        } else {
          setProduct(json.data);
          setSelectedFlavor(json.data?.flavors?.[0] || "");

          const folderName = json.data.title
            .trim()
            .replace(/\s+/g, "_")
            .replace(/[()&%#.+,!]/g, "_");

          const generatedImages: string[] = [];
          for (let i = 1; i <= 5; i++) {
            for (let ext of possibleExtensions) {
              generatedImages.push(`/product-images/${folderName}/${i}.${ext}`);
            }
          }
          setImages(generatedImages);
        }
      } catch {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageError = (index: number) => {
    if (index + 1 < images.length) {
      setSelectedImage(index + 1);
    }
  };

  const handleThumbnailError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const parent = e.currentTarget.parentElement;
    if (parent) parent.style.display = "none";
  };

  if (loading) return <p className="p-6">Loading product...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!product) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="text-blue-600 mb-6 hover:underline flex items-center gap-1">
          ← Back
        </button>

        <div className="bg-white rounded-lg shadow-sm border p-6 grid md:grid-cols-2 gap-8">
          {/* IMAGE GALLERY */}
          <div>
            <div className="aspect-square bg-gray-100 rounded overflow-hidden mb-3 border border-gray-200">
              {images[selectedImage] && (
                <img
                  src={images[selectedImage]}
                  alt={product.title}
                  onError={() => handleImageError(selectedImage)}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            <div className="flex gap-2 flex-wrap">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-16 border rounded overflow-hidden transition-all ${
                    selectedImage === idx ? "border-blue-600 ring-2 ring-blue-100" : "border-gray-200"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title} ${idx + 1}`}
                    onError={handleThumbnailError}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* PRODUCT INFO */}
          <div className="flex flex-col">
            <p className="text-sm text-blue-600 font-bold uppercase tracking-wide mb-1">
              {product.brand}
            </p>
            <h1 className="text-3xl font-extrabold mb-4 text-gray-900">{product.title}</h1>

            <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-6 flex gap-3 items-center">
              <TriangleAlert className="text-yellow-600 shrink-0" size={20} />
              <p className="text-sm text-yellow-800 leading-tight">
                <strong>Warning:</strong> This product contains nicotine. Nicotine is an addictive chemical.
              </p>
            </div>

            {product.description && <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>}
            
            <div className="space-y-1 mb-6 text-sm">
               <p className="text-gray-500"><strong>Brand:</strong> {product.brand}</p>
               {product.sku && <p className="text-gray-500"><strong>SKU:</strong> {product.sku}</p>}
            </div>

            {/* BUTTONS SECTION */}
            <div className="space-y-3 mt-auto">
              <button 
                onClick={() => setIsQuickOrderOpen(true)}
                className="w-full bg-[#003366] text-white py-4 rounded font-bold hover:bg-[#002244] transition-all uppercase tracking-widest shadow-md active:scale-[0.98]"
              >
                Quick Order
              </button>
              
              <button className="w-full border-2 border-blue-600 text-blue-600 py-4 rounded font-bold hover:bg-blue-50 transition-all uppercase tracking-widest">
                Request Quote
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK ORDER MODAL */}
      <QuickOrderModal 
        isOpen={isQuickOrderOpen}
        onClose={() => setIsQuickOrderOpen(false)}
        product={{
          title: product.title,
          brand: product.brand,
          imageUrl: images[selectedImage],
          variants: product.flavors || []
        }}
      />
    </div>
  );
};