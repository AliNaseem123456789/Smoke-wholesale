import React, { useEffect, useState } from "react";
import { Product } from "../types/product.types";
import { useProductsByCategory } from "../hooks/useProductsByCategory";

interface CategoryProductsPageProps {
  categoryName?: string;
  onNavigate: (path: string) => void;
}

const POSSIBLE_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];
const MAX_IMAGES = 5;
const PLACEHOLDER_IMAGE = "/product-placeholder.png";

const getFolderName = (title: string) =>
  title
    .trim()
    .replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200D\uFEFF]/g, "")
    .replace(/\s+/g, "_")
    .replace(/[()&%#.+,!\/]/g, "_");

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

interface ProductWithImages extends Product {
  imageUrls: string[];
}

export const CategoryProductsPage: React.FC<CategoryProductsPageProps> = ({
  categoryName,
  onNavigate,
}) => {
  const { products: fetchedProducts, loading, error } = useProductsByCategory(categoryName || "");
  const [products, setProducts] = useState<ProductWithImages[]>([]);
  const [imageIndices, setImageIndices] = useState<Record<string, number>>({});
  useEffect(() => {
    if (!fetchedProducts.length) {
      setProducts([]);
      setImageIndices({});
      return;
    }

    const productsWithImages = fetchedProducts.map((p) => ({
      ...p,
      imageUrls: generateImageUrls(p.title),
    }));

    const initialIndices: Record<string, number> = {};
    productsWithImages.forEach((p) => {
      initialIndices[String(p.id)] = 0;
    });

    setProducts(productsWithImages);
    setImageIndices(initialIndices);
  }, [fetchedProducts]);

  const handleImageError = (productId: string | number) => {
    const pid = String(productId);
    setImageIndices((prev) => {
      const product = products.find((p) => String(p.id) === pid);
      if (!product) return prev;
      const nextIndex = Math.min((prev[pid] ?? 0) + 1, product.imageUrls.length - 1);
      return { ...prev, [pid]: nextIndex };
    });
  };

  const getCurrentImage = (product: ProductWithImages) => {
    const index = imageIndices[String(product.id)] ?? 0;
    return product.imageUrls[index] ?? PLACEHOLDER_IMAGE;
  };

  if (loading)
    return <div className="min-h-screen flex items-center justify-center">Loading products...</div>;
  if (error) return <div className="min-h-screen text-red-500 p-6">{error}</div>;
  if (!products.length)
    return <div className="min-h-screen text-gray-400 p-6">No products found for {categoryName}</div>;

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-[#191919] text-black dark:text-gray-200 transition-colors">
      <button className="text-cyan-400 hover:text-cyan-300 mb-6" onClick={() => onNavigate("/")}>
        ← Back to Home
      </button>

      <h1 className="text-3xl font-bold mb-8 text-center">{categoryName} Products</h1>

      <div className="max-w-[1400px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => onNavigate(`/product/${product.id}`)}
            className="bg-white dark:bg-[#11172a] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden
                       hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]
                       transition-all cursor-pointer flex flex-col"
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
              <h2 className="text-base font-semibold mb-1 truncate">{product.title}</h2>
              <p className="text-xs uppercase text-gray-500 dark:text-gray-400 tracking-wide">{product.brand}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
