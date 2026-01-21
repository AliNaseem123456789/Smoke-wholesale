import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { useAuth } from "../features/auth/context/AuthContext";
import { fetchCart, clearCart } from "../features/cart/redux/cartSlice";

import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Toaster } from "./components/ui/sonner";
import { ScrollToTop } from "./components/layout/ScrollToTop";

// Pages
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { RegistrationPage } from "../features/auth/pages/RegistrationPage";
import { CartPage } from "../features/cart/pages/CartPage";
import { ContactPage } from "./pages/ContactPage";
import FAQ from "./pages/FAQ";
import { AccountPage } from "../features/account/pages/AccountPage";

import { BrandProductsPage } from "../features/products/pages/BrandProductsPage";
import { CategoryProductsPage } from "../features/products/pages/CategoryProductsPage";
import { ProductDetailPage } from "../features/products/pages/ProductDetailPage";
import { BrandList } from "../features/products/pages/BrandList";

import { ProtectedRoute } from "../features/auth/components/ProtectedRoute";
import Testcart from "../features/products/pages/testCart";
import { CheckoutPage } from "../features/checkout/pages/CheckoutPage";

import { UserManagement } from "../features/admin/pages/UserManagement";
import { AdminRoute } from "../features/admin/components/AdminRoute";
import { ProductManagement } from "../features/admin/pages/ProductManagement";
import { AdminDashboard } from "../features/admin/pages/AdminDashboard";
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

function App() {
  const { user } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
    } else {
      dispatch(clearCart());
    }
  }, [user, dispatch]);
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

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route path="/contact" element={<ContactPage />} />

          <Route path="/brand" element={<BrandList />} />
          <Route path="/FAQ" element={<FAQ />} />

          <Route path="testcart" element={<Testcart />} />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            }
          />
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
          <Route
            path="/admin-product-management"
            element={<ProductManagement />}
          />
        </Routes>
      </main>

      <Footer />
      <Toaster position="top-center" richColors />
    </>
  );
}
export default App;
