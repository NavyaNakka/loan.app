import axios from "axios";
import { getSessionId } from "./session";

const BASE_URL = "http://localhost:5000/api/status";

export const trackAction = async (status) => {
  try {
    const sessionId = getSessionId();

    await axios.post(`${BASE_URL}/track`, {
      sessionId,
      status,
    });

  } catch (err) {
    console.error("Tracking error:", err);
  }
};