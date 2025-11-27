const morgan = require('morgan');

// Custom token for response time in ms
morgan.token('response-time-ms', (req, res) => {
  if (!req._startAt || !res._startAt) {
    return '';
  }
  const ms = (res._startAt[0] - req._startAt[0]) * 1e3 +
    (res._startAt[1] - req._startAt[1]) * 1e-6;
  return ms.toFixed(2);
});

// Custom format
const logFormat = ':method :url :status :response-time-ms ms - :res[content-length]';

// Create logger middleware
const logger = morgan(logFormat, {
  skip: (req, res) => res.statusCode < 400, // Only log errors in production
});

// Development logger (logs all requests)
const devLogger = morgan('dev');

// Simple console logger
const log = {
  info: (...args) => console.log('9 ', ...args),
  error: (...args) => console.error('L', ...args),
  warn: (...args) => console.warn('  ', ...args),
  success: (...args) => console.log('', ...args),
  debug: (...args) => console.log('=', ...args),
};

module.exports = {
  logger,
  devLogger,
  log,
};
