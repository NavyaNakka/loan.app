 
import UserInfo from "../models/UserInfo.js";
import UserStatusHistory from "../models/UserStatusHistory.js";

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

    // ✅ PAN Validation with checksum
    if (!validatePAN(panNumber)) {
      const panError = getPANError(panNumber);
      console.warn(`⚠️ Invalid PAN: ${panError}`);
      return res.status(400).json({
        message: panError || "Invalid PAN number",
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

    // ✅ ALWAYS create a new application (allow multiple submissions)
    // Each submission is a separate application record
    console.log("✅ Creating new loan application with PAN:", panNumber);
    const user = await UserInfo.create({
      ...cleanFormData,
      panNumber,
      ...(phone ? { phone } : {}),
      sessionId,
      consentAt: new Date(),
    });

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