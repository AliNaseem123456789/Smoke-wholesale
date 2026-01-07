import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TriangleAlert, Plus, Minus } from "lucide-react";
import { useProductDetail } from "../hooks/useProductDetails";
import { Product } from "../types/product.types";

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

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, loading, error } = useProductDetail(id);

  const [selectedFlavor, setSelectedFlavor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  React.useEffect(() => {
    if (!product) return;

    setSelectedFlavor(product.flavors?.[0] || "");
    setImages(generateImageUrls(product.title));
    setSelectedImage(0);
  }, [product]);

  const handleImageError = (index: number) => {
    if (index + 1 < images.length) {
      setSelectedImage(index + 1);
    }
  };
  const handleThumbnailError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const parent = e.currentTarget.parentElement;
    if (parent) parent.style.display = "none";
  };
  if (loading) return <div className="p-6 min-h-screen flex items-center justify-center">Loading product...</div>;
  if (error) return <div className="p-6 min-h-screen text-red-600">{error}</div>;
  if (!product) return null;
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => navigate(-1)} className="text-blue-600 mb-6 hover:underline">← Back</button>

        <div className="bg-white rounded-lg shadow border p-6 grid md:grid-cols-2 gap-8">
          {/* IMAGE GALLERY */}
          <div>
            <div className="aspect-square bg-gray-100 rounded overflow-hidden mb-3">
              <img
                src={images[selectedImage] || PLACEHOLDER_IMAGE}
                alt={product.title}
                onError={() => handleImageError(selectedImage)}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-16 border rounded overflow-hidden ${selectedImage === idx ? "border-blue-600" : "border-gray-200"}`}
                >
                  <img
                    src={img}
                    alt={`${product.title} ${idx + 1}`}
                    onError={handleThumbnailError}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-blue-600 font-semibold uppercase mb-1">{product.brand}</p>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4 flex gap-2">
              <TriangleAlert className="text-yellow-600" />
              <p className="text-sm"><strong>Warning:</strong> This product contains nicotine.</p>
            </div>
            {product.description && <p className="text-gray-700 mb-4">{product.description}</p>}
            {product.sku && <p className="text-sm text-gray-500 mb-3"><strong>SKU:</strong> {product.sku}</p>}
            {product.categories?.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {product.categories.map((cat, idx) => (
                    <span key={idx} className="px-3 py-1 text-xs bg-gray-100 border rounded-full">{cat}</span>
                  ))}
                </div>
              </div>
            )}
            {product.flavors?.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Select Flavor</h3>
                <div className="flex flex-wrap gap-2">
                  {product.flavors.map((flavor) => (
                    <button
                      key={flavor}
                      onClick={() => setSelectedFlavor(flavor)}
                      className={`px-3 py-1 border rounded ${selectedFlavor === flavor ? "bg-blue-600 text-white" : "bg-white"}`}
                    >
                      {flavor}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Quantity</h3>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1 border rounded hover:bg-gray-100"><Minus size={20} /></button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-1 border rounded hover:bg-gray-100"><Plus size={20} /></button>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700">
              Request Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
