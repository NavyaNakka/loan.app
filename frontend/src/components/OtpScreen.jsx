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
      <div className="w-full max-w-xs bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-center">OTP Login</h2>
        {step === "phone" && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <input
              type="tel"
              className="w-full border rounded px-3 py-2"
              placeholder="Enter 10-digit phone"
              value={phone}
              onChange={e => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded py-2 font-semibold"
              disabled={loading || phone.length !== 10}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          </form>
        )}
        {step === "otp" && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <input
              type="text"
              className="w-full border rounded px-3 py-2 tracking-widest text-center"
              placeholder="Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white rounded py-2 font-semibold"
              disabled={loading || otp.length !== 4}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              type="button"
              className="w-full text-blue-600 underline text-sm"
              onClick={() => setStep("phone")}
            >
              Change Phone
            </button>
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          </form>
        )}
      </div>
      <div className="mt-4 text-xs text-gray-500 text-center">Sample OTP: <span className="font-bold">1234</span></div>
    </div>
  );
}
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
      <div className="w-full max-w-xs bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-center">OTP Login</h2>
        {step === "phone" && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <input
              type="tel"
              className="w-full border rounded px-3 py-2"
              placeholder="Enter 10-digit phone"
              value={phone}
              onChange={e => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded py-2 font-semibold"
              disabled={loading || phone.length !== 10}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          </form>
        )}
        {step === "otp" && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <input
              type="text"
              className="w-full border rounded px-3 py-2 tracking-widest text-center"
              placeholder="Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white rounded py-2 font-semibold"
              disabled={loading || otp.length !== 4}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              type="button"
              className="w-full text-blue-600 underline text-sm"
              onClick={() => setStep("phone")}
            >
              Change Phone
            </button>
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          </form>
        )}
      </div>
      <div className="mt-4 text-xs text-gray-500 text-center">Sample OTP: <span className="font-bold">1234</span></div>
    </div>
  );
}
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
      <div className="w-full max-w-xs bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-center">OTP Login</h2>
        {step === "phone" && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <input
              type="tel"
              className="w-full border rounded px-3 py-2"
              placeholder="Enter 10-digit phone"
              value={phone}
              onChange={e => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded py-2 font-semibold"
              disabled={loading || phone.length !== 10}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          </form>
        )}
        {step === "otp" && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <input
              type="text"
              className="w-full border rounded px-3 py-2 tracking-widest text-center"
              placeholder="Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white rounded py-2 font-semibold"
              disabled={loading || otp.length !== 4}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              type="button"
              className="w-full text-blue-600 underline text-sm"
              onClick={() => setStep("phone")}
            >
              Change Phone
            </button>
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          </form>
        )}
      </div>
      <div className="mt-4 text-xs text-gray-500 text-center">Sample OTP: <span className="font-bold">1234</span></div>
    </div>
  );
}
