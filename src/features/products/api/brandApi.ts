import { Brand } from "../types/brand.types";
import { API_URL } from "../../../config/config";

export async function getBrands(): Promise<Brand[]> {
  const res = await fetch(`${API_URL}/products/display`);

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.message || "Failed to fetch brands");
  }

  const json = await res.json();
  return json.data || [];
}
