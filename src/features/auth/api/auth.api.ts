// src/features/auth/api/auth.api.ts

import { API_URL } from "../../../config/config";
import { RegistrationData, User } from "../types/auth.types";

/* ---------- Restore session ---------- */
export async function getMe(): Promise<User | null> {
  const res = await fetch(`${API_URL}/auth/me`, {
    credentials: "include",
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data.user;
}

/* ---------- Login ---------- */
export async function loginApi(
  email: string,
  password: string
): Promise<User> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data.user;
}

/* ---------- Register ---------- */
export async function registerApi(
  payload: RegistrationData
): Promise<User> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data.user;
}

/* ---------- Logout ---------- */
export async function logoutApi(): Promise<void> {
  await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}
