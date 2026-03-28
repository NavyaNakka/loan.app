// import { useState } from "react";
// import { Link } from "react-router-dom";

// const categories = [
//   { id: "all", label: "All Questions" },
//   { id: "eligibility", label: "Eligibility" },
//   { id: "loans", label: "Loan Products" },
//   { id: "process", label: "Process" },
//   { id: "repayment", label: "Repayment" },
// ];

// const faqs = [
//   {
//     cat: "eligibility",
//     q: "Who is eligible to apply for a loan?",
//     a: "Any Indian resident aged 21–60 years with a stable income — salaried or self-employed — can apply. You will need a valid phone number, pincode, and basic KYC documents (Aadhaar & PAN) to get started.",
//   },
//   {
//     cat: "eligibility",
//     q: "What is the minimum income required to qualify?",
//     a: "For personal and business loans, a minimum yearly income of ₹1,80,000 is required. For home loans and gold loans, eligibility is primarily assessed on collateral value and your overall repayment capacity.",
//   },
//   {
//     cat: "eligibility",
//     q: "Does my credit score affect my application?",
//     a: "Yes. A CIBIL score of 700 and above significantly improves your chances of approval and may help you secure a lower interest rate. Applicants with lower scores are still considered on a case-by-case basis.",
//   },
//   {
//     cat: "loans",
//     q: "What types of loans can I apply for?",
//     a: "We offer Personal Loans, Business Loans, Gold Loans, and Home Loans — each designed with tailored interest rates, tenure options, and eligibility criteria to match your specific financial goals.",
//   },
//   {
//     cat: "loans",
//     q: "What is the maximum loan amount available?",
//     a: "Personal Loans up to ₹50 Lakhs, Business Loans up to ₹2 Crore, Gold Loans based on gold valuation, and Home Loans up to ₹10 Crore subject to property assessment and creditworthiness.",
//   },
//   {
//     cat: "loans",
//     q: "What tenure options are available?",
//     a: "Tenures range from 6 months to 360 months (30 years) depending on the loan type. Use our EMI Calculator to find the tenure that best fits your monthly budget before applying.",
//   },
//   {
//     cat: "process",
//     q: "How long does approval and disbursal take?",
//     a: "Most applications receive a preliminary decision within 24–48 hours. Final disbursal typically completes within 3–7 working days after document verification and lender approval.",
//   },
//   {
//     cat: "process",
//     q: "What documents are required to apply?",
//     a: "You will need KYC documents (Aadhaar, PAN), income proof (salary slips or ITR), 3–6 months of bank statements, and address proof. Some loan types may require additional documentation.",
//   },
//   {
//     cat: "process",
//     q: "Can I track my application after submission?",
//     a: "Yes. Once submitted, you will receive real-time SMS and email updates at every stage — from initial review to approval and final disbursement into your account.",
//   },
//   {
//     cat: "repayment",
//     q: "Are there prepayment or foreclosure charges?",
//     a: "Prepayment charges vary by loan type and lending partner. Many of our products offer zero prepayment penalties after a minimum lock-in period. Full details are disclosed in your loan agreement.",
//   },
//   {
//     cat: "repayment",
//     q: "What happens if I miss an EMI payment?",
//     a: "A missed EMI will attract a late payment fee and may negatively impact your CIBIL score. We strongly recommend setting up auto-debit to ensure timely, hassle-free payments every month.",
//   },
//   {
//     cat: "repayment",
//     q: "Can I change my EMI date after disbursal?",
//     a: "Yes, most of our lending partners allow a one-time EMI date change request within the first 3 months of loan disbursal. Contact our support team to initiate the request.",
//   },
// ];

// function FAQItem({ q, a, index }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <div
//       className={`group rounded-2xl border transition-all duration-300 ${
//         open
//           ? "border-blue-200 bg-gradient-to-br from-blue-50/60 to-white shadow-sm"
//           : "border-slate-200 bg-white hover:border-blue-200 hover:shadow-sm"
//       }`}
//     >
//       <button
//         onClick={() => setOpen((p) => !p)}
//         className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
//       >
//         <div className="flex items-start gap-4">
//           <span
//             className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors ${
//               open ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600"
//             }`}
//           >
//             {String(index + 1).padStart(2, "0")}
//           </span>
//           <span className={`text-sm font-semibold leading-snug ${open ? "text-blue-700" : "text-slate-800"}`}>
//             {q}
//           </span>
//         </div>

