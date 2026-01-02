import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Brand {
  id: string;
  name: string;
}

export const BrandList: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("http://localhost:5000/api/products/display");
        const json = await res.json();

        if (!res.ok) {
          setError(json.message || "Failed to fetch brands");
          return;
        }

        setBrands(json.data || []);
      } catch (err) {
        console.error("Error fetching brands:", err);
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const handleBrandClick = (brandName: string) => {
    // Navigate to the BrandProductsPage for this brand
    navigate(`/brand/${encodeURIComponent(brandName)}`);
  };

  /* -------------------------------------------
     UI States (like BrandProductsPage)
  ------------------------------------------- */
  if (loading)
    return (
      <div className="min-h-screen p-6 text-gray-500">
        Loading brands...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen p-6 text-red-500">
        {error}
      </div>
    );

  if (!brands.length)
    return (
      <div className="min-h-screen p-6 text-gray-400">
        No brands found.
      </div>
    );

  /* -------------------------------------------
     Render
  ------------------------------------------- */
  return (
    <div className="min-h-screen p-6 bg-white dark:bg-[#191919]">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-200">
        Available Brands
      </h1>

      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="cursor-pointer bg-white dark:bg-[#11172a] border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center justify-center
                         hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all"
              onClick={() => handleBrandClick(brand.name)}
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 truncate">
                {brand.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
