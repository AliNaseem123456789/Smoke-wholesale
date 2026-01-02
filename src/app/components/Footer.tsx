import React from "react";

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full">

      {/* 🔴 Newsletter Section with Galaxy Background + Overlay */}
      <div
        className="relative text-white px-6 py-6"
        style={{
          backgroundImage: "url('/logos/galaxy.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay + Blur */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Text Section */}
          <div className="flex flex-col justify-center">
            <p className="text-sm opacity-90 mb-2">
              Unbeatable Deals, Endless Choices – Shop Now!
            </p>
            <h2 className="text-4xl font-bold">
              Shop Smarter, Save Bigger!
            </h2>
          </div>

          {/* Right Images */}
          <div className="flex gap-4 justify-center md:justify-end">
            <img src="/logos/footer1.jpg" alt="Footer 1" className="w-44 h-44 object-cover rounded-lg shadow-lg" />
            <img src="/logos/footer2.jpg" alt="Footer 2" className="w-44 h-44 object-cover rounded-lg shadow-lg" />
            <img src="/logos/footer3.jpg" alt="Footer 3" className="w-44 h-44 object-cover rounded-lg shadow-lg" />
            <img src="/logos/footer4.jpg" alt="Footer 4" className="w-44 h-44 object-cover rounded-lg shadow-lg" />
          </div>

        </div>
      </div>

 {/* ⚪ Main Footer Section - Tighter Spacing */}
      <div className="bg-[#f8f8f8] px-6 py-8 text-[#333]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-6">
          
          {/* Column 1: Brand */}
          <div className="space-y-2">
            <div>
              <h3 className="text-xl font-black tracking-tighter uppercase">SOOTA SMOKE</h3>
              <p className="text-xs font-bold uppercase">Exceeding The Expectations</p>
            </div>
            <p className="text-sm leading-snug text-gray-700 max-w-xs">
              We are an authorized wholesale vape distributor of thousands of e-liquids and vaping devices based in New York.
            </p>
            <div className="pt-1">
              <div className="border border-yellow-400 rounded-md p-1 px-2 inline-flex items-center gap-2 bg-white scale-90 origin-left">
                 <span className="text-blue-900 font-bold text-[9px] uppercase italic leading-none">Secured by <br/><span className="text-sm normal-case">positiveSSL</span></span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-sm font-bold border-b border-gray-300 pb-1 mb-2 uppercase">Navigation</h4>
            <ul className="text-sm">
              <li className="py-1"><button onClick={() => onNavigate?.("home")} className="hover:text-gray-500">Homepage</button></li>
              <li className="py-1 border-t border-gray-200"><button onClick={() => onNavigate?.("trending")} className="hover:text-gray-500">Trending Products</button></li>
              <li className="py-1 border-t border-gray-200"><button onClick={() => onNavigate?.("account")} className="hover:text-gray-500">My Account</button></li>
              <li className="py-1 border-t border-gray-200"><button onClick={() => onNavigate?.("brands")} className="hover:text-gray-500">Shop by Brands</button></li>
              <li className="py-1 border-t border-gray-200"><button onClick={() => onNavigate?.("faq")} className="hover:text-gray-500">FAQ</button></li>
              <li className="py-1 border-t border-gray-200"><button onClick={() => onNavigate?.("contact")} className="hover:text-gray-500">Contact Us</button></li>
            </ul>
          </div>

          {/* Column 3: Stay Connected */}
          <div>
            <h4 className="text-sm font-bold border-b border-gray-300 pb-1 mb-2 uppercase">Stay Connected</h4>
            <p className="text-sm mb-3">Exclusive discounts, sales & news!</p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full border border-gray-300 p-2 text-sm bg-white focus:outline-none"
              />
              <button className="w-full bg-[#360542] text-white py-2 text-sm font-bold hover:bg-black transition-colors">
                Subscribe
              </button>
            </div>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h4 className="text-sm font-bold border-b border-gray-300 pb-1 mb-2 uppercase">Contact Us</h4>
            <div className="space-y-2 text-sm">
              <p className="text-blue-600 truncate">support@sootasmoke.com</p>
              <p>(516) 485-4343</p>
              <p className="leading-tight">34 Nassau Blvd, Garden City, NY 11530</p>
              <div className="pt-1 space-y-2">
      <div className="flex items-center gap-2">
        <span className="font-medium text-[13px] inline-block w-[65px]">Mon-Sat:</span>
        <div className="flex items-center gap-1">
          <span className="bg-[#360542] text-white text-[10px] px-2 py-1 rounded font-mono">8:00 am</span>
          <span className="text-gray-400 text-xs">-</span>
          <span className="bg-[#360542] text-white text-[10px] px-2 py-1 rounded font-mono">9:00 pm</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="font-medium text-[13px] inline-block w-[65px]">Sunday:</span>
        <div className="flex items-center gap-1">
          <span className="bg-[#360542] text-white text-[10px] px-2 py-1 rounded font-mono">10:00 am</span>
          <span className="text-gray-400 text-xs">-</span>
          <span className="bg-[#360542] text-white text-[10px] px-2 py-1 rounded font-mono">8:00 pm</span>
        </div>
      </div>
    </div>
            </div>
          </div>

        </div>
      </div>

      {/* 🔞 Warning Disclaimer - Compact */}
      <div className="bg-white px-6 py-4 border-t border-gray-100">
        <div className="max-w-7xl mx-auto text-[11px] leading-tight text-gray-600 italic">
          <p>
            <span className="font-bold uppercase not-italic">Warning:</span> "This product contains nicotine which is a highly addictive substance. It is intended for use by existing smokers and vapors above legal age only. NOT FOR SALE TO MINORS. Do not use this product to treat any medical condition or habit. Stop use if you show any sensitivity. Please keep products out of reach of children. Use at your own risk."
          </p>
        </div>
      </div>

      {/* ⚖️ Bottom Copyright Bar - Slim */}
      <div className="bg-[#f8f8f8] border-t border-gray-200 py-3 px-6 text-center text-xs text-gray-500">
        © 2026 Soota Smoke Shop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;