//         <span
//           className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
//             open ? "bg-blue-600 text-white rotate-180" : "bg-slate-100 text-slate-500"
//           }`}
//         >
//           <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//             <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//           </svg>
//         </span>
//       </button>

//       <div
//         className={`overflow-hidden transition-all duration-300 ease-in-out ${
//           open ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
//         }`}
//       >
//         <div className="flex gap-4 px-6 pb-5">
//           <span className="mt-0.5 w-7 shrink-0" /> {/* spacer aligns with question text */}
//           <p className="text-sm leading-relaxed text-slate-600">{a}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function FAQ() {
//   const [active, setActive] = useState("all");

//   const filtered = active === "all" ? faqs : faqs.filter((f) => f.cat === active);

//   const stats = [
//     { value: "₹10 Cr+", label: "Max Loan Amount" },
//     { value: "24 hrs", label: "Approval Time" },
//     { value: "4 Types", label: "Loan Products" },
//     { value: "10K+", label: "Happy Customers" },
//   ];

//   return (
//     <section id="faq" className="relative overflow-hidden bg-slate-50 py-20 sm:py-28">

//       {/* Subtle background decoration */}
//       <div className="pointer-events-none absolute inset-0 overflow-hidden">
//         <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" />
//         <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-slate-200/60 blur-3xl" />
//       </div>

//       <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

//         {/* ── Header ── */}
//         <div className="mx-auto max-w-2xl text-center">
//           <span className="inline-flex rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
//             Got Questions?
//           </span>
//           <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
//             Frequently Asked <br className="hidden sm:block" />
//             <span className="text-blue-600">Questions</span>
//           </h2>
//           <p className="mt-5 text-lg text-slate-500">
//             Everything you need to know about our loan products, application
//             process, and repayment — answered clearly.
//           </p>
//         </div>

//         {/* ── Stats Row ── */}
//         <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
//           {stats.map((s) => (
//             <div key={s.label} className="rounded-2xl bg-white px-5 py-5 text-center shadow-sm ring-1 ring-slate-200">
//               <p className="text-2xl font-bold text-blue-600">{s.value}</p>
//               <p className="mt-1 text-xs font-medium text-slate-500">{s.label}</p>
//             </div>
//           ))}
//         </div>

//         {/* ── Category Tabs ── */}
//         <div className="mt-10 flex flex-wrap justify-center gap-2">
//           {categories.map((cat) => (
//             <button
//               key={cat.id}
//               onClick={() => setActive(cat.id)}
//               className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
//                 active === cat.id
//                   ? "bg-blue-600 text-white shadow-md shadow-blue-200"
//                   : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-blue-300 hover:text-blue-600"
//               }`}
//             >
//               {cat.label}
//               {active === cat.id && (
//                 <span className="ml-2 rounded-full bg-white/20 px-1.5 py-0.5 text-xs">
//                   {filtered.length}
//                 </span>
//               )}
//             </button>
//           ))}
//         </div>

//         {/* ── FAQ List ── */}
//         <div className="mt-8 grid gap-3 lg:grid-cols-2">
//           {filtered.map((item, i) => (
//             <FAQItem key={item.q} q={item.q} a={item.a} index={i} />
//           ))}
//         </div>

//         {/* ── Bottom CTA ── */}
//         <div className="mt-16 overflow-hidden rounded-3xl bg-blue-600">
//           <div className="grid lg:grid-cols-2">

//             {/* Left text */}
//             <div className="px-8 py-10 lg:px-12 lg:py-12">
//               <h3 className="text-2xl font-bold text-white">Still have questions?</h3>
//               <p className="mt-3 text-base text-blue-100">
//                 Our support team is available Monday – Saturday, 9 AM to 6 PM IST. We typically respond within a few hours.
//               </p>
//               <div className="mt-8 flex flex-wrap gap-3">
//                 <a
//                   href="mailto:support@loanapp.in"
//                   className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
//                 >
//                   <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
//                   </svg>
//                   Email Us
//                 </a>
//                 <a
//                   href="tel:+911800000000"
//                   className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/20"
//                 >
//                   <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
//                   </svg>
//                   1800-000-0000
//                 </a>
//               </div>
//             </div>

