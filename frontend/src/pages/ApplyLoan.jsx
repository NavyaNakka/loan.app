

// import { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { trackAction } from "../services/track";
// import { getSessionId } from "../services/session";

// const initialForm = {
//   fullName: "",
//   phone: "",
//   gender: "",
//   pincode: "",
//   loanType: "",
//   loanAmount: "",
//   employmentType: "",
//   yearlyIncome: "",
//   acceptedTerms: true,
// };

// // ─── Validation Rules ────────────────────────────────────────────────────────
// const validate = (formData) => {
//   const errors = {};

//   // Full Name — letters and spaces only, not empty
//   if (!formData.fullName.trim()) {
//     errors.fullName = "Full name is required.";
//   } else if (!/^[A-Za-z\s]+$/.test(formData.fullName.trim())) {
//     errors.fullName = "Name must contain letters only (no numbers or special characters).";
//   }

//   // Phone — digits only, exactly 10 digits
//   if (!formData.phone.trim()) {
//     errors.phone = "Phone number is required.";
//   } else if (!/^\d+$/.test(formData.phone)) {
//     errors.phone = "Phone number must contain digits only.";
//   } else if (formData.phone.length !== 10) {
//     errors.phone = "Phone number must be exactly 10 digits.";
//   }

//   // Gender
//   if (!formData.gender) {
//     errors.gender = "Please select your gender.";
//   }

//   // Pincode — digits only, exactly 6 digits
//   if (!formData.pincode.trim()) {
//     errors.pincode = "Pincode is required.";
//   } else if (!/^\d+$/.test(formData.pincode)) {
//     errors.pincode = "Pincode must contain digits only.";
//   } else if (formData.pincode.length !== 6) {
//     errors.pincode = "Pincode must be exactly 6 digits.";
//   }

//   // Loan Type
//   if (!formData.loanType) {
//     errors.loanType = "Please select a loan type.";
//   }

//   // Loan Amount — positive number
//   if (!formData.loanAmount.toString().trim()) {
//     errors.loanAmount = "Loan amount is required.";
//   } else if (!/^\d+(\.\d{1,2})?$/.test(formData.loanAmount)) {
//     errors.loanAmount = "Enter a valid loan amount (digits only).";
//   } else if (parseFloat(formData.loanAmount) <= 0) {
//     errors.loanAmount = "Loan amount must be greater than 0.";
//   }

//   // Employment Type
//   if (!formData.employmentType) {
//     errors.employmentType = "Please select your employment type.";
//   }

//   // Yearly Income — positive number
//   if (!formData.yearlyIncome.toString().trim()) {
//     errors.yearlyIncome = "Yearly income is required.";
//   } else if (!/^\d+(\.\d{1,2})?$/.test(formData.yearlyIncome)) {
//     errors.yearlyIncome = "Enter a valid yearly income (digits only).";
//   } else if (parseFloat(formData.yearlyIncome) <= 0) {
//     errors.yearlyIncome = "Yearly income must be greater than 0.";
//   }

//   // Terms
//   if (!formData.acceptedTerms) {
//     errors.acceptedTerms = "You must accept the Terms & Conditions to proceed.";
//   }

//   return errors;
// };

// // ─── Field-level instant validation ──────────────────────────────────────────
// const validateField = (name, value) => {
//   const temp = { ...initialForm, [name]: value, acceptedTerms: name === "acceptedTerms" ? value : false };
//   const errs = validate(temp);
//   // Only return error for the field being validated (ignore acceptedTerms cross-check)
//   return errs[name] || "";
// };

// export default function ApplyLoan() {
//   const [formData, setFormData] = useState(initialForm);
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     const newValue = type === "checkbox" ? checked : value;

//     setFormData((prev) => ({ ...prev, [name]: newValue }));

//     // Live-validate only if field was already touched
//     if (touched[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: validateField(name, newValue),
//       }));
//     }
//   };

//   const handleBlur = (e) => {
//     const { name, value, type, checked } = e.target;
//     const newValue = type === "checkbox" ? checked : value;

