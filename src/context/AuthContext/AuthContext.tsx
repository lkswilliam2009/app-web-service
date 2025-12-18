import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../../api/api";

interface User {
  id: string;
  username: string;
  role: string;
  device?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (payload: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);   // ✅ INI YANG HILANG
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("access_token")
  );

  const login = async (payload: any) => {
    try {
      const res = await api.post("/login", payload);
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);
      await fetchMe();
    } catch (err: any) {
      throw err;
    }
  };


  // ambil data user dari backend
  const fetchMe = async () => {
    try {
      const res = await api.get("api/who-is");
      setUser(res.data);
      setIsAuthenticated(true);
    } catch {
      logout();
    }
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      fetchMe();
    }
  }, []);

  const logout = async () => {
    try {
      // 🔥 panggil backend logout
      await api.post("api/logout");
    } catch (err) {
      // backend boleh gagal, frontend tetap logout
      console.warn("Logout API failed", err);
    } finally {
      // 🔥 WAJIB clear frontend state
      localStorage.clear();
      setUser(null);
      setIsAuthenticated(false);
    }
  };


  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};