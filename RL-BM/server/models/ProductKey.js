const mongoose = require('mongoose');

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

// Index for faster queries
productKeySchema.index({ key: 1 });
productKeySchema.index({ used: 1 });

module.exports = mongoose.model('ProductKey', productKeySchema);
