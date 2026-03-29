

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

  const FieldError = ({ name }) =>
    touched[name] && errors[name] ? (
      <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
        <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
        {errors[name]}
      </p>
    ) : null;

  const inputClass = (name) =>
    `w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-all focus:ring-2 ${touched[name] && errors[name]
      ? "border-red-400 bg-red-50 focus:ring-red-300"
      : touched[name] && !errors[name]
        ? "border-green-400 bg-green-50 focus:ring-green-300"
        : "border-slate-200 bg-slate-50 focus:bg-white focus:ring-blue-300"
    }`;

  return (
    <section className="min-h-screen bg-slate-50 pt-24 pb-12 sm:pt-28 sm:pb-16 flex items-center justify-center">
      <div className="w-full max-w-3xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
            {formData.loanType} Application
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Apply securely and easily
          </h1>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Fill in your personal details, accept the terms, and submit your application in a few steps.
          </p>
        </div>

        <div className="mt-8">
          <div className="rounded-3xl bg-white p-6 sm:p-10 shadow-xl shadow-blue-900/5 ring-1 ring-slate-100">
            <form onSubmit={handleSubmit} noValidate className="space-y-8">

              {/* SECTION: Personal Information */}
              <div>
                <h3 className="text-lg font-bold tracking-tight text-slate-900 border-b border-slate-100 pb-3 mb-5">
                  Personal Information
                </h3>
                <div className="grid gap-5 md:grid-cols-2">

                  {/* Full Name */}
                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. Rahul Sharma"
                      className={inputClass("fullName")}
                    />
                    <FieldError name="fullName" />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="10-digit number"
                      maxLength={10}
                      inputMode="numeric"
                      className={inputClass("phone")}
                    />
                    <FieldError name="phone" />
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={inputClass("gender")}
                    >
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                    <FieldError name="gender" />
                  </div>

                  {/* Pincode */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="6-digit pincode"
                      maxLength={6}
                      inputMode="numeric"
                      className={inputClass("pincode")}
                    />
                    <FieldError name="pincode" />
                  </div>

                  {/* PAN Number */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      PAN Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. ABCDE1234F"
                      maxLength={10}
                      className={`${inputClass("panNumber")} uppercase`}
                    />
                    <FieldError name="panNumber" />
                  </div>

                </div>
              </div>

              {/* SECTION: Loan & Employment Details */}
              <div className="pt-2">
                <h3 className="text-lg font-bold tracking-tight text-slate-900 border-b border-slate-100 pb-3 mb-5">
                  Loan & Employment Details
                </h3>
                <div className="grid gap-5 md:grid-cols-2">

                  {/* Loan Amount */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Required Loan Amount (₹) <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="loanAmount"
                      value={formData.loanAmount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. 500000"
                      inputMode="numeric"
                      className={inputClass("loanAmount")}
                    />
                    <FieldError name="loanAmount" />
                  </div>

                  {/* Employment Type */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Employment Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="employmentType"
                      value={formData.employmentType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={inputClass("employmentType")}
                    >
                      <option value="">Select</option>
                      <option>Salaried</option>
                      <option>Self Employed</option>
                    </select>
                    <FieldError name="employmentType" />
                  </div>

                  {/* Yearly Income */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Yearly Income (₹) <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="yearlyIncome"
                      value={formData.yearlyIncome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. 600000"
                      inputMode="numeric"
                      className={inputClass("yearlyIncome")}
                    />
                    <FieldError name="yearlyIncome" />
                  </div>

                </div>
              </div>

              {/* Terms & Conditions */}
              <div className={`rounded-xl p-4 transition-colors ${touched.acceptedTerms && errors.acceptedTerms ? "bg-red-50 ring-1 ring-red-200" : "bg-slate-50"}`}>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="acceptedTerms"
                    checked={formData.acceptedTerms}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 h-4 w-4 shrink-0 accent-blue-600 rounded border-slate-300"
                  />
                  <span className="text-sm text-slate-600 leading-relaxed">
                    By submitting this application, I confirm the details provided are accurate and agree to the{" "}
                    <Link to="/terms" className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2">Terms & Conditions</Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2">Privacy Policy</Link>.
                  </span>
                </label>
                <FieldError name="acceptedTerms" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-blue-600 py-3.5 text-white font-bold tracking-wide shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 hover:shadow-blue-600/40 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Processing Request...
                  </span>
                ) : (
                  "Submit Application"
                )}
              </button>

            </form>
          </div>
        </div>

      </div >
    </section >
  );
}