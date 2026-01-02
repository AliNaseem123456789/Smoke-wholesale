import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSection } from '../components/HeroSection';
import WhyChooseUs from '../components/WhyChoseUS';
import FourFeatureSection from '../components/FourFeatures';
import LogoMarquee from '../components/LogoMarquee';

interface Product {
  id: number | string;
  title: string;
  brand: string;
  description?: string;
  sku?: string;
  categories?: string[];
  flavors?: string[];
  url?: string;
  created_at?: string;
}

const POSSIBLE_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];
const MAX_IMAGES = 5;
const PLACEHOLDER_IMAGE = "/product-placeholder.png";

// Normalize folder name
const getFolderName = (title: string) =>
  title
    .trim()
    .replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200D\uFEFF]/g, "")
    .replace(/\s+/g, "_")
    .replace(/[()&%#.+,!\/]/g, "_");

// Generate image URLs
const generateImageUrls = (productTitle: string): string[] => {
  const folderName = getFolderName(productTitle);
  const urls: string[] = [];
  for (let i = 1; i <= MAX_IMAGES; i++) {
    for (const ext of POSSIBLE_EXTENSIONS) {
      urls.push(`/product-images/${folderName}/${i}.${ext}`);
    }
  }
  return urls;
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const [featuredProducts, setFeaturedProducts] = useState<(Product & { imageUrls: string[] })[]>([]);
  const [newArrivals, setNewArrivals] = useState<(Product & { imageUrls: string[] })[]>([]);
  const [bestSellers, setBestSellers] = useState<(Product & { imageUrls: string[] })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageIndices, setImageIndices] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch('http://localhost:5000/api/products/home');
        const json = await res.json();

        if (!res.ok) throw new Error(json.message || 'Failed to fetch products');

        const addImages = (arr: Product[]) =>
          arr.map((p) => ({ ...p, imageUrls: generateImageUrls(p.title) }));

        const featuredWithImages = addImages(json.data.featured).slice(0, 15);
        const newArrivalsWithImages = addImages(json.data.newArrivals).slice(0, 10);
        const bestSellersWithImages = addImages(json.data.bestSellers).slice(0, 10);

        setFeaturedProducts(featuredWithImages);
        setNewArrivals(newArrivalsWithImages);
        setBestSellers(bestSellersWithImages);

        // Initialize image index for each product as STRING key
        const initialIndices: Record<string, number> = {};
        [...featuredWithImages, ...newArrivalsWithImages, ...bestSellersWithImages].forEach(
          (p) => (initialIndices[p.id.toString()] = 0)
        );
        setImageIndices(initialIndices);

      } catch (err) {
        console.error(err);
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  // Image fallback logic
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
    return product.imageUrls[index] ?? PLACEHOLDER_IMAGE;
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black dark:bg-[#191919] dark:text-white">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-red-600 dark:bg-[#191919] dark:text-red-400">
        {error}
      </div>
    );

  const renderRows = (products: (Product & { imageUrls: string[] })[], cols = 5) => {
    const rows = [];
    for (let i = 0; i < products.length; i += cols) {
      const rowItems = products.slice(i, i + cols);
      rows.push(
        <div key={i} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-6">
          {rowItems.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="bg-white dark:bg-[#11172a] border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)] transition-all"
            >
              <div className="aspect-[4/3] bg-gray-200 dark:bg-black/40 overflow-hidden">
                <img
                  src={getCurrentImage(product)}
                  alt={product.title}
                  onError={() => handleImageError(product.id)}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold truncate">{product.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{product.brand}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#191919] dark:text-white transition-colors">
      <HeroSection />
      <FourFeatureSection />

      {/* FEATURED */}
      <section className="py-10 bg-gray-100 dark:bg-[#11172a] transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            FEATURED <span className="text-cyan-400">PRODUCTS</span>
          </h2>
          {renderRows(featuredProducts)}
        </div>
      </section>

      <LogoMarquee />
      <WhyChooseUs />

      {/* NEW ARRIVALS */}
      <section className="py-11 bg-gray-100 dark:bg-[#11172a] transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            NEW <span className="text-pink-400">ARRIVALS</span>
          </h2>
          {renderRows(newArrivals)}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="py-10 bg-gray-100 dark:bg-[#11172a] transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            BEST <span className="text-cyan-400">SELLERS</span>
          </h2>
          {renderRows(bestSellers)}
        </div>
      </section>
    </div>
  );
};
