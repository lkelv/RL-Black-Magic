// src/utils/productKeys.js

// API base URL - change this to your production URL when deploying
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Dictionary to store CAS IDs and their generated passwords
export const CAS_ID_STORAGE = {};

// Function to determine product type from key based on ASCII sum
// 0 = methods, 1 = specialist, 2 = both
export const getProductTypeFromKey = (key) => {
  // Remove dashes and get just the characters
  const cleanKey = key.replace(/-/g, '').toUpperCase();

  // Sum all ASCII values
  let asciiSum = 0;
  for (let i = 0; i < cleanKey.length; i++) {
    asciiSum += cleanKey.charCodeAt(i);
  }

  // Determine type based on modulo 3
  const remainder = asciiSum % 3;

  if (remainder === 0) {
    return 'methods';
  } else if (remainder === 1) {
    return 'specialist';
  } else {
    return 'both';
  }
};

// Function to validate product key via API
export const validateProductKey = async (key, expectedType) => {
  try {
    // Automatically determine the type from the key
    const keyType = getProductTypeFromKey(key);

    // Check if the key type matches the expected type
    if (expectedType && keyType !== expectedType) {
      return {
        valid: false,
        message: `This product key is for ${keyType}, not ${expectedType}.`
      };
    }

    const response = await fetch(`${API_BASE_URL}/product-keys/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key, expectedType: keyType }),
    });

    const data = await response.json();
    return { ...data, type: keyType };
  } catch (error) {
    console.error('Error validating product key:', error);
    return {
      valid: false,
      message: 'Unable to connect to server. Please try again later.'
    };
  }
};

// Function to mark product key as used via API
export const markProductKeyAsUsed = async (key, casId = null) => {
  try {
    const response = await fetch(`${API_BASE_URL}/product-keys/use`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key, casId }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error marking product key as used:', error);
    return {
      success: false,
      message: 'Unable to connect to server. Please try again later.'
    };
  }
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
