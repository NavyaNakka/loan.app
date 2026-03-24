
// import { useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom"; // ✅ added

// function formatCurrency(value) {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   }).format(value || 0);
// }

// export default function EmiCalculator() {
//   const navigate = useNavigate(); // ✅ added

//   const [loanAmount, setLoanAmount] = useState(500000);
//   const [annualRate, setAnnualRate] = useState(12);
//   const [tenureMonths, setTenureMonths] = useState(36);

//   const analytics = useMemo(() => {
//     const principal = Number(loanAmount) || 0;
//     const rate = Number(annualRate) || 0;
//     const months = Number(tenureMonths) || 0;

//     if (!principal || !rate || !months) {
//       return {
//         emi: 0,
//         totalPayment: 0,
//         totalInterest: 0,
//         interestShare: 0,
//         principalShare: 0,
//       };
//     }

//     const monthlyRate = rate / 12 / 100;
//     const emi =
//       (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
//       (Math.pow(1 + monthlyRate, months) - 1);

//     const totalPayment = emi * months;
//     const totalInterest = totalPayment - principal;
//     const interestShare = (totalInterest / totalPayment) * 100;
//     const principalShare = (principal / totalPayment) * 100;

//     return {
//       emi,
//       totalPayment,
//       totalInterest,
//       interestShare,
//       principalShare,
//     };
//   }, [loanAmount, annualRate, tenureMonths]);

//   return (
//     <section id="emi" className="bg-slate-50 py-16 sm:py-20">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="mx-auto max-w-2xl text-center">
//           <h2 className="text-3xl font-bold text-slate-900">
//             EMI Calculator
//           </h2>
//           <p className="mt-4 text-lg text-slate-600">
//             Estimate your monthly EMI and understand the repayment breakdown
//             before submitting your application.
//           </p>
//         </div>

//         <div className="mt-12 grid gap-8 lg:grid-cols-2">
//           {/* LEFT SIDE (UNCHANGED) */}
//           <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
//             <h3 className="text-xl font-semibold text-slate-900">
//               Loan Details
//             </h3>

//             <div className="mt-8 space-y-8">
//               <div>
//                 <div className="mb-3 flex items-center justify-between">
//                   <label className="text-sm font-medium text-slate-700">
//                     Loan Amount
//                   </label>
//                   <span className="text-sm font-semibold text-blue-600">
//                     {formatCurrency(loanAmount)}
//                   </span>
//                 </div>
//                 <input
//                   type="range"
//                   min="50000"
//                   max="5000000"
//                   step="10000"
//                   value={loanAmount}
//                   onChange={(e) => setLoanAmount(e.target.value)}
//                   className="w-full"
//                 />
//                 <input
//                   type="number"
//                   value={loanAmount}
//                   onChange={(e) => setLoanAmount(e.target.value)}
//                   className="mt-3 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
//                 />
//               </div>

//               <div>
//                 <div className="mb-3 flex items-center justify-between">
//                   <label className="text-sm font-medium text-slate-700">
//                     Interest Rate
//                   </label>
//                   <span className="text-sm font-semibold text-blue-600">
//                     {annualRate}% p.a.
//                   </span>
//                 </div>
//                 <input
//                   type="range"
//                   min="5"
//                   max="30"
//                   step="0.1"
//                   value={annualRate}
//                   onChange={(e) => setAnnualRate(e.target.value)}
//                   className="w-full"
//                 />
//                 <input
//                   type="number"
//                   value={annualRate}
//                   onChange={(e) => setAnnualRate(e.target.value)}
//                   className="mt-3 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
//                 />
//               </div>

//               <div>
//                 <div className="mb-3 flex items-center justify-between">
//                   <label className="text-sm font-medium text-slate-700">
//                     Tenure
//                   </label>
//                   <span className="text-sm font-semibold text-blue-600">
//                     {tenureMonths} months
//                   </span>
//                 </div>
//                 <input
//                   type="range"
//                   min="6"
//                   max="84"
//                   step="1"
//                   value={tenureMonths}
//                   onChange={(e) => setTenureMonths(e.target.value)}
//                   className="w-full"
//                 />
//                 <input
//                   type="number"
//                   value={tenureMonths}
//                   onChange={(e) => setTenureMonths(e.target.value)}
//                   className="mt-3 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* RIGHT SIDE (UNCHANGED except button) */}
//           <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
//             <div className="rounded-2xl bg-blue-600 p-6 text-white">
//               <p className="text-sm font-medium text-blue-100">Estimated EMI</p>
//               <h3 className="mt-2 text-4xl font-bold">
//                 {formatCurrency(analytics.emi)}
//               </h3>
//               <p className="mt-2 text-sm text-blue-100">
//                 Monthly repayment based on selected loan inputs.
//               </p>
//             </div>

