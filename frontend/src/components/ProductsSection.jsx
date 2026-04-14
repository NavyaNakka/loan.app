
import { useNavigate } from "react-router-dom";
import { trackAction } from "../services/track";
import { motion, useReducedMotion } from "framer-motion";
import { Banknote, Wallet, CreditCard, Landmark, TrendingUp, Coins, FileText, BarChart4 } from "lucide-react";

const products = [
  {
    title: "Personal Loan",
    desc: "Get upto ₹25L in 10 mins",
    icon: Banknote,
  },
  {
    title: "Small Amount Loan",
    desc: "Get upto ₹1L with instant approval",
    icon: Wallet,
  },
  {
    title: "Credit Card",
    desc: "Choose cards from all top banks",
    icon: CreditCard,
  },
  {
    title: "Business Loan",
    desc: "Quick unsecured loan upto ₹1Cr",
    icon: Landmark,
  },
  {
    title: "Score Plus",
    desc: "Increase your credit score to 800+",
    icon: TrendingUp,
  },
  {
    title: "Gold Loan",
    desc: "Interest rates starting from 0.49%*",
    icon: Coins,
  },
];

const services = [
  {
    title: "Credit Report",
    desc: "Check your credit score for FREE!",
    icon: FileText,
  },
  {
    title: "Loan Against Mutual Funds and Stocks",
    desc: "Instant loans up to ₹1 Crore",
    icon: BarChart4,
  },
];

function Card({ title, desc, icon: Icon, onClick, clickable, motionProps }) {
  return (
    <motion.div
      onClick={onClick}
      {...motionProps}
      className={`group bg-white p-4 sm:p-6 lg:p-8 transition-all duration-300 relative z-10 
      ${clickable ? "cursor-pointer hover:bg-slate-50 hover:shadow-xl hover:shadow-blue-900/5" : ""}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-slate-50 text-blue-600 ring-1 ring-slate-100 transition-colors group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-600">
          <Icon size={20} strokeWidth={1.5} className="sm:h-6 sm:w-6 h-5 w-5" />
        </div>
        <span className="text-lg sm:text-xl text-slate-300 transition-colors group-hover:text-blue-600">
          ↗
        </span>
      </div>

      <h3 className="mt-4 sm:mt-5 text-sm sm:text-lg lg:text-xl font-bold text-slate-900 tracking-tight">
        {title}
      </h3>

      <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed pr-2">
        {desc}
      </p>
    </motion.div>
  );
}

export default function ProductsSection() {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const clickableTitles = [
    "Personal Loan",
    "Small Amount Loan",
    "Business Loan",
    "Gold Loan",
  ];

  const handleCardClick = (title, isClickable) => {
    trackAction(title.toLowerCase());

    if (isClickable) {
      if (title === "Personal Loan") { navigate("/apply-loan?type=personal_loan"); }
      else if (title === "Small Amount Loan") { navigate("/apply-loan?type=personal_loan"); }
      else if (title === "Business Loan") { navigate("/apply-loan?type=business_loan"); }
      else if (title === "Gold Loan") { navigate("/apply-loan?type=gold_loan"); }
      else { navigate("/apply-loan"); }
    }
  };

  const getBoomerangMotion = (index) => {
    if (prefersReducedMotion) {
      return {};
    }

    const direction = index % 2 === 0 ? 1 : -1;

    return {
      initial: { x: 0, y: 0, rotate: 0 },
      animate: {
        x: [0, 7 * direction, 0],
        y: [0, -5, 0],
        rotate: [0, 1.5 * direction, 0],
      },
      transition: {
        duration: 3.2 + (index % 3) * 0.35,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.12,
      },
      whileHover: {
        x: 0,
        y: -8,
        rotate: 0,
        transition: { duration: 0.2 },
      },
    };
  };

  return (
    <section className="bg-slate-50/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Products */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">Premium Loan Products</h2>
          <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
            The right financial product for your needs is just a click away. Experience seamless, digitized lending.
          </p>
        </div>

        <div className="mt-10 sm:mt-14 mx-auto max-w-6xl overflow-hidden rounded-3xl bg-slate-200 ring-1 ring-slate-200 shadow-xl shadow-slate-200/50">
          <div className="grid grid-cols-2 gap-[1px] lg:grid-cols-3 bg-slate-200">
            {products.map((item, index) => {
              const isClickable = clickableTitles.includes(item.title);

              return (
                <Card
                  key={index}
                  title={item.title}
                  desc={item.desc}
                  icon={item.icon}
                  clickable={true}
                  motionProps={getBoomerangMotion(index)}
                  onClick={() => handleCardClick(item.title, isClickable)}
                />
              );
            })}
          </div>
        </div>

        {/* Services */}
        <div className="mt-24 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Other Services
          </h2>
        </div>

        <div className="mt-10 sm:mt-12 mx-auto max-w-4xl overflow-hidden rounded-3xl bg-slate-200 ring-1 ring-slate-200 shadow-xl shadow-slate-200/50">
          <div className="grid grid-cols-2 gap-[1px] bg-slate-200">
            {services.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                desc={item.desc}
                icon={item.icon}
                clickable={true}
                motionProps={getBoomerangMotion(index + products.length)}
                onClick={() => handleCardClick(item.title, false)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}