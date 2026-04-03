/**
 * Authentication Service
 * Manages JWT tokens, user authentication state, and form data persistence
 */

const AUTH_TOKEN_KEY = "kreditkonnect_auth_token";
const USER_DATA_KEY = "kreditkonnect_user_data";
const FORM_DATA_KEY = "kreditkonnect_form_data";
const TOKEN_TIMESTAMP_KEY = "kreditkonnect_token_timestamp";

// Token expires after 24 hours (in milliseconds)
const TOKEN_EXPIRATION_TIME = 24 * 60 * 60 * 1000;

export const authService = {
  // ✅ Get auth token from localStorage
  getToken: () => {
    try {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (!token) return null;
      
      // Check if token has expired
      if (authService.isTokenExpired()) {
        authService.clearAuth();
        console.log("🔐 Token expired - cleared session");
        return null;
      }
      
      return token;
    } catch {
      return null;
    }
  },

  // ✅ Set auth token in localStorage
  setToken: (token) => {
    try {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      // Store timestamp for token expiration checking
      localStorage.setItem(TOKEN_TIMESTAMP_KEY, Date.now().toString());
    } catch (err) {
      console.error("Error saving token:", err);
    }
  },

  // ✅ Check if token has expired
  isTokenExpired: () => {
    try {
      const timestamp = localStorage.getItem(TOKEN_TIMESTAMP_KEY);
      if (!timestamp) return true;
      
      const tokenAge = Date.now() - parseInt(timestamp);
      return tokenAge > TOKEN_EXPIRATION_TIME;
    } catch {
      return true;
    }
  },

  // ✅ Get user data from localStorage
  getUserData: () => {
    try {
      const token = authService.getToken();
      if (!token) return null;
      
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

  updateUserData: (updates) => {
    try {
      const existingUserData = authService.getUserData();
      if (!existingUserData) return null;

      const nextUserData = { ...existingUserData, ...updates };
      authService.setUserData(nextUserData);
      return nextUserData;
    } catch {
      return null;
    }
  },

  // ✅ Check if user is authenticated
  isAuthenticated: () => {
    const token = authService.getToken();
    const userData = authService.getUserData();
    return !!(token && userData);
  },

  // ✅ Get authorization header for API requests
  getAuthHeader: () => {
    const token = authService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  // ✅ Save form data to localStorage
  saveFormData: (formData) => {
    try {
      localStorage.setItem(FORM_DATA_KEY, JSON.stringify(formData));
      console.log("✅ Form data saved");
    } catch (err) {
      console.error("Error saving form data:", err);
    }
  },

  // ✅ Get form data from localStorage
  getFormData: () => {
    try {
      const data = localStorage.getItem(FORM_DATA_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  // ✅ Clear form data
  clearFormData: () => {
    try {
      localStorage.removeItem(FORM_DATA_KEY);
    } catch (err) {
      console.error("Error clearing form data:", err);
    }
  },

  // ✅ Clear all auth data (logout)
  clearAuth: () => {
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(USER_DATA_KEY);
      localStorage.removeItem(TOKEN_TIMESTAMP_KEY);
      // Note: Keep form data on logout so user can re-apply
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