//             <div className="mt-8 grid gap-4 sm:grid-cols-2">
//               <div className="rounded-2xl bg-slate-50 p-5">
//                 <p className="text-sm text-slate-500">Principal Amount</p>
//                 <p className="mt-2 text-xl font-semibold text-slate-900">
//                   {formatCurrency(loanAmount)}
//                 </p>
//               </div>

//               <div className="rounded-2xl bg-slate-50 p-5">
//                 <p className="text-sm text-slate-500">Total Interest</p>
//                 <p className="mt-2 text-xl font-semibold text-slate-900">
//                   {formatCurrency(analytics.totalInterest)}
//                 </p>
//               </div>

//               <div className="rounded-2xl bg-slate-50 p-5">
//                 <p className="text-sm text-slate-500">Total Payment</p>
//                 <p className="mt-2 text-xl font-semibold text-slate-900">
//                   {formatCurrency(analytics.totalPayment)}
//                 </p>
//               </div>

//               <div className="rounded-2xl bg-slate-50 p-5">
//                 <p className="text-sm text-slate-500">Tenure</p>
//                 <p className="mt-2 text-xl font-semibold text-slate-900">
//                   {tenureMonths} Months
//                 </p>
//               </div>
//             </div>

//             <div className="mt-8">
//               <div className="mb-3 flex items-center justify-between text-sm font-medium text-slate-700">
//                 <span>Repayment Analytics</span>
//                 <span>
//                   Principal {analytics.principalShare.toFixed(1)}% / Interest{" "}
//                   {analytics.interestShare.toFixed(1)}%
//                 </span>
//               </div>

//               <div className="h-4 overflow-hidden rounded-full bg-slate-200">
//                 <div
//                   className="h-full bg-blue-600"
//                   style={{ width: `${analytics.principalShare || 0}%` }}
//                 />
//               </div>

//               <div className="mt-4 space-y-3">
//                 <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
//                   <span className="text-sm text-slate-600">
//                     Principal Share
//                   </span>
//                   <span className="text-sm font-semibold text-slate-900">
//                     {analytics.principalShare.toFixed(1)}%
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
//                   <span className="text-sm text-slate-600">
//                     Interest Share
//                   </span>
//                   <span className="text-sm font-semibold text-slate-900">
//                     {analytics.interestShare.toFixed(1)}%
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* ✅ ONLY CHANGE HERE */}
//             <button
//               onClick={() => navigate("/apply-loan")}
//               className="mt-8 w-full rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
//             >
//               Apply Based on This EMI
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
// import { useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { trackAction } from "../services/track"; // 🔥 added

// function formatCurrency(value) {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   }).format(value || 0);
// }

// export default function EmiCalculator() {
//   const navigate = useNavigate();

//   const [loanAmount, setLoanAmount] = useState(500000);
//   const [annualRate, setAnnualRate] = useState(12);
//   const [tenureMonths, setTenureMonths] = useState(36);

//   const analytics = useMemo(() => {
//     const principal = Number(loanAmount) || 0;
//     const rate = Number(annualRate) || 0;
//     const months = Number(tenureMonths) || 0;

//     if (!principal || !rate || !months) {
//       return {
//         emi: 0,
//         totalPayment: 0,
//         totalInterest: 0,
//         interestShare: 0,
//         principalShare: 0,
//       };
//     }

//     const monthlyRate = rate / 12 / 100;
//     const emi =
//       (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
//       (Math.pow(1 + monthlyRate, months) - 1);

//     const totalPayment = emi * months;
//     const totalInterest = totalPayment - principal;
//     const interestShare = (totalInterest / totalPayment) * 100;
//     const principalShare = (principal / totalPayment) * 100;

