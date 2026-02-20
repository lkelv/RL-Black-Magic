/*
Codes stored in database should be in the format XXX-XXX-XXX with the - included

To change it so that the database just includes XXXXXXXXX without the dashed,
the following should be changed:
const cleanKey = key.toUpperCase().replace(/-/g, '');

There should be two places which need to be change, once at api use and 
and the other at api validate
*/


import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
app.set('trust proxy', 1);

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide-behind-proxies.html
// app.set('trust proxy', 1);

// verification
const verifyTurnstile = async (token) => {
  const SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
  if (!SECRET_KEY) {
      console.log("No Turnstile secret key found, skipping verification.");
      return true; 
  }
  
  try {
      // Use URLSearchParams for application/x-www-form-urlencoded
      const formData = new URLSearchParams();
      formData.append('secret', SECRET_KEY);
      formData.append('response', token);

      const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
          method: 'POST',
          body: formData, // Cloudflare prefers form data over JSON
      });
      
      const data = await response.json();
      
      if (!data.success) {
          console.error("Turnstile failed. Error codes:", data['error-codes']);
      }
      
      return data.success;
  } catch (error) {
      console.error("Turnstile verification error:", error);
      return false;
  }
};



app.use(cors({
  origin: ["https://rl-black-magic.vercel.app", "http://localhost:5173", "https://rlblackmagic.com/"]
}));
app.use(express.json());

// 2. CONFIGURE THE LIMITER
const validateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 10 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: { 
        valid: false, 
        message: "Too many attempts. Please try again in 15 minutes." 
    }
});

// ==========================================
// MONGODB SCHEMAS
// ==========================================

// 1. Existing Product Key Schema
const ProductKeySchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  type: { type: String, required: true }, // 'methods', 'specialist', 'both'
  used: { type: Boolean, default: false },
  casId: { type: String, default: null }
});

const ProductKey = mongoose.model('ProductKey', ProductKeySchema);

// 2. NEW: Master Code Usage Schema
const MasterCodeUsageSchema = new mongoose.Schema({
  casId: { type: String, required: true },
  usedAt: { type: Date, default: Date.now },
  productType: { type: String } // To know if they used it on MM or SM page
}, { collection: 'master-code-uses' }); // Explicitly naming the folder/collection

const MasterCodeUsage = mongoose.model('MasterCodeUsage', MasterCodeUsageSchema);


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


// ==========================================
// ROUTES
// ==========================================

// Validate Key
app.post('/api/validate', validateLimiter, async (req, res) => {
  try {
    // Support both old (single) and new (batch) formats for backward compatibility if needed
    // But we will use 'items' array for the new logic
    const { token, items } = req.body;
    
    // 1. Verify Turnstile Token (Once for the whole batch)
    // You can skip this check if using the Master Code if you prefer
    const isHuman = await verifyTurnstile(token);
    if (!isHuman) {
        return res.json({ 
            batchResults: items.map(() => ({ valid: false, message: "Security check failed. Please try again." })) 
        });
    }

    const cleanMasterCode = process.env.MASTER_CODE ? process.env.MASTER_CODE.toUpperCase() : null;
    
    const results = [];

    // 2. Process each key in the batch
    for (const item of items) {
        const { key, type } = item;
        const cleanKey = key.toUpperCase();

        // --- CHECK 1: MASTER CODE ---
        if (cleanMasterCode && cleanKey === cleanMasterCode) {
            results.push({ valid: true, message: "Master code accepted!" });
            continue;
        }

        // --- CHECK 2: REGULAR KEY VALIDATION ---
        const productKey = await ProductKey.findOne({ key: cleanKey });

        if (!productKey) {
            results.push({ valid: false, message: "Invalid product key." });
            continue;
        }
        if (productKey.used) {
            results.push({ valid: false, message: "This product key has already been used." });
            continue;
        }
        
        // Check specific types
        if (productKey.type !== type && productKey.type !== 'both') {
            if (type === 'both' && productKey.type !== 'both') {
                results.push({ valid: false, message: `This product key is for ${productKey.type}, not both.` });
                continue;
            }
            if (type !== 'both' && productKey.type !== type) {
                results.push({ valid: false, message: `This product key is for ${productKey.type}, not ${type}.` });
                continue;
            }
        }

        results.push({ valid: true, message: "Product key validated successfully!" });
    }

    // Return array of results matching the input order
    res.json({ batchResults: results });

  } catch (error) {
    console.error("Validation error:", error);
    res.status(500).json({ valid: false, message: "Server error during validation." });
  }
});

// Mark as Used
app.post('/api/use', async (req, res) => {
  try {
    const { key, casId } = req.body; 
    
    //const cleanKey = key.toUpperCase().replace(/-/g, '');
    const cleanKey = key.toUpperCase();
    const cleanMasterCode = process.env.MASTER_CODE ? process.env.MASTER_CODE.toUpperCase() : null;

    // --- CASE 1: MASTER CODE USAGE ---
    if (cleanMasterCode && cleanKey === cleanMasterCode) {
        // FIX: If we don't have a CAS ID yet, do nothing (don't log "Unknown").
        // We only want to log it when the user actually finishes the process.
        if (!casId) {
             return res.json({ success: true });
        }

        // Now we have a CAS ID, so we log it.
        await MasterCodeUsage.create({
            casId: casId,
            productType: 'master-override' 
        });
        return res.json({ success: true });
    }

    // --- CASE 2: REGULAR KEY USAGE ---
    const updateData = { used: true };
    if (casId) updateData.casId = casId;

    await ProductKey.findOneAndUpdate(
      { key: cleanKey },
      updateData
    );
    res.json({ success: true });
  } catch (error) {
    console.error("Usage error:", error);
    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));