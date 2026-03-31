import React from "react";

export default function TrackApplication() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Track Your Application</h1>
        <p className="text-slate-600 mb-6">
          Your loan application is being processed. You can check the status here anytime.
        </p>
        {/* TODO: Add application status details here */}
        <div className="mt-8 text-sm text-slate-400">This is a placeholder page. Integrate with backend for real status updates.</div>
      </div>
    </div>
  );
}
