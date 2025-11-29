// Dictionary of valid product keys
export const VALID_PRODUCT_KEYS = {
  "MMM-MMM-MM1": { type: "methods", used: false },
  "MMM-MMM-MM2": { type: "methods", used: false },
  "MMM-MMM-MM3": { type: "methods", used: false },
  "SSS-SSS-SS1": { type: "specialist", used: false },
  "SSS-SSS-SS2": { type: "specialist", used: false },
  "SSS-SSS-SS3": { type: "specialist", used: false },
  "BBB-BBB-BB1": { type: "both", used: false }, // Added 'both' key for completeness
};

// Dictionary to store CAS IDs & generated passwords
export const CAS_ID_STORAGE = {};


// ===============================================
// PRODUCT KEY VALIDATION (unchanged)
// ===============================================
export const validateProductKey = (key, expectedType) => {
  const productKey = VALID_PRODUCT_KEYS[key.toUpperCase()];
  if (!productKey) {
    return { valid: false, message: "Invalid product key. Please check and try again." };
  }
  if (productKey.used) {
    return { valid: false, message: "This product key has already been used." };
  }
  if (productKey.type !== expectedType) {
    return {
      valid: false,
      message: `This product key is for ${productKey.type}, not ${expectedType}.`,
    };
  }
  return { valid: true, message: "Product key validated successfully!" };
};


// ===============================================
// MARK PRODUCT KEY AS USED (unchanged)
// ===============================================
export const markProductKeyAsUsed = (key) => {
  const upperKey = key.toUpperCase();
  if (VALID_PRODUCT_KEYS[upperKey]) {
    VALID_PRODUCT_KEYS[upperKey].used = true;
  }
};


// ===============================================
// REAL CAS DH PASSWORD LOGIC — FIXED HEX PARSING
// ===============================================

// Constants used on the CAS calculator
const DH_P = 1000003; // prime modulus
const DH_G = 5;       // base

/**
 * Optimized BigInt modular exponentiation (unchanged from original code)
 * @param {number} base - The base number.
 * @param {number} exp - The exponent.
 * @param {number} mod - The modulus.
 * @returns {number} The result of (base^exp) mod mod.
 */
function modexp(base, exp, mod) {
  let result = 1n;
  let b = BigInt(base % mod);
  let e = BigInt(exp);
  const m = BigInt(mod);

  while (e > 0n) {
    if (e & 1n) {
      result = (result * b) % m;
    }
    b = (b * b) % m;
    e >>= 1n;
  }
  return Number(result); // safe < 1e6
}

/**
 * Core DH calculation based on the hex number and product character.
 * This function uses the corrected logic from your provided script.
 * @param {number} last6Num - The last 6 CAS ID digits parsed as a single Hex number.
 * @param {string} productChar - The product character ('M', 'S', or 'B').
 * @returns {string} The 6-digit password.
 */
function dhPasswordCore(last6Num, productChar) {
  // last6Num is already parsed as number
  last6Num = last6Num | 0;

  const ascii = productChar.charCodeAt(0); // "M"/"S"/"B"
  const mixed = (last6Num ^ ascii) >>> 0;
  const shared = modexp(DH_G, mixed, DH_P);

  let offset = 0;
  if (productChar === "M") offset = 100000;
  else if (productChar === "S") offset = 200000;
  else if (productChar === "B") offset = 300000;

  let pw = (shared + offset) % 1000000;
  return String(pw).padStart(6, "0");
}

/**
 * Generate 6-digit CAS activation password using the correct Hex parsing.
 * @param {string} casId - The full CAS ID string.
 * @param {("methods"|"specialist"|"both")} productType - The type of product.
 * @returns {string} The generated 6-digit password.
 */
export const generatePassword = (casId, productType) => {
  // 1. Extract the last 6 characters and treat them as HEX
  const last6Hex = casId.slice(-6).toUpperCase();

  // 2. Parse the last 6 characters as a single hexadecimal number.
  // This is the key fix!
  const last6Num = parseInt(last6Hex, 16);

  // 3. Determine the single-character product code for DH Core
  let productChar;
  if (productType === 'methods') productChar = 'M';
  else if (productType === 'specialist') productChar = 'S';
  else if (productType === 'both') productChar = 'B';
  else productChar = (productType.charAt(0) || 'M').toUpperCase();

  const pw = dhPasswordCore(last6Num, productChar);

  // optional storage
  CAS_ID_STORAGE[casId] = pw;

  return pw;
};


// ===============================================
// CAS ID VALIDATION — Now explicitly checks hex requirement for last 6
// ===============================================
export const validateCasId = (casId) => {
  if (!casId || casId.trim().length < 6) {
    return { valid: false, message: "CAS ID must be at least 6 characters long." };
  }

  // The CAS ID uses the last 6 characters, which MUST be valid hexadecimal digits (0-9, A-F)
  const last6 = casId.slice(-6);
  if (!/^[0-9A-Fa-f]{6}$/.test(last6)) {
    return { valid: false, message: "The last 6 characters of the CAS ID must be valid hexadecimal digits (0-9, A-F)." };
  }

  // General check for the rest of the ID (if longer than 6)
  if (!/^[A-Za-z0-9]+$/.test(casId)) {
    return { valid: false, message: "CAS ID can only contain letters and numbers." };
  }

  return { valid: true, message: "CAS ID format is valid." };
};