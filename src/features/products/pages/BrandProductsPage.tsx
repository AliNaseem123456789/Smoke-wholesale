// src/pages/BrandProductsPage.tsx
import React from "react";
import { useBrandProducts } from "../hooks/useBrandProducts";

interface BrandProductsPageProps {
  brandName?: string;
  onNavigate: (path: string) => void;
}

export const BrandProductsPage: React.FC<BrandProductsPageProps> = ({ brandName, onNavigate }) => {
  const { products, loading, error, handleImageError, getCurrentImage } = useBrandProducts(brandName);

  if (loading) return <div className="min-h-screen p-6">Loading products...</div>;
  if (error) return <div className="min-h-screen p-6 text-red-500">{error}</div>;
  if (!products.length) return <div className="min-h-screen p-6 text-gray-400">No products found for {brandName}</div>;

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-[#191919] text-gray-900 dark:text-gray-200">
      <button onClick={() => onNavigate("/")} className="text-cyan-400 hover:text-cyan-300 mb-6">
        ← Back to Home
      </button>

      <h1 className="text-3xl font-bold mb-8 text-center">{brandName} Products</h1>

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
                <h2 className="text-sm font-semibold truncate">{product.title}</h2>
                <p className="text-xs uppercase text-gray-500 tracking-wide">{product.brand}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
