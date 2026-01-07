// src/features/products/hooks/useBrandProducts.ts
import { useState, useEffect } from "react";
import { Product } from "../types/product.types";
import { getProductsByBrand } from "../api/productApi";

const POSSIBLE_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];
const MAX_IMAGES = 5;

// Image helpers
const getFolderName = (title: string) =>
  title
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[()&%#.+,!\/]/g, "_");

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

export function useBrandProducts(brandName?: string) {
  const [products, setProducts] = useState<(Product & { imageUrls: string[] })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageIndices, setImageIndices] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!brandName) return;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getProductsByBrand(brandName);

        const mapped = data.map((p) => ({ ...p, imageUrls: generateImageUrls(p.title) }));
        setProducts(mapped);

        // Initialize image indices
        const initialIndices: Record<string, number> = {};
        mapped.forEach((p) => (initialIndices[p.id.toString()] = 0));
        setImageIndices(initialIndices);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [brandName]);

  const handleImageError = (productId: string | number) => {
    setImageIndices((prev) => {
      const product = products.find((p) => p.id.toString() === productId.toString());
      if (!product) return prev;

      const maxIndex = product.imageUrls.length - 1;
      const nextIndex = Math.min((prev[productId.toString()] ?? 0) + 1, maxIndex);

      return { ...prev, [productId.toString()]: nextIndex };
    });
  };

  const getCurrentImage = (product: Product & { imageUrls: string[] }) => {
    const index = imageIndices[product.id.toString()] ?? 0;
    return product.imageUrls[index] ?? "/placeholder.png";
  };

  return { products, loading, error, handleImageError, getCurrentImage };
}
