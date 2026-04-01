// API Base URL Configuration
// Use environment variable or default to localhost for development

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

console.log("🔌 API Base URL:", API_BASE);

export default API_BASE;
