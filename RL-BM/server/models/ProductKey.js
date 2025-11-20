import mongoose from 'mongoose';

const productKeySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  used: {
    type: Boolean,
    default: false
  },
  usedAt: {
    type: Date,
    default: null
  },
  casId: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Index for faster queries (key already has unique: true which creates an index)
productKeySchema.index({ used: 1 });

export default mongoose.model('ProductKey', productKeySchema);
