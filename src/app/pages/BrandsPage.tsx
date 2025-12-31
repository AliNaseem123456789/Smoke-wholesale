import React from 'react';
import { useNavigate } from 'react-router-dom';
import { brands, categories, getProductsByBrand } from '../data/mockData';

export const BrandsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBrandClick = (brandName: string) => {
    navigate(`/brand/${brandName}`);
  };

  const groupedBrands = categories
    .map(category => ({
      category,
      brands: brands.filter(b => b.category === category.id)
    }))
    .filter(group => group.brands.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/')}
          className="text-blue-600 hover:text-blue-700 mb-6 flex items-center gap-2"
        >
          ← Back to Home
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Brands</h1>
          <p className="text-lg text-gray-600">
            Browse our extensive collection of premium wholesale brands
          </p>
        </div>

        <div className="space-y-12">
          {groupedBrands.map(({ category, brands: categoryBrands }) => (
            <div key={category.id}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.name}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {categoryBrands.map((brand) => {
                  const productCount = getProductsByBrand(brand.name).length;
                  return (
                    <button
                      key={brand.id}
                      onClick={() => handleBrandClick(brand.name)}
                      className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-600 hover:shadow-lg transition-all group"
                    >
                      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-3">
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                        {brand.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {productCount} {productCount === 1 ? 'product' : 'products'}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* All Brands List */}
        <div className="mt-16 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Brands A-Z</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {brands
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => handleBrandClick(brand.name)}
                  className="text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {brand.name}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
