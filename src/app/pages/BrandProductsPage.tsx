import React, { useEffect, useState } from "react";

interface Product {
  id: string;
  title: string;
  brand: string;
  description?: string;
  sku?: string;
  categories?: string[];
  flavors?: string[];
  url?: string;
  created_at?: string;
}

interface BrandProductsPageProps {
  brandName?: string;
  onNavigate: (path: string) => void;
}

const POSSIBLE_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];
const MAX_IMAGES = 5;
const PLACEHOLDER_IMAGE = "/placeholder.png";

/* -------------------------------------------
   Utils
------------------------------------------- */

// Normalize folder name (same as ProductDetailPage)
const getFolderName = (title: string) =>
  title
    .trim()
    .replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200D\uFEFF]/g, "")
    .replace(/\s+/g, "_")
    .replace(/[()&%#.+,!\/]/g, "_");

// Generate possible image URLs
const generateImageUrls = (title: string): string[] => {
  const folder = getFolderName(title);
  const urls: string[] = [];

  for (let i = 1; i <= MAX_IMAGES; i++) {
    for (const ext of POSSIBLE_EXTENSIONS) {
      urls.push(`/product-images/${folder}/${i}.${ext}`);
    }
  }

  return urls;
};
export const BrandProductsPage: React.FC<BrandProductsPageProps> = ({
  brandName,
  onNavigate,
}) => {
  const [products, setProducts] = useState<
    (Product & { imageUrls: string[] })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Track current image index PER product
  const [imageIndices, setImageIndices] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!brandName) return;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://smoke-wholesale-backend.onrender.com/api/products/brand/${encodeURIComponent(
            brandName
          )}`
        );
        const json = await res.json();

        if (!res.ok) {
          setError(json.message || "Failed to fetch products");
          return;
        }

        const mapped = json.data.map((p: Product) => ({
          ...p,
          imageUrls: generateImageUrls(p.title),
        }));

        setProducts(mapped);

        // Initialize image index = 0 for each product
        const initial: Record<string, number> = {};
        mapped.forEach((p: Product) => (initial[p.id] = 0));
        setImageIndices(initial);
      } catch (err) {
        console.error(err);
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [brandName]);

  /* -------------------------------------------
     Image Fallback Logic (SAFE)
  ------------------------------------------- */

  const handleImageError = (productId: string) => {
    setImageIndices((prev) => {
      const product = products.find((p) => p.id === productId);
      if (!product) return prev;

      const maxIndex = product.imageUrls.length - 1;
      const nextIndex = Math.min((prev[productId] ?? 0) + 1, maxIndex);

      return {
        ...prev,
        [productId]: nextIndex,
      };
    });
  };

  const getCurrentImage = (product: Product & { imageUrls: string[] }) => {
    const index = imageIndices[product.id] ?? 0;
    return product.imageUrls[index] ?? PLACEHOLDER_IMAGE;
  };

  /* -------------------------------------------
     UI States
  ------------------------------------------- */

  if (loading)
    return (
      <div className="min-h-screen p-6 bg-white dark:bg-[#191919]">
        Loading products...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen p-6 text-red-500 bg-white dark:bg-[#191919]">
        {error}
      </div>
    );

  if (!products.length)
    return (
      <div className="min-h-screen p-6 text-gray-400 bg-white dark:bg-[#191919]">
        No products found for {brandName}
      </div>
    );

  /* -------------------------------------------
     Render
  ------------------------------------------- */

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-[#191919] text-gray-900 dark:text-gray-200">
      <button
        onClick={() => onNavigate("/")}
        className="text-cyan-400 hover:text-cyan-300 mb-6"
      >
        ← Back to Home
      </button>

      <h1 className="text-3xl font-bold mb-8 text-center">
        {brandName} Products
      </h1>

      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => onNavigate(`/product/${product.id}`)}
              className="cursor-pointer bg-white dark:bg-[#11172a] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden
                hover:border-cyan-400
                hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]
                transition-all flex flex-col"
            >
              <div className="aspect-[4/3] bg-gray-100 dark:bg-black/30 overflow-hidden">
                <img
                  src={getCurrentImage(product)}
                  alt={product.title}
                  loading="lazy"
                  onError={() => handleImageError(product.id)}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="p-3 flex flex-col flex-1">
                <h2 className="text-sm font-semibold truncate">
                  {product.title}
                </h2>
                <p className="text-xs uppercase text-gray-500 tracking-wide">
                  {product.brand}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
