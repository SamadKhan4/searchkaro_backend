const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  srNo: {
    type: Number,
    required: true
  },
  categories: {
    type: String,
    required: true,
    trim: true
  },
  shop: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  review: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Rating', ratingSchema);