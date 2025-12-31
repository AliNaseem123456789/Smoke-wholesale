import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  businessName: string;
  ownerName: string;
  phone: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (userData: RegistrationData) => boolean;
  logout: () => void;
}

export interface RegistrationData {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  businessType: string;
  taxId: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check localStorage for existing session
    const storedUser = localStorage.getItem('sootaUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Mock login - in production, this would validate against a backend
    const storedUsers = localStorage.getItem('sootaRegisteredUsers');
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const foundUser = users.find((u: any) => u.email === email && u.password === password);
      
      if (foundUser) {
        const userData: User = {
          email: foundUser.email,
          businessName: foundUser.businessName,
          ownerName: foundUser.ownerName,
          phone: foundUser.phone,
        };
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('sootaUser', JSON.stringify(userData));
        return true;
      }
    }
    
    // Demo login for testing
    if (email === 'demo@wholesale.com' && password === 'demo123') {
      const demoUser: User = {
        email: 'demo@wholesale.com',
        businessName: 'Demo Wholesale Shop',
        ownerName: 'Demo User',
        phone: '555-0100',
      };
      setUser(demoUser);
      setIsAuthenticated(true);
      localStorage.setItem('sootaUser', JSON.stringify(demoUser));
      return true;
    }
    
    return false;
  };

  const register = (userData: RegistrationData): boolean => {
    // Mock registration
    const storedUsers = localStorage.getItem('sootaRegisteredUsers');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    
    // Check if email already exists
    if (users.find((u: any) => u.email === userData.email)) {
      return false;
    }
    
    users.push(userData);
    localStorage.setItem('sootaRegisteredUsers', JSON.stringify(users));
    
    // Auto-login after registration
    const newUser: User = {
      email: userData.email,
      businessName: userData.businessName,
      ownerName: userData.ownerName,
      phone: userData.phone,
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('sootaUser', JSON.stringify(newUser));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('sootaUser');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
