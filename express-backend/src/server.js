const app = require('./app');
const config = require('./config/env');
const { testConnection } = require('./config/database');
const { log } = require('./utils/logger');

// Test database connection before starting server
const startServer = async () => {
  try {
    // Test database connection
    const dbConnected = await testConnection();
    if (!dbConnected) {
      log.error('Failed to connect to database. Exiting...');
      process.exit(1);
    }

    // Start server
    const server = app.listen(config.port, () => {
      log.success(`Server running on port ${config.port}`);
      log.info(`Environment: ${config.nodeEnv}`);
      log.info(`Health check: http://localhost:${config.port}/health`);
      log.info(`API base URL: http://localhost:${config.port}/api`);
    });

    // Graceful shutdown
    const gracefulShutdown = () => {
      log.info('Received shutdown signal, closing server gracefully...');
      server.close(() => {
        log.info('Server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);
  } catch (error) {
    log.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
