import React from 'react';
import { Product } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}
export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div
      onClick={() => onClick(product)}
      className="bg-[#191919]  border border-gray-200 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-blue-400 group"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
            NEW
          </span>
        )}
        {product.isBestSeller && (
          <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
            BEST SELLER
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="text-xs text-blue-600 font-semibold mb-1 uppercase">
          {product.brand}
        </div>
        <h3 className="font-semibold text-white-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="mt-3">
          {isAuthenticated ? (
            <div className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
              <span className="text-xs text-gray-500 ml-1">/ unit</span>
            </div>
          ) : (
            <div className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded">
              🔒 Login to view wholesale price
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
