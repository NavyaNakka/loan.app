
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


import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductsSection from "./components/ProductsSection";
import Features from "./components/Features";
import EmiCalculator from "./components/EmiCalculator";
import HowItWorks from "./components/HowItWorks";
import WhyChooseUs from "./components/WhyChooseUs";
import Footer from "./components/Footer";
import Faq from "./components/Faq"

import ApplyLoan from "./pages/ApplyLoan";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import AboutUs from "./pages/AboutUs";

function HomePage() {
  return (
    <>
      <Hero />
      <ProductsSection />
      <Features />
      <EmiCalculator />
      <HowItWorks />
      <WhyChooseUs />
      <Faq />
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apply-loan" element={<ApplyLoan />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;