//     setTouched((prev) => ({ ...prev, [name]: true }));
//     setErrors((prev) => ({
//       ...prev,
//       [name]: validateField(name, newValue),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Mark all fields as touched
//     const allTouched = Object.keys(initialForm).reduce((acc, k) => ({ ...acc, [k]: true }), {});
//     setTouched(allTouched);

//     const validationErrors = validate(formData);
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length > 0) return; // Stop if errors exist

//     try {
//       setLoading(true);
//       trackAction("submit application");
//       const sessionId = getSessionId();
//       const phone = String(formData.phone);

//       const res = await axios.post("https://loan-app-cqlh.onrender.com/api/apply", {
//         ...formData,
//         acceptedTerms:true,
//         phone,
//         sessionId,
//       });

//       console.log("✅ Response:", res.data);
//       alert("✅ Application submitted successfully!");

//       setFormData(initialForm);
//       setErrors({});
//       setTouched({});
//     } catch (error) {
//       console.error("❌ Submit Error:", error);
//       alert("❌ Failed to submit application. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper: field wrapper with error display
//   const FieldError = ({ name }) =>
//     touched[name] && errors[name] ? (
//       <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
//         <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
//           <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
//         </svg>
//         {errors[name]}
//       </p>
//     ) : null;

//   const inputClass = (name) =>
//     `input w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-all focus:ring-2 ${
//       touched[name] && errors[name]
//         ? "border-red-400 bg-red-50 focus:ring-red-300"
//         : touched[name] && !errors[name]
//         ? "border-green-400 bg-green-50 focus:ring-green-300"
//         : "border-slate-200 bg-white focus:ring-blue-300"
//     }`;

//   return (
//     <section className="min-h-screen bg-slate-50 pt-28 pb-12 sm:pt-32 sm:pb-16">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

//         {/* Header */}
//         <div className="mx-auto max-w-3xl text-center">
//           <span className="inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
//             Loan Application
//           </span>
//           <h1 className="mt-4 text-4xl font-bold text-slate-900 sm:text-5xl">
//             Apply for your loan in a secure and simple way
//           </h1>
//           <p className="mt-4 text-lg text-slate-600">
//             Fill in your personal details, accept the terms, and submit your application in a few steps.
//           </p>
//         </div>

//         <div className="mt-12 grid gap-8 lg:grid-cols-5">

//           {/* LEFT PANEL */}
//           <div className="lg:col-span-2">
//             <div className="rounded-3xl bg-blue-600 p-8 text-white shadow-sm">
//               <h2 className="text-2xl font-bold">Why apply with us?</h2>
//               <p className="mt-3 text-blue-100">
//                 A guided, secure, and professional application process designed for faster loan requests.
//               </p>
//               <div className="mt-8 space-y-4">
//                 {[
//                   { title: "Simple Form", desc: "Enter your details in a clear and easy application flow." },
//                   { title: "Secure Submission", desc: "Your information is submitted through a secure process." },
//                   { title: "Quick Review", desc: "Your application is processed quickly after submission." },
//                 ].map((item) => (
//                   <div key={item.title} className="rounded-2xl bg-white/10 p-5">
//                     <h3 className="text-lg font-semibold">{item.title}</h3>
//                     <p className="mt-2 text-sm text-blue-100">{item.desc}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* RIGHT FORM */}
//           <div className="lg:col-span-3">
//             <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
//               <h2 className="text-2xl font-bold text-slate-900">Loan Application Form</h2>

//               <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
//                 <div className="grid gap-5 md:grid-cols-2">

//                   {/* Full Name */}
//                   <div className="md:col-span-2">
//                     <label className="mb-1.5 block text-sm font-medium text-slate-700">
//                       Full Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       name="fullName"
//                       value={formData.fullName}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       placeholder="e.g. Rahul Sharma"
//                       className={inputClass("fullName")}
//                     />
//                     <FieldError name="fullName" />
//                   </div>

//                   {/* Phone */}
//                   <div>
//                     <label className="mb-1.5 block text-sm font-medium text-slate-700">
//                       Phone Number <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       placeholder="10-digit number"
//                       maxLength={10}
//                       inputMode="numeric"
//                       className={inputClass("phone")}
//                     />
//                     <FieldError name="phone" />
//                   </div>

