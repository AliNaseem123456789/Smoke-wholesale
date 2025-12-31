import { useState } from "react";
import { SECONDARY_NAV_DATA } from "./secondaryNavbarData";
import { useNavigate } from "react-router-dom";

const SecondaryNavbar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const activeCategory =
    activeIndex !== null ? SECONDARY_NAV_DATA[activeIndex] : null;

  const isSingleColumn =
    activeCategory?.title === "Devices / Pods / Coils / Tanks";

  const isSmokeShop = activeCategory?.title === "Smoke Shop";

  const handleItemClick = (value: string) => {
    if (isSmokeShop) {
      navigate(`/category/${encodeURIComponent(value)}`);
    } else {
      navigate(`/brand/${encodeURIComponent(value)}`);
    }
    setActiveIndex(null);
  };

  return (
    <div className="relative" style={{ backgroundColor: "rgba(0,0,0,1)" }}>
     <div className="max-w-7xl mx-auto px-6 py-1 flex justify-center">

        <ul className="flex gap-6 text-md font-semibold uppercase tracking-wide text-gray-100">
          {SECONDARY_NAV_DATA.map((category, index) => (
            <li
              key={category.title}
              className="relative py-3 cursor-pointer hover:text-gray-300 transition-colors"
              onMouseEnter={() => setActiveIndex(index)}
            >
              {category.title}

              {/* SINGLE COLUMN DROPDOWN */}
              {activeCategory &&
                activeIndex === index &&
                isSingleColumn && (
                  <div
                    className="absolute left-0 top-full mt-2 w-64 bg-black border border-gray-700 shadow-md z-50"
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    <ul className="p-2 space-y-1">
                      {activeCategory.brands.map((item) => (
                        <li
                          key={item}
                          className="px-3 py-2 text-sm font-medium text-gray-200 border border-gray-700 rounded hover:bg-gray-800 cursor-pointer transition-colors"
                          onClick={() => handleItemClick(item)}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </li>
          ))}

          <li className="py-3 cursor-pointer text-gray-100 hover:text-gray-300 transition-colors">
            Nicotine Pouches
          </li>
        </ul>
      </div>

      {/* WIDE DROPDOWN */}
      {activeCategory && !isSingleColumn && (
        <div
          className="absolute left-0 top-full w-full bg-black border-t border-gray-700 shadow-lg z-40"
          onMouseLeave={() => setActiveIndex(null)}
        >
          <div className="max-w-7xl mx-auto px-4 py-4">
            <ul className="grid grid-cols-4 gap-4">
              {activeCategory.brands.map((item) => (
                <li
                  key={item}
                  className="px-3 py-2 text-sm font-medium text-gray-200 border border-gray-700 rounded hover:bg-gray-800 cursor-pointer transition-colors"
                  onClick={() => handleItemClick(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecondaryNavbar;
