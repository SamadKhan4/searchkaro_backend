const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const { validateRequiredFields } = require('../middleware/validationMiddleware');
const { 
  getLocations, 
  addLocation, 
  updateLocation, 
  deleteLocation 
} = require('../controllers/locationController');

const router = express.Router();

router.get('/locations', getLocations);
router.post('/locations', authenticateToken, validateRequiredFields(['role', 'location', 'region']), addLocation);
router.put('/locations/:id', authenticateToken, validateRequiredFields(['role', 'location', 'region']), updateLocation);
router.delete('/locations/:id', authenticateToken, deleteLocation);

module.exports = router;