import type React from "react";
import { createContext, useCallback, useContext, useState } from "react";

export type AuthRole = "customer" | "admin";

export interface AuthUser {
  phone: string;
  role: AuthRole;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (phone: string) => void;
  logout: () => void;
  isAdmin: boolean;
  isLoggedIn: boolean;
}

const AUTH_STORAGE_KEY = "fco_auth";
const ADMIN_PHONE = "7801099660";

function loadStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthUser;
    if (parsed.phone && parsed.role) return parsed;
    return null;
  } catch {
    return null;
  }
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  login: () => {},
  logout: () => {},
  isAdmin: false,
  isLoggedIn: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(loadStoredUser);

  const login = useCallback((phone: string) => {
    const role: AuthRole = phone === ADMIN_PHONE ? "admin" : "customer";
    const authUser: AuthUser = { phone, role };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
    setUser(authUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  }, []);

  const isAdmin = user?.role === "admin";
  const isLoggedIn = user !== null;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}
