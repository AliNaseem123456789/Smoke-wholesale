// src/features/auth/types/auth.types.ts

export type User = {
  id: string;
  email: string;
  role: string;
};

export type RegistrationData = {
  email: string;
  password: string;
};

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegistrationData) => Promise<void>;
  logout: () => Promise<void>;
};
