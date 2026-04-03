// API Base URL configuration.
// If VITE_API_BASE is not set, use same-origin requests ("/api").
// This avoids mobile "Load failed" errors caused by hardcoded localhost.
const configuredBase = String(import.meta.env.VITE_API_BASE || "").trim();
const normalizedBase = configuredBase.replace(/\/+$/, "");

const API_BASE = normalizedBase;

console.log("🔌 API Base URL:", API_BASE || "(same-origin)");

export default API_BASE;
