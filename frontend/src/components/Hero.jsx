
// import { Link, useLocation, useNavigate } from "react-router-dom";

// export default function Hero() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleScrollToEmi = () => {
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
//     <section className="bg-slate-50">
//       <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
//         <div>
//           <span className="inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
//             Smart Loan Journey
//           </span>

//           <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
//             Check EMI, Apply Online, and Track Your Loan with Confidence
//           </h1>

//           <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
//             A simple and secure platform to estimate EMI, submit your loan
//             application, provide consent, and follow lender-wise progress in one
//             place.
//           </p>

//           <div className="mt-8 flex flex-wrap gap-4">
//             <Link
//               to="/apply-loan"
//               className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
//             >
//               Apply Now
//             </Link>

//             <button
//               type="button"
//               onClick={handleScrollToEmi}
//               className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
//             >
//               Check EMI
//             </button>
//           </div>

//           <div className="mt-10 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-3">
//             <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
//               <h3 className="text-xl font-bold text-slate-900">Fast</h3>
//               <p className="mt-1 text-sm text-slate-600">
//                 Quick and guided application flow
//               </p>
//             </div>

//             <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
//               <h3 className="text-xl font-bold text-slate-900">Secure</h3>
//               <p className="mt-1 text-sm text-slate-600">
//                 Consent-based and protected process
//               </p>
//             </div>

//             <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 col-span-2 sm:col-span-1">
//               <h3 className="text-xl font-bold text-slate-900">Simple</h3>
//               <p className="mt-1 text-sm text-slate-600">
//                 EMI check to status tracking in one place
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
//           <div className="rounded-2xl bg-blue-600 p-6 text-white">
//             <p className="text-sm font-medium text-blue-100">Starting from</p>
//             <h2 className="mt-2 text-3xl font-bold">Affordable EMI Plans</h2>
//             <p className="mt-3 text-sm leading-6 text-blue-100">
//               Estimate your repayment, review your loan requirement, and begin
//               the application process with clarity.
//             </p>
//           </div>

//           <div className="mt-6 space-y-4">
//             <div className="rounded-2xl bg-slate-50 p-4">
//               <p className="text-sm font-medium text-slate-500">Loan Amount</p>
//               <p className="mt-1 text-lg font-semibold text-slate-900">
//                 Up to ₹10,00,000
//               </p>
//             </div>

//             <div className="rounded-2xl bg-slate-50 p-4">
//               <p className="text-sm font-medium text-slate-500">Application</p>
//               <p className="mt-1 text-lg font-semibold text-slate-900">
//                 100% online and easy to submit
//               </p>
//             </div>

//             <div className="rounded-2xl bg-slate-50 p-4">
//               <p className="text-sm font-medium text-slate-500">Tracking</p>
//               <p className="mt-1 text-lg font-semibold text-slate-900">
//                 Clear lender-wise status updates
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import { Link, useLocation, useNavigate } from "react-router-dom";
import { trackAction } from "../services/track"; // 🔥 add this

export default function Hero() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollToEmi = () => {
    trackAction("emi check"); // 🔥 track EMI click

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

  const handleApplyClick = () => {
    trackAction("apply now"); // 🔥 track Apply click
  };

  return (
    <section className="bg-slate-50">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div>
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
            Smart Loan Journey
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Check EMI, Apply Online, and Track Your Loan with Confidence
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            A simple and secure platform to estimate EMI, submit your loan
            application, provide consent, and follow lender-wise progress in one
            place.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            {/* 🔥 UPDATED APPLY BUTTON */}
            <Link
              to="/apply-loan"
              onClick={handleApplyClick}
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Apply Now
            </Link>

            {/* 🔥 UPDATED EMI BUTTON */}
            <button
              type="button"
              onClick={handleScrollToEmi}
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
            >
              Check EMI
            </button>
          </div>

          {/* ❌ NO CHANGES BELOW */}
          <div className="mt-10 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-xl font-bold text-slate-900">Fast</h3>
              <p className="mt-1 text-sm text-slate-600">
                Quick and guided application flow
              </p>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-xl font-bold text-slate-900">Secure</h3>
              <p className="mt-1 text-sm text-slate-600">
                Consent-based and protected process
              </p>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 col-span-2 sm:col-span-1">
              <h3 className="text-xl font-bold text-slate-900">Simple</h3>
              <p className="mt-1 text-sm text-slate-600">
                EMI check to status tracking in one place
              </p>
            </div>
          </div>
        </div>

        {/* ❌ RIGHT SIDE NO CHANGES */}
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <div className="rounded-2xl bg-blue-600 p-6 text-white">
            <p className="text-sm font-medium text-blue-100">Starting from</p>
            <h2 className="mt-2 text-3xl font-bold">Affordable EMI Plans</h2>
            <p className="mt-3 text-sm leading-6 text-blue-100">
              Estimate your repayment, review your loan requirement, and begin
              the application process with clarity.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-500">Loan Amount</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                Up to ₹10,00,000
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-500">Application</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                100% online and easy to submit
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-500">Tracking</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                Clear lender-wise status updates
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}