import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TriangleAlert, Plus, Minus, Lock, ArrowLeft } from "lucide-react";
import { useProductDetail } from "../hooks/useProductDetails";
import { useAuth } from "../../auth/context/AuthContext";
import { AddToCartButton } from "../components/AddToCartButton";

/* ---------------- HELPERS ---------------- */

const POSSIBLE_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];
const MAX_IMAGES = 5;
const PLACEHOLDER_IMAGE = "/product-placeholder.png";

const getFolderName = (title: string) =>
  title
    .trim()
    .replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200D\uFEFF]/g, "")
    .replace(/\s+/g, "_")
    .replace(/[()&%#.+,!\/]/g, "_");

const generateImageUrls = (productTitle: string) => {
  const folder = getFolderName(productTitle);
  const urls: string[] = [];
  for (let i = 1; i <= MAX_IMAGES; i++) {
    for (const ext of POSSIBLE_EXTENSIONS) {
      urls.push(`/product-images/${folder}/${i}.${ext}`);
    }
  }
  return urls;
};

/* ---------------- COMPONENT ---------------- */

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Hooks
  const { product, loading, error } = useProductDetail(id);
  const { user, loading: authLoading } = useAuth();

  // Local State
  const [selectedFlavor, setSelectedFlavor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  useEffect(() => {
    if (!product) return;
    setSelectedFlavor(product.flavors?.[0] || "");
    setImages(generateImageUrls(product.title));
    setSelectedImage(0);
  }, [product]);

  /* ---------- Handlers ---------- */
  const handleImageError = (index: number) => {
    if (index + 1 < images.length) {
      setSelectedImage(index + 1);
    }
  };

  const handleThumbnailError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const parent = e.currentTarget.parentElement;
    if (parent) parent.style.display = "none";
  };

  /* ---------- Render States ---------- */
  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-medium">Loading Product...</p>
        </div>
      </div>
    );
  }

  if (error)
    return (
      <div className="p-6 min-h-screen text-red-600 bg-gray-50">{error}</div>
    );
  if (!product) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 mb-6 hover:text-blue-800 transition-colors font-medium"
        >
          <ArrowLeft size={18} /> Back to Products
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 grid md:grid-cols-2 gap-12">
          {/* LEFT: IMAGE GALLERY */}
          <div>
            <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100 mb-4">
              <img
                src={images[selectedImage] || PLACEHOLDER_IMAGE}
                alt={product.title}
                onError={() => handleImageError(selectedImage)}
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>

            <div className="flex gap-3 flex-wrap">
              {images.slice(0, 10).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-16 border-2 rounded-lg overflow-hidden transition-all ${
                    selectedImage === idx
                      ? "border-blue-600 scale-105"
                      : "border-gray-100 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title} thumb`}
                    onError={handleThumbnailError}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: PRODUCT DETAILS */}
          <div className="flex flex-col">
            <div className="mb-6">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
                {product.brand}
              </p>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                {product.title}
              </h1>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                <TriangleAlert className="text-amber-600 shrink-0" size={20} />
                <p className="text-sm text-amber-900 leading-snug">
                  <strong>Nicotine Warning:</strong> This product contains
                  nicotine. Nicotine is an addictive chemical.
                </p>
              </div>
            </div>

            <div className="space-y-6 flex-1">
              {product.description && (
                <p className="text-gray-600 leading-relaxed italic border-l-4 border-gray-100 pl-4">
                  "{product.description}"
                </p>
              )}

              {product.flavors && product.flavors.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                    Select Flavor
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.flavors.map((flavor) => (
                      <button
                        key={flavor}
                        onClick={() => setSelectedFlavor(flavor)}
                        className={`px-4 py-2 text-sm font-medium border rounded-lg transition-all ${
                          selectedFlavor === flavor
                            ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100"
                            : "bg-white border-gray-200 text-gray-600 hover:border-gray-400"
                        }`}
                      >
                        {flavor}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* PURCHASE SECTION */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              {user ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 uppercase text-sm tracking-wide">
                      Select Quantity
                    </h3>
                    <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-xl border border-gray-200">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="text-xl font-black w-8 text-center text-gray-900">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>

                  <AddToCartButton
                    productId={Number(product.id)}
                    quantity={quantity}
                  />
                </div>
              ) : (
                <div className="bg-gray-900 rounded-2xl p-6 text-white shadow-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Lock size={20} className="text-blue-400" />
                    </div>
                    <span className="font-bold text-lg">
                      Wholesale Pricing Restricted
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    Access to pricing and quote requests is restricted to
                    registered wholesale partners. Please sign in to proceed.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => navigate("/login")}
                      className="bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold transition-all"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => navigate("/register")}
                      className="bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-bold border border-white/10 transition-all"
                    >
                      Register
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
