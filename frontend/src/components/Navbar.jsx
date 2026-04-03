import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { trackAction } from "../services/track";
import { ChevronDown, Menu, X, Landmark, CreditCard, Banknote, Wallet, LogOut, User } from "lucide-react";

export default function Navbar({ isAuthenticated = false, user = null, onLogout = null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loansDropdownOpen, setLoansDropdownOpen] = useState(false);
  const [mobileLoanOpen, setMobileLoanOpen] = useState(false);
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

  const hasApplication = Boolean(user?.hasApplication);

  const loanOptions = [
    { name: "Personal Loan", type: "personal_loan", icon: Banknote },
    { name: "Home Loan", type: "home_loan", icon: Landmark },
    { name: "Business Loan", type: "business_loan", icon: Wallet },
    { name: "Credit Card", type: "credit_card", icon: CreditCard },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LOGO */}
        <Link
          to="/"
          onClick={() => trackAction("navbar home click")}
          className="flex items-center gap-2.5 sm:gap-3 group outline-none py-1"
        >
          <span className="flex h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-2xl bg-white ring-1 ring-slate-200 shadow-[0_6px_18px_rgba(15,23,42,0.08)] overflow-hidden">
            <img
              src="/kk-logo.svg"
              alt="Kredit Konnect Logo"
              className="h-full w-full object-contain"
            />
          </span>
          <span className="flex flex-col whitespace-nowrap leading-none">
            <span className="text-[15px] sm:text-base lg:text-[17px] font-extrabold tracking-[-0.03em] text-slate-900">KreditKonnect</span>
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

        {/* DESKTOP APPLY BUTTON / LOGOUT */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && user ? (
            <>
              <Link
                to={hasApplication ? "/track-application" : "/apply-loan"}
                onClick={() => trackAction(hasApplication ? "navbar track application" : "navbar apply loan")}
                className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-blue-700/30 active:scale-95"
              >
                {hasApplication ? "Track Application" : "Apply Loan"}
              </Link>
              <button
                onClick={() => {
                  trackAction("navbar logout");
                  onLogout?.();
                }}
                className="flex items-center gap-2 rounded-lg bg-slate-600 hover:bg-slate-700 px-6 py-2.5 text-sm font-semibold text-white transition shadow-md shadow-slate-600/20 active:scale-95"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/apply-loan"
              onClick={() => trackAction("navbar apply now")}
              className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-blue-700/30 active:scale-95"
            >
              Apply Now
            </Link>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          className="rounded-xl p-2.5 text-slate-600 md:hidden bg-slate-50 hover:bg-slate-100 transition active:scale-95"
          onClick={() => { if (isOpen) setMobileLoanOpen(false); setIsOpen(!isOpen); }}
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

            <div>
              <button
                type="button"
                onClick={() => setMobileLoanOpen((p) => !p)}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition"
              >
                <span>Loans</span>
                <ChevronDown size={18} className={`transition-transform duration-200 ${mobileLoanOpen ? "rotate-180 text-blue-600" : "text-slate-400"}`} />
              </button>
              {mobileLoanOpen && (
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-blue-100 pl-3">
                  {loanOptions.map((loan) => {
                    const Icon = loan.icon;
                    return (
                      <button
                        key={loan.type}
                        onClick={() => { setMobileLoanOpen(false); handleLoanSelect(loan.type); }}
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition"
                      >
                        <Icon size={16} className="text-blue-500 shrink-0" />
                        {loan.name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 mt-6 border-t border-slate-200 pt-4">
              {isAuthenticated && user ? (
                <>
                  <Link
                    to={hasApplication ? "/track-application" : "/apply-loan"}
                    onClick={() => { trackAction(hasApplication ? "navbar track application mobile" : "navbar apply loan mobile"); setIsOpen(false); }}
                    className="block w-full rounded-lg bg-blue-600 hover:bg-blue-700 px-6 py-4 text-center text-base font-bold text-white transition shadow-md active:scale-95"
                  >
                    {hasApplication ? "Track Application" : "Apply Loan"}
                  </Link>
                  <button
                    onClick={() => {
                      trackAction("navbar logout mobile");
                      onLogout?.();
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full rounded-lg bg-slate-600 hover:bg-slate-700 px-6 py-3 text-base font-bold text-white transition shadow-md active:scale-95"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/apply-loan"
                  onClick={() => { trackAction("navbar apply now"); setIsOpen(false); }}
                  className="block w-full rounded-lg bg-blue-600 hover:bg-blue-700 px-6 py-4 text-center text-base font-bold text-white transition shadow-md active:scale-95"
                >
                  Apply Now
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
