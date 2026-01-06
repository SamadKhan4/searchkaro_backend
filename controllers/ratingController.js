const Rating = require('../models/Rating');

// Get all ratings
exports.getRatings = async (req, res) => {
  try {
    const ratings = await Rating.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      ratings
    });
  } catch (error) {
    console.error('Get ratings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new rating
exports.addRating = async (req, res) => {
  try {
    const { categories, shop, rating, review } = req.body;
    
    // Validation
    if (!categories || !shop || rating === undefined) {
      return res.status(400).json({ message: 'Categories, shop, and rating are required' });
    }
    
    // Get the next serial number
    const lastRating = await Rating.findOne().sort({ srNo: -1 });
    const nextSrNo = lastRating ? lastRating.srNo + 1 : 1;
    
    const newRating = new Rating({
      srNo: nextSrNo,
      categories,
      shop,
      rating: parseFloat(rating),
      review: review !== undefined ? review : true
    });
    
    const savedRating = await newRating.save();
    
    res.status(201).json({
      success: true,
      message: 'Rating added successfully',
      rating: savedRating
    });
  } catch (error) {
    console.error('Add rating error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a rating
exports.updateRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { categories, shop, rating, review } = req.body;
    
    const updateData = {};
    if (categories !== undefined) updateData.categories = categories;
    if (shop !== undefined) updateData.shop = shop;
    if (rating !== undefined) updateData.rating = parseFloat(rating);
    if (review !== undefined) updateData.review = review;
    
    const updatedRating = await Rating.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedRating) {
      return res.status(404).json({ message: 'Rating not found' });
    }
    
    res.status(200).json({
      success: true,
      message: 'Rating updated successfully',
      rating: updatedRating
    });
  } catch (error) {
    console.error('Update rating error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a rating
exports.deleteRating = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedRating = await Rating.findByIdAndDelete(id);
    
    if (!deletedRating) {
      return res.status(404).json({ message: 'Rating not found' });
    }
    
    res.status(200).json({
      success: true,
      message: 'Rating deleted successfully'
    });
  } catch (error) {
    console.error('Delete rating error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};