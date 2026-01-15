// src/features/cart/components/AddToCartButton.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { addItemToCart } from "../../cart/redux/cartSlice";
import { Loader2, ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  productId: number;
  quantity: number;
  className?: string;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productId,
  quantity,
  className = "",
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdd = async () => {
    try {
      setIsSubmitting(true);
      // Dispatching the Redux thunk
      await dispatch(addItemToCart({ productId, quantity })).unwrap();
      alert("Added to cart successfully!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Could not add to cart. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <button
      onClick={handleAdd}
      disabled={isSubmitting}
      className={`flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400 ${className}`}
    >
      {isSubmitting ? (
        <Loader2 className="animate-spin" size={20} />
      ) : (
        <ShoppingCart size={20} />
      )}
      {isSubmitting ? "Adding..." : "Add to Cart"}
    </button>
  );
};
