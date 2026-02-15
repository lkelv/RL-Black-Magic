/*
This file generates the passwords from the casID

*/


// src/utils/productKeys.js

// If a custom URL is set in .env, use it. Otherwise, assume we are on localhost.
import { dhPasswordCore } from './secret_math.js';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// ===============================================
// PRODUCT KEY VALIDATION (Async)
// ===============================================
export const validateProductKey = async (key, expectedType) => {
  console.log("Frontend sending key:", key);
  console.log("Frontend sending type:", expectedType);
  console.log("Sending to URL:", `${API_URL}/validate`);
  try {
    const response = await fetch(`${API_URL}/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, type: expectedType })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { valid: false, message: "Connection error. Please ensure server is running." };
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
    return { valid: false, message: "CAS ID must be at least 6 characters long." };
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