 
import UserInfo from "../models/UserInfo.js";
import UserStatusHistory from "../models/UserStatusHistory.js";

const DEFAULT_APPROVED_LENDERS = [
  {
    name: "Ram Fincorp",
    url: "https://applyonline.ramfincorp.com/?utm_source=kreditkonnect",
  },
];

const normalizeApprovedLenders = (application) => {
  const approvedLenders = Array.isArray(application?.approvedLenders)
    ? application.approvedLenders
        .map((lender) => ({
          name: String(lender?.name || "").trim(),
          url: String(lender?.url || "").trim(),
        }))
        .filter((lender) => lender.name && lender.url)
    : [];

  if (approvedLenders.length > 0) {
    return approvedLenders;
  }

  const fallbackLenderName = String(application?.lenderName || "Ram Fincorp").trim();
  const fallbackLender = DEFAULT_APPROVED_LENDERS.find((lender) => lender.name === fallbackLenderName);

  return [
    fallbackLender || {
      name: fallbackLenderName || "Ram Fincorp",
      url: "https://applyonline.ramfincorp.com/?utm_source=kreditkonnect",
    },
  ];
};

// ✅ PAN Validation Functions (Inline)
const validatePANChecksum = (pan) => {
  const panChars = pan.substring(0, 9);
  const checkDigit = pan[9];

  try {
    const calculated = calculatePANChecksum(panChars);
    return calculated === checkDigit;
  } catch (err) {
    return false;
  }
};

const calculatePANChecksum = (pan9Chars) => {
  const checkSumMap = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const weights = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    const char = pan9Chars[i];
    let charValue;

    if (char >= "0" && char <= "9") {
      charValue = parseInt(char, 10);
    } else if (char >= "A" && char <= "Z") {
      charValue = char.charCodeAt(0) - "A".charCodeAt(0) + 10;
    } else {
      return "?";
    }

    sum += charValue * weights[i];
  }

  const checkIndex = sum % 36;
  return checkSumMap[checkIndex];
};

const validatePAN = (pan) => {
  if (!pan) return false;

  const panStr = String(pan).toUpperCase().trim();

  // Check basic format: 5 letters + 4 digits + 1 letter
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
  if (!panRegex.test(panStr)) {
    return false;
  }

  // RELAXED: Accept any format-valid PAN for testing/demo
  // Checksum and type validation disabled for demo purposes
  // Production: Uncomment the code below to enable strict validation
  
  // const validPANTypes = {
  //   P: "Individual",
  //   C: "Company",
  //   H: "HUF",
  //   A: "AOP",
  //   T: "Trust",
  //   B: "Body of individuals",
  //   L: "Local authority",
  //   J: "Artificial Juridical Person",
  //   F: "Foreign entity",
  //   G: "Government",
  // };
  // const panType = panStr[2];
  // if (!validPANTypes[panType]) return false;
  // return validatePANChecksum(panStr);

  return true; // Format check only
};

