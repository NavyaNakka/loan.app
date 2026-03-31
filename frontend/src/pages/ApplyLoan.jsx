import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { trackAction } from "../services/track";
import { getSessionId } from "../services/session";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.MODE === "development"
  ? "http://localhost:5000"
  : "https://loan-app-cqlh.onrender.com";

// ─── Details form ─────────────────────────────────────────────────────────────
const initialDetails = {
  fullName: "",
  gender: "",
  pincode: "",
  panNumber: "",
  loanType: "Personal Loan",
  loanAmount: "",
  employmentType: "",
  yearlyIncome: "",
  acceptedTerms: true,
};

const validateDetails = (data) => {
  const errors = {};
  if (!data.fullName.trim()) errors.fullName = "Full name is required.";
  else if (!/^[A-Za-z\s]+$/.test(data.fullName.trim())) errors.fullName = "Name must contain letters only.";
  if (!data.gender) errors.gender = "Please select your gender.";
  if (!data.pincode.trim()) errors.pincode = "Pincode is required.";
  else if (!/^\d+$/.test(data.pincode)) errors.pincode = "Pincode must contain digits only.";
  else if (data.pincode.length !== 6) errors.pincode = "Pincode must be exactly 6 digits.";
  if (!data.panNumber.trim()) errors.panNumber = "PAN Number is required.";
  else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(data.panNumber.toUpperCase())) errors.panNumber = "Invalid PAN format (e.g., ABCDE1234F).";
  if (!data.loanType) errors.loanType = "Please select a loan type.";
  if (!data.loanAmount.toString().trim()) errors.loanAmount = "Loan amount is required.";
  else if (!/^\d+(\.\d{1,2})?$/.test(data.loanAmount)) errors.loanAmount = "Enter a valid loan amount (digits only).";
  else if (parseFloat(data.loanAmount) <= 0) errors.loanAmount = "Loan amount must be greater than 0.";
  if (!data.employmentType) errors.employmentType = "Please select your employment type.";
  if (!data.yearlyIncome.toString().trim()) errors.yearlyIncome = "Yearly income is required.";
  else if (!/^\d+(\.\d{1,2})?$/.test(data.yearlyIncome)) errors.yearlyIncome = "Enter a valid yearly income (digits only).";
  else if (parseFloat(data.yearlyIncome) <= 0) errors.yearlyIncome = "Yearly income must be greater than 0.";
  if (!data.acceptedTerms) errors.acceptedTerms = "You must accept the Terms & Conditions to proceed.";
  return errors;
};

