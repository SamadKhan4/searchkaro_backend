const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const { getDashboardData } = require('../controllers/dashboardController');

const router = express.Router();

router.get('/dashboard', authenticateToken, getDashboardData);

module.exports = router;