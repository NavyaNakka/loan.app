import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { trackAction } from "../services/track";
import EmiCalculator from "./EmiCalculator";
import Faq from "./Faq";
import Footer from "./Footer";

const products = [
  // Active (eligible) products — shown first
  { title: "Personal Loan", note: "Up to Rs. 15 Lakh", image: "/loan-images/personal-loan.svg", active: true, motion: "drift", accent: "from-blue-100 via-cyan-50 to-white" },
  { title: "Business Loan", note: "For growth and cash flow", image: "/loan-images/business-loan.svg", active: true, motion: "tilt", accent: "from-emerald-100 via-teal-50 to-white" },
  { title: "Credit Card", note: "Cards matched to profile", image: "/loan-images/credit-card.svg", active: true, motion: "orbit", accent: "from-violet-100 via-fuchsia-50 to-white" },
  // Coming soon — shown at bottom
  { title: "Gold Loan", note: "Fast secured funding", image: "/loan-images/gold-loan.svg", active: false, motion: "pulse", accent: "from-amber-100 via-yellow-50 to-white" },
  { title: "Home Loan", note: "Long tenure options", image: "/loan-images/home-loan.svg", active: false, motion: "rise", accent: "from-sky-100 via-blue-50 to-white" },
  { title: "Education Loan", note: "Study with confidence", image: "/loan-images/education-loan.svg", active: false, motion: "swing", accent: "from-pink-100 via-rose-50 to-white" },
  { title: "Car Loan", note: "New car financing", image: "/loan-images/car-loan.svg", active: false, motion: "drift", accent: "from-orange-100 via-amber-50 to-white" },
  { title: "LAP", note: "Loan against property", image: "/loan-images/lap-loan.svg", active: false, motion: "tilt", accent: "from-cyan-100 via-sky-50 to-white" },
  { title: "Bike Loan", note: "Quick two-wheeler finance", image: "/loan-images/bike-loan.svg", active: false, motion: "orbit", accent: "from-lime-100 via-green-50 to-white" },
  { title: "Used Car", note: "Affordable pre-owned finance", image: "/loan-images/used-car-loan.svg", active: false, motion: "rise", accent: "from-slate-200 via-slate-50 to-white" },
  { title: "Health Card", note: "Medical expense support", image: "/loan-images/health-card.svg", active: false, motion: "pulse", accent: "from-red-100 via-rose-50 to-white" },
  { title: "Credit Score Check", note: "Know your credit health", image: "/loan-images/credit-score.svg", active: false, motion: "swing", accent: "from-indigo-100 via-blue-50 to-white" },
];

const steps = [
  { id: "01", title: "Personal Details", desc: "Share basic information to start your application." },
  { id: "02", title: "PAN Verification", desc: "Secure PAN verification to assess loan eligibility." },
  { id: "03", title: "Employment Details", desc: "Add income and job details to get lender matches." },
  { id: "04", title: "Submit & Track", desc: "Submit once and track status updates from lenders." },
];

