const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  srNo: {
    type: Number,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['Buyer', 'Seller']
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  product: {
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

module.exports = mongoose.model('Category', categorySchema);