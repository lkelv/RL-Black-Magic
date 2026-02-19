/*
This file generates the passwords from the casID

*/


// src/utils/productKeys.js

// If a custom URL is set in .env, use it. Otherwise, assume we are on localhost.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// ===============================================
// PRODUCT KEY VALIDATION (Async)
// ===============================================
export const validateProductKey = async (itemsInput, token = null) => {
  // Normalize input: if a single object is passed, wrap it in array
  const items = Array.isArray(itemsInput) ? itemsInput : [itemsInput];
  
  // items structure should be: [{ key: '...', type: '...' }]
  
  try {
    const response = await fetch(`${API_URL}/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, token })
    });
    const data = await response.json();
    
    // If we sent an array, return the array of results
    if (data.batchResults) {
        return Array.isArray(itemsInput) ? data.batchResults : data.batchResults[0];
    }
    
    // Fallback for error cases
    return { valid: false, message: data.message || "Validation failed" };
  } catch (error) {
    const errorObj = { valid: false, message: "Connection error. Please ensure server is running." };
    return Array.isArray(itemsInput) ? [errorObj, errorObj] : errorObj;
  }
};

// ===============================================
// MARK PRODUCT KEY AS USED (Async)
// ===============================================
// Now accepts casId to update the database record
export const markProductKeyAsUsed = async (key, casId = null) => {
  try {
    await fetch(`${API_URL}/use`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, casId })
    });
  } catch (error) {
    console.error("Failed to mark key as used:", error);
  }
};

// ===============================================
// REAL CAS DH PASSWORD LOGIC (unchanged)
// ===============================================




export const generatePassword = (casId, productType) => {
  const last6Hex = casId.slice(-6).toUpperCase();
  const last6Num = parseInt(last6Hex, 16);

  let productChar;
  if (productType === 'methods') productChar = 'M';
  else if (productType === 'specialist') productChar = 'S';
  else if (productType === 'both') productChar = 'B';
  else productChar = (productType.charAt(0) || 'M').toUpperCase();

  return dhPasswordCore(last6Num, productChar);
};

// ===============================================
// CAS ID VALIDATION (unchanged)
// ===============================================
export const validateCasId = (casId) => {
  if (!casId || casId.trim().length < 6) {
    return { valid: false, message: "CAS ID must be 6 characters long." };
  }
  if (casId.trim().length > 6) {
    return { valid: false, message: "CAS ID must be 6 characters long." };
  }
  const last6 = casId.slice(-6);
  if (!/^[0-9A-Fa-f]{6}$/.test(last6)) {
    return { valid: false, message: "The last 6 characters of the CAS ID must be valid hexadecimal digits (0-9, A-F)." };
  }
  if (!/^[A-Za-z0-9]+$/.test(casId)) {
    return { valid: false, message: "CAS ID can only contain letters and numbers." };
  }
  return { valid: true, message: "CAS ID format is valid." };
};