export default function InspiredHome() {
  const prefersReducedMotion = useReducedMotion();

  const getLogoMotion = (motionType, active, index) => {
    if (prefersReducedMotion) {
      return {};
    }

    const direction = index % 2 === 0 ? 1 : -1;
    const shared = {
      initial: { x: 0, y: 0, rotate: 0, scale: 1 },
      transition: {
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.1,
      },
      whileHover: {
        x: 0,
        y: -6,
        rotate: 0,
        scale: active ? 1.1 : 1.07,
        transition: { duration: 0.2 },
      },
    };

    const variants = {
      drift: {
        ...shared,
        animate: {
          x: [0, 10 * direction, -4 * direction, 0],
          y: [0, -8, -2, 0],
          rotate: [0, 2 * direction, -1 * direction, 0],
          scale: [1, 1.04, 1.01, 1],
        },
        transition: { ...shared.transition, duration: 4.2 },
      },
      tilt: {
        ...shared,
        animate: {
          rotate: [0, 5 * direction, -3 * direction, 0],
          y: [0, -4, 0, -2, 0],
          scale: [1, 1.03, 0.99, 1],
        },
        transition: { ...shared.transition, duration: 3.6 },
      },
      orbit: {
        ...shared,
        animate: {
          x: [0, 6 * direction, 0, -6 * direction, 0],
          y: [0, -3, -8, -3, 0],
          rotate: [0, 3 * direction, 0, -3 * direction, 0],
          scale: [1, 1.02, 1.05, 1.02, 1],
        },
        transition: { ...shared.transition, duration: 4.8 },
      },
      pulse: {
        ...shared,
        animate: {
          scale: [1, 1.08, 1, 1.05, 1],
          y: [0, -2, 0, -4, 0],
          rotate: [0, 1.5 * direction, 0],
        },
        transition: { ...shared.transition, duration: 3.4 },
      },
      rise: {
        ...shared,
        animate: {
          y: [0, -10, -3, 0],
          x: [0, 3 * direction, 0],
          scale: [1, 1.03, 1],
        },
        transition: { ...shared.transition, duration: 3.9 },
      },
      swing: {
        ...shared,
        animate: {
          rotate: [0, 4 * direction, 0, -4 * direction, 0],
          x: [0, 4 * direction, 0, -4 * direction, 0],
          y: [0, -3, 0],
        },
        transition: { ...shared.transition, duration: 4.4 },
      },
    };

    return variants[motionType] || variants.drift;
  };

  const getHaloMotion = (index) => {
    if (prefersReducedMotion) {
      return {};
    }

    return {
      animate: {
        scale: [1, 1.12, 0.96, 1],
        opacity: [0.28, 0.45, 0.22, 0.28],
      },
      transition: {
        duration: 3.6 + (index % 4) * 0.35,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.08,
      },
    };
  };

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-white">
        <div className="absolute -top-32 right-0 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl" />
        <div className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pt-14">
          <div className="pt-2 lg:pt-8">
            <p className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-blue-700">
              Apply Online
            </p>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Quick Loans Matched to Your Eligibility
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              100% digital process, flexible EMI tenure, and lender options curated for your eligibility. Apply quickly and track your progress from one dashboard.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/apply-loan"
                onClick={() => trackAction("hero apply now")}
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
              >
                Apply Now
              </Link>
              <a
                href="#process"
                onClick={() => trackAction("hero process click")}
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
              >
                See Process
              </a>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-2">
              {[
                { value: "100%", label: "Digital Process" },
                { value: "Fast", label: "Approval Checks" },
                { value: "Safe", label: "Secure & Private" },
                { value: "Multi", label: "Lender Options" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-3 text-center shadow-sm">
                  <p className="text-lg font-extrabold text-slate-900">{item.value}</p>
                  <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Check Eligibility</p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-900">Get matched in minutes</h2>
            <p className="mt-2 text-sm text-slate-600">No long paperwork. Share details, verify PAN, and receive lender options quickly.</p>

            <ul className="mt-5 space-y-2.5">
              {[
                "Enter basic details — name, PAN & pincode",
                "Verify with OTP — quick & secure",
                "Share loan requirement & income",
                "Get matched with suitable lenders",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-extrabold text-white">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ul>

            <Link
              to="/apply-loan"
              onClick={() => trackAction("eligibility cta")}
              className="mt-5 block rounded-xl bg-emerald-500 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-emerald-600"
            >
              Check Your Eligibility
            </Link>

            <p className="mt-3 text-xs text-slate-500">By continuing, you agree to our terms and privacy policy.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-700">Loans and cards</p>
            <h3 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">Choose from top financial products</h3>
          </div>
          <Link to="/apply-loan" className="hidden text-sm font-bold text-blue-700 sm:block">View all</Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((item, index) => {
            const CardTag = item.active ? Link : "div";

            return (
              <CardTag
                key={item.title}
                {...(item.active ? { to: "/apply-loan" } : {})}
                className={`group relative flex items-center gap-3 rounded-2xl border p-3 shadow-sm transition ${
                  item.active
                    ? "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                    : "border-slate-200 bg-slate-50/80 opacity-90"
                }`}
              >
                {!item.active && (
                  <span className="absolute right-3 top-3 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">
                    Coming Soon
                  </span>
                )}
                <div className={`relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-br ${item.accent}`}>
                  <motion.div
                    {...getHaloMotion(index)}
                    className="absolute inset-2 rounded-full bg-white/70 blur-md"
                  />
                  <motion.div
                    {...getLogoMotion(item.motion, item.active, index)}
                    className="relative z-10 flex h-14 w-14 items-center justify-center"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`h-14 w-14 object-contain transition duration-300 ${item.active ? "group-hover:scale-[1.06]" : "opacity-85"}`}
                      loading="lazy"
                    />
                  </motion.div>
                </div>
                <div className="min-w-0 flex-1 pr-20">
                  <p className="truncate text-[13px] font-bold leading-snug text-slate-900">{item.title}</p>
                  <p className="mt-0.5 text-[11px] leading-4 text-slate-500">{item.note}</p>
                </div>
              </CardTag>
            );
          })}
        </div>
      </section>

      <section id="process" className="bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-700">Application process</p>
          <h3 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">Get loan online in a few clicks</h3>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-extrabold text-blue-700">{step.id}</p>
                <p className="mt-2 text-lg font-bold text-slate-900">{step.title}</p>
                <p className="mt-1.5 text-sm text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EmiCalculator />

      <section className="bg-slate-900 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-extrabold sm:text-3xl">One platform for every borrowing need</h3>
          <p className="mt-3 max-w-2xl text-sm text-slate-200 sm:text-base">
            Compare options, apply once, and track status updates without confusion. Kredit Konnect keeps your loan journey clear from start to finish.
          </p>
          <Link
            to="/apply-loan"
            onClick={() => trackAction("bottom cta apply")}
            className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
          >
            Start Application
          </Link>
        </div>
      </section>

      <Faq />
      <Footer />
    </>
  );
}
