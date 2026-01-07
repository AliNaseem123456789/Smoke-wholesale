// Basic product used across app
export interface Product {
  id: string | number;
  title: string;
  brand: string;
  description?: string;
  sku?: string;
  categories?: string[];
  flavors?: string[];
  url?: string;
  created_at?: string;
}
// Product with images (UI-specific)
export interface ProductWithImages extends Product {
  imageUrls: string[];
}

// Home API response shape (OLD WAY: json.data)
export interface HomeProductsResponse {
  featured: Product[];
  newArrivals: Product[];
  bestSellers: Product[];
}
