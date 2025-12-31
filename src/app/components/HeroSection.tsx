import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Slide {
  image: string;
  title: string;
  subtitle: string;
}

const slides: Slide[] = [
  {
    image: "/logos/banner5.jpeg",
    title: "FUTURE OF // WHOLESALE",
    subtitle: "Modern solutions. Rapid fulfillment. Unbeatable wholesale pricing."
  },
  {
    image: "/logos/banner6.jpeg",
    title: "SMART SUPPLY // NETWORK",
    subtitle: "Reliable sourcing. Scalable distribution."
  },
  {
    image: "/logos/banner7.jpeg",
    title: "POWERING // BUSINESSES",
    subtitle: "Built for speed, efficiency, and growth."
  },
  {
    image: "/logos/banner8.jpeg",
    title: "NEXT-GEN // LOGISTICS",
    subtitle: "Seamless operations from order to delivery."
  },
  {
    image: "/logos/banner9.jpeg",
    title: "WHOLESALE // REDEFINED",
    subtitle: "Technology-driven pricing advantages."
  }
];

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[85vh] overflow-hidden ">
      {/* Background image */}
      <img
        src={slides[active].image}
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-8 pt-24 h-full flex items-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white">
            {slides[active].title.split("//")[0]}
            <span className="text-cyan-400"> //</span>
            {slides[active].title.split("//")[1]}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10">
            {slides[active].subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-3 rounded-lg font-semibold bg-cyan-500 text-black dark:text-white hover:bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.6)] transition-all"
            >
              Register
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 rounded-lg font-semibold border border-pink-400 text-pink-400 hover:bg-pink-500 hover:text-black dark:hover:text-white shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all"
            >
              Login
            </button>
          </div>

          {/* Slide buttons */}
          <div className="flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`h-14 w-10 border rounded-md transition-all duration-300 overflow-hidden ${
                  active === index
                    ? "border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]"
                    : "border-white/30 opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={slides[index].image}
                  alt="thumb"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};