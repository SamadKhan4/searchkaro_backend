const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const { validateRequiredFields } = require('../middleware/validationMiddleware');
const { 
  getRatings, 
  addRating, 
  updateRating, 
  deleteRating 
} = require('../controllers/ratingController');

const router = express.Router();

router.get('/ratings', getRatings);
router.post('/ratings', authenticateToken, validateRequiredFields(['categories', 'shop', 'rating']), addRating);
router.put('/ratings/:id', authenticateToken, validateRequiredFields(['categories', 'shop', 'rating']), updateRating);
router.delete('/ratings/:id', authenticateToken, deleteRating);

module.exports = router;