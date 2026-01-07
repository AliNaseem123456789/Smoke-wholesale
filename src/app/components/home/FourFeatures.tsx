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
    // Removed bg-gray-100 to make the background clean white
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.link)}
              /* aspect-[2/1] ensures all cards are the same wide rectangular shape.
                overflow-hidden ensures nothing spills out.
              */
              className="group relative aspect-[2/1] w-full overflow-hidden border border-gray-200 cursor-pointer transition-all hover:border-cyan-500 hover:shadow-xl"
            >
              <img
                src={item.image}
                alt=""
                /* w-full h-full + object-fill: Forces the image to fit the box exactly.
                  If you prefer not to stretch the image, use object-cover.
                */
                className="absolute inset-0 w-full h-full object-fill transition-transform duration-500 group-hover:scale-105"
              />

              {/* Light overlay on hover */}
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FourFeatureSection;