//     return {
//       emi,
//       totalPayment,
//       totalInterest,
//       interestShare,
//       principalShare,
//     };
//   }, [loanAmount, annualRate, tenureMonths]);

//   return (
//     <section id="emi" className="bg-slate-50 py-16 sm:py-20">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="mx-auto max-w-2xl text-center">
//           <h2 className="text-3xl font-bold text-slate-900">
//             EMI Calculator
//           </h2>
//           <p className="mt-4 text-lg text-slate-600">
//             Estimate your monthly EMI and understand the repayment breakdown
//             before submitting your application.
//           </p>
//         </div>

//         <div className="mt-12 grid gap-8 lg:grid-cols-2">
          
//           {/* LEFT SIDE */}
//           <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
//             <h3 className="text-xl font-semibold text-slate-900">
//               Loan Details
//             </h3>

//             <div className="mt-8 space-y-8">
//               {/* 🔥 LOAN AMOUNT UPDATED */}
//               <div>
//                 <div className="mb-3 flex items-center justify-between">
//                   <label className="text-sm font-medium text-slate-700">
//                     Loan Amount
//                   </label>
//                   <span className="text-sm font-semibold text-blue-600">
//                     {formatCurrency(loanAmount)}
//                   </span>
//                 </div>
//                 <input
//                   type="range"
//                   min="50000"
//                   max="100000000" // 🔥 10 CR
//                   step="50000"
//                   value={loanAmount}
//                   onChange={(e) => setLoanAmount(e.target.value)}
//                   className="w-full"
//                 />
//                 <input
//                   type="number"
//                   value={loanAmount}
//                   onChange={(e) => setLoanAmount(e.target.value)}
//                   className="mt-3 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
//                 />
//               </div>

//               {/* INTEREST */}
//               <div>
//                 <div className="mb-3 flex items-center justify-between">
//                   <label className="text-sm font-medium text-slate-700">
//                     Interest Rate
//                   </label>
//                   <span className="text-sm font-semibold text-blue-600">
//                     {annualRate}% p.a.
//                   </span>
//                 </div>
//                 <input
//                   type="range"
//                   min="5"
//                   max="30"
//                   step="0.1"
//                   value={annualRate}
//                   onChange={(e) => setAnnualRate(e.target.value)}
//                   className="w-full"
//                 />
//                 <input
//                   type="number"
//                   value={annualRate}
//                   onChange={(e) => setAnnualRate(e.target.value)}
//                   className="mt-3 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
//                 />
//               </div>

//               {/* 🔥 TENURE UPDATED */}
//               <div>
//                 <div className="mb-3 flex items-center justify-between">
//                   <label className="text-sm font-medium text-slate-700">
//                     Tenure
//                   </label>
//                   <span className="text-sm font-semibold text-blue-600">
//                     {tenureMonths} months
//                   </span>
//                 </div>
//                 <input
//                   type="range"
//                   min="6"
//                   max="120" // 🔥 10 YEARS
//                   step="1"
//                   value={tenureMonths}
//                   onChange={(e) => setTenureMonths(e.target.value)}
//                   className="w-full"
//                 />
//                 <input
//                   type="number"
//                   value={tenureMonths}
//                   onChange={(e) => setTenureMonths(e.target.value)}
//                   className="mt-3 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* RIGHT SIDE */}
//           <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
//             <div className="rounded-2xl bg-blue-600 p-6 text-white">
//               <p className="text-sm font-medium text-blue-100">Estimated EMI</p>
//               <h3 className="mt-2 text-4xl font-bold">
//                 {formatCurrency(analytics.emi)}
//               </h3>
//               <p className="mt-2 text-sm text-blue-100">
//                 Monthly repayment based on selected loan inputs.
//               </p>
//             </div>

