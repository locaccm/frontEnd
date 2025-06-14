// src/core/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

import { jwtDecode } from "jwt-decode";
import { rolesPermissions } from "../../../rolesPermissions.js";

interface UserProfile {
  id: string;
  role: string;
  permissions: string[];
}

export const AuthContext = createContext<{
  user: UserProfile | null;
  token: string | null;
  hasPermission: (perm: string) => boolean;
  login: (token: string) => void;
  logout: () => void;
}>({
  user: null,
  token: null,
  hasPermission: () => false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (token: string) => {
    setToken(token);
    const decoded: any = jwtDecode(token);
    const role =
      decoded.status?.toLowerCase() || decoded.role?.toLowerCase() || "tenant";
    setUser({
      id: decoded.userId?.toString() || decoded.USEN_ID?.toString() || "",
      role,
      permissions: [
        ...(rolesPermissions["everyone"] || []),
        ...(rolesPermissions[role] || []),
      ],
    });
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) login(savedToken);
  }, []);

  const hasPermission = (perm: string) => !!user?.permissions?.includes(perm);

  return (
    <AuthContext.Provider value={{ user, token, hasPermission, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
