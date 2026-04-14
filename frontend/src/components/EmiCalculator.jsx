
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { trackAction } from "../services/track";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

export default function EmiCalculator() {
  const navigate = useNavigate();

  const [loanAmount, setLoanAmount] = useState(500000);
  const [annualRate, setAnnualRate] = useState(12);
  const [tenureMonths, setTenureMonths] = useState(36);

  const analytics = useMemo(() => {
    const principal = Number(loanAmount) || 0;
    const rate = Number(annualRate) || 0;
    const months = Number(tenureMonths) || 0;

    if (!principal || !rate || !months)
      return { emi: 0, totalPayment: 0, totalInterest: 0, interestShare: 0, principalShare: 0 };

    const monthlyRate = rate / 12 / 100;
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;
    const interestShare = (totalInterest / totalPayment) * 100;
    const principalShare = (principal / totalPayment) * 100;

    return { emi, totalPayment, totalInterest, interestShare, principalShare };
  }, [loanAmount, annualRate, tenureMonths]);

  return (
    <section id="emi" className="bg-slate-50 py-10 sm:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            EMI Calculator
          </span>
          <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">Quick EMI Estimate</h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Clean and simple EMI preview before you apply.
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">

          {/* ── LEFT: Inputs ── */}
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h3 className="text-base font-semibold text-slate-900">Loan Details</h3>

            <div className="mt-5 space-y-5">
              {/* Loan Amount */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700">Loan Amount</label>
                  <span className="text-sm font-semibold text-blue-600">{formatCurrency(loanAmount)}</span>
                </div>
                <input type="range" min="50000" max="100000000" step="50000" value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)} className="w-full accent-blue-600" />
                <input type="text" inputMode="numeric" value={loanAmount}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    setLoanAmount(val ? Number(val) : '');
                  }}
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
              </div>

              {/* Interest Rate */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700">Interest Rate</label>
                  <span className="text-sm font-semibold text-blue-600">{annualRate}% p.a.</span>
                </div>
                <input type="range" min="5" max="30" step="0.1" value={annualRate}
                  onChange={(e) => setAnnualRate(e.target.value)} className="w-full accent-blue-600" />
                <input type="text" inputMode="decimal" value={annualRate}
                  onChange={(e) => {
                    let val = e.target.value.replace(/[^0-9.]/g, '');
                    if ((val.match(/\./g) || []).length > 1) val = val.replace(/\.+$/, '');
                    setAnnualRate(val);
                  }}
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
              </div>

              {/* Tenure */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700">Tenure</label>
                  <span className="text-sm font-semibold text-blue-600">{tenureMonths} months</span>
                </div>
                <input type="range" min="6" max="360" step="1" value={tenureMonths}
                  onChange={(e) => setTenureMonths(e.target.value)} className="w-full accent-blue-600" />
                <input type="text" inputMode="numeric" value={tenureMonths}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    setTenureMonths(val ? Number(val) : '');
                  }}
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
              </div>
            </div>
          </div>

          {/* ── RIGHT: Compact Results ── */}
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 flex flex-col gap-4">

            <div className="rounded-xl bg-blue-600 p-4 text-white">
              <p className="text-xs font-medium text-blue-200">Estimated Monthly EMI</p>
              <h3 className="mt-1 text-3xl font-bold tracking-tight">{formatCurrency(analytics.emi)}</h3>
              <p className="mt-1 text-xs text-blue-200">For {tenureMonths} months</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Principal Amount", value: formatCurrency(loanAmount), accent: false },
                { label: "Total Interest", value: formatCurrency(analytics.totalInterest), accent: true },
                { label: "Total Payment", value: formatCurrency(analytics.totalPayment), accent: false },
                { label: "Tenure", value: `${tenureMonths} Months`, accent: false },
              ].map((tile) => (
                <div key={tile.label} className="rounded-lg bg-slate-50 px-3 py-3">
                  <p className="text-xs text-slate-500">{tile.label}</p>
                  <p className={`mt-1 text-sm font-semibold ${tile.accent ? "text-orange-500" : "text-slate-900"}`}>
                    {tile.value}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-slate-600">
                <span>Principal vs Interest</span>
                <span>{analytics.principalShare.toFixed(1)}% / {analytics.interestShare.toFixed(1)}%</span>
              </div>
              <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full bg-blue-600 transition-all duration-500"
                  style={{ width: `${analytics.principalShare || 0}%` }} />
                <div className="h-full bg-orange-400 transition-all duration-500"
                  style={{ width: `${analytics.interestShare || 0}%` }} />
              </div>
            </div>

            <button
              onClick={() => { trackAction("apply from emi"); navigate("/apply-loan"); }}
              className="mt-1 w-full rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-95"
            >
              Apply Based on This EMI →
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}