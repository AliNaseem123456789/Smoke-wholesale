import React from "react";
import { useNavigate } from "react-router-dom";

interface FeatureItem {
  image: string;
  link: string;
}

const features: FeatureItem[] = [
  { image: "/logos/banner1.jpg", link: "/category/liquor" },
  { image: "/logos/banner2.jpg", link: "/category/tobacco" },
  { image: "/logos/banner3.jpg", link: "/category/cannabis" },
  { image: "/logos/banner4.jpg", link: "/category/snacks" },
];

const FourFeatureSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-10 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* 2x2 IMAGE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.link)}
              className="group relative h-56 md:h-64 overflow-hidden border border-gray-200 cursor-pointer transition-all hover:border-cyan-500 hover:shadow-[0_12px_45px_rgba(0,0,0,0.18)]"
            >
              <img
                src={item.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Optional dark overlay on hover (remove if not needed) */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FourFeatureSection;
