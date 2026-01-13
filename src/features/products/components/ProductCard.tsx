import React from "react";
import { useNavigate } from "react-router-dom";
import { ProductWithImages } from "../types/product.types";
import { useAuth } from "../../auth/context/AuthContext"; // Import Auth
import { Lock } from "lucide-react";

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
  const { user } = useAuth(); // Check auth status

  return (
    <div className="group border rounded bg-white p-3 hover:shadow-md transition-shadow">
      <div
        className="aspect-[4/3] cursor-pointer overflow-hidden rounded"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img
          src={currentImage(product)}
          onError={() => onImageError(product.id, product.imageUrls.length - 1)}
          className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <p className="text-xs text-cyan-500 uppercase font-bold mt-2">
        {product.brand}
      </p>
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

      {/* Small strip at the bottom */}
      {!user && (
        <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-center gap-1.5 opacity-70">
          <Lock size={10} className="text-gray-400" />
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">
            Login to see prices
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
