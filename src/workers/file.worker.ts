import 'dotenv/config';
import { Worker, Job } from 'bullmq';
import { redisConnection } from '../config/redis.js';
import { FILE_QUEUE_NAME } from '../queues/file.queue.js';

import { logger } from '../config/logger.js';

const emailWorker = new Worker(
  FILE_QUEUE_NAME,
  async (job: Job) => {
    //
  },
  {
    connection: redisConnection,
  }
);

emailWorker.on('completed', (job) => {
  logger.info(`[FILE] Job ${job.id} done`);
});

emailWorker.on('failed', (job, err) => {
  logger.info(`[FILE] Job ${job?.id} done`);
  console.error(`[FILE] Job ${job?.id} failed`, err);
});