//             {/* 🔥 BUTTON UPDATED ONLY */}
//             <button
//               onClick={() => {
//                 trackAction("apply from emi"); // 🔥 tracking
//                 navigate("/apply-loan");
//               }}
//               className="mt-8 w-full rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
//             >
//               Apply Based on This EMI
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { trackAction } from "../services/track";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function formatShort(value) {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)} K`;
  return `₹${Math.round(value)}`;
}

// ── Donut SVG Chart ──────────────────────────────────────────────────────────
function DonutChart({ principalShare, interestShare }) {
  const size = 148;
  const strokeWidth = 16;
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const principalDash = (principalShare / 100) * circumference;
  const interestDash = (interestShare / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f1f5f9" strokeWidth={strokeWidth} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="#f97316" strokeWidth={strokeWidth}
        strokeDasharray={`${interestDash} ${circumference - interestDash}`}
        strokeDashoffset={0} strokeLinecap="butt"
        style={{ transition: "stroke-dasharray 0.5s ease" }}
      />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="#2563eb" strokeWidth={strokeWidth}
        strokeDasharray={`${principalDash} ${circumference - principalDash}`}
        strokeDashoffset={-interestDash} strokeLinecap="butt"
        style={{ transition: "stroke-dasharray 0.5s ease" }}
      />
    </svg>
  );
}

export default function EmiCalculator() {
  const navigate = useNavigate();

  const [loanAmount, setLoanAmount] = useState(500000);
  const [annualRate, setAnnualRate] = useState(12);
  const [tenureMonths, setTenureMonths] = useState(36);

  const analytics = useMemo(() => {
    const principal = Number(loanAmount) || 0;
    const rate = Number(annualRate) || 0;
    const months = Number(tenureMonths) || 0;

    if (!principal || !rate || !months)
      return { emi: 0, totalPayment: 0, totalInterest: 0, interestShare: 0, principalShare: 0 };

    const monthlyRate = rate / 12 / 100;
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;
    const interestShare = (totalInterest / totalPayment) * 100;
    const principalShare = (principal / totalPayment) * 100;

    return { emi, totalPayment, totalInterest, interestShare, principalShare };
  }, [loanAmount, annualRate, tenureMonths]);

  // First 6 months amortization
  const schedule = useMemo(() => {
    const principal = Number(loanAmount) || 0;
    const rate = Number(annualRate) || 0;
    const months = Number(tenureMonths) || 0;
    if (!principal || !rate || !months) return [];

    const monthlyRate = rate / 12 / 100;
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    let balance = principal;
    const rows = [];
    for (let i = 1; i <= Math.min(6, months); i++) {
      const interest = balance * monthlyRate;
      const principalPaid = emi - interest;
      balance -= principalPaid;
      rows.push({ month: i, emi, principal: principalPaid, interest, balance: Math.max(0, balance) });
    }
    return rows;
  }, [loanAmount, annualRate, tenureMonths]);

  return (
    <section id="emi" className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
            EMI Calculator
          </span>
          <h2 className="mt-4 text-3xl font-bold text-slate-900">Plan Your Loan Repayment</h2>
          <p className="mt-4 text-lg text-slate-600">
            Estimate your monthly EMI and understand the repayment breakdown before submitting your application.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">

          {/* ── LEFT: Inputs ── */}
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <h3 className="text-xl font-semibold text-slate-900">Loan Details</h3>

            <div className="mt-8 space-y-8">
              {/* Loan Amount */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700">Loan Amount</label>
                  <span className="text-sm font-semibold text-blue-600">{formatCurrency(loanAmount)}</span>
                </div>
                <input type="range" min="50000" max="100000000" step="50000" value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)} className="w-full accent-blue-600" />
                <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)}
                  className="mt-3 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
              </div>

              {/* Interest Rate */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700">Interest Rate</label>
                  <span className="text-sm font-semibold text-blue-600">{annualRate}% p.a.</span>
                </div>
                <input type="range" min="5" max="30" step="0.1" value={annualRate}
                  onChange={(e) => setAnnualRate(e.target.value)} className="w-full accent-blue-600" />
                <input type="number" value={annualRate} onChange={(e) => setAnnualRate(e.target.value)}
                  className="mt-3 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
              </div>

              {/* Tenure */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700">Tenure</label>
                  <span className="text-sm font-semibold text-blue-600">{tenureMonths} months</span>
                </div>
                <input type="range" min="6" max="360" step="1" value={tenureMonths}
                  onChange={(e) => setTenureMonths(e.target.value)} className="w-full accent-blue-600" />
                <input type="number" value={tenureMonths} onChange={(e) => setTenureMonths(e.target.value)}
                  className="mt-3 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
              </div>
            </div>
          </div>

          {/* ── RIGHT: Results (single card, matching left height) ── */}
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 flex flex-col gap-6">

            {/* 1. EMI Hero */}
            <div className="rounded-2xl bg-blue-600 p-6 text-white">
              <p className="text-sm font-medium text-blue-200">Estimated Monthly EMI</p>
              <h3 className="mt-1.5 text-4xl font-bold tracking-tight">{formatCurrency(analytics.emi)}</h3>
              <p className="mt-1.5 text-sm text-blue-200">Per month for {tenureMonths} months</p>
            </div>

            {/* 2. Four Info Tiles */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Principal Amount", value: formatCurrency(loanAmount), accent: false },
                { label: "Total Interest",   value: formatCurrency(analytics.totalInterest), accent: true },
                { label: "Total Payment",    value: formatCurrency(analytics.totalPayment), accent: false },
                { label: "Tenure",           value: `${tenureMonths} Months`, accent: false },
              ].map((tile) => (
                <div key={tile.label} className="rounded-2xl bg-slate-50 px-4 py-4">
                  <p className="text-xs text-slate-500">{tile.label}</p>
                  <p className={`mt-1.5 text-lg font-semibold ${tile.accent ? "text-orange-500" : "text-slate-900"}`}>
                    {tile.value}
                  </p>
                </div>
              ))}
            </div>

            {/* 3. Repayment Analytics */}
            <div>
              <div className="mb-3 flex items-center justify-between text-sm font-medium text-slate-700">
                <span>Repayment Analytics</span>
                <span className="text-xs text-slate-400">
                  Principal {analytics.principalShare.toFixed(1)}% / Interest {analytics.interestShare.toFixed(1)}%
                </span>
              </div>

              {/* Segmented bar */}
              <div className="flex h-3 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full bg-blue-600 transition-all duration-500"
                  style={{ width: `${analytics.principalShare || 0}%` }} />
                <div className="h-full bg-orange-400 transition-all duration-500"
                  style={{ width: `${analytics.interestShare || 0}%` }} />
              </div>

              {/* Donut + share rows */}
              <div className="mt-5 flex items-center gap-5">
                <div className="relative shrink-0">
                  <DonutChart principalShare={analytics.principalShare} interestShare={analytics.interestShare} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] font-medium text-slate-400">Split</span>
                  </div>
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                    <span className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-600" />
                      Principal Share
                    </span>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-900">{analytics.principalShare.toFixed(1)}%</p>
                      <p className="text-xs text-slate-400">{formatShort(loanAmount)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                    <span className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-orange-400" />
                      Interest Share
                    </span>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-900">{analytics.interestShare.toFixed(1)}%</p>
                      <p className="text-xs text-slate-400">{formatShort(analytics.totalInterest)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Repayment Schedule */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Repayment Schedule</span>
                <span className="text-xs text-slate-400">First 6 months</span>
              </div>
              <div className="overflow-x-auto rounded-2xl ring-1 ring-slate-100">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-3 py-2.5 text-left text-xs font-medium text-slate-400">Mo.</th>
                      <th className="px-3 py-2.5 text-right text-xs font-medium text-slate-400">EMI</th>
                      <th className="px-3 py-2.5 text-right text-xs font-medium text-blue-500">Principal</th>
                      <th className="px-3 py-2.5 text-right text-xs font-medium text-orange-400">Interest</th>
                      <th className="px-3 py-2.5 text-right text-xs font-medium text-slate-400">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((row, idx) => (
                      <tr key={row.month}
                        className={`border-t border-slate-50 transition-colors hover:bg-blue-50/40 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/40"}`}>
                        <td className="px-3 py-2.5 text-slate-500">{row.month}</td>
                        <td className="px-3 py-2.5 text-right font-medium text-slate-700">{formatShort(row.emi)}</td>
                        <td className="px-3 py-2.5 text-right font-medium text-blue-600">{formatShort(row.principal)}</td>
                        <td className="px-3 py-2.5 text-right font-medium text-orange-400">{formatShort(row.interest)}</td>
                        <td className="px-3 py-2.5 text-right text-slate-500">{formatShort(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 5. CTA */}
            <button
              onClick={() => { trackAction("apply from emi"); navigate("/apply-loan"); }}
              className="mt-auto w-full rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-95"
            >
              Apply Based on This EMI →
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}