import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TriangleAlert, Plus, Minus } from "lucide-react";

interface Product {
  id: number;
  title: string;
  brand: string;
  description?: string;
  flavors?: string[];
}

const possibleExtensions = ["jpg", "jpeg", "png"];

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [quantity, setQuantity] = useState(1);
  const [selectedFlavor, setSelectedFlavor] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/products/product/${id}`
        );
        const json = await res.json();

        if (!res.ok) {
          setError(json.message || "Failed to load product");
        } else {
          setProduct(json.data);
          setSelectedFlavor(json.data?.flavors?.[0] || "");

          // Transform title to folder name with underscores
          const folderName = json.data.title
      .trim()
    // Replace ALL spaces with _
    .replace(/\s+/g, "_")
    // Replace special characters ( ) & % # . with _
    .replace(/[()&%#.+/,]/g, "_")
    // Keep - as is, remove everything else
   
          // Generate image URLs
          const generatedImages: string[] = [];
          for (let i = 1; i <= 5; i++) { // max 5 images
            for (let ext of possibleExtensions) {
              generatedImages.push(
                `/product-images/${folderName}/${i}.${ext}`
              );
            }
          }
          setImages(generatedImages);
        }
      } catch {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Try next image if current fails
  const handleImageError = (index: number) => {
    const nextIndex = index + 1;
    if (nextIndex < images.length) {
      setSelectedImage(nextIndex);
    }
  };

  if (loading) return <p className="p-6">Loading product...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!product) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 mb-6 hover:underline"
        >
          ← Back
        </button>

        <div className="bg-white rounded-lg shadow border p-6 grid md:grid-cols-2 gap-8">
          {/* IMAGE GALLERY */}
          <div>
            <div className="aspect-square bg-gray-100 rounded overflow-hidden mb-2">
              {images[selectedImage] && (
                <img
                  src={images[selectedImage]}
                  alt={product.title}
                  onError={() => handleImageError(selectedImage)}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="flex gap-2">
              {images.slice(0, 5).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-16 border rounded overflow-hidden ${
                    selectedImage === idx
                      ? "border-blue-600"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title} ${idx + 1}`}
                    onError={() => handleImageError(idx)}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* INFO */}
          <div>
            <p className="text-sm text-blue-600 font-semibold uppercase">
              {product.brand}
            </p>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

            <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4 flex gap-2">
              <TriangleAlert className="text-yellow-600" />
              <p className="text-sm">
                <strong>Warning:</strong> This product contains nicotine.
              </p>
            </div>

            {product.description && (
              <p className="text-gray-700 mb-4">{product.description}</p>
            )}

            {product.flavors && product.flavors.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Select Flavor</h3>
                <div className="flex flex-wrap gap-2">
                  {product.flavors.map((flavor) => (
                    <button
                      key={flavor}
                      onClick={() => setSelectedFlavor(flavor)}
                      className={`px-3 py-1 border rounded ${
                        selectedFlavor === flavor
                          ? "bg-blue-600 text-white"
                          : "bg-white"
                      }`}
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
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus />
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>
                  <Plus />
                </button>
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
