import React from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../types/product.types"; // Use standard Product
import { useAuth } from "../../auth/context/AuthContext";
import { Lock } from "lucide-react";
import { getProductImage } from "../utils/getProductImage";

interface ProductCardProps {
  product: Product; // Changed from ProductWithImages
  onQuickOrder: (p: Product) => void; // Removed unused image props
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickOrder }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="group border rounded bg-white p-3 hover:shadow-md transition-shadow">
      <div
        className="aspect-[4/3] cursor-pointer overflow-hidden rounded bg-gray-50"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img
          src={getProductImage(product.id)}
          alt={product.title}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder-image.png";
          }}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <p className="text-xs text-cyan-500 uppercase font-bold mt-2">
        {product.brand}
      </p>
      <h3 className="text-sm font-bold line-clamp-1">{product.title}</h3>

      <div className="grid grid-cols-2 gap-2 mt-2">
        <button
          onClick={() => navigate(`/product/${product.id}`)}
          className="bg-cyan-500 text-white text-xs py-1 rounded hover:bg-cyan-600 transition-colors"
        >
          View
        </button>
        <button
          onClick={() => onQuickOrder(product)}
          className="bg-pink-500 text-white text-xs py-1 rounded hover:bg-pink-600 transition-colors"
        >
          Quick Order
        </button>
      </div>

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
