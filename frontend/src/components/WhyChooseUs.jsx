const features = [
  {
    title: "Pre-Approved Offers",
    desc: "Get pre-approved offers with zero hidden charges",
    icon: "📱",
  },
  {
    title: "Paperless Process",
    desc: "Completely digital and hassle-free loan process",
    icon: "📄",
  },
  {
    title: "Wide Range of Loan Options",
    desc: "Multiple lenders, one platform.",
    icon: "📊",
  },
  {
    title: "Trusted by Millions",
    desc: "Over 2.5 crore satisfied customers",
    icon: "👥",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900">
            Why Choose LoanApp?
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Fast, easy, and smart financial solutions for everyone!
          </p>
        </div>

        {/* Grid */}
        <div className="relative mt-16 grid md:grid-cols-2">

          {/* Vertical Divider */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-blue-200"></div>

          {/* Horizontal Divider */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-blue-200"></div>

          {features.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center px-6 py-10"
            >
              {/* Icon */}
              <div className="text-5xl mb-4">{item.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-slate-900">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-slate-600 max-w-sm">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}