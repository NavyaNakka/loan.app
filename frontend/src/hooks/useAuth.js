import { useState, useEffect } from "react";
import authService from "../services/auth";

/**
 * Custom hook to manage authentication state
 * Returns: { isAuthenticated, user, loading, logout }
 */
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = authService.getToken();
    const userData = authService.getUserData();

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(userData);
    }

    setLoading(false);
  }, []);

  const logout = () => {
    authService.clearAuth();
    setIsAuthenticated(false);
    setUser(null);
  };

  const login = (token, userData) => {
    authService.saveAuth(token, userData);
    setIsAuthenticated(true);
    setUser(userData);
  };

  return {
    isAuthenticated,
    user,
    loading,
    logout,
    login,
  };
};

export default useAuth;
