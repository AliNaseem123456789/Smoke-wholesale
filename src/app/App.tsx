import React from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";

import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Toaster } from "./components/ui/sonner";
import { ScrollToTop } from "./components/layout/ScrollToTop";

// Pages
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { RegistrationPage } from "../features/auth/pages/RegistrationPage";
import { CartPage } from "./pages/CartPage";
import { ContactPage } from "./pages/ContactPage";
import FAQ from "./pages/FAQ";

import { BrandProductsPage } from "../features/products/pages/BrandProductsPage";
import { CategoryProductsPage } from "../features/products/pages/CategoryProductsPage";
import { ProductDetailPage } from "../features/products/pages/ProductDetailPage";
import { BrandList } from "../features/products/pages/BrandList";

import Testcart from "../features/products/pages/testCart";
/* -------------------- WRAPPERS -------------------- */

const BrandProductsPageWrapper = () => {
  const { brandName } = useParams();
  const navigate = useNavigate();

  if (!brandName) return null;

  return (
    <BrandProductsPage
      brandName={decodeURIComponent(brandName)}
      onNavigate={navigate}
    />
  );
};

const CategoryProductsPageWrapper = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  if (!categoryName) return null;

  return (
    <CategoryProductsPage
      categoryName={decodeURIComponent(categoryName)}
      onNavigate={navigate}
    />
  );
};

/* -------------------- APP -------------------- */

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/brand/:brandName"
            element={<BrandProductsPageWrapper />}
          />
          <Route
            path="/category/:categoryName"
            element={<CategoryProductsPageWrapper />}
          />
          <Route path="/product/:id" element={<ProductDetailPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />

          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route path="/brand" element={<BrandList />} />
          <Route path="/FAQ" element={<FAQ />} />

          <Route path="testcart" element={<Testcart />} />
        </Routes>
      </main>

      <Footer />
      <Toaster position="top-center" richColors />
    </>
  );
}

export default App;