//                   {/* Gender */}
//                   <div>
//                     <label className="mb-1.5 block text-sm font-medium text-slate-700">
//                       Gender <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       name="gender"
//                       value={formData.gender}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       className={inputClass("gender")}
//                     >
//                       <option value="">Select</option>
//                       <option>Male</option>
//                       <option>Female</option>
//                       <option>Other</option>
//                     </select>
//                     <FieldError name="gender" />
//                   </div>

//                   {/* Pincode */}
//                   <div>
//                     <label className="mb-1.5 block text-sm font-medium text-slate-700">
//                       Pincode <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       name="pincode"
//                       value={formData.pincode}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       placeholder="6-digit pincode"
//                       maxLength={6}
//                       inputMode="numeric"
//                       className={inputClass("pincode")}
//                     />
//                     <FieldError name="pincode" />
//                   </div>

//                   {/* Loan Type */}
//                   <div>
//                     <label className="mb-1.5 block text-sm font-medium text-slate-700">
//                       Loan Type <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       name="loanType"
//                       value={formData.loanType}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       className={inputClass("loanType")}
//                     >
//                       <option value="">Select</option>
//                       <option>Personal Loan</option>
//                       <option>Business Loan</option>
//                       <option>Gold Loan</option>
//                       <option>Home Loan</option>
//                     </select>
//                     <FieldError name="loanType" />
//                   </div>

//                   {/* Loan Amount */}
//                   <div>
//                     <label className="mb-1.5 block text-sm font-medium text-slate-700">
//                       Required Loan Amount (₹) <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       name="loanAmount"
//                       value={formData.loanAmount}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       placeholder="e.g. 500000"
//                       inputMode="numeric"
//                       className={inputClass("loanAmount")}
//                     />
//                     <FieldError name="loanAmount" />
//                   </div>

//                   {/* Employment Type */}
//                   <div>
//                     <label className="mb-1.5 block text-sm font-medium text-slate-700">
//                       Employment Type <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       name="employmentType"
//                       value={formData.employmentType}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       className={inputClass("employmentType")}
//                     >
//                       <option value="">Select</option>
//                       <option>Salaried</option>
//                       <option>Self Employed</option>
//                     </select>
//                     <FieldError name="employmentType" />
//                   </div>

//                   {/* Yearly Income */}
//                   <div>
//                     <label className="mb-1.5 block text-sm font-medium text-slate-700">
//                       Yearly Income (₹) <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       name="yearlyIncome"
//                       value={formData.yearlyIncome}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       placeholder="e.g. 600000"
//                       inputMode="numeric"
//                       className={inputClass("yearlyIncome")}
//                     />
//                     <FieldError name="yearlyIncome" />
//                   </div>

//                 </div>

//                 {/* Terms & Conditions */}
//                 <div className={`rounded-xl p-4 ${touched.acceptedTerms && errors.acceptedTerms ? "bg-red-50 ring-1 ring-red-300" : "bg-slate-50"}`}>
//                   <label className="flex gap-3 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       name="acceptedTerms"
//                       checked={formData.acceptedTerms}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       className="mt-0.5 h-4 w-4 accent-blue-600"
//                     />
//                     <span className="text-sm text-slate-700">
//                       By continuing, you agree to our{" "}
//                       <Link to="/terms" className="text-blue-600 underline">Terms & Conditions</Link>{" "}
//                       and{" "}
//                       <Link to="/privacy" className="text-blue-600 underline">Privacy Policy</Link>.
//                     </span>
//                   </label>
//                   <FieldError name="acceptedTerms" />
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full rounded-xl bg-blue-600 py-3 text-white font-semibold transition hover:bg-blue-700 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
//                 >
//                   {loading ? (
//                     <span className="flex items-center justify-center gap-2">
//                       <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
//                       </svg>
//                       Submitting...
//                     </span>
//                   ) : (
//                     "Submit Application"
//                   )}
//                 </button>

