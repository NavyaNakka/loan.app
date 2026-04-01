/**
 * Authentication Service
 * Manages JWT tokens and user authentication state
 */

const AUTH_TOKEN_KEY = "kreditkonnect_auth_token";
const USER_DATA_KEY = "kreditkonnect_user_data";

export const authService = {
  // ✅ Get auth token from localStorage
  getToken: () => {
    try {
      return localStorage.getItem(AUTH_TOKEN_KEY);
    } catch {
      return null;
    }
  },

  // ✅ Set auth token in localStorage
  setToken: (token) => {
    try {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    } catch (err) {
      console.error("Error saving token:", err);
    }
  },

  // ✅ Get user data from localStorage
  getUserData: () => {
    try {
      const data = localStorage.getItem(USER_DATA_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  // ✅ Set user data in localStorage
  setUserData: (userData) => {
    try {
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    } catch (err) {
      console.error("Error saving user data:", err);
    }
  },

  // ✅ Check if user is authenticated
  isAuthenticated: () => {
    const token = authService.getToken();
    return !!token;
  },

  // ✅ Get authorization header for API requests
  getAuthHeader: () => {
    const token = authService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  // ✅ Clear all auth data (logout)
  clearAuth: () => {
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(USER_DATA_KEY);
    } catch (err) {
      console.error("Error clearing auth:", err);
    }
  },

  // ✅ Save auth data (after OTP verification)
  saveAuth: (token, userData) => {
    authService.setToken(token);
    authService.setUserData(userData);
  },
};

export default authService;
