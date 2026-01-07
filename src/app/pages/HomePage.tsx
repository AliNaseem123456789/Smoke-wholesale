import React, { useState, Suspense, lazy } from "react";
import { useHomeProducts } from "../../features/products/hooks/useHomeProducts";
import { ProductWithImages, Product } from "../../features/products/types/product.types";

import { HeroSection } from "../components/home/HeroSection";
import FourFeatureSection from "../components/home/FourFeatures";
import QuickOrderModal from "../components/home/Quickordermodal";
import ProductCard from "../../features/products/components/ProductCard";

const WhyChooseUs = lazy(() => import("../components/home/WhyChoseUS"));
const LogoMarquee = lazy(() => import("../components/home/LogoMarquee"));

const possibleExtensions = ["webp", "jpg", "jpeg", "png"];

const getFolderName = (title: string) =>
  title.trim().replace(/\s+/g, "_").replace(/[()&%#.+,!]/g, "_");

const generateImageUrls = (title: string): string[] => {
  const folder = getFolderName(title);
  return possibleExtensions.map((ext) => `/product-images/${folder}/1.${ext}`);
};

export const HomePage: React.FC = () => {
  const { featured, newArrivals, bestSellers, loading, error } = useHomeProducts();

  const mapWithImages = (items: Product[]): ProductWithImages[] =>
    items.map((p) => ({
      ...p,
      imageUrls: generateImageUrls(p.title),
    }));

  const featuredProducts = mapWithImages(featured).slice(0, 15);
  const newArrivalProducts = mapWithImages(newArrivals).slice(0, 10);
  const bestSellerProducts = mapWithImages(bestSellers).slice(0, 10);

  const [imageIndex, setImageIndex] = useState<Record<string, number>>({});
  const [quickOpen, setQuickOpen] = useState(false);
  const [selected, setSelected] = useState<ProductWithImages | null>(null);

  const handleImageError = (id: string | number, max: number) => {
    setImageIndex((prev) => ({
      ...prev,
      [id]: Math.min((prev[id] ?? 0) + 1, max),
    }));
  };

  const currentImage = (p: ProductWithImages) =>
    p.imageUrls[imageIndex[p.id] ?? 0] || "/product-placeholder.png";

  const renderGrid = (products: ProductWithImages[]) => (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          currentImage={currentImage}
          onQuickOrder={(prod) => {
            setSelected(prod);
            setQuickOpen(true);
          }}
          onImageError={handleImageError}
        />
      ))}
    </div>
  );

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading products...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0f]">
      <HeroSection />

      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-4xl font-black mb-6">Featured Products</h2>
        {renderGrid(featuredProducts)}

        <FourFeatureSection />

        <h2 className="text-4xl font-black my-6">New Arrivals</h2>
        {renderGrid(newArrivalProducts)}

        <h2 className="text-4xl font-black my-6">Best Sellers</h2>
        {renderGrid(bestSellerProducts)}
      </section>

      {selected && (
        <QuickOrderModal
          isOpen={quickOpen}
          onClose={() => setQuickOpen(false)}
          product={{
            title: selected.title,
            brand: selected.brand,
            imageUrl: currentImage(selected),
            variants: selected.flavors || ["Standard"],
          }}
        />
      )}

      <Suspense fallback={<div className="py-10 text-center">Loading…</div>}>
        <WhyChooseUs />
        <LogoMarquee />
      </Suspense>
    </div>
  );
};