//               </form>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { trackAction } from "../services/track";
import { getSessionId } from "../services/session";
import { User, Phone, CreditCard, MapPin, IndianRupee, Banknote, Briefcase, UserCircle, Store, ArrowRight } from "lucide-react";

const initialForm = {
  fullName: "",
  phone: "",
  gender: "",
  pincode: "",
  panNumber: "",
  loanType: "",
  loanAmount: "",
  employmentType: "",
  yearlyIncome: "",
  acceptedTerms: true,
};

const validate = (formData) => {
  const errors = {};

  if (!formData.fullName.trim()) {
    errors.fullName = "Full name is required.";
  } else if (!/^[A-Za-z\s]+$/.test(formData.fullName.trim())) {
    errors.fullName = "Name must contain letters only (no numbers or special characters).";
  }

  if (!formData.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^\d+$/.test(formData.phone)) {
    errors.phone = "Phone number must contain digits only.";
  } else if (formData.phone.length !== 10) {
    errors.phone = "Phone number must be exactly 10 digits.";
  }

  if (!formData.gender) {
    errors.gender = "Please select your gender.";
  }

  if (!formData.pincode.trim()) {
    errors.pincode = "Pincode is required.";
  } else if (!/^\d+$/.test(formData.pincode)) {
    errors.pincode = "Pincode must contain digits only.";
  } else if (formData.pincode.length !== 6) {
    errors.pincode = "Pincode must be exactly 6 digits.";
  }

  if (!formData.panNumber.trim()) {
    errors.panNumber = "PAN Number is required.";
  } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.panNumber.toUpperCase())) {
    errors.panNumber = "Invalid PAN format (e.g., ABCDE1234F).";
  }

  if (!formData.loanType) {
    errors.loanType = "Please select a loan type.";
  }

  if (!formData.loanAmount.toString().trim()) {
    errors.loanAmount = "Loan amount is required.";
  } else if (!/^\d+(\.\d{1,2})?$/.test(formData.loanAmount)) {
    errors.loanAmount = "Enter a valid loan amount (digits only).";
  } else if (parseFloat(formData.loanAmount) <= 0) {
    errors.loanAmount = "Loan amount must be greater than 0.";
  }

  if (!formData.employmentType) {
    errors.employmentType = "Please select your employment type.";
  }

  if (!formData.yearlyIncome.toString().trim()) {
    errors.yearlyIncome = "Yearly income is required.";
  } else if (!/^\d+(\.\d{1,2})?$/.test(formData.yearlyIncome)) {
    errors.yearlyIncome = "Enter a valid yearly income (digits only).";
  } else if (parseFloat(formData.yearlyIncome) <= 0) {
    errors.yearlyIncome = "Yearly income must be greater than 0.";
  }

  if (!formData.acceptedTerms) {
    errors.acceptedTerms = "You must accept the Terms & Conditions to proceed.";
  }

  return errors;
};

const validateField = (name, value) => {
  const temp = { ...initialForm, [name]: value, acceptedTerms: name === "acceptedTerms" ? value : false };
  const errs = validate(temp);
  return errs[name] || "";
};

