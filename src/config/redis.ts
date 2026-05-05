import { Redis } from 'ioredis';

const REDIS_HOST =
  process['env']['NODE_ENV'] === 'dev'
    ? 'localhost'
    : process['env']['REDIS_HOST'];
const REDIS_PORT =
  process['env']['NODE_ENV'] === 'dev' ? 6379 : process['env']['REDIS_PORT'];

export const redisConnection = new Redis({
  host: REDIS_HOST,
  port: Number(REDIS_PORT),
  maxRetriesPerRequest: null,
});
