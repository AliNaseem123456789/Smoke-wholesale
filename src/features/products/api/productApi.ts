import { Product, HomeProductsResponse } from "../types/product.types";
const BASE_URL = "http://localhost:5000/api";

export async function getHomeProducts(): Promise<HomeProductsResponse> {
  const res = await fetch(`${BASE_URL}/products/home`);

  if (!res.ok) {
    throw new Error("Failed to fetch home products");
  }

  const json = await res.json();

  // IMPORTANT: old backend format
  // { data: { featured, newArrivals, bestSellers } }
  return json.data;
}

export async function getProductsByBrand(brand: string): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products/brand/${encodeURIComponent(brand)}`);
  if (!res.ok) throw new Error("Failed to fetch brand products");
  const json = await res.json();
  return json.data;
}
export async function getProductsByCategory(category: string): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products/category/${encodeURIComponent(category)}`);
  if (!res.ok) throw new Error("Failed to fetch category products");

  const json = await res.json();
  return json.data;
}


export async function getProductById(id: string | number): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/product/${id}`);

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.message || "Failed to fetch product");
  }

  const json = await res.json();
  return json.data;
}

export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const json = await res.json();

  return json.data;
}
