import React from "react";
import { useNavigate } from "react-router-dom";
import { features } from "../../data/fourfeaturesdata";
const FourFeatureSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.link)}
              className="group relative aspect-[2/1] w-full overflow-hidden border border-gray-200 cursor-pointer transition-all hover:border-cyan-500 hover:shadow-xl"
            >
              <img
                src={item.image}
                alt=""
                className="absolute inset-0 w-full h-full object-fill transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FourFeatureSection;