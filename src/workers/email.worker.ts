import 'dotenv/config';
import { Worker, Job } from 'bullmq';
import { redisConnection } from '../config/redis.js';
import { EMAIL_QUEUE_NAME } from '../queues/email.queue.js';
import emailService, {
  SendEmailOptions,
} from '../common/service/email.service.js';
import { logger } from '../config/logger.js';

const emailWorker = new Worker(
  EMAIL_QUEUE_NAME,
  async (job: Job) => {
    const data = job.data as SendEmailOptions;
    await emailService.sendEmail(data);
  },
  {
    connection: redisConnection,
  }
);

emailWorker.on('completed', (job) => {
  logger.info(`[EMAIL] Job ${job.id} done`);
});

emailWorker.on('failed', (job, err) => {
  logger.info(`[EMAIL] Job ${job?.id} done`);
  console.error(`[EMAIL] Job ${job?.id} failed`, err);
});
