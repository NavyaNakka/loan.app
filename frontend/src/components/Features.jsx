const features = [
  {
    title: "Instant EMI Check",
    desc: "Quickly estimate your monthly EMI before applying for a loan.",
  },
  {
    title: "Simple Application",
    desc: "Fill your loan application in a clean and guided process.",
  },
  {
    title: "Secure Process",
    desc: "Your data is handled safely with consent-based submission.",
  },
  {
    title: "Multiple Lenders",
    desc: "Your application can be shared with multiple lending partners.",
  },
  {
    title: "Live Tracking",
    desc: "Track your application status anytime with transparency.",
  },
  {
    title: "Fast Processing",
    desc: "Efficient backend ensures quicker response and updates.",
  },
];

export default function Features() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900">
            Why Choose Our Platform
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            A professional and transparent loan journey designed for speed,
            simplicity, and security.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="text-xl font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-3 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}