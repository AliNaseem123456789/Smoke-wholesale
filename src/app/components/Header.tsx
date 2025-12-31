import React, { useEffect, useState } from 'react';
import { ShoppingCart, Home, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import SecondaryNavbar from './SecondaryNavbar';
import TopWarningMarquee from './TopWarningMarquee';
export const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const { getItemCount } = useCart();
  const navigate = useNavigate();

  // --------- THEME STATE ---------
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  // -------------------------------

  return (
    <header className="sticky top-0 z-50">
      <TopWarningMarquee/>
      <div
        className="relative h-20 flex items-center"
        style={{
          backgroundImage: "url('/logos/galaxy.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        <div className="relative max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
          
          {/* LOGO */}
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-2xl font-extrabold text-cyan-400">Soota</span>
            <span className="text-sm text-white tracking-wide">Smoke Shop</span>
          </div>

          {/* SEARCH */}
          <div className="hidden md:block flex-1 mx-10">
            <div className="bg-white rounded-lg px-4 py-2 text-gray-400 dark:bg-gray-800 dark:text-gray-300">
              Search products...
            </div>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4">
            {/* HOME */}
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-md text-cyan-400 hover:bg-cyan-400/20 transition-all"
            >
              <Home className="w-6 h-6" />
            </button>

            {/* CART */}
            <button
              onClick={() => navigate('/cart')}
              className="relative p-2 rounded-md border border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)] hover:bg-cyan-400/20 transition-all"
            >
              <ShoppingCart className="w-6 h-6" />
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-cyan-400 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {getItemCount()}
                </span>
              )}
            </button>

            {/* AUTH BUTTONS */}
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate('/register')}
                  className="px-5 py-2 rounded-md border border-pink-500 text-pink-400 shadow-[0_0_18px_rgba(236,72,153,0.6)] hover:bg-pink-500 hover:text-black transition-all"
                >
                  Register
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="px-5 py-2 rounded-md border border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-black transition-all"
                >
                  Login
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="px-5 py-2 rounded-md border border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-black transition-all"
              >
                Logout
              </button>
            )}

            {/* THEME TOGGLE — MOVED TO END */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md border border-cyan-400 text-cyan-400 hover:bg-cyan-400/20 transition-all"
            >
              {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
            </button>
          </div>
        </div>
      </div>

      <SecondaryNavbar />
    </header>
  );
};
