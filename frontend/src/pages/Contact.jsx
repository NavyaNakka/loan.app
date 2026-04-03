import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900">Still Have Questions?</h1>
          <p className="mt-4 text-slate-600 text-lg">
            Our team is here to help you with any queries or support you need.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {/* Phone */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
              </svg>
            </div>
            <h3 className="mt-4 text-sm font-semibold text-slate-900">Phone</h3>
            <p className="mt-1 text-xs text-slate-500">Mon – Sat, 9 AM – 6 PM</p>
            <p className="mt-3 text-sm font-medium text-slate-500">Available via email</p>
          </div>

          {/* Email */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
              </svg>
            </div>
            <h3 className="mt-4 text-sm font-semibold text-slate-900">Email</h3>
            <p className="mt-1 text-xs text-slate-500">We reply within 24 hours</p>
            <a href="mailto:info@kreditkonnect.com" className="mt-3 block text-sm font-medium text-blue-600 hover:underline">
              info@kreditkonnect.com
            </a>
          </div>

          {/* Office */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <h3 className="mt-4 text-sm font-semibold text-slate-900">Office</h3>
            <p className="mt-1 text-xs text-slate-500">Visit us in person</p>
            <p className="mt-3 text-sm font-medium text-slate-700">Hyderabad, Telangana, India</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Send us a message</h2>
          <p className="mt-1 text-sm text-slate-500">Fill out the form and we'll get back to you shortly.</p>

          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Message</label>
              <textarea
                rows={4}
                placeholder="How can we help you?"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
            >
              Send Message
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          Looking to apply for a loan?{" "}
          <Link to="/apply-loan" className="font-medium text-blue-600 hover:underline">
            Apply here →
          </Link>
        </p>
      </div>
    </div>
  );
}
