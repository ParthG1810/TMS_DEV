const jwt = require('jsonwebtoken');
const config = require('../config/env');
const ApiResponse = require('../utils/response');

/**
 * JWT Authentication Middleware
 * Verifies JWT token from Authorization header
 */
const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return ApiResponse.unauthorized(res, 'Access token is required');
    }

    jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return ApiResponse.unauthorized(res, 'Token has expired');
        }
        return ApiResponse.unauthorized(res, 'Invalid token');
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    return ApiResponse.serverError(res, 'Authentication error');
  }
};

/**
 * Role-based Authorization Middleware
 * Checks if user has required role
 */
const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return ApiResponse.unauthorized(res, 'User not authenticated');
    }

    if (!roles.includes(req.user.role)) {
      return ApiResponse.forbidden(res, 'Insufficient permissions');
    }

    next();
  };
};

/**
 * Optional Authentication
 * Doesn't fail if no token, just sets user if token is valid
 */
const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return next();
    }

    jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if (!err) {
        req.user = decoded;
      }
      next();
    });
  } catch (error) {
    next();
  }
};

module.exports = {
  authenticateToken,
  authorizeRole,
  optionalAuth,
};
