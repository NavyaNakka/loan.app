// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import ProductsSection from "./components/ProductsSection";
// import Features from "./components/Features";
// import EmiCalculator  from "./components/EmiCalculator";
// import HowItWorks  from "./components/HowItWorks";
// import  TrustStats from "./components/TrustStats";
// import WhyChooseUs from "./components/WhyChooseUs";

// function App() {
//   return (
//     <div className="min-h-screen bg-slate-50">
//       <Navbar />
//       <Hero />
//       <ProductsSection />
//       <Features />
//       <EmiCalculator />
//       <HowItWorks />
//       <TrustStats />
//       <WhyChooseUs />
//     </div>
//   );
// }

// export default App;


import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import InspiredHome from "./components/InspiredHome";
import ProtectedRoute from "./components/ProtectedRoute";

import ApplyLoan from "./pages/ApplyLoan";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import TrackApplication from "./pages/TrackApplication";
import authService from "./services/auth";

function HomePage() {
  return <InspiredHome />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Check authentication on app mount
  useEffect(() => {
    const checkAuth = () => {
      const token = authService.getToken();
      const userData = authService.getUserData();

      if (token && userData) {
        setIsAuthenticated(true);
        setUser(userData);
        console.log("✅ User already logged in:", userData);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }

      setAuthLoading(false);
    };

    checkAuth();
  }, []);

  // ✅ Re-check auth when location changes (after login redirect)
  useEffect(() => {
    const token = authService.getToken();
    const userData = authService.getUserData();

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(userData);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [location]);

  // ✅ Listen for localStorage changes from same tab/window
  useEffect(() => {
    const handleStorageChange = () => {
      const token = authService.getToken();
      const userData = authService.getUserData();

      if (token && userData) {
        setIsAuthenticated(true);
        setUser(userData);
        console.log("✅ Auth detected from localStorage update");
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    // Listen for storage changes (from same window)
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Handle logout
  const handleLogout = () => {
    authService.clearAuth();
    setIsAuthenticated(false);
    setUser(null);
    navigate("/");
    console.log("✅ User logged out");
  };

  // ✅ Handle login (called from ApplyLoan after OTP verification)
  const handleLogin = (token, userData) => {
    authService.saveAuth(token, userData);
    setIsAuthenticated(true);
    setUser(userData);
    console.log("✅ User logged in:", userData);
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar 
        isAuthenticated={isAuthenticated} 
        user={user} 
        onLogout={handleLogout}
      />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apply-loan" element={<ProtectedRoute element={<ApplyLoan />} />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/track-application" element={<TrackApplication />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;