//             {/* Right quick-info tiles */}
//             <div className="border-t border-white/10 lg:border-l lg:border-t-0">
//               <div className="grid grid-cols-2 divide-x divide-y divide-white/10">
//                 {[
//                   { icon: "🕘", title: "Support Hours", desc: "Mon – Sat, 9 AM – 6 PM IST" },
//                   { icon: "⚡", title: "Response Time", desc: "Within 2–4 business hours" },
//                   { icon: "📋", title: "Apply Online", desc: "100% paperless process" },
//                   { icon: "🔒", title: "Data Security", desc: "256-bit SSL encryption" },
//                 ].map((item) => (
//                   <div key={item.title} className="px-6 py-6">
//                     <span className="text-2xl">{item.icon}</span>
//                     <p className="mt-2 text-sm font-semibold text-white">{item.title}</p>
//                     <p className="mt-0.5 text-xs text-blue-200">{item.desc}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }
import { useState } from "react";
import { Link } from "react-router-dom";

const categories = [
  { id: "eligibility", label: "Eligibility" },
  { id: "loans", label: "Loan Products" },
  { id: "process", label: "Process" },
  { id: "repayment", label: "Repayment" },
];

const faqs = [
  {
    cat: "eligibility",
    q: "Who is eligible to apply for a loan?",
    a: "Any Indian resident aged 21–60 years with a stable income — salaried or self-employed — can apply. You will need a valid phone number, pincode, and basic KYC documents (Aadhaar & PAN) to get started.",
  },
  {
    cat: "eligibility",
    q: "What is the minimum income required to qualify?",
    a: "For personal and business loans, a minimum yearly income of ₹1,80,000 is required. For home loans and gold loans, eligibility is primarily assessed on collateral value and your overall repayment capacity.",
  },
  {
    cat: "eligibility",
    q: "Does my credit score affect my application?",
    a: "Yes. A CIBIL score of 700 and above significantly improves your chances of approval and may help you secure a lower interest rate. Applicants with lower scores are still considered on a case-by-case basis.",
  },
  {
    cat: "loans",
    q: "What types of loans can I apply for?",
    a: "We offer Personal Loans, Business Loans, Gold Loans, and Home Loans — each designed with tailored interest rates, tenure options, and eligibility criteria to match your specific financial goals.",
  },
  {
    cat: "loans",
    q: "What is the maximum loan amount available?",
    a: "Personal Loans up to ₹50 Lakhs, Business Loans up to ₹2 Crore, Gold Loans based on gold valuation, and Home Loans up to ₹10 Crore subject to property assessment and creditworthiness.",
  },
  {
    cat: "loans",
    q: "What tenure options are available?",
    a: "Tenures range from 6 months to 360 months (30 years) depending on the loan type. Use our EMI Calculator to find the tenure that best fits your monthly budget before applying.",
  },
  {
    cat: "process",
    q: "How long does approval and disbursal take?",
    a: "Most applications receive a preliminary decision within 24–48 hours. Final disbursal typically completes within 3–7 working days after document verification and lender approval.",
  },
  {
    cat: "process",
    q: "What documents are required to apply?",
    a: "You will need KYC documents (Aadhaar, PAN), income proof (salary slips or ITR), 3–6 months of bank statements, and address proof. Some loan types may require additional documentation.",
  },
  {
    cat: "process",
    q: "Can I track my application after submission?",
    a: "Yes. Once submitted, you will receive real-time SMS and email updates at every stage — from initial review to approval and final disbursement into your account.",
  },
  {
    cat: "repayment",
    q: "Are there prepayment or foreclosure charges?",
    a: "Prepayment charges vary by loan type and lending partner. Many of our products offer zero prepayment penalties after a minimum lock-in period. Full details are disclosed in your loan agreement.",
  },
  {
    cat: "repayment",
    q: "What happens if I miss an EMI payment?",
    a: "A missed EMI will attract a late payment fee and may negatively impact your CIBIL score. We strongly recommend setting up auto-debit to ensure timely, hassle-free payments every month.",
  },
  {
    cat: "repayment",
    q: "Can I change my EMI date after disbursal?",
    a: "Yes, most of our lending partners allow a one-time EMI date change request within the first 3 months of loan disbursal. Contact our support team to initiate the request.",
  },
];

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`group rounded-2xl border transition-all duration-300 ${
        open
          ? "border-blue-200 bg-gradient-to-br from-blue-50/60 to-white shadow-sm"
          : "border-slate-200 bg-white hover:border-blue-200 hover:shadow-sm"
      }`}
    >
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <div className="flex items-start gap-4">
          <span
            className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors ${
              open ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={`text-sm font-semibold leading-snug ${open ? "text-blue-700" : "text-slate-800"}`}>
            {q}
          </span>
        </div>

        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            open ? "bg-blue-600 text-white rotate-180" : "bg-slate-100 text-slate-500"
          }`}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex gap-4 px-6 pb-5">
          <span className="mt-0.5 w-7 shrink-0" />
          <p className="text-sm leading-relaxed text-slate-600">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [active, setActive] = useState("eligibility");

  const filtered = faqs.filter((f) => f.cat === active);

  const stats = [
    { value: "₹10 Cr+", label: "Max Loan Amount" },
    { value: "24 hrs", label: "Approval Time" },
    { value: "4 Types", label: "Loan Products" },
    { value: "10K+", label: "Happy Customers" },
  ];

  return (
    <section id="faq" className="relative overflow-hidden bg-slate-50 py-20 sm:py-28">

      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-slate-200/60 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
            Got Questions?
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Frequently Asked <br className="hidden sm:block" />
            <span className="text-blue-600">Questions</span>
          </h2>
          <p className="mt-5 text-lg text-slate-500">
            Everything you need to know about our loan products, application
            process, and repayment — answered clearly.
          </p>
        </div>

        {/* ── Stats Row ── */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-white px-5 py-5 text-center shadow-sm ring-1 ring-slate-200">
              <p className="text-2xl font-bold text-blue-600">{s.value}</p>
              <p className="mt-1 text-xs font-medium text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Category Tabs (no "All Questions") ── */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                active === cat.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-blue-300 hover:text-blue-600"
              }`}
            >
              {cat.label}
              {active === cat.id && (
                <span className="ml-2 rounded-full bg-white/20 px-1.5 py-0.5 text-xs">
                  {filtered.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── FAQ List ── */}
        <div className="mt-8 grid gap-3 lg:grid-cols-2">
          {filtered.map((item, i) => (
            <FAQItem key={item.q} q={item.q} a={item.a} index={i} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-16 overflow-hidden rounded-3xl bg-blue-600">
          <div className="grid lg:grid-cols-2">

            {/* Left text */}
            <div className="px-8 py-10 lg:px-12 lg:py-12">
              <h3 className="text-2xl font-bold text-white">Still have questions?</h3>
              <p className="mt-3 text-base text-blue-100">
                Our support team is available Monday – Saturday, 9 AM to 6 PM IST. We typically respond within a few hours.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="mailto:info@kerditkonnect.com"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
                  </svg>
                  Email Us
                </a>
                <a
                  href="tel:+91 9966298631"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/20"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
                  </svg>
                  9966298631
                </a>
              </div>
            </div>

            {/* Right quick-info tiles */}
            <div className="border-t border-white/10 lg:border-l lg:border-t-0">
              <div className="grid grid-cols-2 divide-x divide-y divide-white/10">
                {[
                  { icon: "🕘", title: "Support Hours", desc: "Mon – Sat, 9 AM – 6 PM IST" },
                  { icon: "⚡", title: "Response Time", desc: "Within 2–4 business hours" },
                  { icon: "📋", title: "Apply Online", desc: "100% paperless process" },
                  { icon: "🔒", title: "Data Security", desc: "256-bit SSL encryption" },
                ].map((item) => (
                  <div key={item.title} className="px-6 py-6">
                    <span className="text-2xl">{item.icon}</span>
                    <p className="mt-2 text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-0.5 text-xs text-blue-200">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}