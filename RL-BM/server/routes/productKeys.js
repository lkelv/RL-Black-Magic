const express = require('express');
const router = express.Router();
const ProductKey = require('../models/ProductKey');

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

    if (expectedType && productKey.type !== expectedType) {
      return res.json({
        valid: false,
        message: `This product key is for ${productKey.type}, not ${expectedType}.`
      });
    }

    return res.json({
      valid: true,
      message: 'Product key validated successfully!',
      type: productKey.type
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
    const total = await ProductKey.countDocuments();
    const used = await ProductKey.countDocuments({ used: true });
    const available = await ProductKey.countDocuments({ used: false });
    const methodsAvailable = await ProductKey.countDocuments({ type: 'methods', used: false });
    const specialistAvailable = await ProductKey.countDocuments({ type: 'specialist', used: false });

    return res.json({
      total,
      used,
      available,
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

module.exports = router;
