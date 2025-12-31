import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="col-span-1">
            <div className="text-2xl font-bold text-white mb-4">
              Soota <span className="text-blue-500">Smoke Shop</span>
            </div>
            <p className="text-sm mb-4">
              Your trusted wholesale partner for premium smoke shop products.
            </p>
            <div className="bg-yellow-900 text-yellow-200 text-xs p-3 rounded-lg">
              ⚠️ Age Restriction: 21+ Only
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('home')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('brands')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Brands
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contact')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('register')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Wholesale Registration
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button className="hover:text-blue-400 transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors">
                  Wholesale Agreement
                </button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors">
                  Return Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>wholesale@sootasmokeshop.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>1-800-SOOTA-WS</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>123 Wholesale Blvd, Commerce City, CA 90001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>&copy; {new Date().getFullYear()} Soota Smoke Shop. All rights reserved.</p>
            <p className="text-yellow-400 font-semibold">Wholesale Only - Business Accounts Required</p>
          </div>
        </div>

        {/* Wholesale Disclaimer */}
        <div className="mt-6 p-4 bg-gray-800 rounded-lg text-xs text-gray-400">
          <p className="mb-2">
            <strong className="text-gray-300">Wholesale Notice:</strong> All prices and products on this website are available to licensed wholesale buyers only. 
            A valid business license and tax ID are required for registration.
          </p>
          <p>
            <strong className="text-gray-300">Warning:</strong> Products sold on this website may contain nicotine. 
            Nicotine is an addictive chemical. Products are intended for adult use only (21+).
          </p>
        </div>
      </div>
    </footer>
  );
};
