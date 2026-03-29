
// import { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { trackAction } from "../services/track"; // 🔥 added

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleScrollToEmi = () => {
//     trackAction("navbar emi click"); // 🔥 added
//     setIsOpen(false);

//     if (location.pathname !== "/") {
//       navigate("/");
//       setTimeout(() => {
//         const section = document.getElementById("emi");
//         if (section) {
//           section.scrollIntoView({ behavior: "smooth" });
//         }
//       }, 100);
//       return;
//     }

//     const section = document.getElementById("emi");
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
//       <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

//         {/* LOGO */}
//         <Link
//           to="/"
//           onClick={() => trackAction("navbar home click")} // 🔥 added
//           className="text-2xl font-bold tracking-tight text-blue-600"
//         >
//           LoanApp
//         </Link>

//         <div className="hidden items-center gap-8 md:flex">

//           <Link
//             to="/"
//             onClick={() => trackAction("navbar home click")} // 🔥 added
//             className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
//           >
//             Home
//           </Link>

//           <button
//             type="button"
//             onClick={handleScrollToEmi}
//             className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
//           >
//             EMI Calculator
//           </button>

//           <Link
//             to="/apply-loan"
//             onClick={() => trackAction("navbar apply loan click")} // 🔥 added
//             className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
//           >
//             Apply Loan
//           </Link>

//           <a
//             href="#"
//             onClick={() => trackAction("navbar track application click")} // 🔥 added
//             className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
//           >
//             Track Application
//           </a>
//         </div>

//         {/* DESKTOP APPLY BUTTON */}
//         <div className="hidden md:block">
//           <Link
//             to="/apply-loan"
//             onClick={() => trackAction("navbar apply now")} // 🔥 added
//             className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
//           >
//             Apply Now
//           </Link>
//         </div>

//         {/* MOBILE MENU BUTTON */}
//         <button
//           type="button"
//           className="rounded-lg p-2 text-slate-700 md:hidden"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? "✕" : "☰"}
//         </button>
//       </div>

//       {/* MOBILE MENU */}
//       {isOpen && (
//         <div className="border-t border-slate-200 bg-white md:hidden">
//           <div className="space-y-1 px-4 py-4 sm:px-6">

//             <Link
//               to="/"
//               onClick={() => {
//                 trackAction("navbar home click"); // 🔥 added
//                 setIsOpen(false);
//               }}
//               className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
//             >
//               Home
//             </Link>

//             <button
//               type="button"
//               onClick={handleScrollToEmi}
//               className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
//             >
//               EMI Calculator
//             </button>

//             <Link
//               to="/apply-loan"
//               onClick={() => {
//                 trackAction("navbar apply loan click"); // 🔥 added
//                 setIsOpen(false);
//               }}
//               className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
//             >
//               Apply Loan
//             </Link>

//             <a
//               href="#"
//               onClick={() => trackAction("navbar track application click")} // 🔥 added
//               className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
//             >
//               Track Application
//             </a>

//             <Link
//               to="/apply-loan"
//               onClick={() => {
//                 trackAction("navbar apply now"); // 🔥 added
//                 setIsOpen(false);
//               }}
//               className="mt-3 block w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
//             >
//               Apply Now
//             </Link> 
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }
import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { trackAction } from "../services/track";
import { ChevronDown, Menu, X, Landmark, CreditCard, Banknote, Wallet, Coins } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loansDropdownOpen, setLoansDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLoansDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleScrollToEmi = () => {
    trackAction("navbar emi click");
    setIsOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById("emi");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return;
    }

    const section = document.getElementById("emi");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLoanSelect = (type) => {
    trackAction(`navbar dropdown ${type}`);
    setLoansDropdownOpen(false);
    setIsOpen(false);
    navigate(`/apply-loan?type=${type}`);
  };

  const loanOptions = [
    { name: "Personal Loan", type: "personal_loan", icon: Banknote },
    { name: "Home Loan", type: "home_loan", icon: Landmark },
    { name: "Gold Loan", type: "gold_loan", icon: Coins },
    { name: "Business Loan", type: "business_loan", icon: Wallet },
    { name: "Credit Card", type: "credit_card", icon: CreditCard },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

        {/* LOGO */}
        <Link
          to="/"
          onClick={() => trackAction("navbar home click")}
          className="flex items-center gap-2 sm:gap-3"
        >
          <img src="/logo.png" alt="Kredit Konnect Logo" className="h-10 sm:h-14 w-auto object-contain mix-blend-multiply" />
          <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-800">
            Kredit Konnect
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            onClick={() => trackAction("navbar home click")}
            className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            Home
          </Link>

          <button
            type="button"
            onClick={handleScrollToEmi}
            className="text-sm font-semibold text-slate-600 transition hover:text-blue-600 outline-none"
          >
            EMI Calculator
          </button>

          <Link
            to="/about"
            onClick={() => trackAction("navbar about us click")}
            className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            About Us
          </Link>

          {/* DROPDOWN - LOANS */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setLoansDropdownOpen(!loansDropdownOpen)}
              className={`flex items-center gap-1 text-sm font-semibold transition outline-none ${loansDropdownOpen ? "text-blue-600" : "text-slate-600 hover:text-blue-600"}`}
            >
              Loans <ChevronDown size={16} className={`transition-transform duration-200 ${loansDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {loansDropdownOpen && (
              <div className="absolute top-full left-1/2 mt-4 w-64 -translate-x-1/2 rounded-2xl bg-white p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                {loanOptions.map((loan) => {
                  const Icon = loan.icon;
                  return (
                    <button
                      key={loan.type}
                      onClick={() => handleLoanSelect(loan.type)}
                      className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 text-left"
                    >
                      <Icon size={18} className="text-blue-500" />
                      {loan.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* DESKTOP APPLY BUTTON */}
        <div className="hidden md:block">
          <Link
            to="/apply-loan"
            onClick={() => trackAction("navbar apply now")}
            className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-500/30 transition hover:bg-blue-700 hover:shadow-blue-600/40 active:scale-95"
          >
            Apply Now
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          className="rounded-xl p-2.5 text-slate-600 md:hidden bg-slate-50 hover:bg-slate-100 transition active:scale-95"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden animate-in slide-in-from-top-4 duration-300">
          <div className="space-y-1.5 px-5 py-6">
            <Link
              to="/"
              onClick={() => { trackAction("navbar home click"); setIsOpen(false); }}
              className="block rounded-xl px-4 py-3.5 text-base font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700"
            >
              Home
            </Link>

            <button
              type="button"
              onClick={handleScrollToEmi}
              className="block w-full rounded-xl px-4 py-3.5 text-left text-base font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 outline-none"
            >
              EMI Calculator
            </button>

            <Link
              to="/about"
              onClick={() => { trackAction("navbar about us click"); setIsOpen(false); }}
              className="block rounded-xl px-4 py-3.5 text-base font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700"
            >
              About Us
            </Link>

            <div className="pt-2 pb-1">
              <p className="px-4 text-xs font-bold tracking-wider text-slate-400 uppercase">Loans</p>
              <div className="mt-2 space-y-1">
                {loanOptions.map((loan) => (
                  <button
                    key={loan.type}
                    onClick={() => handleLoanSelect(loan.type)}
                    className="block w-full rounded-xl px-4 py-3 text-left text-base font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700 pl-6"
                  >
                    {loan.name}
                  </button>
                ))}
              </div>
            </div>

            <Link
              to="/apply-loan"
              onClick={() => { trackAction("navbar apply now"); setIsOpen(false); }}
              className="mt-6 block w-full rounded-xl bg-blue-600 px-6 py-4 text-center text-base font-bold text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}