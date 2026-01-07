import { Brand } from "../types/brand.types";

const BASE_URL = "http://localhost:5000/api";

export async function getBrands(): Promise<Brand[]> {
  const res = await fetch(`${BASE_URL}/products/display`);

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.message || "Failed to fetch brands");
  }

  const json = await res.json();
  return json.data || [];
}
