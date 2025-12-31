import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BrandProductsPage } from './pages/BrandProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { CartPage } from './pages/CartPage';
import { ContactPage } from './pages/ContactPage';
import { BrandsPage } from './pages/BrandsPage';
import { Toaster } from './components/ui/sonner';
import { BrandList } from './pages/Brandlist';
import { HomeProductDetailPage } from './pages/HomeProductDetails';
// Helper wrapper for pages needing navigation
const withNavigation = (Component: React.FC<{ onNavigate?: (path: string) => void }>) => {
  return (props: any) => {
    const navigate = useNavigate();
    return <Component {...props} onNavigate={navigate} />;
  };
};
// Wrapper to extract productId from params and pass to HomeProductDetailPage
const HomeProductDetailPageWrapper: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  if (!productId) return null; // optional safety
  return <HomeProductDetailPage productId={productId} onNavigate={navigate} />;
};

// Typed route params for Brand and Product pages
interface BrandParams {
  brandName: string;
}

interface ProductParams {
  productId: string;
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/brand/:brandName"
                element={
                  <BrandProductsPageWrapper />
                }
              />
              
              <Route
                path="/product1/:productId"
                element={
                  <HomeProductDetailPageWrapper />
                }
              />
              <Route path="/product/:id" element={<ProductDetailPage />} />

              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/brands" element={<BrandsPage />} />
              <Route path="/brandlist" element={<BrandList/>}/>
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-center" richColors />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

// Wrappers to extract typed params
const BrandProductsPageWrapper: React.FC = () => {
  const { brandName } = useParams<BrandParams>();
  const navigate = useNavigate();
  return <BrandProductsPage brandName={brandName} onNavigate={navigate} />;
};

const ProductDetailPageWrapper: React.FC = () => {
  const { productId } = useParams<ProductParams>();
  const navigate = useNavigate();
  return <ProductDetailPage productId={productId} onNavigate={navigate} />;
};

export default App;
