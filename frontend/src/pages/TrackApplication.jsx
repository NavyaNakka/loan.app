import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { trackAction } from "../services/track";
import authService from "../services/auth";
import API_BASE from "../services/api";

const DEFAULT_APPROVED_LENDERS = [
  {
    name: "Ram Fincorp",
    url: "https://applyonline.ramfincorp.com/?utm_source=kreditkonnect",
  },
];

const getInProgressStorageKey = (phone) => `kreditkonnect_in_progress_lender_${phone || "guest"}`;

const getStoredInProgressLender = (phone) => {
  try {
    return localStorage.getItem(getInProgressStorageKey(phone)) || "";
  } catch {
    return "";
  }
};

const setStoredInProgressLender = (phone, lenderName) => {
  try {
    localStorage.setItem(getInProgressStorageKey(phone), lenderName || "");
  } catch {
    // Ignore storage errors and rely on API state.
  }
};

const normalizeApprovedLenders = (approvedLenders, fallbackLenderName) => {
  const normalizedLenders = Array.isArray(approvedLenders)
    ? approvedLenders
        .map((lender) => ({
          name: String(lender?.name || "").trim(),
          url: String(lender?.url || "").trim(),
        }))
        .filter((lender) => lender.name && lender.url)
    : [];

  if (normalizedLenders.length > 0) {
    return normalizedLenders;
  }

  if (fallbackLenderName) {
    const matchedLender = DEFAULT_APPROVED_LENDERS.find((lender) => lender.name === fallbackLenderName);
    if (matchedLender) {
      return [matchedLender];
    }
  }

  return DEFAULT_APPROVED_LENDERS;
};

export default function TrackApplication() {
  const location = useLocation();
  const user = authService.getUserData();
  const storedInProgressLender = getStoredInProgressLender(user?.phone);
  const cachedInProgressLender = user?.lenderStatus === "in_progress" ? user?.lenderName : "";
  const initialLenderName = location.state?.lenderName || user?.lenderName || DEFAULT_APPROVED_LENDERS[0].name;
  const [approvedLenders, setApprovedLenders] = useState(
    normalizeApprovedLenders(location.state?.approvedLenders || user?.approvedLenders, initialLenderName)
  );
  const [lenderName, setLenderName] = useState(initialLenderName);
  const [isInProgress, setIsInProgress] = useState(
    user?.lenderStatus === "in_progress" || !!storedInProgressLender
  );
  const [inProgressLenderName, setInProgressLenderName] = useState(
    cachedInProgressLender || storedInProgressLender || ""
  );
  const [loadingStatus, setLoadingStatus] = useState(true);

  useEffect(() => {
    const fetchApplicationStatus = async () => {
      if (!user?.phone) {
        setLoadingStatus(false);
        return;
      }

      try {
        const { data } = await axios.get(`${API_BASE}/api/application/details`, {
          params: { phone: user.phone },
        });

        if (data?.application) {
          const nextLenderName = data.application.lenderName || location.state?.lenderName || user?.lenderName || DEFAULT_APPROVED_LENDERS[0].name;
          const nextApprovedLenders = normalizeApprovedLenders(
            data.application.approvedLenders,
            nextLenderName
          );
          const backendInProgress = data.application.lenderStatus === "in_progress";
          const cachedInProgressMatchesLender =
            user?.lenderStatus === "in_progress" && user?.lenderName === nextLenderName;
          const storedInProgressMatchesLender =
            storedInProgressLender && storedInProgressLender === nextLenderName;
          const nextInProgressLenderName =
            backendInProgress || cachedInProgressMatchesLender || storedInProgressMatchesLender
              ? nextLenderName
              : "";

          setApprovedLenders(nextApprovedLenders);
          setLenderName(nextLenderName);
          setInProgressLenderName(nextInProgressLenderName);
          setIsInProgress(!!nextInProgressLenderName);
          if (nextInProgressLenderName) {
            setStoredInProgressLender(user?.phone, nextInProgressLenderName);
          }
          authService.updateUserData({
            hasApplication: true,
            lenderName: nextLenderName,
            lenderStatus: nextInProgressLenderName ? "in_progress" : "submitted",
            approvedLenders: nextApprovedLenders,
          });
        }
      } catch {
        // Keep cached in-progress status if details API is temporarily unavailable.
        const fallbackInProgressLender = cachedInProgressLender || storedInProgressLender || "";
        setInProgressLenderName(fallbackInProgressLender);
        setIsInProgress(!!fallbackInProgressLender);
      } finally {
        setLoadingStatus(false);
      }
    };

    fetchApplicationStatus();
  }, [location.state?.lenderName, user?.phone]);

  const handleBannerClick = async (event, selectedLender) => {
    event.preventDefault();
    const targetUrl = selectedLender.url;

    if (user?.phone) {
      try {
        await axios.patch(`${API_BASE}/api/application/lender-progress`, {
          phone: user.phone,
          lenderName: selectedLender.name,
        });
      } catch {
        // Continue redirect flow even if status update fails.
      }

      authService.updateUserData({
        hasApplication: true,
        lenderName: selectedLender.name,
        lenderStatus: "in_progress",
        approvedLenders,
      });
      setStoredInProgressLender(user.phone, selectedLender.name);
    }

    void trackAction(`${selectedLender.name} in progress`);
    window.location.assign(targetUrl);
  };

  const activeLenderName = isInProgress ? (inProgressLenderName || lenderName) : "";

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 py-12 sm:py-20">
      <div className="mx-auto w-full max-w-3xl">
        <div className="rounded-3xl bg-white p-6 text-center shadow-xl ring-1 ring-slate-100 sm:p-10">
          <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <svg className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 111.414-1.414l2.543 2.543 6.543-6.543a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            {isInProgress ? `Your journey with ${lenderName} is in progress` : "Approved lenders for your profile"}
          </h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            {loadingStatus
              ? "Checking your lender progress..."
              : isInProgress
              ? "One lender is currently in progress. You can continue with that lender while the remaining approved lenders stay available below."
              : "Click any approved lender below to continue your application on the official lender website."}
          </p>

          <div className="mt-8 space-y-4">
            {approvedLenders.map((approvedLender) => {
              const lenderIsInProgress = isInProgress && activeLenderName === approvedLender.name;

              return (
                <a
                  key={approvedLender.name}
                  href={approvedLender.url}
                  onClick={(event) => handleBannerClick(event, approvedLender)}
                  className="block w-full rounded-2xl border border-blue-200 bg-blue-50 p-5 text-left transition hover:border-blue-300 hover:bg-blue-100"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                        {lenderIsInProgress ? "Journey In Progress" : "Eligible Offer"}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <p className="text-base font-extrabold text-blue-900">{approvedLender.name}</p>
                        {lenderIsInProgress && (
                          <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-700">
                            In Progress
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-blue-700">
                        {lenderIsInProgress ? "Your journey is in progress. Tap to continue" : "Tap to continue on lender website"}
                      </p>
                    </div>
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L13.586 11H3a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
