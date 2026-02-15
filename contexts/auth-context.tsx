"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { User } from "@/lib/types";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const MOCK_USER: User = {
  id: "usr-1",
  name: "Joao Silva",
  email: "joao@email.com",
  phone: "(11) 99999-9999",
  cpf: "123.456.789-00",
};

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("hawtec-user");
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("hawtec-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("hawtec-user");
    }
  }, [user]);

  const login = useCallback(
    async (email: string, _password: string): Promise<boolean> => {
      // Simulated delay
      await new Promise((r) => setTimeout(r, 800));
      setUser({ ...MOCK_USER, email });
      return true;
    },
    [],
  );

  const register = useCallback(
    async (
      name: string,
      email: string,
      _password: string,
    ): Promise<boolean> => {
      await new Promise((r) => setTimeout(r, 800));
      setUser({ ...MOCK_USER, id: `usr-${Date.now()}`, name, email });
      return true;
    },
    [],
  );

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
