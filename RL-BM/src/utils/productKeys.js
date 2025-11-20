// src/utils/productKeys.js

// Dictionary of valid product keys
export const VALID_PRODUCT_KEYS = {
  // Maths Methods Keys
  'MMM-MMM-MM1': { type: 'methods', used: false },
  'MMM-MMM-MM2': { type: 'methods', used: false },
  'MMM-MMM-MM3': { type: 'methods', used: false },

  // Specialist Maths Keys
  'SSS-SSS-SS1': { type: 'specialist', used: false },
  'SSS-SSS-SS2': { type: 'specialist', used: false },
  'SSS-SSS-SS3': { type: 'specialist', used: false },
};

// Dictionary to store CAS IDs and their generated passwords
export const CAS_ID_STORAGE = {};

// Function to validate product key
export const validateProductKey = (key, expectedType) => {
  const productKey = VALID_PRODUCT_KEYS[key.toUpperCase()];

  if (!productKey) {
    return { valid: false, message: 'Invalid product key. Please check and try again.' };
  }

  if (productKey.used) {
    return { valid: false, message: 'This product key has already been used.' };
  }

  if (productKey.type !== expectedType) {
    return { valid: false, message: `This product key is for ${productKey.type}, not ${expectedType}.` };
  }

  return { valid: true, message: 'Product key validated successfully!' };
};

// Function to mark product key as used
export const markProductKeyAsUsed = (key) => {
  // const upperKey = key.toUpperCase();
  // if (VALID_PRODUCT_KEYS[upperKey]) {
  //   VALID_PRODUCT_KEYS[upperKey].used = true;
  // }
  const upperKey = key.toUpperCase();
};

// Function to generate a random password
export const generatePassword = (casId) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // Store the password with the CAS ID
  CAS_ID_STORAGE[casId] = password;

  return password;
};

// Function to validate CAS ID format
export const validateCasId = (casId) => {
  // Simple validation - should be at least 6 characters
  if (!casId || casId.trim().length < 6) {
    return { valid: false, message: 'CAS ID must be at least 6 characters long.' };
  }

  return { valid: true, message: 'CAS ID format is valid.' };
};
