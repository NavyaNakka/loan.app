import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Login() {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1); // 1 = Phone, 2 = OTP
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Helper to check if user has an application
    async function hasExistingApplication(phone) {
        try {
            const res = await fetch("https://loan-app-cqlh.onrender.com/api/user/check-application", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone }),
            });
            const data = await res.json();
            return data.hasApplication;
        } catch {
            return false;
        }
    }

    // If already logged in, redirect to /track-application if application exists
    useEffect(() => {
        const token = localStorage.getItem("token");
        const phone = localStorage.getItem("userPhone");
        if (token && phone) {
            hasExistingApplication(phone).then((hasApp) => {
                if (hasApp) {
                    navigate("/track-application", { replace: true });
                } else {
                    navigate("/apply-loan", { replace: true });
                }
            });
        } else if (token) {
            navigate("/apply-loan", { replace: true });
        }
    }, [navigate]);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError("");
        
        if (!phone || phone.length < 10) {
            setError("Please enter a valid phone number");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/auth/send-otp", {
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
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError("");
        
        if (!otp || otp.length < 4) {
            setError("Please enter a valid OTP");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone, otp }),
            });

            const data = await res.json();
            if (res.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data._id);
                localStorage.setItem("userPhone", phone);
                window.dispatchEvent(new Event("storage"));
                // Check if user has an application and redirect accordingly
                if (data.hasApplication) {
                    navigate("/track-application");
                } else {
                    navigate("/apply-loan");
                }
            } else {
                setError(data.message || "Failed to verify OTP");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl relative">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">Welcome Back!</h1>
                    <p className="text-slate-500 text-sm">Sign in to your account</p>
                    <div className="mt-3 text-xs text-slate-400 bg-slate-100 rounded-lg px-3 py-2 inline-block">
                        <div><b>Sample for Testing:</b></div>
                        <div>Mobile: <span className="font-mono">9999999999</span></div>
                        <div>OTP: <span className="font-mono">1234</span></div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-xl mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                {step === 1 ? (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                placeholder="Enter your mobile number"
                                required
                                maxLength={15}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-slate-400"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all disabled:opacity-70"
                        >
                            {loading ? "Sending OTP..." : "Get OTP"}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Enter OTP <span className="text-xs text-slate-400 font-normal ml-2">(Use 1234 for testing)</span>
                            </label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                placeholder="Enter 4-digit OTP"
                                required
                                maxLength={4}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-slate-400 text-center tracking-widest text-lg font-semibold"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all disabled:opacity-70"
                        >
                            {loading ? "Verifying..." : "Verify & Log In"}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setStep(1);
                                setOtp("");
                            }}
                            className="w-full py-2 mt-2 text-slate-500 hover:text-slate-700 text-sm transition-all"
                        >
                            Change phone number
                        </button>
                    </form>
                )}

                <p className="mt-8 text-center text-sm text-slate-500">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-600 font-medium hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
