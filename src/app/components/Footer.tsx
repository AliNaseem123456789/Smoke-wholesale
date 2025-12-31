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
                <button onClick={() => onNavigate?.("home")} className="hover:underline">Homepage</button>
              </li>
              <li>
                <button onClick={() => onNavigate?.("brands")} className="hover:underline">Shop by Brands</button>
              </li>
              <li>
                <button onClick={() => onNavigate?.("account")} className="hover:underline">My Account</button>
              </li>
              <li>
                <button onClick={() => onNavigate?.("faq")} className="hover:underline">FAQ</button>
              </li>
              <li>
                <button onClick={() => onNavigate?.("contact")} className="hover:underline">Contact Us</button>
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

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold tracking-wide mb-3">CONTACT US</h4>
            <p className="text-sm mb-1">Email: support@sootasmokeshop.com</p>
            <p className="text-sm mb-1">Phone: (800) 766-8297</p>
            <p className="text-sm mb-2">
              123 Wholesale Blvd<br />
              Commerce City, CA 90001
            </p>
            <p className="text-sm font-semibold">
              Hours: <span className="font-normal">Mon–Sat | 8:00 am – 7:00 pm</span>
            </p>
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
