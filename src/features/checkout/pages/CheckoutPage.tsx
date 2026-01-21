import React, { useState, useEffect } from "react";
import {
  MapPin,
  ShoppingBag,
  CreditCard,
  Loader2,
  CheckCircle,
  Package,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE =
  "https://smoke-wholesale-backend-production.up.railway.app//api";

export const CheckoutPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [addrRes, cartRes] = await Promise.all([
          axios.get(`${API_BASE}/address`, { withCredentials: true }),
          axios.get(`${API_BASE}/cart`, { withCredentials: true }),
        ]);

        // Defensive check for nested data
        setAddresses(addrRes.data.data || addrRes.data || []);
        setCartItems(cartRes.data.data || cartRes.data || []);

        const dataArray = addrRes.data.data || addrRes.data || [];
        const defaultAddr = dataArray.find((a: any) => a.is_default);
        if (defaultAddr) setSelectedAddressId(defaultAddr.id);
      } catch (err) {
        console.error("Error loading checkout data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- SAFE CALCULATIONS ---
  // Using Number() and || 0 ensures we never calculate with 'undefined'
  const subtotal = cartItems.reduce((acc, item: any) => {
    const unitPrice = Number(item.products?.price || 0);
    return acc + unitPrice * item.quantity;
  }, 0);

  const shipping = 10.0;
  const total = subtotal + shipping;

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) return alert("Please select a shipping address");

    setIsPlacingOrder(true);
    try {
      await axios.post(
        `${API_BASE}/orders/checkout`,
        {
          shipping_address_id: selectedAddressId,
          billing_address_id: selectedAddressId,
          business_name: "",
        },
        { withCredentials: true },
      );
      navigate("/account?tab=orders", { state: { orderSuccess: true } });
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to place order.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-blue-600 w-10 h-10 mb-4" />
        <p className="text-gray-500 font-medium">Preparing your checkout...</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-3 bg-blue-600 rounded-2xl text-white">
          <ShoppingBag size={24} />
        </div>
        <h1 className="text-4xl font-black text-gray-900">Secure Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          {/* 1. SHIPPING ADDRESS */}
          <section className="bg-white border border-gray-200 rounded-[32px] p-8 shadow-sm">
            <h3 className="text-xl font-black mb-6 flex items-center gap-3">
              <MapPin className="text-blue-600" /> 1. Shipping Address
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((addr: any) => (
                <div
                  key={addr.id}
                  onClick={() => setSelectedAddressId(addr.id)}
                  className={`relative p-5 border-2 rounded-2xl cursor-pointer transition-all duration-200 ${
                    selectedAddressId === addr.id
                      ? "border-blue-600 bg-blue-50/50"
                      : "border-gray-100 hover:border-gray-300 bg-gray-50/30"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-bold text-gray-900">{addr.full_name}</p>
                    {selectedAddressId === addr.id && (
                      <CheckCircle size={20} className="text-blue-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {addr.address_line1}
                    <br />
                    {addr.city}, {addr.state} {addr.postal_code}
                  </p>
                </div>
              ))}
              {addresses.length === 0 && (
                <button
                  onClick={() => navigate("/account?tab=addresses")}
                  className="border-2 border-dashed border-gray-200 rounded-2xl p-5 text-gray-500 hover:text-blue-600 text-sm font-bold"
                >
                  + Add New Address
                </button>
              )}
            </div>
          </section>

          {/* 2. PAYMENT METHOD */}
          <section className="bg-white border border-gray-200 rounded-[32px] p-8 shadow-sm">
            <h3 className="text-xl font-black mb-6 flex items-center gap-3">
              <CreditCard className="text-blue-600" /> 2. Payment Method
            </h3>
            <div className="p-6 bg-gray-900 rounded-2xl flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center font-bold text-[10px]">
                  CASH
                </div>
                <p className="font-bold">Cash on Delivery</p>
              </div>
              <span className="text-blue-400 text-xs font-black uppercase tracking-widest">
                Active
              </span>
            </div>
          </section>
        </div>

        {/* SUMMARY SECTION */}
        <div className="lg:col-span-4">
          <div className="bg-gray-50 border border-gray-200 rounded-[32px] p-8 sticky top-8">
            <h3 className="text-xl font-black mb-8 flex items-center gap-2">
              <Package size={20} /> Summary
            </h3>

            <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2">
              {cartItems.map((item: any) => {
                const itemPrice = Number(item.products?.price || 0);
                return (
                  <div
                    key={item.id}
                    className="flex justify-between items-center gap-4"
                  >
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-sm">
                        {item.products?.title || "Item"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.quantity} × ${itemPrice.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-bold text-gray-900">
                      ${(itemPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="font-medium">Shipping</span>
                <span className="font-bold">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-2xl font-black pt-4 text-gray-900 border-t border-gray-200 mt-4">
                <span>Total</span>
                <span className="text-blue-600">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={
                isPlacingOrder || !selectedAddressId || cartItems.length === 0
              }
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-5 rounded-2xl font-black text-lg mt-10 transition-all flex items-center justify-center gap-2 shadow-xl"
            >
              {isPlacingOrder ? (
                <>
                  <Loader2 className="animate-spin" /> Processing...
                </>
              ) : (
                "Complete Purchase"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
