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

interface CategoryProductsPageProps {
  categoryName?: string;
  onNavigate: (path: string) => void;
}

const possibleExtensions = ["jpg", "jpeg", "png", "webp"];

// Helper to get folder name
const getFolderName = (title: string) => {
  return title
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[()&%#.+,]/g, "_");
};

// Generate image URLs
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

export const CategoryProductsPage: React.FC<CategoryProductsPageProps> = ({
  categoryName,
  onNavigate,
}) => {
  const [products, setProducts] = useState<(Product & { imageUrls: string[] })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!categoryName) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/products/category/${encodeURIComponent(
            categoryName
          )}`
        );
        const json = await res.json();

        if (res.ok) {
          const productsWithImages = json.data.map((product: Product) => ({
            ...product,
            imageUrls: generateImageUrls(product.title),
          }));
          setProducts(productsWithImages);
        } else {
          setError(json.message || "Error fetching products");
        }
      } catch (err) {
        console.error(err);
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  const handleImageError = (productId: string) => {
    setImageErrors(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const getCurrentImage = (product: Product & { imageUrls: string[] }) => {
    const errorCount = imageErrors[product.id] || 0;
    return product.imageUrls[errorCount] || product.imageUrls[0] || "";
  };

  if (loading)
    return (
      <div className="min-h-screen p-6 bg-white dark:bg-[#191919] text-black dark:text-gray-300 transition-colors">
        Loading products...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen p-6 bg-white dark:bg-[#191919] text-black dark:text-red-400 transition-colors">
        {error}
      </div>
    );

  if (!products.length)
    return (
      <div className="min-h-screen p-6 bg-white dark:bg-[#191919] text-black dark:text-gray-400 transition-colors">
        No products found for {categoryName}.
      </div>
    );

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-[#191919] text-black dark:text-gray-200 transition-colors">
      <button
        className="text-cyan-400 hover:text-cyan-300 transition-colors mb-6"
        onClick={() => onNavigate("/")}
      >
        ← Back to Home
      </button>

      <h1 className="text-3xl font-bold mb-8 text-center text-black dark:text-gray-100 transition-colors">
        {categoryName} Products
      </h1>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => onNavigate(`/product/${product.id}`)}
              className="bg-white dark:bg-[#11172a] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden
                hover:border-cyan-400
                hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]
                transition-all cursor-pointer flex flex-col"
            >
              <div className="aspect-[4/3] bg-gray-100 dark:bg-black/30 overflow-hidden">
                <img
                  src={getCurrentImage(product)}
                  alt={product.title}
                  onError={() => handleImageError(product.id)}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="p-3 flex flex-col flex-1">
                <h2 className="text-base font-semibold text-black dark:text-gray-100 mb-1 truncate transition-colors">
                  {product.title}
                </h2>
                <p className="text-xs uppercase text-gray-500 dark:text-gray-400 tracking-wide transition-colors">
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