export default function ApplyLoan() {
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get("type");

  const [formData, setFormData] = useState({
    ...initialForm,
    loanType: typeParam ? typeParam.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase()) : "Personal Loan"
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const validateStep = (currentStep) => {
    const step1Fields = ["fullName", "phone", "panNumber", "gender", "pincode"];
    const step2Fields = ["employmentType", "yearlyIncome", "loanAmount"];
    
    let fieldsToValidate = [];
    if (currentStep === 1) fieldsToValidate = step1Fields;
    if (currentStep === 2) fieldsToValidate = step2Fields;

    const newTouched = { ...touched };
    fieldsToValidate.forEach((f) => newTouched[f] = true);
    setTouched(newTouched);

    const checkForm = { ...formData };
    checkForm.acceptedTerms = true; 
    const stepErrors = validate(checkForm);
    setErrors(stepErrors);

    const hasError = fieldsToValidate.some((f) => stepErrors[f]);
    return !hasError;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 3));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Update logic if URL changes
  useEffect(() => {
    if (typeParam) {
      setFormData((prev) => ({
        ...prev,
        loanType: typeParam.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase())
      }));
    }
  }, [typeParam]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, newValue) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, newValue) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = Object.keys(initialForm).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);
      trackAction("submit application");
      const sessionId = getSessionId();
      const phone = String(formData.phone);

      // Use Render deployed link for production, and local proxy for dev if preferred, or just always Render link.
      const apiUrl = import.meta.env.MODE === "development"
        ? "/api/apply"
        : "https://loan-app-cqlh.onrender.com/api/apply";

      const res = await axios.post(apiUrl, {
        ...formData,
        panNumber: formData.panNumber.toUpperCase(),
        acceptedTerms: true,
        phone,
        sessionId,
      });
      console.log("✅ Response:", res.data);
      alert("✅ Application submitted successfully!");
      setFormData(initialForm);
      setErrors({});
      setTouched({});
    } catch (error) {
      console.error("❌ Submit Error:", error);
      alert("❌ Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const FieldError = ({ name }) => (
    <div className="h-4 mt-1">
      {touched[name] && errors[name] ? (
        <p className="flex items-center gap-1.5 text-[11px] font-bold text-red-500 tracking-wide">
          <svg className="h-3 w-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          {errors[name]}
        </p>
      ) : null}
    </div>
  );

  const inputClass = (name) =>
    `w-full rounded-[1.25rem] border-2 px-4 py-2.5 sm:py-3 text-[13px] sm:text-[14px] font-bold text-slate-800 outline-none transition-all placeholder:text-slate-400 placeholder:font-medium shadow-sm ${
      touched[name] && errors[name]
        ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
        : "border-slate-200 bg-slate-50 focus:border-[#0c59a6] focus:bg-white focus:ring-4 focus:ring-[#0c59a6]/10 hover:border-slate-300"
    }`;

  const renderTileSelector = (name, options, icons = null) => (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {options.map((option, idx) => {
          const IconComponent = icons ? icons[idx] : null;
          return (
            <button
              key={option}
              type="button"
              onClick={() => {
                setFormData((prev) => ({ ...prev, [name]: option }));
                setTouched((prev) => ({ ...prev, [name]: true }));
                setErrors((prev) => ({ ...prev, [name]: validateField(name, option) }));
              }}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2.5 sm:py-3 px-2 rounded-[1.25rem] border-2 text-[13px] font-bold transition-all active:scale-95 ${
                formData[name] === option
                  ? "border-[#0c59a6] bg-[#e8f1fc] text-[#0c59a6] shadow-sm ring-1 ring-[#0c59a6]/20"
                  : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white"
              }`}
            >
              {IconComponent && <IconComponent size={18} className={formData[name] === option ? "text-[#0c59a6]" : "text-slate-400"} />}
              {option}
            </button>
          );
        })}
      </div>
      <FieldError name={name} />
    </div>
  );

  return (
    <section className="min-h-screen bg-slate-50 relative pb-12 sm:pb-20 flex flex-col items-center">
      
      {/* Premium Dark Background Overlap Header */}
      <div className="absolute top-0 w-full h-[480px] sm:h-[500px] bg-gradient-to-b from-[#01142f] to-[#0a2046] z-0 rounded-b-[2rem] sm:rounded-b-[4rem] shadow-2xl">
      </div>

      <div className="w-full max-w-[560px] px-5 sm:px-6 relative z-10 pt-20 sm:pt-26">
        
        {/* Header Text */}
        <div className="mx-auto text-center pb-8 sm:pb-10">
          <span className="inline-flex rounded-full bg-white/10 border border-white/20 backdrop-blur-md px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#66b2ff] shadow-xl">
            {formData.loanType}
          </span>
          <h1 className="mt-4 text-[1.8rem] leading-tight font-black tracking-tight text-white sm:text-[2.2rem] drop-shadow-md">
            Unlock Your Eligibility
          </h1>
          <p className="mt-2 text-[13px] sm:text-[14px] text-blue-100/90 font-medium leading-relaxed">
            A fast, secure, and fully guided application journey.
          </p>
        </div>

        {/* 3-Step Wizard Progress Bar */}
        <div className="mb-8 px-2 sm:px-6">
          <div className="flex items-center justify-between relative z-0">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 -z-10 rounded-full"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#479dfc] shadow-[0_0_12px_#66b2ff] -z-10 rounded-full transition-all duration-500 ease-out" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
            
            {[1, 2, 3].map((num) => (
              <div key={num} className={`flex h-9 w-9 items-center justify-center rounded-full font-black text-sm transition-all duration-500 shadow-xl ${step >= num ? "bg-[#479dfc] text-[#01142f] ring-4 ring-[#479dfc]/30 scale-110" : "bg-[#01142f] text-white border-2 border-white/20 scale-95"}`}>
                {step > num ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg> : num}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 px-1 sm:px-1">
            <span className={`text-[10px] font-bold uppercase tracking-widest transition-opacity duration-300 ${step >= 1 ? "text-white" : "text-white/40"}`}>Basics</span>
            <span className={`text-[10px] font-bold uppercase tracking-widest transition-opacity duration-300 ${step >= 2 ? "text-white" : "text-white/40"}`}>Financials</span>
            <span className={`text-[10px] font-bold uppercase tracking-widest transition-opacity duration-300 ${step >= 3 ? "text-white" : "text-white/40"}`}>Finalize</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white px-5 py-6 sm:px-8 sm:py-7 rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl shadow-[#01142f]/20 ring-1 ring-slate-100 relative overflow-hidden transition-all duration-500 h-[460px] sm:h-[480px] flex flex-col">
          
          <form onSubmit={handleSubmit} noValidate className="flex-1 flex flex-col space-y-0">

            {/* STEP 1: PERSONAL INFO */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-6 duration-500 flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-50 flex items-center justify-center text-[#0c59a6]">
                    <User size={20} />
                  </div>
                  <div>
                    <h2 className="text-[18px] sm:text-xl font-black text-[#01142f]">Personal Details</h2>
                    <p className="text-[12px] sm:text-[13px] font-bold text-slate-400 mt-0.5">Let's start with your basic info.</p>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-5 pb-2">
                  {/* Full Name */}
                  <div>
                    <label className="mb-1.5 block text-[11px] sm:text-[12px] font-bold tracking-widest text-slate-700 uppercase">
                      Full Name (As per PAN) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <User size={18} />
                      </div>
                      <input name="fullName" value={formData.fullName} onChange={handleChange} onBlur={handleBlur} placeholder="e.g. Rahul Sharma" className={`${inputClass("fullName")} pl-[3.25rem]`} />
                    </div>
                    <FieldError name="fullName" />
                  </div>

                  {/* Phone & PAN Grid */}
                  <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[11px] sm:text-[12px] font-bold tracking-widest text-slate-700 uppercase">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <div className="absolute left-4 text-slate-400 pointer-events-none">
                          <Phone size={18} />
                        </div>
                        <span className="absolute left-[2.4rem] text-[15px] font-bold text-slate-400 border-r-2 border-slate-200 pr-2">+91</span>
                        <input name="phone" value={formData.phone} onChange={handleChange} onBlur={handleBlur} placeholder="10-digit number" maxLength={10} inputMode="numeric" className={`${inputClass("phone")} pl-[5.5rem] tracking-widest`} />
                      </div>
                      <FieldError name="phone" />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[11px] sm:text-[12px] font-bold tracking-widest text-slate-700 uppercase">
                        PAN Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                          <CreditCard size={18} />
                        </div>
                        <input name="panNumber" value={formData.panNumber} onChange={handleChange} onBlur={handleBlur} placeholder="ABCDE1234F" maxLength={10} className={`${inputClass("panNumber")} uppercase pl-[3.25rem]`} />
                      </div>
                      <FieldError name="panNumber" />
                    </div>
                  </div>

                  {/* Gender & Pincode Grid */}
                  <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[11px] sm:text-[12px] font-bold tracking-widest text-slate-700 uppercase">
                        Gender <span className="text-red-500">*</span>
                      </label>
                      {renderTileSelector("gender", ["Male", "Female"], [UserCircle, UserCircle])}
                    </div>
                    
                    <div>
                      <label className="mb-1.5 block text-[11px] sm:text-[12px] font-bold tracking-widest text-slate-700 uppercase">
                        Current Pincode <span className="text-red-500">*</span>
                      </label>
                      <div className="relative h-full">
                        <div className="absolute left-4 top-[1.65rem] -translate-y-1/2 text-slate-400 pointer-events-none">
                          <MapPin size={18} />
                        </div>
                        <input name="pincode" value={formData.pincode} onChange={handleChange} onBlur={handleBlur} placeholder="6-digit pincode" maxLength={6} inputMode="numeric" className={`${inputClass("pincode")} h-[3.4rem] tracking-widest pl-[3.25rem]`} />
                      </div>
                      <FieldError name="pincode" />
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <button type="button" onClick={nextStep} className="w-full flex items-center justify-center gap-2 rounded-[1.25rem] bg-[#0c59a6] hover:bg-[#0a4d91] py-3 sm:py-3.5 text-[14px] sm:text-[15px] text-white font-bold tracking-wide shadow-lg shadow-[#0c59a6]/20 transition-all focus:ring-4 focus:ring-[#0c59a6]/20 active:scale-[0.98]">
                    Next Step <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: FINANCIAL INFO */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500 flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-50 flex items-center justify-center text-[#0c59a6]">
                    <Banknote size={20} />
                  </div>
                  <div>
                    <h2 className="text-[18px] sm:text-xl font-black text-[#01142f]">Financial Details</h2>
                    <p className="text-[12px] sm:text-[13px] font-bold text-slate-400 mt-0.5">Tell us about your income & requirements.</p>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-5 pb-2">
                  {/* Employment Type */}
                  <div>
                    <label className="mb-1.5 block text-[11px] sm:text-[12px] font-bold tracking-widest text-slate-700 uppercase">
                      Employment Type <span className="text-red-500">*</span>
                    </label>
                    {renderTileSelector("employmentType", ["Salaried", "Self Employed"], [Briefcase, Store])}
                  </div>

                  {/* Yearly Income */}
                  <div>
                    <label className="mb-1.5 block text-[11px] sm:text-[12px] font-bold tracking-widest text-slate-700 uppercase">
                      Yearly Income <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0c59a6]/50 pointer-events-none">
                        <IndianRupee size={18} />
                      </div>
                      <input name="yearlyIncome" value={formData.yearlyIncome} onChange={handleChange} onBlur={handleBlur} placeholder="e.g. 600000" inputMode="numeric" className={`${inputClass("yearlyIncome")} pl-[3.25rem]`} />
                    </div>
                    <FieldError name="yearlyIncome" />
                  </div>

                  {/* Loan Amount */}
                  <div>
                    <label className="mb-1.5 block text-[11px] sm:text-[12px] font-bold tracking-widest text-slate-700 uppercase">
                      Required Loan Amount <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0c59a6]/50 pointer-events-none">
                        <Banknote size={18} />
                      </div>
                      <input name="loanAmount" value={formData.loanAmount} onChange={handleChange} onBlur={handleBlur} placeholder="e.g. 500000" inputMode="numeric" className={`${inputClass("loanAmount")} pl-[3.25rem] text-[#0c59a6]`} />
                    </div>
                    <FieldError name="loanAmount" />
                  </div>
                </div>

                <div className="mt-auto pt-4 flex gap-3 sm:gap-4">
                  <button type="button" onClick={prevStep} className="w-1/3 rounded-[1.25rem] bg-slate-100 py-3 sm:py-3.5 text-[14px] sm:text-[15px] text-slate-700 font-bold transition-all hover:bg-slate-200 focus:ring-4 focus:ring-slate-100 active:scale-[0.98]">
                    Back
                  </button>
                  <button type="button" onClick={nextStep} className="w-2/3 flex items-center justify-center gap-2 rounded-[1.25rem] bg-[#0c59a6] hover:bg-[#0a4d91] py-3 sm:py-3.5 text-[14px] sm:text-[15px] text-white font-bold tracking-wide shadow-lg shadow-[#0c59a6]/20 transition-all focus:ring-4 focus:ring-[#0c59a6]/20 active:scale-[0.98]">
                    Final Step <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: REVIEW & SUBMIT */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500 flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  <div>
                    <h2 className="text-[18px] sm:text-xl font-black text-[#01142f]">Finalize Application</h2>
                    <p className="text-[12px] sm:text-[13px] font-bold text-slate-400 mt-0.5">Please confirm details and apply.</p>
                  </div>
                </div>

                <div className="bg-slate-50/50 p-5 rounded-2xl border-2 border-slate-100 mb-6 space-y-3 sm:space-y-4">
                  <h4 className="text-[10px] sm:text-[11px] font-bold tracking-widest text-slate-400 uppercase border-b-2 border-slate-200 pb-2.5">Application Summary</h4>
                  <div className="flex justify-between items-center"><span className="text-[11px] sm:text-[12px] text-slate-500 font-bold uppercase tracking-wide">Name</span><span className="font-black text-[13px] sm:text-[14px] text-slate-900">{formData.fullName}</span></div>
                  <div className="flex justify-between items-center"><span className="text-[11px] sm:text-[12px] text-slate-500 font-bold uppercase tracking-wide">Loan Type</span><span className="font-black text-[12px] sm:text-[13px] text-[#0c59a6] bg-blue-50 px-2 sm:px-3 py-1 rounded-full">{formData.loanType}</span></div>
                  <div className="flex justify-between items-center"><span className="text-[11px] sm:text-[12px] text-slate-500 font-bold uppercase tracking-wide">Requested</span><span className="font-black text-[#0c59a6] text-[15px] sm:text-[16px]">₹ {formData.loanAmount}</span></div>
                </div>

                {/* Terms & Conditions */}
                <div className={`rounded-2xl p-4 sm:p-5 border-2 transition-colors duration-300 ${touched.acceptedTerms && errors.acceptedTerms ? "bg-red-50 border-red-200 shadow-sm" : "bg-white border-slate-100 hover:border-[#0c59a6]/30"}`}>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" name="acceptedTerms" checked={formData.acceptedTerms} onChange={handleChange} onBlur={handleBlur} className="mt-0.5 h-4 w-4 shrink-0 accent-[#0c59a6] rounded border-slate-300 pointer-events-none" />
                    <span className="text-[12px] sm:text-[13px] text-slate-600 leading-relaxed font-semibold">
                      I confirm the details provided are accurate and authorize Kredit Konnect to fetch my credit information as per the <Link to="/terms" className="text-[#0c59a6] hover:underline font-bold">Terms & Conditions</Link>.
                    </span>
                  </label>
                  <FieldError name="acceptedTerms" />
                </div>

                <div className="mt-auto pt-4 flex gap-3 sm:gap-4">
                  <button type="button" onClick={prevStep} className="w-1/4 sm:w-1/3 rounded-[1.25rem] bg-slate-100 py-3 sm:py-3.5 text-[14px] sm:text-[15px] text-slate-700 font-bold transition-all hover:bg-slate-200 focus:ring-4 focus:ring-slate-100 active:scale-[0.98]">
                    Back
                  </button>
                  <button type="submit" disabled={loading} className="w-3/4 sm:w-2/3 flex-1 flex items-center justify-center gap-2 rounded-[1.25rem] bg-gradient-to-r from-[#0c59a6] to-[#07386d] hover:to-[#052b54] py-3 sm:py-3.5 text-[14px] sm:text-[15px] text-white font-bold tracking-wide shadow-lg shadow-[#0c59a6]/30 transition-all focus:ring-4 focus:ring-[#0c59a6]/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed">
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="h-5 w-5 animate-spin text-white/50" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <>Submit Application <ArrowRight size={18} /></>
                    )}
                  </button>
                </div>
              </div>
            )}

          </form>
        </div>
      </div>
    </section>
  );
}