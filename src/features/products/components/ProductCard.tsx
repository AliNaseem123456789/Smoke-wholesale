import React from "react";
import { useNavigate } from "react-router-dom";
import { ProductWithImages } from "../types/product.types";

interface ProductCardProps {
  product: ProductWithImages;
  currentImage: (p: ProductWithImages) => string;
  onQuickOrder: (p: ProductWithImages) => void;
  onImageError: (id: string | number, max: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currentImage,
  onQuickOrder,
  onImageError,
}) => {
  const navigate = useNavigate();

  return (
    <div className="border rounded bg-white p-3">
      <div
        className="aspect-[4/3] cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img
          src={currentImage(product)}
          onError={() => onImageError(product.id, product.imageUrls.length - 1)}
          className="object-contain w-full h-full"
        />
      </div>

      <p className="text-xs text-cyan-500 uppercase font-bold">{product.brand}</p>
      <h3 className="text-sm font-bold line-clamp-1">{product.title}</h3>

      <div className="grid grid-cols-2 gap-2 mt-2">
        <button
          onClick={() => navigate(`/product/${product.id}`)}
          className="bg-cyan-500 text-white text-xs py-1 rounded"
        >
          View
        </button>
        <button
          onClick={() => onQuickOrder(product)}
          className="bg-pink-500 text-white text-xs py-1 rounded"
        >
          Quick Order
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
