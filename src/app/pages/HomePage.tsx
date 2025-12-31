import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

const possibleExtensions = ["jpg", "jpeg", "png", "webp"];

// Helper to get folder name
const getFolderName = (title: string) => {
  return title
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[()&%#.+/,]/g, "_");
};

// Helper to generate image URLs for a product
const generateImageUrls = (productTitle: string): string[] => {
  const folderName = getFolderName(productTitle);
  const urls: string[] = [];
  
  for (let ext of possibleExtensions) {
    urls.push(`/product-images/${folderName}/1.${ext}`);
  }
  
  for (let i = 2; i <= 5; i++) {
    for (let ext of possibleExtensions) {
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
  const [imageErrors, setImageErrors] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:5000/api/products/home');
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json.message || 'Failed to fetch products');
        }

        const featuredWithImages = json.data.featured.map((product: Product) => ({
          ...product,
          imageUrls: generateImageUrls(product.title)
        }));
        const newArrivalsWithImages = json.data.newArrivals.map((product: Product) => ({
          ...product,
          imageUrls: generateImageUrls(product.title)
        }));
        const bestSellersWithImages = json.data.bestSellers.map((product: Product) => ({
          ...product,
          imageUrls: generateImageUrls(product.title)
        }));

        setFeaturedProducts(featuredWithImages);
     setFeaturedProducts(featuredWithImages.slice(0, 5));
setNewArrivals(newArrivalsWithImages.slice(0, 5));
setBestSellers(bestSellersWithImages.slice(0, 5));

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

  const handleImageError = (productId: string | number) => {
    setImageErrors(prev => {
      const currentCount = prev[productId] || 0;
      return {
        ...prev,
        [productId]: currentCount + 1
      };
    });
  };

  const getCurrentImage = (product: Product & { imageUrls: string[] }) => {
    const errorCount = imageErrors[product.id] || 0;
    return product.imageUrls[errorCount] || product.imageUrls[0] || "/product-placeholder.png";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center
        bg-white text-black
        dark:bg-[#191919] dark:text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center
        bg-white text-red-600
        dark:bg-[#191919] dark:text-red-400">
        {error}
      </div>
    );
  }

  const renderProducts = (products: (Product & { imageUrls: string[] })[]) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          onClick={() => handleProductClick(product)}
          className="
            bg-white dark:bg-[#11172a]
            border border-gray-200 dark:border-white/10
            rounded-xl overflow-hidden cursor-pointer
            hover:border-cyan-400
            hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]
            transition-all
          "
        >
          <div className="aspect-[4/3] bg-gray-200 dark:bg-black/40 overflow-hidden">
            <img
              src={getCurrentImage(product)}
              alt={product.title}
              onError={() => handleImageError(product.id)}
              className="w-full h-full object-cover"
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

  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#191919] dark:text-white transition-colors">
      {/* ================= HERO ================= */}
      <section className="relative h-[85vh] flex items-center">
        <img
          src="/logos/hero.jpeg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white">
              FUTURE OF <span className="text-cyan-400">//</span> WHOLESALE
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10">
              Modern solutions. Rapid fulfillment. <br />
              <span className="text-pink-400">Unbeatable wholesale pricing.</span>
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate('/register')}
                className="
                  px-8 py-3 rounded-lg font-semibold
                  bg-cyan-500 text-black dark:text-white
                  hover:bg-cyan-400
                  shadow-[0_0_20px_rgba(34,211,238,0.6)]
                  transition-all
                "
              >
                Register
              </button>

              <button
                onClick={() => navigate('/login')}
                className="
                  px-8 py-3 rounded-lg font-semibold
                  border border-pink-400 text-pink-400
                  hover:bg-pink-500 hover:text-black
                  dark:hover:text-white
                  shadow-[0_0_20px_rgba(236,72,153,0.5)]
                  transition-all
                "
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED ================= */}
      <section className="py-20 bg-gray-100 dark:bg-[#11172a] transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            FEATURED <span className="text-cyan-400">PRODUCTS</span>
          </h2>
          {renderProducts(featuredProducts)}
        </div>
      </section>

      {/* ================= NEW ARRIVALS ================= */}
      <section className="py-20 bg-gray-100 dark:bg-[#11172a] transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            NEW <span className="text-pink-400">ARRIVALS</span>
          </h2>
          {renderProducts(newArrivals)}
        </div>
      </section>

      {/* ================= BEST SELLERS ================= */}
      <section className="py-20 bg-gray-100 dark:bg-[#11172a] transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            BEST <span className="text-cyan-400">SELLERS</span>
          </h2>
          {renderProducts(bestSellers)}
        </div>
      </section>
    </div>
  );
};
