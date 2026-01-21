import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../app/store";
import { useAuth } from "../../auth/context/AuthContext";
import { useSaveCart } from "../hooks/useSaveCart";
import { useCartActions } from "../hooks/useCartActions";
import { fetchCart } from "../redux/cartSlice";
import { getProductImage } from "../../products/utils/getProductImage";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  Loader2,
  ArrowLeft,
  Save,
  CreditCard,
  Lock,
} from "lucide-react";

const PLACEHOLDER_IMAGE = "/product-placeholder.png";

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const { loading } = useSelector((state: RootState) => state.cart);
  const isAuthenticated = !!user;

  // Permission Logic
  const canCheckout =
    user?.role === "ADMIN" ||
    user?.role === "USER" ||
    (user?.role === "SUBACCOUNT" &&
      user?.permissions?.can_place_order === true);

  const { items, calculateTotal, handleUpdateQuantity, handleRemove } =
    useCartActions();
  const { handleSave, isSaving } = useSaveCart();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (loading && items.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
        <p className="mt-4 text-gray-500 font-medium">Loading your cart...</p>
      </div>
    );

  if (items.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-gray-50">
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
          <ShoppingCart className="w-20 h-20 text-gray-200 mb-6" />
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Your Cart is Empty
          </h2>
          <p className="text-gray-500 mb-8 max-w-xs">
            Looks like you haven't added any wholesale items to your order yet.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
          >
            Browse Products
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-blue-600 mb-6 hover:text-blue-800 transition-colors font-semibold"
        >
          <ArrowLeft size={18} /> Continue Shopping
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product_id}
                className="bg-white rounded-2xl border border-gray-100 p-5 flex gap-6 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shrink-0">
                  <img
                    src={getProductImage(item.product_id, 1)}
                    alt={item.products?.title}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        PLACEHOLDER_IMAGE;
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">
                        {item.products?.brand}
                      </p>
                      <h3 className="text-lg font-bold text-gray-900">
                        {item.products?.title}
                      </h3>
                      {item.flavor && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md mt-1 inline-block">
                          Flavor: {item.flavor}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemove(item.product_id)}
                      className="text-gray-300 hover:text-red-500 p-2 transition-colors self-start"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="flex justify-between items-end mt-4">
                    <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.product_id,
                            item.quantity - 1,
                          )
                        }
                        className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-bold w-10 text-center text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.product_id,
                            item.quantity + 1,
                          )
                        }
                        className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {isAuthenticated && (
                      <div className="text-right">
                        <p className="text-[10px] text-gray-400 font-bold uppercase">
                          Subtotal
                        </p>
                        <p className="text-lg font-black text-gray-900 leading-none">
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
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-100 rounded-3xl p-6 sticky top-24 shadow-sm">
              <h2 className="text-xl font-bold mb-6 text-gray-900">
                Order Summary
              </h2>

              {isAuthenticated ? (
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-500 text-sm">
                    <span>Total Units</span>
                    <span className="font-bold text-gray-900">
                      {items.reduce((acc, i) => acc + i.quantity, 0)}
                    </span>
                  </div>
                  <div className="border-t border-dashed pt-4 flex justify-between items-center">
                    <span className="font-bold text-gray-900">
                      Estimated Total
                    </span>
                    <span className="text-2xl font-black text-blue-600">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="bg-amber-50 p-4 rounded-xl text-amber-800 text-xs mb-4 border border-amber-100 leading-relaxed">
                  <strong>Notice:</strong> Please login to view wholesale
                  pricing and complete your order.
                </div>
              )}

              <div className="space-y-3 mt-8">
                {!isAuthenticated ? (
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all"
                  >
                    Login to Checkout
                  </button>
                ) : canCheckout ? (
                  <button
                    onClick={() => navigate("/checkout")}
                    disabled={items.length === 0}
                    className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-50 transition-all shadow-lg shadow-blue-100 active:scale-[0.98]"
                  >
                    <CreditCard size={20} />
                    Proceed to Checkout
                  </button>
                ) : (
                  <div className="bg-red-50 border border-red-100 rounded-2xl p-4 text-center">
                    <div className="flex justify-center mb-2">
                      <Lock className="text-red-500" size={24} />
                    </div>
                    <p className="text-red-700 font-bold text-sm">
                      Checkout Restricted
                    </p>
                    <p className="text-red-500 text-[11px] mt-1 leading-tight">
                      You don't have permissions for checkout. Please contact
                      the account owner.
                    </p>
                  </div>
                )}
                <button
                  onClick={() => handleSave(items, calculateTotal())}
                  disabled={isSaving || items.length === 0}
                  className="w-full flex items-center justify-center gap-2 border-2 border-gray-100 text-gray-600 py-4 rounded-2xl font-bold hover:bg-gray-50 hover:border-gray-200 disabled:opacity-50 transition-all active:scale-[0.98]"
                >
                  {isSaving ? (
                    <Loader2 className="animate-spin text-blue-600" size={20} />
                  ) : (
                    <Save size={20} className="text-gray-400" />
                  )}
                  Save Order Template
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
