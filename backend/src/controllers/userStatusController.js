import UserStatusHistory from "../models/UserStatusHistory.js";


// 🔥 Track every button click
export const trackAction = async (req, res) => {
  try {
    const { sessionId, status } = req.body;

    if (!sessionId || !status) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const data = await UserStatusHistory.create({
      sessionId,
      status,
      userId: null,
    });

    res.status(201).json({
      success: true,
      data,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};