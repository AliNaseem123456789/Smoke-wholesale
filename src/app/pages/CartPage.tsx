import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface CartPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const handleSubmitQuote = () => {
    if (!isAuthenticated) {
      toast.error('Please login to submit a quote request');
      onNavigate('login');
      return;
    }
    setIsSubmitting(true);
    // Simulate quote submission
    setTimeout(() => {
      toast.success('Quote request submitted successfully! We will contact you soon.');
      clearCart();
      setIsSubmitting(false);
      onNavigate('home');
    }, 1000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Quote Cart is Empty</h2>
            <p className="text-gray-600 mb-8">
              Add products to your cart to request a wholesale quote
            </p>
            <button
              onClick={() => onNavigate('home')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => onNavigate('home')}
            className="text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-2"
          >
            ← Continue Shopping
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Request Quote</h1>
          <p className="text-gray-600 mt-2">Review your items and submit for a wholesale quote</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.flavor || 'default'}`}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-xs text-blue-600 font-semibold uppercase">
                          {item.product.brand}
                        </div>
                        <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                        {item.flavor && (
                          <p className="text-sm text-gray-600">Flavor: {item.flavor}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.flavor)}
                        className="text-red-600 hover:text-red-700 p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 10, item.flavor)}
                          className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-gray-900 font-semibold w-16 text-center">
                          {item.quantity} units
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 10, item.flavor)}
                          className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      {isAuthenticated && (
                        <div className="text-right">
                          <div className="text-sm text-gray-600">
                            ${item.product.price.toFixed(2)} / unit
                          </div>
                          <div className="font-bold text-gray-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Quote Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quote Summary</h2>
              {isAuthenticated && user && (
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Business:</div>
                  <div className="font-semibold text-gray-900">{user.businessName}</div>
                  <div className="text-sm text-gray-600 mt-2">{user.email}</div>
                </div>
              )}

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Total Items:</span>
                  <span className="font-semibold">
                    {items.reduce((total, item) => total + item.quantity, 0)} units
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Product Lines:</span>
                  <span className="font-semibold">{items.length}</span>
                </div>
              </div>

              {isAuthenticated && (
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Estimated Total:</span>
                    <span className="text-2xl font-bold text-gray-900">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Final pricing may vary based on order volume and current promotions
                  </p>
                </div>
              )}

              {!isAuthenticated && (
                <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700">
                    🔒 Login to view pricing and submit quote request
                  </p>
                </div>
              )}

              <button
                onClick={handleSubmitQuote}
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
              </button>

              {!isAuthenticated && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => onNavigate('login')}
                    className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Login to Continue
                  </button>
                </div>
              )}

              <button
                onClick={() => {
                  if (confirm('Are you sure you want to clear your cart?')) {
                    clearCart();
                    toast.success('Cart cleared');
                  }
                }}
                className="w-full mt-3 text-red-600 hover:text-red-700 py-2 text-sm font-semibold"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
