const steps = [
  {
    step: "01",
    title: "Check EMI",
    desc: "Use the EMI calculator to estimate your monthly repayment and plan your loan.",
  },
  {
    step: "02",
    title: "Fill Application",
    desc: "Enter your personal, employment, and loan details in a simple form.",
  },
  {
    step: "03",
    title: "Give Consent",
    desc: "Accept terms and provide consent to securely process your application.",
  },
  {
    step: "04",
    title: "Lender Processing",
    desc: "Your application is shared with lenders and status updates are tracked.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
            How It Works
          </h2>
          <p className="mt-3 text-base text-slate-600">
            A simple step-by-step process to complete your loan journey smoothly.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {steps.map((item, index) => (
            <div
              key={index}
              className="relative rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6 shadow-sm hover:shadow-md transition"
            >
              {/* Step Number */}
              <div className="absolute -top-3 left-4 sm:left-6 bg-blue-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow">
                {item.step}
              </div>

              <h3 className="mt-3 text-base sm:text-lg font-bold tracking-tight text-slate-900">
                {item.title}
              </h3>

              <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}