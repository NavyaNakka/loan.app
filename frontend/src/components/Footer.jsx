
import { Link } from "react-router-dom";

const loanLinks = [
  { label: "Personal Loan", to: "/apply-loan" },
  { label: "Business Loan", to: "/apply-loan" },
  { label: "Home Loan",     to: "/apply-loan" },
  { label: "Gold Loan",     to: "/apply-loan" },
];

const quickLinks = [
  { label: "EMI Calculator",    to: "/#emi" },
  { label: "Apply for Loan",    to: "/apply-loan" },
  { label: "FAQs",              to: "/#faq" },
 ];

const companyLinks = [
  { label: "About Us",  to: "/about" },
  { label: "Contact",   to: "/contact" },
  // { label: "Careers",   to: "/careers" },
  // { label: "Blog",      to: "/blog" },
  // { label: "Partners",  to: "/partners" },
];

const legalLinks = [
  { label: "Terms & Conditions", to: "/terms" },
  { label: "Privacy Policy",     to: "/privacy" },
  // { label: "Grievance Policy",   to: "/grievance" },
  // { label: "Fair Practices Code",to: "/fair-practices" },
  // { label: "Cookie Policy",      to: "/cookies" },
];

const trustBadges = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    label: "RBI Regulated",
    sub: "Licensed NBFC Partner",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    label: "SSL Secured",
    sub: "256-bit Encryption",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    label: "10,000+ Customers",
    sub: "Trusted Nationwide",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Quick Disbursal",
    sub: "Within 3–7 Working Days",
  },
]

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kredit-konnect-9720b8401/",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },

  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/kreditkonnect",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-slate-900 text-white">

      {/* ── Trust Badges Strip ── */}
      <div className="border-b border-white/10 bg-slate-800/60">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {trustBadges.map((b) => (
              <div key={b.label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
                  {b.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{b.label}</p>
                  <p className="text-xs text-slate-400">{b.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Footer Body ── */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-6">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white ring-1 ring-white/10 overflow-hidden">
                <img src="/kk-logo.svg" alt="KreditKonnect" className="h-full w-full object-contain" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-[19px] font-extrabold tracking-tight text-white">KreditKonnect</span>
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Fast, secure, and transparent loan solutions for every financial need.
              Apply in minutes. Get approved in days. We make borrowing simple.
            </p>

            {/* Contact info */}
            <div className="mt-6 space-y-2.5">
              <a href="mailto:info@kreditkonnect.com" className="flex items-center gap-2.5 text-sm text-slate-400 transition hover:text-white">
                <svg className="h-4 w-4 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
                </svg>
                info@kreditkonnect.com
              </a>
              <p className="flex items-center gap-2.5 text-sm text-slate-400">
                <svg className="h-4 w-4 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Hyderabad, Telangana, India
              </p>
            </div>

            {/* Socials */}
            <div className="mt-6 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-400 transition hover:bg-blue-600 hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-4 sm:grid-cols-4">
            {[
              { heading: "Loan Products", items: loanLinks },
              { heading: "Quick Links",   items: quickLinks },
              { heading: "Company",       items: companyLinks },
              { heading: "Legal",         items: legalLinks },
            ].map(({ heading, items }) => (
              <div key={heading}>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{heading}</p>
                <ul className="mt-4 space-y-2.5">
                  {items.map((item) => (
                    <li key={item.label}>
                      {item.to.startsWith("/#") ? (
                        <button
                          type="button"
                          onClick={() => scrollToSection(item.to.replace("/#", ""))}
                          className="inline-block text-sm text-slate-400 transition hover:text-white hover:translate-x-0.5"
                        >
                          {item.label}
                        </button>
                      ) : (
                        <Link
                          to={item.to}
                          className="text-sm text-slate-400 transition hover:text-white hover:translate-x-0.5 inline-block"
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Disclaimer Box ── */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 px-6 py-5">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-slate-400">Disclaimer</p>
          <p className="text-xs leading-relaxed text-slate-500">
            KreditKonnect is a loan facilitation platform and not a direct lender. All loan products are offered
            by RBI-registered NBFCs and banking partners. Loan approval is subject to credit assessment,
            KYC verification, and lender discretion. Interest rates, charges, and terms may vary based on
            your credit profile and the lending partner assigned to your application. Please read all
            terms and conditions carefully before accepting any loan offer.
          </p>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} KreditKonnect Technologies Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {legalLinks.slice(0, 3).map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="text-xs text-slate-500 transition hover:text-slate-300"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}