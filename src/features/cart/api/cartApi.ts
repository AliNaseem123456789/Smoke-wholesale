// src/features/cart/api/cartApi.ts
import { API_URL } from "../../../config/config";

const authFetch = (url: string, options: RequestInit = {}) =>
  fetch(url, {
    ...options,
    credentials: "include",
  });

export async function submitQuoteRequest() {
  const res = await authFetch(`${API_URL}/orders/submit-quote`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to submit quote");
  return res.json();
}

export async function saveCartTemplate(payload: {
  cartName: string;
  items: { product_id: number; quantity: number }[];
  totalAmount: number;
}) {
  const res = await authFetch(`${API_URL}/cart/save-cart-template`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to save cart template");
  }

  return res.json();
}

export async function getSavedCarts() {
  const res = await authFetch(`${API_URL}/cart/saved-cart-templates`);

  if (!res.ok) {
    throw new Error("Failed to fetch saved templates");
  }

  const json = await res.json();
  return json.data; // This returns the array of saved carts
}

export async function getSavedCartById(id: string | number) {
  const res = await authFetch(
    `${API_URL}/cart/saved-cart-templates-details/${id}`
  );
  if (!res.ok) throw new Error("Failed to fetch template details");
  const json = await res.json();
  return json.data;
}

export async function deleteSavedCart(id: string | number) {
  const res = await authFetch(`${API_URL}/cart/saved-cart-templates/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete template");
  return res.json();
}
