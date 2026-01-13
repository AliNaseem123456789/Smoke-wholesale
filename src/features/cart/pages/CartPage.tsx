import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../app/store";
import { useAuth } from "../../auth/context/AuthContext";
import {
  removeItemFromCart,
  addItemToCart,
  clearCart,
  fetchCart,
} from "../cartSlice";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";

// --- Dynamic Image Helpers ---
const POSSIBLE_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];
const PLACEHOLDER_IMAGE = "/product-placeholder.png";

const getFolderName = (title: string) =>
  title
    .trim()
    .replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200D\uFEFF]/g, "")
    .replace(/\s+/g, "_")
    .replace(/[()&%#.+,!\/]/g, "_");

const generateImageUrls = (productTitle: string): string[] => {
  const folderName = getFolderName(productTitle);
  return POSSIBLE_EXTENSIONS.map(
    (ext) => `/product-images/${folderName}/1.${ext}`
  );
};

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.cart);
  const { user } = useAuth();

  const isAuthenticated = !!user;
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Track image extension indices: { "product_id": index }
  const [imageIndices, setImageIndices] = useState<Record<string, number>>({});

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Handle Image Fallback Logic
  const handleImageError = (productId: number, title: string) => {
    const pid = String(productId);
    const maxRetries = POSSIBLE_EXTENSIONS.length - 1;

    setImageIndices((prev) => ({
      ...prev,
      [pid]: Math.min((prev[pid] || 0) + 1, maxRetries),
    }));
  };

  const calculateTotal = () =>
    items.reduce(
      (total, item) => total + (item.products?.price || 0) * item.quantity,
      0
    );

  const handleUpdateQuantity = async (productId: number, newQty: number) => {
    if (newQty < 1) return;
    try {
      await dispatch(addItemToCart({ productId, quantity: newQty })).unwrap();
    } catch (err) {
      toast.error("Failed to update quantity");
    }
  };

  const handleRemove = async (productId: number) => {
    try {
      await dispatch(removeItemFromCart(productId)).unwrap();
      toast.success("Item removed");
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  const handleSubmitQuote = () => {
    if (!isAuthenticated) {
      toast.error("Please login to submit a quote request");
      navigate("/login");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Quote request submitted successfully!");
      dispatch(clearCart());
      setIsSubmitting(false);
      navigate("/");
    }, 1500);
  };

  if (loading && items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
        <p className="text-gray-600 font-medium">Fetching your cart...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center">
        <div className="max-w-7xl mx-auto px-4 text-center w-full">
          <ShoppingCart className="w-20 h-20 text-gray-200 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your Quote Cart is Empty
          </h2>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-blue-600 font-medium mb-6"
        >
          <ArrowLeft size={18} /> Continue Shopping
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const urls = item.products
                ? generateImageUrls(item.products.title)
                : [];
              const currentIndex = imageIndices[String(item.product_id)] || 0;
              const currentSrc = urls[currentIndex] || PLACEHOLDER_IMAGE;

              return (
                <div
                  key={item.product_id}
                  className="bg-white rounded-xl border p-5 flex gap-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Dynamic Image with Fallback */}
                  <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border">
                    <img
                      src={currentSrc}
                      alt={item.products?.title}
                      onError={() =>
                        handleImageError(
                          item.product_id,
                          item.products?.title || ""
                        )
                      }
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs text-blue-600 font-bold uppercase">
                          {item.products?.brand}
                        </p>
                        <h3 className="text-lg font-bold text-gray-900">
                          {item.products?.title}
                        </h3>
                      </div>
                      <button
                        onClick={() => handleRemove(item.product_id)}
                        className="text-gray-400 hover:text-red-600 p-2"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="flex justify-between items-end mt-6">
                      <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl border">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.product_id,
                              item.quantity - 1
                            )
                          }
                          className="p-1.5 hover:bg-white rounded-lg"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="font-bold w-12 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.product_id,
                              item.quantity + 1
                            )
                          }
                          className="p-1.5 hover:bg-white rounded-lg"
                        >
                          <Plus size={18} />
                        </button>
                      </div>

                      {isAuthenticated && (
                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            ${(item.products?.price || 0).toFixed(2)} / unit
                          </p>
                          <p className="text-xl font-black text-gray-900">
                            $
                            {(
                              (item.products?.price || 0) * item.quantity
                            ).toFixed(2)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sidebar logic remains mostly same, ensuring totals use products?.price */}
          <div className="lg:col-span-1">
            <div className="bg-white border rounded-2xl p-6 sticky top-24 shadow-sm">
              <h2 className="text-xl font-bold mb-6">Quote Summary</h2>
              {isAuthenticated ? (
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Units</span>
                    <span className="font-bold">
                      {items.reduce((acc, i) => acc + i.quantity, 0)}
                    </span>
                  </div>
                  <div className="border-t pt-4 flex justify-between">
                    <span className="font-bold">Estimated Total</span>
                    <span className="text-2xl font-black text-blue-600">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="bg-amber-50 p-4 rounded-xl text-amber-800 text-sm">
                  Please login to view wholesale pricing.
                </div>
              )}
              <button
                onClick={handleSubmitQuote}
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold mt-8"
              >
                {isSubmitting ? "Submitting..." : "Submit Quote Request"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
