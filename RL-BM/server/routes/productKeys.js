import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ProductKey from '../models/ProductKey.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to update the CSV file with current database state
const updateCsvFile = async () => {
  try {
    const productKeys = await ProductKey.find().sort({ key: 1 });

    let csvContent = 'key,used\n';
    productKeys.forEach(pk => {
      const usedValue = pk.used ? 'True' : 'False';
      csvContent += `${pk.key},${usedValue}\n`;
    });

    const csvPath = path.join(__dirname, '../../product_keys.csv');
    fs.writeFileSync(csvPath, csvContent);
    console.log('CSV file updated successfully');
  } catch (error) {
    console.error('Error updating CSV file:', error);
  }
};

// Function to determine product type from key based on ASCII sum
// 0 = methods (divisible by 2), 1 = specialist (not divisible by 2)
const getProductTypeFromKey = (key) => {
  // Remove dashes and get just the characters
  const cleanKey = key.replace(/-/g, '').toUpperCase();

  // Sum all ASCII values
  let asciiSum = 0;
  for (let i = 0; i < cleanKey.length; i++) {
    asciiSum += cleanKey.charCodeAt(i);
  }

  // Determine type based on modulo 2
  const remainder = asciiSum % 2;

  if (remainder === 0) {
    return 'methods';
  } else {
    return 'specialist';
  }
};

// Validate a product key
router.post('/validate', async (req, res) => {
  try {
    const { key, expectedType } = req.body;

    if (!key) {
      return res.status(400).json({
        valid: false,
        message: 'Product key is required.'
      });
    }

    const productKey = await ProductKey.findOne({ key: key.toUpperCase() });

    if (!productKey) {
      return res.json({
        valid: false,
        message: 'Invalid product key. Please check and try again.'
      });
    }

    if (productKey.used) {
      return res.json({
        valid: false,
        message: 'This product key has already been used.'
      });
    }

    // Calculate the type from the key
    const keyType = getProductTypeFromKey(key);

    if (expectedType && keyType !== expectedType) {
      return res.json({
        valid: false,
        message: `This product key is for ${keyType}, not ${expectedType}.`
      });
    }

    return res.json({
      valid: true,
      message: 'Product key validated successfully!',
      type: keyType
    });
  } catch (error) {
    console.error('Validation error:', error);
    return res.status(500).json({
      valid: false,
      message: 'Server error. Please try again.'
    });
  }
});

// Mark a product key as used
router.post('/use', async (req, res) => {
  try {
    const { key, casId } = req.body;

    if (!key) {
      return res.status(400).json({
        success: false,
        message: 'Product key is required.'
      });
    }

    const productKey = await ProductKey.findOne({ key: key.toUpperCase() });

    if (!productKey) {
      return res.json({
        success: false,
        message: 'Invalid product key.'
      });
    }

    if (productKey.used) {
      return res.json({
        success: false,
        message: 'This product key has already been used.'
      });
    }

    // Mark as used
    productKey.used = true;
    productKey.usedAt = new Date();
    if (casId) {
      productKey.casId = casId;
    }
    await productKey.save();

    // Update CSV file to reflect the change
    await updateCsvFile();

    return res.json({
      success: true,
      message: 'Product key marked as used.'
    });
  } catch (error) {
    console.error('Use key error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again.'
    });
  }
});

// Get all product keys (admin route - for debugging)
router.get('/all', async (req, res) => {
  try {
    const keys = await ProductKey.find().select('-__v');
    return res.json(keys);
  } catch (error) {
    console.error('Get all keys error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error.'
    });
  }
});

// Get stats
router.get('/stats', async (req, res) => {
  try {
    const allKeys = await ProductKey.find({ used: false }).select('key');
    const usedKeys = await ProductKey.find({ used: true }).select('key');

    let methodsAvailable = 0;
    let specialistAvailable = 0;

    // Calculate types dynamically from keys
    allKeys.forEach(pk => {
      const keyType = getProductTypeFromKey(pk.key);
      if (keyType === 'methods') methodsAvailable++;
      else if (keyType === 'specialist') specialistAvailable++;
    });

    return res.json({
      total: allKeys.length + usedKeys.length,
      used: usedKeys.length,
      available: allKeys.length,
      methodsAvailable,
      specialistAvailable
    });
  } catch (error) {
    console.error('Stats error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error.'
    });
  }
});

export default router;
