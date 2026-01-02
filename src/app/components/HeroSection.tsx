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
    /* 1. Controlled Height: 70vh is a "sweet spot" for modern landing pages */
    <section className="relative h-[70vh] min-h-[600px] overflow-hidden bg-black">
      {/* Background image */}
  <img
  src={slides[active].image}
  alt="Hero"
  // Reduced from 40px to 15px for a much lighter shift
  className="absolute -top-[15px] left-0 w-full h-[calc(100%+15px)] object-cover transition-opacity duration-1000"
/>
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      
      {/* Content Container */}
      {/* 2. Added "items-end" and "pb-16" to seat the content lower in the section */}
      <div className="relative max-w-7xl mx-auto px-8 pb-16 h-full flex items-end">
        <div className="w-full">
          <div className="max-w-3xl mb-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white leading-tight">
  {/* First word/part */}
  <span className="block">
    {slides[active].title.split("//")[0]}
  </span>
  
  {/* Second word/part + the // bars at the end */}
  <span className="text-white">
    {slides[active].title.split("//")[1]}
    <span className="text-cyan-400 ml-3">//</span>
  </span>
</h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
              {slides[active].subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/register")}
                className="px-8 py-3 rounded-lg font-bold bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-8 py-3 rounded-lg font-bold border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition-all"
              >
                Login
              </button>
            </div>
          </div>

          {/* 3. Larger Thumbnails: Increased width and height significantly */}
          <div className="flex gap-4 items-center">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`relative h-20 w-32 rounded-lg transition-all duration-500 overflow-hidden border-2 ${
                  active === index
                    ? "border-cyan-400 scale-110 z-10 shadow-[0_0_25px_rgba(34,211,238,0.5)]"
                    : "border-transparent opacity-50 hover:opacity-100 hover:scale-105"
                }`}
              >
                <img
                  src={slides[index].image}
                  alt="thumb"
                  className="h-full w-full object-cover"
                />
                {/* Overlay on inactive thumbs to keep them dark */}
                {active !== index && <div className="absolute inset-0 bg-black/40" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};