import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth";
import API_BASE from "../services/api";
import { Phone, Lock, CheckCircle2 } from "lucide-react";

export default function Login() {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (authService.isAuthenticated()) {
            navigate("/apply-loan", { replace: true });
        }
    }, [navigate]);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError("");
        
        if (!phone || phone.length < 10) {
            setError("Please enter a valid 10-digit mobile number");
            return;
        }

        setLoading(true);
        try {
            console.log("📤 Sending OTP to:", API_BASE, "/api/auth/send-otp");
            const res = await fetch(`${API_BASE}/api/auth/send-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone }),
            });

            const data = await res.json();
            if (res.ok) {
                setStep(2);
            } else {
                setError(data.message || "Failed to send OTP");
            }
        } catch (err) {
            console.error("❌ OTP Send Error:", err);
            setError(`Error: ${err.message || "Connection failed. Check API URL."}`);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError("");
        
        if (!otp || otp.length < 4) {
            setError("Please enter valid 4-digit OTP");
            return;
        }

        setLoading(true);
        try {
            console.log("📤 Verifying OTP to:", API_BASE, "/api/auth/verify-otp");
            const res = await fetch(`${API_BASE}/api/auth/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone, otp }),
            });

            const data = await res.json();
            if (res.ok) {
                authService.saveAuth(data.token, { _id: data._id, phone: phone });
                navigate("/apply-loan", { replace: true });
            } else {
                setError(data.message || "Failed to verify OTP");
            }
        } catch (err) {
            console.error("❌ OTP Verify Error:", err);
            setError(`Error: ${err.message || "Connection failed. Check API URL."}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Logo/Header */}
                <div className="text-center mb-8 sm:mb-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
                        <Lock className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
                    <p className="text-sm sm:text-base text-slate-600">Sign in to your KreditKonnect account</p>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/10 ring-1 ring-blue-100/50 p-6 sm:p-8 lg:p-10">
                    {error && (
                        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
                            <p className="text-sm font-medium text-red-800">{error}</p>
                        </div>
                    )}

                    {step === 1 ? (
                        <form onSubmit={handleSendOtp} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-3">
                                    Mobile Number
                                </label>
                                <div className="flex gap-2 sm:gap-3">
                                    <div className="flex items-center px-2 sm:px-4 rounded-lg sm:rounded-xl border border-slate-300 bg-slate-50 shrink-0">
                                        <span className="text-xs sm:text-sm font-semibold text-slate-600">+91</span>
                                    </div>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                        placeholder="10 digits"
                                        inputMode="numeric"
                                        maxLength={10}
                                        className="flex-1 px-3 sm:px-4 py-3 rounded-lg sm:rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white placeholder:text-slate-400 text-sm sm:text-base"
                                    />
                                </div>
                                {phone && !/^\d{10}$/.test(phone) && (
                                    <p className="mt-2 text-xs text-amber-600 font-medium">Enter 10 digits</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading || phone.length !== 10}
                                className="w-full py-3 sm:py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                            >
                                {loading ? "Sending OTP..." : "Send OTP"}
                            </button>

                            <div className="text-center text-xs sm:text-sm text-slate-500 pt-4 space-y-1">
                                <p><span className="font-semibold text-slate-700">Test Phone:</span> <span className="font-mono font-bold text-slate-700">9999999999</span></p>
                                <p><span className="font-semibold text-slate-700">Test OTP:</span> <span className="font-mono font-bold text-slate-700">1234</span></p>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-3">
                                    Enter OTP
                                </label>
                                <p className="text-xs text-slate-600 mb-3">We've sent a 4-digit code to +91 {phone}</p>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                    placeholder="0000"
                                    inputMode="numeric"
                                    maxLength={4}
                                    className="w-full px-4 py-4 sm:py-3 rounded-lg sm:rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-center text-xl sm:text-2xl tracking-widest font-semibold bg-white placeholder:text-slate-300"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading || otp.length !== 4}
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                            >
                                {loading ? "Verifying..." : "Verify & Login"}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setStep(1);
                                    setOtp("");
                                    setError("");
                                }}
                                className="w-full py-2 text-slate-600 hover:text-slate-900 text-sm font-medium transition-all"
                            >
                                Use different number
                            </button>
                        </form>
                    )}
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-slate-600 mt-8">
                    By signing in, you agree to our <a href="/terms" className="text-blue-600 hover:underline font-medium">Terms</a> and <a href="/privacy" className="text-blue-600 hover:underline font-medium">Privacy Policy</a>
                </p>
            </div>
        </div>
    );
}
