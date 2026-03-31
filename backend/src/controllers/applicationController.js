 
import UserInfo from "../models/UserInfo.js";
import UserStatusHistory from "../models/UserStatusHistory.js";

export const applyLoan = async (req, res) => {
  try {
    const { sessionId, ...formData } = req.body;
    const panNumber = String(formData.panNumber || "").toUpperCase().trim();
    const phone = String(formData.phone || "").trim();

    console.log("📝 Apply Loan Request received:", { panNumber, phone, formData });

    // ✅ Consent validation
    if (!formData.acceptedTerms) {
      console.warn("⚠️ Missing acceptedTerms");
      return res.status(400).json({
        message: "Please accept terms and conditions",
      });
    }

    if (!panNumber) {
      console.warn("⚠️ Missing PAN number");
      return res.status(400).json({
        message: "PAN number is required",
      });
    }

    // Validate required fields
    const requiredFields = ["fullName", "gender", "pincode", "loanType", "loanAmount", "employmentType", "yearlyIncome"];
    for (const field of requiredFields) {
      if (!formData[field]) {
        console.warn(`⚠️ Missing required field: ${field}`);
        return res.status(400).json({
          message: `${field} is required`,
        });
      }
    }

    // ✅ Convert number fields to actual numbers
    const cleanFormData = {
      ...formData,
      loanAmount: parseInt(formData.loanAmount) || 0,
      yearlyIncome: parseInt(formData.yearlyIncome) || 0,
    };

    let user;
    const lookup = { panNumber };

    const existingUser = await UserInfo.findOne(lookup);

    if (existingUser) {
      console.log("✅ Updating existing user with PAN:", panNumber);
      user = await UserInfo.findOneAndUpdate(
        lookup,
        {
          ...cleanFormData,
          panNumber,
          ...(phone ? { phone } : {}),
          sessionId,
          consentAt: new Date(),
        },
        { new: true }
      );

    } else {
      console.log("✅ Creating new user with PAN:", panNumber);
      user = await UserInfo.create({
        ...cleanFormData,
        panNumber,
        ...(phone ? { phone } : {}),
        sessionId,
        consentAt: new Date(),
      });
    }

    // ✅ Link session to user
    if (sessionId) {
      await UserStatusHistory.updateMany(
        { sessionId },
        { userId: user._id }
      );
    }

    console.log("✅ Application submitted successfully for user:", user._id);

    res.json({
      success: true,
      userId: user._id,
      user,
    });

  } catch (err) {
    console.error("❌ ERROR in applyLoan:", {
      message: err.message,
      stack: err.stack,
      name: err.name,
    });
    res.status(500).json({ 
      error: err.message,
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};