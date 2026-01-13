import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { getMe, loginApi, logoutApi, registerApi } from "../api/auth.api";

import { AuthContextType, RegistrationData, User } from "../types/auth.types";

/* ---------------- CONTEXT ---------------- */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ---------------- PROVIDER ---------------- */

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /* ---------- Restore session ---------- */
  useEffect(() => {
    getMe()
      .then((userData) => {
        if (userData) setUser(userData);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  /* ---------- Login ---------- */
  const login = async (email: string, password: string) => {
    const userData = await loginApi(email, password);
    setUser(userData);
  };

  /* ---------- Register ---------- */
  const register = async (data: RegistrationData) => {
    const userData = await registerApi(data);
    setUser(userData); // auto-login after register
  };

  /* ---------- Logout ---------- */
  const logout = async () => {
    await logoutApi();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      // Now including setUser in the provider value
      value={{ user, loading, login, register, logout, setUser }}
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
