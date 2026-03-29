import { Smartphone, FileCheck2, Component, Users } from "lucide-react";

const features = [
  {
    title: "Pre-Approved Offers",
    desc: "Get pre-approved offers with zero hidden charges",
    icon: Smartphone,
  },
  {
    title: "Paperless Process",
    desc: "Completely digital and hassle-free loan process",
    icon: FileCheck2,
  },
  {
    title: "Wide Range of Loan Options",
    desc: "Multiple lenders, one platform.",
    icon: Component,
  },
  {
    title: "Trusted by Millions",
    desc: "Over 2.5 crore satisfied customers",
    icon: Users,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-slate-50/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Why Choose LoanApp?
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
            Fast, easy, and smart financial solutions tailored for your unique needs.
          </p>
        </div>

        {/* Grid */}
        <div className="relative mt-16 grid md:grid-cols-2 lg:gap-8 gap-y-12">

          {/* Vertical Divider (Hidden on Mobile) */}
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent"></div>

          {/* Horizontal Divider (Hidden on Mobile) */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group flex flex-col items-center text-center px-6 py-6 md:py-8 rounded-3xl transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 ring-1 ring-transparent hover:ring-slate-100"
              >
                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-5 transition-colors group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 duration-300 ease-out">
                  <Icon size={24} strokeWidth={1.75} />
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold tracking-tight text-slate-900">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-2.5 text-sm md:text-base leading-relaxed text-slate-600 max-w-sm">
                  {item.desc}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}