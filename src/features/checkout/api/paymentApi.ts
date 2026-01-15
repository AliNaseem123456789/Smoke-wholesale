import { API_URL } from "../../../config/config";

const authFetch = (url: string, options: RequestInit = {}) =>
  fetch(url, { ...options, credentials: "include" });

export async function getPaymentHistory() {
  const res = await authFetch(`${API_URL}/orders/payment-history`);
  if (!res.ok) throw new Error("Failed to fetch payments");
  const json = await res.json();
  return json.data;
}
