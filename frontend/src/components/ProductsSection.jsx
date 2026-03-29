
// import { useNavigate } from "react-router-dom";

// const products = [
//   {
//     title: "Personal Loan",
//     desc: "Get upto ₹25L in 10 mins",
//     icon: "💵",
//   },
//   {
//     title: "Small Amount Loan",
//     desc: "Get upto ₹1L with instant approval",
//     icon: "💸",
//   },
//   {
//     title: "Credit Card",
//     desc: "Choose cards from all top banks",
//     icon: "💳",
//   },
//   {
//     title: "Business Loan",
//     desc: "Quick unsecured loan upto ₹1Cr",
//     icon: "🏦",
//   },
//   {
//     title: "Score Plus",
//     desc: "Increase your credit score to 800+",
//     icon: "📈",
//   },
//   {
//     title: "Gold Loan",
//     desc: "Interest rates starting from 0.49%*",
//     icon: "🪙",
//   },
// ];

// const services = [
//   {
//     title: "Credit Report",
//     desc: "Check your credit score for FREE!",
//     icon: "📄",
//   },
//   {
//     title: "Loan Against Mutual Funds and Stocks",
//     desc: "Instant loans up to ₹1 Crore",
//     icon: "📊",
//   },
// ];

// function Card({ title, desc, icon, onClick, clickable }) {
//   return (
//     <div
//       onClick={onClick}
//       className={`group rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition 
//       ${clickable ? "cursor-pointer hover:-translate-y-1 hover:shadow-md" : ""}`}
//     >
//       <div className="flex items-start justify-between">
//         <div className="text-4xl">{icon}</div>
//         <span className="text-2xl text-slate-400 transition group-hover:text-blue-600">
//           ↗
//         </span>
//       </div>

//       <h3 className="mt-6 text-2xl font-semibold text-slate-900">
//         {title}
//       </h3>

//       <p className="mt-3 text-lg text-slate-600">
//         {desc}
//       </p>
//     </div>
//   );
// }

// export default function ProductsSection() {
//   const navigate = useNavigate();

//   const clickableTitles = [
//     "Personal Loan",
//     "Small Amount Loan",
//     "Business Loan",
//     "Gold Loan",
//   ];

//   return (
//     <section className="bg-white py-16 sm:py-20">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
//         {/* Products */}
//         <div className="text-center">
//           <h2 className="text-4xl font-bold text-slate-900">Our Products</h2>
//           <p className="mt-4 text-lg text-slate-600">
//             The right financial product for you is just a click away!
//           </p>
//         </div>

//         <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//           {products.map((item, index) => {
//             const isClickable = clickableTitles.includes(item.title);

//             return (
//               <Card
//                 key={index}
//                 title={item.title}
//                 desc={item.desc}
//                 icon={item.icon}
//                 clickable={isClickable}
//                 onClick={
//                   isClickable
//                     ? () => navigate("/apply-loan")
//                     : undefined
//                 }
//               />
//             );
//           })}
//         </div>

//         {/* Services */}
//         <div className="mt-16 text-center">
//           <h2 className="text-4xl font-bold text-slate-900">
//             Other Services
//           </h2>
//         </div>

//         <div className="mt-12 grid gap-6 md:grid-cols-2">
//           {services.map((item, index) => (
//             <Card
//               key={index}
//               title={item.title}
//               desc={item.desc}
//               icon={item.icon}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
import { useNavigate } from "react-router-dom";
import { trackAction } from "../services/track";
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

function Card({ title, desc, icon: Icon, onClick, clickable }) {
  return (
    <div
      onClick={onClick}
      className={`group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-all duration-300 
      ${clickable ? "cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:ring-blue-500/30 hover:border-blue-200" : ""}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
          <Icon size={28} strokeWidth={1.5} />
        </div>
        <span className="text-2xl text-slate-300 transition-colors group-hover:text-blue-600">
          ↗
        </span>
      </div>

      <h3 className="mt-6 text-xl md:text-2xl font-semibold text-slate-900 tracking-tight">
        {title}
      </h3>

      <p className="mt-3 text-base md:text-lg text-slate-600 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

export default function ProductsSection() {
  const navigate = useNavigate();

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

  return (
    <section className="bg-slate-50/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Products */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">Premium Loan Products</h2>
          <p className="mt-6 text-lg md:text-xl text-slate-600 leading-relaxed">
            The right financial product for your needs is just a click away. Experience seamless, digitzed lending.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((item, index) => {
            const isClickable = clickableTitles.includes(item.title);

            return (
              <Card
                key={index}
                title={item.title}
                desc={item.desc}
                icon={item.icon}
                clickable={true}
                onClick={() => handleCardClick(item.title, isClickable)}
              />
            );
          })}
        </div>

        {/* Services */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
            Other Services
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:max-w-4xl lg:mx-auto">
          {services.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              desc={item.desc}
              icon={item.icon}
              clickable={true}
              onClick={() => handleCardClick(item.title, false)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}