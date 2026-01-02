import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { Breadcrumbs } from './components/Breadcrumbs'; // <-- new
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import TopWarningMarquee from './components/TopWarningMarquee';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';
import { ScrollToTop } from './components/ScrollTOTOp';
// Pages
import { HomePage } from './pages/HomePage';
import { BrandProductsPage } from './pages/BrandProductsPage';
import { CategoryProductsPage } from './pages/CategoryProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { CartPage } from './pages/CartPage';
import { ContactPage } from './pages/ContactPage';
import { BrandList } from './pages/Brandlist';

/* -------------------- WRAPPERS -------------------- */

// Brand products wrapper
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

// Category products wrapper ✅
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
    <AuthProvider>
      <CartProvider>
        <Router>
           <ScrollToTop />
          <Header />

          <main className="flex-1">
            {/* <Breadcrumbs /> Add breadcrumb here */}
            <Routes>
              <Route path="/" element={<HomePage />} />

              {/* Brand */}
              <Route
                path="/brand/:brandName"
                element={<BrandProductsPageWrapper />}
              />

              {/* Category ✅ */}
              <Route
                path="/category/:categoryName"
                element={<CategoryProductsPageWrapper />}
              />

              
              <Route path="/product/:id" element={<ProductDetailPage />} />

              {/* Auth */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />

              {/* Other pages */}
              <Route path="/cart" element={<CartPage />} />
              <Route path="/contact" element={<ContactPage />} />
             
              <Route path="/brand" element={<BrandList />} />
            </Routes>
          </main>

          <Footer />
          <Toaster position="top-center" richColors />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
