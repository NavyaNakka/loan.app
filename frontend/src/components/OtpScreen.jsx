import { useState } from "react";

export default function OtpScreen({ onSubmit, loading, error }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone");

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.length === 10) {
      setStep("otp");
      if (onSubmit) onSubmit({ phone });
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.length === 4) {
      if (onSubmit) onSubmit({ phone, otp });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-xs rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-center text-xl font-bold">OTP Login</h2>

        {step === "phone" && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <input
              type="tel"
              className="w-full rounded border px-3 py-2"
              placeholder="Enter 10-digit phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
              required
            />
            <button
              type="submit"
              className="w-full rounded bg-blue-600 py-2 font-semibold text-white"
              disabled={loading || phone.length !== 10}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
            {error && <div className="text-center text-sm text-red-500">{error}</div>}
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <input
              type="text"
              className="w-full rounded border px-3 py-2 text-center tracking-widest"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
              required
            />
            <button
              type="submit"
              className="w-full rounded bg-green-600 py-2 font-semibold text-white"
              disabled={loading || otp.length !== 4}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              type="button"
              className="w-full text-sm text-blue-600 underline"
              onClick={() => setStep("phone")}
            >
              Change Phone
            </button>
            {error && <div className="text-center text-sm text-red-500">{error}</div>}
          </form>
        )}
      </div>
    </div>
  );
}
