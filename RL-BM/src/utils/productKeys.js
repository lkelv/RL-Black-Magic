// src/utils/productKeys.js
// ========================================================
// FIXED VERSION - Product Key Validation System
// ========================================================

// =========================
// CONFIG
// =========================
const MATH_KEY_LENGTH = 9;
const PRODUCT_KEY_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const PRODUCT_KEY_BLOCK_LENGTH = 4;
const PRODUCT_KEY_BLOCKS = 3;

export const VALID_PRODUCT_KEYS = {};
export const CAS_ID_STORAGE = {};


// =========================
// SIMPLIFIED SECRET FORMULA
// =========================
// y = sinh(x)
const applySecretFormula = (x) => {
  try {
    if (!Number.isFinite(x)) return 0;

    // Simple hyperbolic sine
    const result = Math.sinh(x);

    return Number.isFinite(result) ? Math.abs(result) : 0;
  } catch {
    return 0;
  }
};


// =========================
// ASCII → BigInt (FIXED)
// =========================
const convertKeyToInt = (key) => {
  const cleaned = key.toUpperCase().replace(/[^A-Z0-9]/g, "");

  // Convert each character to ASCII and concatenate as string
  const asciiString = [...cleaned].map((c) => c.charCodeAt(0)).join("");

  return BigInt(asciiString);
};


// =========================
// BigInt modular exponentiation
// =========================
const modExp = (base, exponent, modulus) => {
  let result = 1n;
  let b = base % modulus;
  let e = exponent;

  while (e > 0n) {
    if (e % 2n === 1n) {
      result = (result * b) % modulus;
    }
    b = (b * b) % modulus;
    e = e / 2n;
  }

  return result;
};


// =========================
// Diffie–Hellman mixing (FIXED)
// =========================
const diffieHellman = (processedInt) => {
  const prime = 7919n;
  const generator = 5n;
  const privateB = 1234n;

  // Use processedInt as private key A
  const privateA = processedInt % (prime - 1n); // Ensure it's in valid range
  if (privateA === 0n) return 1234n; // Fallback

  // Public key B = g^privateB mod p
  const publicB = modExp(generator, privateB, prime);

  // Shared secret = publicB^privateA mod p
  return modExp(publicB, privateA, prime);
};


// =========================
// Reduce → 9-digit mathematical key
// =========================
const reduceToMathKey = (big) => {
  const mod = 1000000000n; // 10^9
  let num = big % mod;
  if (num < 0) num += mod;
  return num.toString().padStart(MATH_KEY_LENGTH, "0");
};


// =========================
// LESS RESTRICTIVE VALIDATION RULES
// =========================
// Updated rules based on new specification:
// 1) D1 * D2 = 24 OR D1 * D2 = 15 OR D1 + D2 = 10
// 2) D3 + D4 = 15 (hex F) OR D3 * D4 = 12
// 3) D5 + D6 = D1 OR (D5 * D6) % 10 = D2
// 4) D7 + D8 + D9 sum is between 5 and 25 (inclusive)
//
export const validateMathRules = (k) => {
  if (k.length !== 9) return false;
  const d = k.split("").map(Number);

  // Rule 1: First two digits multiply to 24 or 15, or add to 10
  const rule1 = (d[0] * d[1] === 24) || (d[0] * d[1] === 15) || (d[0] + d[1] === 10);

  // Rule 2: Third and fourth add to 15 (hex F) or multiply to 12
  const rule2 = (d[2] + d[3] === 15) || (d[2] * d[3] === 12);

  // Rule 3: Fifth and sixth add to first digit OR multiply and mod 10 equals second digit
  const rule3 = (d[4] + d[5] === d[0]) || ((d[4] * d[5]) % 10 === d[1]);

  // Rule 4: Last three digits sum to between 5 and 25 (inclusive)
  const lastThreeSum = d[6] + d[7] + d[8];
  const rule4 = (lastThreeSum >= 5) && (lastThreeSum <= 25);

  return rule1 && rule2 && rule3 && rule4;
};


