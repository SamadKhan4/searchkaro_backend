const express = require('express');
const { signup, login, forgotPassword, verifyOtp, resetPassword } = require('../controllers/authController');
const { validateRequiredFields, validateEmail, validatePassword, validateNewPassword } = require('../middleware/validationMiddleware');

const router = express.Router();

router.post('/signup', 
  validateRequiredFields(['name', 'email', 'password']),
  validateEmail,
  validatePassword,
  signup
);

router.post('/login', 
  validateRequiredFields(['email', 'password']),
  validateEmail,
  login
);

// Forgot password routes
router.post('/forgot-password',
  validateRequiredFields(['email']),
  validateEmail,
  forgotPassword
);

router.post('/verify-otp',
  validateRequiredFields(['email', 'otp']),
  validateEmail,
  verifyOtp
);

router.post('/reset-password',
  validateRequiredFields(['email', 'otp', 'newPassword']),
  validateEmail,
  validateNewPassword,
  resetPassword
);

module.exports = router;