const validateField = (name, value) => {
  const temp = { ...initialDetails, [name]: value, acceptedTerms: name === "acceptedTerms" ? value : false };
  return validateDetails(temp)[name] || "";
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function ApplyLoan() {
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get("type");

  // Step: "otp" | "personal" | "employment"
  const [step, setStep] = useState("otp");

  // OTP step state
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [verifiedPhone, setVerifiedPhone] = useState("");

  // Details step state
  const [formData, setFormData] = useState({
    ...initialDetails,
    loanType: typeParam ? typeParam.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase()) : "Personal Loan",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (typeParam) {
      setFormData((prev) => ({
        ...prev,
        loanType: typeParam.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase()),
      }));
    }
  }, [typeParam]);

  // ── OTP Handlers ─────────────────────────────────────────────────────────────
  const handleSendOtp = async () => {
    setOtpError("");
    if (!phone.trim() || !/^\d{10}$/.test(phone)) {
      setOtpError("Please enter a valid 10-digit mobile number.");
      return;
    }
    try {
      setOtpLoading(true);
      await axios.post(`${API_BASE}/api/auth/send-otp`, { phone });
      setOtpSent(true);
    } catch (err) {
      setOtpError(err.response?.data?.message || "Failed to send OTP. Try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setOtpError("");
    if (!otp.trim() || otp.length !== 4) {
      setOtpError("Please enter the 4-digit OTP.");
      return;
    }
    try {
      setOtpLoading(true);
      await axios.post(`${API_BASE}/api/auth/verify-otp`, { phone, otp });
      setVerifiedPhone(phone);
      trackAction("otp verified");
      setStep("personal");
    } catch (err) {
      setOtpError(err.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  // ── Details Handlers ──────────────────────────────────────────────────────────
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
    const allTouched = Object.keys(initialDetails).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);
    const validationErrors = validateDetails(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    try {
      setLoading(true);
      trackAction("submit application");
      const sessionId = getSessionId();
      
      const submitData = {
        ...formData,
        phone: verifiedPhone,
        panNumber: formData.panNumber.toUpperCase(),
        acceptedTerms: true,
        sessionId,
      };
      
      console.log("🔍 Submitting application with data:", submitData);
      console.log("🔍 API_BASE:", API_BASE);
      
      const response = await axios.post(`${API_BASE}/api/apply`, submitData);
      console.log("✅ Success response:", response);
      
      alert("✅ Application submitted successfully!");
      setFormData(initialDetails);
      setErrors({});
      setTouched({});
      navigate("/track-application");
      setStep("otp");
      setPhone("");
      setOtp("");
      setOtpSent(false);
      setVerifiedPhone("");
    } catch (error) {
      console.error("❌ Submit Error Details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      });
      alert(`❌ Failed to submit: ${error.response?.data?.message || error.response?.data?.error || error.message}`);
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
    `w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition-all focus:ring-2 bg-white hover:border-slate-400 ${
      touched[name] && errors[name]
        ? "border-red-400 focus:ring-red-300"
        : touched[name] && !errors[name]
        ? "border-green-400 focus:ring-green-300"
        : "focus:border-blue-500 focus:ring-blue-500/20"
    }`;

  const personalFields = ["fullName", "gender", "pincode", "panNumber"];
  const employmentFields = ["loanType", "loanAmount", "employmentType", "yearlyIncome", "acceptedTerms"];

  const validateStepFields = (fields) => {
    const validationErrors = validateDetails(formData);
    const stepErrors = fields.reduce((acc, key) => {
      if (validationErrors[key]) acc[key] = validationErrors[key];
      return acc;
    }, {});

    const stepTouched = fields.reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched((prev) => ({ ...prev, ...stepTouched }));
    setErrors((prev) => ({ ...prev, ...stepErrors }));
    return stepErrors;
  };

  const handlePersonalContinue = () => {
    const stepErrors = validateStepFields(personalFields);
    if (Object.keys(stepErrors).length > 0) return;
    setStep("employment");
  };

  // ── STEP 1 — OTP ─────────────────────────────────────────────────────────────
  if (step === "otp") {
    return (
      <section className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-7">
            <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-700">
              Step 1 of 3
            </span>
            <h1 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Verify your mobile number
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              We'll send a one-time password to confirm your identity.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-xl shadow-blue-900/5 ring-1 ring-slate-100">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <span className="flex items-center rounded-xl border border-slate-300 bg-slate-50 px-3 text-sm font-semibold text-slate-600">
                  +91
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                    setOtpError("");
                    if (otpSent) { setOtpSent(false); setOtp(""); }
                  }}
                  placeholder="10-digit number"
                  inputMode="numeric"
                  maxLength={10}
                  disabled={otpSent}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>
            </div>

            {otpSent && (
              <div className="mt-4">
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  One-Time Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => { setOtp(e.target.value.replace(/\D/g, "").slice(0, 4)); setOtpError(""); }}
                  placeholder="Enter 4-digit OTP"
                  inputMode="numeric"
                  maxLength={4}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white"
                />
                <p className="mt-1.5 text-xs text-slate-500">
                  OTP sent to +91 {phone}.{" "}
                  <button
                    type="button"
                    onClick={() => { setOtpSent(false); setOtp(""); setOtpError(""); }}
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    Change number
                  </button>
                </p>
                {/* Demo hint */}
                <div className="mt-2 flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2">
                  <svg className="h-3.5 w-3.5 shrink-0 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <p className="text-xs text-amber-700 font-medium">Demo mode — use OTP: <span className="font-bold tracking-widest">1234</span></p>
                </div>
              </div>
            )}

            {otpError && (
              <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-red-500">
                <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                {otpError}
              </p>
            )}

            <button
              type="button"
              onClick={otpSent ? handleVerifyOtp : handleSendOtp}
              disabled={otpLoading}
              className="mt-5 w-full rounded-2xl bg-blue-600 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {otpLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  {otpSent ? "Verifying..." : "Sending OTP..."}
                </span>
              ) : otpSent ? "Verify & Continue →" : "Send OTP"}
            </button>

            <p className="mt-4 text-center text-xs text-slate-500">
              By continuing, you agree to our{" "}
              <Link to="/terms" className="font-semibold text-blue-600 hover:underline">Terms</Link>{" "}
              &{" "}
              <Link to="/privacy" className="font-semibold text-blue-600 hover:underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ── STEP 2 — Personal Details ───────────────────────────────────────────────
  if (step === "personal") {
    return (
      <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-20 pb-10 sm:pt-24 sm:pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-700">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white text-[10px]">2</span>
              Step 2 of 3 - Personal Details
            </span>
            <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Tell us about yourself
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Verified: <span className="font-semibold text-emerald-600">+91 {verifiedPhone} ✓</span>
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 sm:rounded-3xl sm:p-8 shadow-xl shadow-blue-900/5 ring-1 ring-slate-100">
            <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Full Name <span className="text-red-500">*</span></label>
                <input name="fullName" value={formData.fullName} onChange={handleChange} onBlur={handleBlur} placeholder="e.g. Rahul Sharma" className={inputClass("fullName")} />
                <FieldError name="fullName" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Gender <span className="text-red-500">*</span></label>
                <select name="gender" value={formData.gender} onChange={handleChange} onBlur={handleBlur} className={inputClass("gender")}>
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                <FieldError name="gender" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Pincode <span className="text-red-500">*</span></label>
                <input name="pincode" value={formData.pincode} onChange={handleChange} onBlur={handleBlur} placeholder="6-digit pincode" maxLength={6} inputMode="numeric" className={inputClass("pincode")} />
                <FieldError name="pincode" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-slate-700">PAN Number <span className="text-red-500">*</span></label>
                <input name="panNumber" value={formData.panNumber} onChange={handleChange} onBlur={handleBlur} placeholder="e.g. ABCDE1234F" maxLength={10} className={`${inputClass("panNumber")} uppercase`} />
                <FieldError name="panNumber" />
              </div>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => { setStep("otp"); setOtp(""); setOtpSent(false); }}
                className="rounded-2xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 active:scale-[0.98]"
              >
                ← Back to OTP
              </button>
              <button
                type="button"
                onClick={handlePersonalContinue}
                className="flex-1 rounded-2xl bg-blue-600 py-3 text-sm sm:text-base text-white font-bold tracking-wide shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 active:scale-[0.98]"
              >
                Continue to Employment Details →
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── STEP 3 — Employment Details ─────────────────────────────────────────────
  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-20 pb-10 sm:pt-24 sm:pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-700">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white text-[10px]">3</span>
            Step 3 of 3 - Employment Details
          </span>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Loan and employment information
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">Almost done. Submit your profile to complete application.</p>
        </div>

        <div className="rounded-2xl bg-white p-5 sm:rounded-3xl sm:p-8 shadow-xl shadow-blue-900/5 ring-1 ring-slate-100">
          <form onSubmit={handleSubmit} noValidate className="space-y-7">
            <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Loan Type <span className="text-red-500">*</span></label>
                <select name="loanType" value={formData.loanType} onChange={handleChange} onBlur={handleBlur} className={inputClass("loanType")}>
                  <option value="">Select loan type</option>
                  <option>Personal Loan</option>
                  <option>Business Loan</option>
                  <option>Gold Loan</option>
                  <option>Home Loan</option>
                </select>
                <FieldError name="loanType" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Required Loan Amount (INR) <span className="text-red-500">*</span></label>
                <input name="loanAmount" value={formData.loanAmount} onChange={handleChange} onBlur={handleBlur} placeholder="e.g. 500000" inputMode="numeric" className={inputClass("loanAmount")} />
                <FieldError name="loanAmount" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Employment Type <span className="text-red-500">*</span></label>
                <select name="employmentType" value={formData.employmentType} onChange={handleChange} onBlur={handleBlur} className={inputClass("employmentType")}>
                  <option value="">Select type</option>
                  <option>Salaried</option>
                  <option>Self Employed</option>
                </select>
                <FieldError name="employmentType" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Yearly Income (INR) <span className="text-red-500">*</span></label>
                <input name="yearlyIncome" value={formData.yearlyIncome} onChange={handleChange} onBlur={handleBlur} placeholder="e.g. 600000" inputMode="numeric" className={inputClass("yearlyIncome")} />
                <FieldError name="yearlyIncome" />
              </div>
            </div>

            <div className={`rounded-xl p-4 transition-colors ${touched.acceptedTerms && errors.acceptedTerms ? "bg-red-50 ring-1 ring-red-200" : "bg-slate-50 ring-1 ring-slate-100"}`}>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" name="acceptedTerms" checked={formData.acceptedTerms} onChange={handleChange} onBlur={handleBlur} className="mt-0.5 h-4 w-4 shrink-0 accent-blue-600 rounded border-slate-300" />
                <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  By submitting, I confirm the details are accurate and agree to the{" "}
                  <Link to="/terms" className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2">Terms & Conditions</Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2">Privacy Policy</Link>.
                </span>
              </label>
              <FieldError name="acceptedTerms" />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setStep("personal")}
                className="rounded-2xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 active:scale-[0.98]"
              >
                ← Back to Personal Details
              </button>
              <button type="submit" disabled={loading} className="flex-1 rounded-2xl bg-blue-600 py-3 text-sm sm:text-base text-white font-bold tracking-wide shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Processing...
                  </span>
                ) : "Submit Application →"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}