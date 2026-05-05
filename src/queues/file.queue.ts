import { Queue } from "bullmq";
import { redisConnection } from "../config/redis.js";
export const FILE_QUEUE_NAME = "file-queue";

export const fileQueue = new Queue(FILE_QUEUE_NAME, {
  connection: redisConnection,
});