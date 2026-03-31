/**
 * Backend PAN Validator
 * Validates PAN number with proper format and checksum validation
 */

export const validatePAN = (pan) => {
  if (!pan) return false;

  const panStr = String(pan).toUpperCase().trim();

  // Check basic format: 5 letters + 4 digits + 1 letter
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
  if (!panRegex.test(panStr)) {
    return false;
  }

  // Check for valid PAN prefix (first 3 letters indicate PAN holder type)
  const validPANTypes = {
    P: "Individual",
    C: "Company",
    H: "HUF",
    A: "AOP",
    T: "Trust",
    B: "Body of individuals",
    L: "Local authority",
    J: "Artificial Juridical Person",
    F: "Foreign entity",
    G: "Government",
  };

  const panType = panStr[2]; // 3rd letter indicates type
  if (!validPANTypes[panType]) {
    return false;
  }

  // Validate checksum
  return validatePANChecksum(panStr);
};

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

export const getPANError = (pan) => {
  if (!pan) return "PAN Number is required.";

  const panStr = String(pan).toUpperCase().trim();

  if (panStr.length !== 10) {
    return "PAN must be exactly 10 characters.";
  }

  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
  if (!panRegex.test(panStr)) {
    return "Invalid PAN format.";
  }

  if (!validatePANChecksum(panStr)) {
    return "Invalid PAN number.";
  }

  return "";
};
