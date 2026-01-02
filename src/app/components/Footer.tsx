import React from "react";
import { Link } from "react-router-dom"; // ✅ React Router Link

export const Footer: React.FC = () => {
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

      {/* ⚪ Main Footer */}
      <div className="bg-white dark:bg-gray-900 px-6 py-14 text-gray-900 dark:text-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* About / Company */}
          <div>
            <h4 className="text-sm font-bold tracking-wide mb-2 text-[#361A49] dark:text-[#bdb1e5]">
              SOOTA SMOKE SHOP
            </h4>
            <p className="text-sm font-semibold mb-2">Exceeding The Expectations</p>
            <p className="text-sm leading-relaxed mb-3">
              We are an authorized wholesale smoke shop distributor offering a wide range of premium products across the United States.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-bold tracking-wide mb-3">NAVIGATION</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:underline">Homepage</Link>
              </li>
              <li>
                <Link to="/brand" className="hover:underline">Shop by Brands</Link>
              </li>
              <li>
                <Link to="/account" className="hover:underline">My Account</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:underline">FAQ</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Stay Connected */}
          <div>
            <h4 className="text-sm font-bold tracking-wide mb-3">STAY CONNECTED</h4>
            <p className="text-sm mb-3">
              Sign up for our mailing list for exclusive discounts, sales & news!
            </p>
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 outline-none bg-transparent"
              />
              <button className="px-4 py-2 text-sm bg-[#361A49] text-white hover:bg-[#2a1434]">
                Subscribe
              </button>
            </div>
          </div>

          {/* Contact Info from your first Footer */}
          <div>
            <h4 className="text-sm font-bold tracking-wide mb-3">CONTACT US</h4>
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

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 dark:border-gray-700 mt-8 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Soota Smoke Shop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
