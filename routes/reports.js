const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const { validateRequiredFields } = require('../middleware/validationMiddleware');
const { 
  getReports, 
  addReport, 
  updateReport, 
  deleteReport 
} = require('../controllers/reportController');

const router = express.Router();

router.get('/reports', getReports);
router.post('/reports', authenticateToken, validateRequiredFields(['title', 'date']), addReport);
router.put('/reports/:id', authenticateToken, validateRequiredFields(['title', 'date']), updateReport);
router.delete('/reports/:id', authenticateToken, deleteReport);

module.exports = router;