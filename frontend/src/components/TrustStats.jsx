import CountUp from "react-countup";

const stats = [
  {
    value: 25000000,
    display: "2,50,00,000+",
    label: "Happy Users",
  },
  {
    value: 5000000,
    display: "50,00,000+",
    label: "App Downloads",
  },
  {
    value: 85,
    display: "85+",
    label: "Financial Partners",
  },
  {
    value: 4.5,
    display: "4.5 / 5",
    label: "Customer Rating",
  },
];

export default function TrustStats() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900">
            Your Trust, Our Achievements.
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-4">
          {stats.map((item, index) => (
            <div
              key={index}
              className={`text-center ${
                index !== stats.length - 1
                  ? "md:border-r md:border-blue-200"
                  : ""
              }`}
            >
              <h3 className="text-4xl font-bold text-slate-900">
                <CountUp
                  end={item.value}
                  duration={2}
                  separator=","
                  decimals={item.value % 1 !== 0 ? 1 : 0}
                />
                {item.label === "Customer Rating" ? " / 5" : "+"}
              </h3>

              <p className="mt-3 text-xl text-slate-600">
                {item.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}