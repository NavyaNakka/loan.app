export const getSessionId = () => {
  let sessionId = localStorage.getItem("sessionId");

  if (!sessionId) {
    sessionId = "SID_" + Date.now();
    localStorage.setItem("sessionId", sessionId);
  }

  return sessionId;
};