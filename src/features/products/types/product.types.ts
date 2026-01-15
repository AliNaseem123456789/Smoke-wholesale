// 1. The Single Source of Truth
export interface Product {
  id: string | number;
  title: string;
  brand: string;
  description?: string;
  sku?: string;
  categories?: string[];
  flavors?: string[];
  price?: number; // Added since your Cart/Detail pages use it
  url?: string;
  created_at?: string;
}

/** * DELETE ProductWithImages.
 * We now use getProductImage(product.id) directly in the UI components
 * instead of storing URLs in the product object.
 */

// 2. Updated Home Response Shape
export interface HomeProductsResponse {
  featured: Product[];
  newArrivals: Product[];
  bestSellers: Product[];
}
