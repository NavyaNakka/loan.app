
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
import { trackAction } from "../services/track"; // 🔥 add this

const products = [
  {
    title: "Personal Loan",
    desc: "Get upto ₹25L in 10 mins",
    icon: "💵",
  },
  {
    title: "Small Amount Loan",
    desc: "Get upto ₹1L with instant approval",
    icon: "💸",
  },
  {
    title: "Credit Card",
    desc: "Choose cards from all top banks",
    icon: "💳",
  },
  {
    title: "Business Loan",
    desc: "Quick unsecured loan upto ₹1Cr",
    icon: "🏦",
  },
  {
    title: "Score Plus",
    desc: "Increase your credit score to 800+",
    icon: "📈",
  },
  {
    title: "Gold Loan",
    desc: "Interest rates starting from 0.49%*",
    icon: "🪙",
  },
];

const services = [
  {
    title: "Credit Report",
    desc: "Check your credit score for FREE!",
    icon: "📄",
  },
  {
    title: "Loan Against Mutual Funds and Stocks",
    desc: "Instant loans up to ₹1 Crore",
    icon: "📊",
  },
];

function Card({ title, desc, icon, onClick, clickable }) {
  return (
    <div
      onClick={onClick}
      className={`group rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition 
      ${clickable ? "cursor-pointer hover:-translate-y-1 hover:shadow-md" : ""}`}
    >
      <div className="flex items-start justify-between">
        <div className="text-4xl">{icon}</div>
        <span className="text-2xl text-slate-400 transition group-hover:text-blue-600">
          ↗
        </span>
      </div>

      <h3 className="mt-6 text-2xl font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 text-lg text-slate-600">
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

  // 🔥 common handler
  const handleCardClick = (title, isClickable) => {
    trackAction(title.toLowerCase()); // 🔥 track every card

    if (isClickable) {
      navigate("/apply-loan"); // existing logic
    }
  };

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Products */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900">Our Products</h2>
          <p className="mt-4 text-lg text-slate-600">
            The right financial product for you is just a click away!
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((item, index) => {
            const isClickable = clickableTitles.includes(item.title);

            return (
              <Card
                key={index}
                title={item.title}
                desc={item.desc}
                icon={item.icon}
                clickable={true} // 🔥 make all cards clickable
                onClick={() => handleCardClick(item.title, isClickable)}
              />
            );
          })}
        </div>

        {/* Services */}
        <div className="mt-16 text-center">
          <h2 className="text-4xl font-bold text-slate-900">
            Other Services
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              desc={item.desc}
              icon={item.icon}
              clickable={true} // 🔥 make clickable
              onClick={() => handleCardClick(item.title, false)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}