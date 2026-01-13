import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Schema
const ProductKeySchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  type: { type: String, required: true }, // 'methods', 'specialist', 'both'
  used: { type: Boolean, default: false },
  casId: { type: String, default: null }
});

const ProductKey = mongoose.model('ProductKey', ProductKeySchema);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes

// Validate Key
app.post('/api/validate', async (req, res) => {
  try {
    const { key, type } = req.body;
    const productKey = await ProductKey.findOne({ key: key.toUpperCase() });

    if (!productKey) {
      return res.json({ valid: false, message: "Invalid product key. Please check and try again." });
    }
    if (productKey.used) {
      return res.json({ valid: false, message: "This product key has already been used." });
    }
    // Handle specific type checks
    if (productKey.type !== type && productKey.type !== 'both') {
       // Note: 'both' keys might be valid for individual activation if intended, 
       // but strictly following your existing logic:
       if (type === 'both' && productKey.type !== 'both') {
         // Trying to use a single key for 'both' activation
         return res.json({ valid: false, message: `This product key is for ${productKey.type}, not both.` });
       }
       if (type !== 'both' && productKey.type !== type) {
          return res.json({ valid: false, message: `This product key is for ${productKey.type}, not ${type}.` });
       }
    }

    res.json({ valid: true, message: "Product key validated successfully!" });
  } catch (error) {
    res.status(500).json({ valid: false, message: "Server error during validation." });
  }
});

// Mark as Used (and store CAS ID if provided)
app.post('/api/use', async (req, res) => {
  try {
    const { key, casId } = req.body;
    const updateData = { used: true };
    if (casId) updateData.casId = casId;

    await ProductKey.findOneAndUpdate(
      { key: key.toUpperCase() },
      updateData
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));