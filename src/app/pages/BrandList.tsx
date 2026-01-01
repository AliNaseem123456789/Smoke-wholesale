import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Brand {
  id: string;
  name: string;
}

export const BrandList: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products/display');
        const json = await res.json();
        setBrands(json.data); // your data is in json.data
      } catch (err) {
        console.error('Error fetching brands:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const handleBrandClick = (brandName: string) => {
    navigate(`/brand/${encodeURIComponent(brandName)}`);
  };

  if (loading) return <p>Loading brands...</p>;
  if (!brands.length) return <p>No brands found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {brands.map((brand) => (
        <div
          key={brand.id}
          className="p-4 border rounded shadow cursor-pointer hover:bg-gray-800 hover:text-white transition-all"
          onClick={() => handleBrandClick(brand.name)}
        >
          <h2 className="font-bold text-lg">{brand.name}</h2>
        </div>
      ))}
    </div>
  );
};


// as