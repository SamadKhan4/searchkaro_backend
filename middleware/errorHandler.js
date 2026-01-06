// Global error handling middleware

const errorHandler = (err, req, res, next) => {
  // Log error for debugging (in production, use a logging service)
  console.error(err.stack);
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      details: Object.values(err.errors).map(e => e.message)
    });
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      message: 'Duplicate field value entered'
    });
  }
  
  // Mongoose cast error (invalid ID format)
  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'Invalid resource ID'
    });
  }
  
  // Default error response
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error'
  });
};

module.exports = errorHandler;