// =========================
// BACKTRACKING DEBUG INFO
// =========================
export const backtrackValidationKey = (k) => {
  if (k.length !== 9) return null;
  const d = k.split("").map(Number);

  const lastThreeSum = d[6] + d[7] + d[8];

  return {
    digits: d,
    checks: {
      rule1_mult_24: d[0] * d[1],
      rule1_mult_15: d[0] * d[1],
      rule1_add: d[0] + d[1],
      rule1_pass: (d[0] * d[1] === 24) || (d[0] * d[1] === 15) || (d[0] + d[1] === 10),

      rule2_add: d[2] + d[3],
      rule2_mult: d[2] * d[3],
      rule2_pass: (d[2] + d[3] === 15) || (d[2] * d[3] === 12),

      rule3_add: d[4] + d[5],
      rule3_target_d1: d[0],
      rule3_mod: (d[4] * d[5]) % 10,
      rule3_target_d2: d[1],
      rule3_pass: (d[4] + d[5] === d[0]) || ((d[4] * d[5]) % 10 === d[1]),

      rule4_sum: lastThreeSum,
      rule4_range: `${lastThreeSum} ∈ [5, 25]`,
      rule4_pass: (lastThreeSum >= 5) && (lastThreeSum <= 25),
    }
  };
};


// =========================
// FULL PIPELINE (FIXED)
// =========================
export const deriveMathKeyFromProductKey = (key) => {
  // Step 1: Convert to BigInt from ASCII
  let bigIntKey = convertKeyToInt(key);

  // Step 2: Multiply by 5
  bigIntKey = bigIntKey * 5n;

  // Step 3: Convert to Number and take log
  const num = Number(bigIntKey % 10000000000000n); // Keep it manageable
  const logged = Math.log(num);

  // Step 4: Apply secret formula
  const afterSecret = applySecretFormula(logged);

  // Step 5: Convert back to BigInt and mod
  let modded = BigInt(Math.floor(Math.abs(afterSecret))) % 999983n;
  if (modded < 0) modded += 999983n;

  // Step 6: Apply Diffie-Hellman
  const dh = diffieHellman(modded);

  // Step 7: Reduce to 9-digit math key
  return reduceToMathKey(dh);
};


// =========================
// RANDOM PRODUCT KEY GEN
// =========================
const randomBlock = (len = PRODUCT_KEY_BLOCK_LENGTH) => {
  let out = "";
  for (let i = 0; i < len; i++) {
    out += PRODUCT_KEY_CHARS[Math.floor(Math.random() * PRODUCT_KEY_CHARS.length)];
  }
  return out;
};

export const generateRandomProductKeyString = () => {
  const blocks = [];
  for (let i = 0; i < PRODUCT_KEY_BLOCKS; i++) {
    blocks.push(randomBlock());
  }
  return blocks.join("-");
};


// =========================
// GENERATE VALID PRODUCT KEY
// =========================
export const generateValidProductKey = (maxAttempts = 1000000) => {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const productKey = generateRandomProductKeyString();
    const mathKey = deriveMathKeyFromProductKey(productKey);

    if (validateMathRules(mathKey)) {
      return { productKey, mathKey, attempts: attempt + 1 };
    }
  }

  return null; // No valid key found
};


// =========================
// MAIN VALIDATION FUNCTION
// =========================
export const validateProductKey = (inputKey) => {
  const key = inputKey.toUpperCase();
  const mathKey = deriveMathKeyFromProductKey(key);

  if (!validateMathRules(mathKey)) {
    return {
      valid: false,
      message: "Invalid key - math rules not satisfied",
      mathKey,
      backtrack: backtrackValidationKey(mathKey)
    };
  }

  return {
    valid: true,
    message: "Key validated successfully!",
    mathKey,
    backtrack: backtrackValidationKey(mathKey)
  };
};


// =========================
// CAS + PASSWORD HANDLING
// =========================
export const generatePassword = (casId) => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let pw = "";
  for (let i = 0; i < 8; i++) {
    pw += chars[Math.floor(Math.random() * chars.length)];
  }
  CAS_ID_STORAGE[casId] = pw;
  return pw;
};

export const validateCasId = (casId) => {
  if (!casId || casId.trim().length < 6) {
    return { valid: false, message: "CAS ID must be at least 6 characters long." };
  }
  return { valid: true, message: "CAS ID is valid." };
};