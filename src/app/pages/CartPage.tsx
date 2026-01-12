import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { useAuth } from "../../features/auth/context/AuthContext";
import {
  removeItemFromCart,
  addItemToCart,
  clearCart,
} from "../../features/cart/cartSlice";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // 1. Get state from Redux
  const { items, loading } = useSelector((state: RootState) => state.cart);
  const { user } = useAuth();

  const isAuthenticated = !!user;
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate total price using the joined 'products' object
  const calculateTotal = () =>
    items.reduce(
      (total, item) => total + (item.products?.price || 0) * item.quantity,
      0
    );

  const handleUpdateQuantity = async (productId: number, newQty: number) => {
    if (newQty < 1) return;
    try {
      // Reusing addItemToCart because the backend uses 'upsert'
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

    // Simulate API call for quote submission
    setTimeout(() => {
      toast.success("Quote request submitted successfully!");
      dispatch(clearCart());
      setIsSubmitting(false);
      navigate("/");
    }, 1500);
  };

  // 2. Loading State
  if (loading && items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
        <p className="text-gray-600 font-medium">Fetching your cart...</p>
      </div>
    );
  }

  // 3. Empty State
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center py-16">
          <div className="bg-white rounded-2xl shadow-sm border p-12 max-w-2xl mx-auto">
            <ShoppingCart className="w-20 h-20 text-gray-200 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Quote Cart is Empty
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Add products to your cart to request a wholesale quote.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. Content State
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6 transition-colors"
        >
          <ArrowLeft size={18} /> Continue Shopping
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Review Quote Request
        </h1>
        <p className="text-gray-600 mb-8">
          Review your items and submit for a wholesale quote estimate.
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product_id}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border">
                    <img
                      src={item.products?.image_url || "/placeholder.png"}
                      alt={item.products?.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">
                          {item.products?.brand}
                        </p>
                        <h3 className="text-lg font-bold text-gray-900 leading-tight">
                          {item.products?.title}
                        </h3>
                      </div>
                      <button
                        onClick={() => handleRemove(item.product_id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Remove Item"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="flex justify-between items-end mt-6">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.product_id,
                              item.quantity - 1
                            )
                          }
                          className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg transition-all text-gray-600"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="font-bold w-12 text-center text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.product_id,
                              item.quantity + 1
                            )
                          }
                          className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg transition-all text-gray-600"
                        >
                          <Plus size={18} />
                        </button>
                      </div>

                      {/* Pricing */}
                      {isAuthenticated && (
                        <div className="text-right">
                          <p className="text-sm text-gray-500 mb-1">
                            ${(item.products?.price || 0).toFixed(2)} per unit
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
              </div>
            ))}
          </div>

          {/* Sticky Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 h-fit sticky top-24 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Quote Summary
              </h2>

              {isAuthenticated ? (
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Unique Products</span>
                    <span className="font-semibold text-gray-900">
                      {items.length}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Total Units</span>
                    <span className="font-semibold text-gray-900">
                      {items.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  </div>
                  <div className="border-t border-dashed pt-4 flex justify-between items-baseline">
                    <span className="text-gray-900 font-bold">
                      Estimated Total
                    </span>
                    <span className="text-2xl font-black text-blue-600">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-amber-800 text-sm leading-relaxed mb-4">
                  <p className="font-bold mb-1 flex items-center gap-2">
                    🔒 Restricted Access
                  </p>
                  Please login to view wholesale pricing, individual unit costs,
                  and the final quote total.
                </div>
              )}

              <button
                onClick={handleSubmitQuote}
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold mt-8 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:bg-gray-300 disabled:shadow-none flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} /> Submitting...
                  </>
                ) : (
                  "Submit Quote Request"
                )}
              </button>

              <p className="text-center text-gray-400 text-xs mt-4 uppercase font-bold tracking-widest">
                Secure Wholesale Checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
