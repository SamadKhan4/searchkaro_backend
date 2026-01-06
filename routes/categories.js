const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const { validateRequiredFields } = require('../middleware/validationMiddleware');
const { 
  getCategories, 
  addCategory, 
  updateCategory, 
  deleteCategory 
} = require('../controllers/categoryController');

const router = express.Router();

router.get('/categories', getCategories);
router.post('/categories', authenticateToken, validateRequiredFields(['role', 'category', 'product']), addCategory);
router.put('/categories/:id', authenticateToken, validateRequiredFields(['role', 'category', 'product']), updateCategory);
router.delete('/categories/:id', authenticateToken, deleteCategory);

module.exports = router;