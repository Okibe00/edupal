import pino from 'pino';

const isDev = process['env']['NODE_ENV'] !== 'prod';

export const logger = pino({
  level: isDev ? 'debug' : 'info',
  ...(isDev && {
    transport: {
      target: 'pino-pretty',
    },
  }),
  formatters: {
    level: (label) => ({ level: label }),
  },
});
