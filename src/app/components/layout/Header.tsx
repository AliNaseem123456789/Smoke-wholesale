import React, { useEffect, useState } from "react";
import { ShoppingCart, Home, Sun, Moon, User } from "lucide-react";
import { useAuth } from "../../../features/auth/context/AuthContext";
// import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import SecondaryNavbar from "./SecondaryNavbar";
import TopWarningMarquee from "./TopWarningMarquee";

export const Header: React.FC = () => {
  const { user, logout, loading } = useAuth();
  const isAuthenticated = !!user;

  // const { getItemCount } = useCart();
  const navigate = useNavigate();

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return (localStorage.getItem("theme") as "light" | "dark") || "dark";
  });

  /* ---------------- THEME HANDLING ---------------- */

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  /* ---------------- AUTH LOADING GUARD ---------------- */

  if (loading) return null;

  return (
    <>
      <TopWarningMarquee />

      {/* ================= DESKTOP HEADER ================= */}
      <header className="sticky top-0 z-50 hidden md:block">
        <div
          className="relative h-20 flex items-center"
          style={{
            backgroundImage: "url('/logos/galaxy.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <div className="relative max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
            {/* Logo */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <span className="text-2xl font-extrabold text-cyan-400">
                Soota
              </span>
              <span className="text-sm text-white tracking-wide">
                Smoke Shop
              </span>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="p-2 text-cyan-400 hover:bg-cyan-400/20 rounded-md"
              >
                <Home />
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="relative p-2 border border-cyan-400 text-cyan-400 rounded-md"
              >
                <ShoppingCart />
                {/* {getItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-cyan-400 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {getItemCount()}
                  </span>
                )} */}
              </button>

              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => navigate("/register")}
                    className="px-4 py-2 border border-pink-500 text-pink-400 rounded-md"
                  >
                    Register
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className="px-4 py-2 border border-pink-500 text-pink-400 rounded-md"
                  >
                    Login
                  </button>
                </>
              ) : (
                <button
                  onClick={async () => {
                    await logout();
                    navigate("/");
                  }}
                  className="px-4 py-2 border border-pink-500 text-pink-400 rounded-md"
                >
                  Logout
                </button>
              )}

              <button
                onClick={toggleTheme}
                className="p-2 border border-cyan-400 text-cyan-400 rounded-md"
              >
                {theme === "dark" ? <Sun /> : <Moon />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <SecondaryNavbar />

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black/90 backdrop-blur-lg border-t border-cyan-400">
        <div className="flex justify-around items-center py-2">
          <button
            onClick={() => navigate("/")}
            className="flex flex-col items-center text-cyan-400"
          >
            <Home size={22} />
            <span className="text-xs">Home</span>
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="relative flex flex-col items-center text-cyan-400"
          >
            <ShoppingCart size={22} />
            <span className="text-xs">Cart</span>
            {/* {getItemCount() > 0 && (
              <span className="absolute -top-1 right-3 bg-cyan-400 text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {getItemCount()}
              </span>
            )} */}
          </button>

          {!isAuthenticated ? (
            <button
              onClick={() => navigate("/login")}
              className="flex flex-col items-center text-pink-400"
            >
              <User size={22} />
              <span className="text-xs">Login</span>
            </button>
          ) : (
            <button
              onClick={async () => {
                await logout();
                navigate("/");
              }}
              className="flex flex-col items-center text-pink-400"
            >
              <User size={22} />
              <span className="text-xs">Logout</span>
            </button>
          )}

          <button
            onClick={toggleTheme}
            className="flex flex-col items-center text-cyan-400"
          >
            {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
            <span className="text-xs">Theme</span>
          </button>
        </div>
      </nav>
      <div className="h-16 md:hidden" />
    </>
  );
};
