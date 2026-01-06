const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  srNo: {
    type: Number,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['Buyer', 'Seller']
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  region: {
    type: String,
    required: true,
    trim: true
  },
  popular: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Location', locationSchema);