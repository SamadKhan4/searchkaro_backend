// Validation middleware for common request validations

// Validate required fields in request body
const validateRequiredFields = (requiredFields) => {
  return (req, res, next) => {
    const missingFields = [];
    
    requiredFields.forEach(field => {
      if (!req.body[field] || req.body[field].toString().trim() === '') {
        missingFields.push(field);
      }
    });
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }
    
    next();
  };
};

// Validate email format
const validateEmail = (req, res, next) => {
  const { email } = req.body;
  
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      message: 'Invalid email format'
    });
  }
  
  next();
};

// Validate password strength
const validatePassword = (req, res, next) => {
  const { password } = req.body;
  
  if (password && password.length < 6) {
    return res.status(400).json({
      message: 'Password must be at least 6 characters long'
    });
  }
  
  next();
};

// Validate new password strength (for reset password)
const validateNewPassword = (req, res, next) => {
  const { newPassword } = req.body;
  
  if (newPassword && newPassword.length < 6) {
    return res.status(400).json({
      message: 'New password must be at least 6 characters long'
    });
  }
  
  next();
};

module.exports = {
  validateRequiredFields,
  validateEmail,
  validatePassword,
  validateNewPassword
};