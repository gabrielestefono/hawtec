"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
  useMemo,
} from "react";
import { ResponseApi } from "@/types/app/api/response";
import { Login, User } from "@/types/app/api/auth/login/Login";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    email: string,
    password: string,
    accept_terms: boolean,
    confirm_password: string,
  ) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

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
    async (email: string, password: string): Promise<boolean> => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (!response.ok) {
        return false;
      }
      const data = (await response.json()) as ResponseApi<Login>;
      setUser(data.data.user);
      return true;
    },
    [],
  );

  const register = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      accept_terms: boolean,
      confirm_password: string,
    ): Promise<boolean> => {
      const response = await fetch("/api/auth/cadastro", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
          accept_terms,
          confirm_password,
        }),
      });
      if (!response.ok) {
        return false;
      }
      return true;
    },
    [],
  );

  const forgotPassword = useCallback(
    async (email: string): Promise<boolean> => {
      const response = await fetch("/api/auth/esqueceu-senha", {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
      });
      if (!response.ok) {
        return false;
      }
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

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      updateProfile,
      forgotPassword,
    }),
    [user, isLoading, login, register, logout, updateProfile, forgotPassword],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
