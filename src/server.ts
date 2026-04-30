import 'dotenv/config';
import { app } from './app.js';
import { logger } from './config/logger.js';
import { prisma } from './config/database.js';

const PORT = process['env']['PORT'] || 3400;

const server = app.listen(PORT, () => {
  logger.info(`Listening on port: ${PORT}`);
});
const shutdown = async (signal: string) => {
  logger.info(`Received ${signal}. Closing server gracefully...`);

  server.close(async () => {
    logger.info('HTTP server closed.');
    await prisma.$disconnect();
    logger.info('Database disconnected. Exiting process.');
    process.exit(0);
  });

  setTimeout(() => {
    logger.error('Forcing shutdown due to timeout');
    process.exit(1);
  }, 10000).unref();
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
