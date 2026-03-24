
// import { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleScrollToEmi = () => {
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
//         <Link to="/" className="text-2xl font-bold tracking-tight text-blue-600">
//           LoanApp
//         </Link>

//         <div className="hidden items-center gap-8 md:flex">
//           <Link to="/" className="text-sm font-medium text-slate-700 transition hover:text-blue-600">
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
//             className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
//           >
//             Apply Loan
//           </Link>

//           <a href="#" className="text-sm font-medium text-slate-700 transition hover:text-blue-600">
//             Track Application
//           </a>
//         </div>

//         <div className="hidden md:block">
//           <Link
//             to="/apply-loan"
//             className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
//           >
//             Apply Now
//           </Link>
//         </div>

//         <button
//           type="button"
//           className="rounded-lg p-2 text-slate-700 md:hidden"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? "✕" : "☰"}
//         </button>
//       </div>

//       {isOpen && (
//         <div className="border-t border-slate-200 bg-white md:hidden">
//           <div className="space-y-1 px-4 py-4 sm:px-6">
//             <Link
//               to="/"
//               onClick={() => setIsOpen(false)}
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
//               onClick={() => setIsOpen(false)}
//               className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
//             >
//               Apply Loan
//             </Link>

//             <a
//               href="#"
//               className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
//             >
//               Track Application
//             </a>

//             <Link
//               to="/apply-loan"
//               onClick={() => setIsOpen(false)}
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
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { trackAction } from "../services/track"; // 🔥 added

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollToEmi = () => {
    trackAction("navbar emi click"); // 🔥 added
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

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* LOGO */}
        <Link
          to="/"
          onClick={() => trackAction("navbar home click")} // 🔥 added
          className="text-2xl font-bold tracking-tight text-blue-600"
        >
          LoanApp
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          
          <Link
            to="/"
            onClick={() => trackAction("navbar home click")} // 🔥 added
            className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
          >
            Home
          </Link>

          <button
            type="button"
            onClick={handleScrollToEmi}
            className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
          >
            EMI Calculator
          </button>

          <Link
            to="/apply-loan"
            onClick={() => trackAction("navbar apply loan click")} // 🔥 added
            className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
          >
            Apply Loan
          </Link>

          <a
            href="#"
            onClick={() => trackAction("navbar track application click")} // 🔥 added
            className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
          >
            Track Application
          </a>
        </div>

        {/* DESKTOP APPLY BUTTON */}
        <div className="hidden md:block">
          <Link
            to="/apply-loan"
            onClick={() => trackAction("navbar apply now")} // 🔥 added
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Apply Now
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          className="rounded-lg p-2 text-slate-700 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="space-y-1 px-4 py-4 sm:px-6">
            
            <Link
              to="/"
              onClick={() => {
                trackAction("navbar home click"); // 🔥 added
                setIsOpen(false);
              }}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
            >
              Home
            </Link>

            <button
              type="button"
              onClick={handleScrollToEmi}
              className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
            >
              EMI Calculator
            </button>

            <Link
              to="/apply-loan"
              onClick={() => {
                trackAction("navbar apply loan click"); // 🔥 added
                setIsOpen(false);
              }}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
            >
              Apply Loan
            </Link>

            <a
              href="#"
              onClick={() => trackAction("navbar track application click")} // 🔥 added
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
            >
              Track Application
            </a>

            <Link
              to="/apply-loan"
              onClick={() => {
                trackAction("navbar apply now"); // 🔥 added
                setIsOpen(false);
              }}
              className="mt-3 block w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Apply Now
            </Link> 
          </div>
        </div>
      )}
    </nav>
  );
}