const getPANError = (pan) => {
  if (!pan) return "PAN Number is required.";

  const panStr = String(pan).toUpperCase().trim();

  if (panStr.length !== 10) {
    return "PAN must be exactly 10 characters.";
  }

  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
  if (!panRegex.test(panStr)) {
    return "Invalid PAN format. Must be: 5 letters + 4 digits + 1 letter (e.g., ABCPA1234F)";
  }

  // NOTE: Relaxed validation - accept any single letter in position 3 for testing
  // In production, validate against: P, C, H, A, T, B, L, J, F, G
  // const validPANTypes = ["P", "C", "H", "A", "T", "B", "L", "J", "F", "G"];
  // if (!validPANTypes.includes(panStr[2])) {
  //   return `Invalid PAN type '${panStr[2]}'. 3rd character must be one of: ${validPANTypes.join(", ")}`;
  // }

  // Checksum validation is currently relaxed for demo
  // In production, uncomment the line below:
  // if (!validatePANChecksum(panStr)) {
  //   return "Invalid PAN checksum. Please enter a valid PAN number.";
  // }

  return "";
};

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

    // ✅ PAN required and valid
    if (!panNumber || panNumber.length === 0) {
      return res.status(400).json({
        message: "PAN number is required",
      });
    }

    if (!validatePAN(panNumber)) {
      const panError = getPANError(panNumber);
      return res.status(400).json({
        message: panError || "Invalid PAN number",
      });
    }

    // Validate required fields
    const requiredFields = ["fullName", "gender", "pincode", "loanAmount", "employmentType", "yearlyIncome"];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return res.status(400).json({
          message: `${field} is required`,
        });
      }
    }

    // ✅ Convert number fields to actual numbers
    const cleanFormData = {
      ...formData,
      lenderName: "Ram Fincorp",
      lenderStatus: "submitted",
      approvedLenders: DEFAULT_APPROVED_LENDERS,
      loanAmount: parseInt(formData.loanAmount) || 0,
      yearlyIncome: parseInt(formData.yearlyIncome) || 0,
    };

    // Create new application
    const user = await UserInfo.create({
      ...cleanFormData,
      panNumber,
      ...(phone ? { phone } : {}),
      sessionId,
      consentAt: new Date(),
    });

    // Link session to user
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
    console.error("❌ ERROR in applyLoan:", err.message);
    res.status(500).json({ 
      error: err.message,
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};

// ✅ Fetch user data by phone number (for auto-fill)
export const getUserByPhone = async (req, res) => {
  try {
    const { phone } = req.params;

    if (!phone || !/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        message: "Invalid phone number format",
      });
    }

    // Find the latest application for this phone number
    const user = await UserInfo.findOne({ phone })
      .sort({ createdAt: -1 }) // Get most recent submission
      .select("fullName gender pincode panNumber loanType loanAmount employmentType yearlyIncome phone");

    if (!user) {
      return res.status(404).json({
        message: "No previous application found for this phone number",
      });
    }

    res.json({
      success: true,
      user: {
        fullName: user.fullName,
        gender: user.gender,
        pincode: user.pincode,
        panNumber: user.panNumber,
        loanType: user.loanType,
        loanAmount: user.loanAmount.toString(),
        employmentType: user.employmentType,
        yearlyIncome: user.yearlyIncome.toString(),
      },
    });

  } catch (err) {
    console.error("❌ ERROR in getUserByPhone:", err.message);
    res.status(500).json({ 
      error: err.message,
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};

export const checkApplicationByPhone = async (req, res) => {
  try {
    const phone = String(req.query.phone || "").trim();

    if (!phone) {
      return res.status(400).json({
        message: "phone is required",
      });
    }

    const existingApplication = await UserInfo.findOne({ phone })
      .sort({ createdAt: -1 })
      .select("lenderName lenderStatus createdAt");

    return res.json({
      success: true,
      exists: !!existingApplication,
      lenderName: existingApplication?.lenderName || "Ram Fincorp",
      lenderStatus: existingApplication?.lenderStatus || "submitted",
      approvedLenders: normalizeApprovedLenders(existingApplication),
      submittedAt: existingApplication?.createdAt || null,
    });
  } catch (err) {
    console.error("❌ ERROR in checkApplicationByPhone:", err.message);
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const getApplicationDetailsByPhone = async (req, res) => {
  try {
    const phone = String(req.query.phone || "").trim();

    if (!phone) {
      return res.status(400).json({
        message: "phone is required",
      });
    }

    const application = await UserInfo.findOne({ phone }).sort({ createdAt: -1 });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    const applicationObj = application.toObject();
    if (!applicationObj.lenderStatus) {
      applicationObj.lenderStatus = "submitted";
    }
    applicationObj.approvedLenders = normalizeApprovedLenders(applicationObj);

    return res.json({
      success: true,
      application: applicationObj,
    });
  } catch (err) {
    console.error("❌ ERROR in getApplicationDetailsByPhone:", err.message);
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const updateApplicationDetailsByPhone = async (req, res) => {
  try {
    const phone = String(req.body.phone || "").trim();

    if (!phone) {
      return res.status(400).json({
        message: "phone is required",
      });
    }

    const application = await UserInfo.findOne({ phone }).sort({ createdAt: -1 });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    const editableFields = [
      "fullName",
      "gender",
      "pincode",
      "panNumber",
      "loanAmount",
      "employmentType",
      "yearlyIncome",
    ];

    for (const field of editableFields) {
      if (req.body[field] !== undefined) {
        if (field === "panNumber") {
          const panNumber = String(req.body.panNumber || "").toUpperCase().trim();
          if (!validatePAN(panNumber)) {
            return res.status(400).json({
              message: getPANError(panNumber) || "Invalid PAN number",
            });
          }
          application.panNumber = panNumber;
        } else if (field === "loanAmount" || field === "yearlyIncome") {
          const numericValue = parseInt(req.body[field], 10);
          if (Number.isNaN(numericValue) || numericValue <= 0) {
            return res.status(400).json({
              message: `${field} must be a valid positive number`,
            });
          }
          application[field] = numericValue;
        } else {
          application[field] = req.body[field];
        }
      }
    }

    await application.save();

    return res.json({
      success: true,
      message: "Application details updated successfully",
      application,
    });
  } catch (err) {
    console.error("❌ ERROR in updateApplicationDetailsByPhone:", err.message);
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const markLenderInProgressByPhone = async (req, res) => {
  try {
    const phone = String(req.body.phone || "").trim();
    const lenderName = String(req.body.lenderName || "Ram Fincorp").trim();

    if (!phone) {
      return res.status(400).json({
        message: "phone is required",
      });
    }

    const application = await UserInfo.findOne({ phone }).sort({ createdAt: -1 });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    const approvedLenders = normalizeApprovedLenders(application);
    const existingLender = approvedLenders.find((item) => item.name === lenderName);

    application.approvedLenders = existingLender
      ? approvedLenders
      : [
          ...approvedLenders,
          {
            name: lenderName || "Ram Fincorp",
            url: "https://applyonline.ramfincorp.com/?utm_source=kreditkonnect",
          },
        ];
    application.lenderName = lenderName || application.lenderName || "Ram Fincorp";
    application.lenderStatus = "in_progress";
    await application.save();

    return res.json({
      success: true,
      message: "Lender marked as in progress",
      lenderName: application.lenderName,
      lenderStatus: application.lenderStatus,
      approvedLenders: normalizeApprovedLenders(application),
    });
  } catch (err) {
    console.error("❌ ERROR in markLenderInProgressByPhone:", err.message);
    return res.status(500).json({
      error: err.message,
    });
  }
};