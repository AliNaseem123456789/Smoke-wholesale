// src/features/auth/context/AuthContext.tsx

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  getMe,
  loginApi,
  logoutApi,
  registerApi,
} from "../api/auth.api";

import {
  AuthContextType,
  RegistrationData,
  User,
} from "../types/auth.types";

/* ---------------- CONTEXT ---------------- */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ---------------- PROVIDER ---------------- */

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /* ---------- Restore session ---------- */
  useEffect(() => {
    getMe()
      .then((user) => {
        if (user) setUser(user);
      })
      .finally(() => setLoading(false));
  }, []);

  /* ---------- Login ---------- */
  const login = async (email: string, password: string) => {
    const user = await loginApi(email, password);
    setUser(user);
  };

  /* ---------- Register ---------- */
  const register = async (data: RegistrationData) => {
    const user = await registerApi(data);
    setUser(user); // auto-login after register
  };

  /* ---------- Logout ---------- */
  const logout = async () => {
    await logoutApi();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* ---------------- HOOK ---------------- */

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
