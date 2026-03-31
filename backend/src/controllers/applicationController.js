 
import UserInfo from "../models/UserInfo.js";
import UserStatusHistory from "../models/UserStatusHistory.js";

export const applyLoan = async (req, res) => {
  try {
    const { sessionId, ...formData } = req.body;
    const panNumber = String(formData.panNumber || "").toUpperCase().trim();
    const phone = String(formData.phone || "").trim();

    // ✅ Consent validation
    if (!formData.acceptedTerms) {
      return res.status(400).json({
        message: "Please accept terms and conditions",
      });
    }

    if (!panNumber) {
      return res.status(400).json({
        message: "PAN number is required",
      });
    }

    let user;
    const lookup = { panNumber };

    const existingUser = await UserInfo.findOne(lookup);

    if (existingUser) {
      // ✅ UPDATE existing user (IMPORTANT FIX)
      user = await UserInfo.findOneAndUpdate(
        lookup,
        {
          ...formData,                 // ✅ includes acceptedTerms
          panNumber,
          ...(phone ? { phone } : {}),
          sessionId,
          consentAt: new Date(),       // ✅ update timestamp
        },
        { new: true }
      );

    } else {
      // ✅ Create new user
      user = await UserInfo.create({
        ...formData,
        panNumber,
        ...(phone ? { phone } : {}),
        sessionId,
        consentAt: new Date(),         // ✅ add timestamp
      });
    }

    // ✅ Link session to user
    if (sessionId) {
      await UserStatusHistory.updateMany(
        { sessionId },
        { userId: user._id }
      );
    }

    res.json({
      success: true,
      userId: user._id,
      user,
    });

  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};