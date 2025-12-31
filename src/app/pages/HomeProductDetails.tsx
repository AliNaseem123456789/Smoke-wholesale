import React, { useState } from 'react';
import { getProductById, getSuggestedProducts } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { TriangleAlert, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';

interface HomeProductDetailPageProps {
  productId: string;
  onNavigate: (page: string, params?: any) => void;
}

export const HomeProductDetailPage: React.FC<HomeProductDetailPageProps> = ({
  productId,
  onNavigate
}) => {
  const product = getProductById(productId);
  const suggestedProducts = getSuggestedProducts(productId);
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const [selectedFlavor, setSelectedFlavor] = useState<string>(
    product?.flavors?.[0] || ''
  );
  const [quantity, setQuantity] = useState<number>(10);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h2>
          <button
            onClick={() => onNavigate('home')}
            className="text-blue-600 hover:text-blue-700"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // mock gallery
  const images = [product.image, product.image, product.image];

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleRequestQuote = () => {
    if (!isAuthenticated) {
      toast.error('Please login to request a quote');
      onNavigate('login');
      return;
    }

    if (product.flavors?.length && !selectedFlavor) {
      toast.error('Please select a flavor');
      return;
    }

    addToCart(product, quantity, selectedFlavor || undefined);
    toast.success(`Added ${quantity} units to your quote request!`);
  };

  const handleProductClick = (clickedProduct: any) => {
    onNavigate('product', { productId: clickedProduct.id });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Back */}
        <button
          onClick={() => onNavigate('home')}
          className="text-blue-600 hover:text-blue-700 mb-6 flex items-center gap-2"
        >
          ← Back to Products
        </button>

        {/* Product */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="grid md:grid-cols-2 gap-8 p-8">

            {/* Images */}
            <div>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index
                        ? 'border-blue-600'
                        : 'border-transparent'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <div className="text-sm text-blue-600 font-semibold mb-2 uppercase">
                {product.brand}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Warning */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex gap-3">
                <TriangleAlert className="w-5 h-5 text-yellow-600 mt-0.5" />
                <p className="text-sm text-yellow-800">
                  <strong>Warning:</strong> This product contains nicotine.
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-6">{product.description}</p>

              {/* Flavors */}
              {product.flavors?.length > 0 && (
                <div className="mb-6">
                  <h2 className="font-semibold mb-3">Select Flavor</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {product.flavors.map((flavor) => (
                      <button
                        key={flavor}
                        onClick={() => setSelectedFlavor(flavor)}
                        className={`px-4 py-2 rounded-lg border-2 ${
                          selectedFlavor === flavor
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200'
                        }`}
                      >
                        {flavor}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <h2 className="font-semibold mb-3">Wholesale Quantity</h2>
                <div className="flex items-center gap-4">
                  <button onClick={() => handleQuantityChange(-10)}>
                    <Minus />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, Number(e.target.value)))
                    }
                    className="w-24 text-center border rounded-lg"
                  />
                  <button onClick={() => handleQuantityChange(10)}>
                    <Plus />
                  </button>
                </div>
              </div>

              {/* Price */}
              {isAuthenticated ? (
                <div className="mb-6">
                  <div className="text-3xl font-bold">
                    ${product.price.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">
                    Total: ${(product.price * quantity).toFixed(2)}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                  🔒 Login to view wholesale price
                </div>
              )}

              {/* CTA */}
              <button
                onClick={handleRequestQuote}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold"
              >
                Request Quote
              </button>
            </div>
          </div>
        </div>

        {/* Suggested */}
        {suggestedProducts.length > 0 && (
          <section className="py-8">
            <h2 className="text-2xl font-bold mb-6">
              Suggested Products
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {suggestedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onClick={handleProductClick}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
