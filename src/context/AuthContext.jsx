import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);
const TOKEN_KEY = "token";
const USER_KEY = "authUser";
const apiUrl = import.meta.env.VITE_API_URL;

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(USER_KEY) || "null"); } catch { return null; }
  });
  const [loading, setLoading] = useState(true);

  const clearAuth = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const saveAuth = useCallback((data) => {
    if (!data?.token || !data?.user) throw new Error("The server returned an incomplete authentication response.");
    if (data.user.role !== "ADMIN") throw new Error("This account does not have admin access.");
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  }, []);

  const login = useCallback(async ({ email, password }) => {
    const { data } = await axios.post(`${apiUrl}/auth/login`, { email, password }, { headers: { "Content-Type": "application/json" } });
    saveAuth(data);
    return data.user;
  }, [saveAuth]);

  const signup = useCallback(async ({ name, email, password, phoneNumber }) => {
    const body = { name, email, password };
    if (phoneNumber?.trim()) body.phoneNumber = phoneNumber.trim();
    const { data } = await axios.post(`${apiUrl}/auth/signup`, body, { headers: { "Content-Type": "application/json" } });
    saveAuth(data);
    return data.user;
  }, [saveAuth]);

  const logout = useCallback(() => { clearAuth(); window.location.replace("/login"); }, [clearAuth]);

  useEffect(() => {
    const requestId = axios.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      if (storedToken) config.headers.Authorization = `Bearer ${storedToken}`;
      return config;
    });
    const responseId = axios.interceptors.response.use((response) => response, (error) => {
      if (error.response?.status === 401 && localStorage.getItem(TOKEN_KEY)) {
        clearAuth();
        window.location.replace("/login");
      }
      return Promise.reject(error);
    });
    setLoading(false);
    return () => {
      axios.interceptors.request.eject(requestId);
      axios.interceptors.response.eject(responseId);
    };
  }, [clearAuth]);

  const value = useMemo(() => ({ token, user, loading, isAdmin: user?.role === "ADMIN", login, signup, logout }), [token, user, loading, login, signup, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
