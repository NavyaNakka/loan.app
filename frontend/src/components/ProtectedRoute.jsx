import { Navigate } from "react-router-dom";
import authService from "../services/auth";

/**
 * ProtectedRoute component
 * Redirects to login if user is not authenticated
 */
export default function ProtectedRoute({ element }) {
  const isAuthenticated = authService.isAuthenticated();

  if (authService.isTokenExpired()) {
    authService.clearAuth();
    console.log("🔐 Token expired - redirecting to login");
    return <Navigate to="/login" replace />;
  }

  return isAuthenticated ? element : <Navigate to="/login" replace />;
}
