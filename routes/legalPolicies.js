const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const { validateRequiredFields } = require('../middleware/validationMiddleware');
const { 
  getLegalPolicies, 
  addLegalPolicy, 
  updateLegalPolicy, 
  deleteLegalPolicy 
} = require('../controllers/legalPolicyController');

const router = express.Router();

router.get('/legal-policies', getLegalPolicies);
router.post('/legal-policies', authenticateToken, validateRequiredFields(['question', 'answer']), addLegalPolicy);
router.put('/legal-policies/:id', authenticateToken, validateRequiredFields(['question', 'answer']), updateLegalPolicy);
router.delete('/legal-policies/:id', authenticateToken, deleteLegalPolicy);

module.exports = router;