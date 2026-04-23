import { logger as fnLogger } from 'firebase-functions';

export const logger = {
  info: (msg: string, data?: Record<string, unknown>) => fnLogger.info(msg, data),
  warn: (msg: string, data?: Record<string, unknown>) => fnLogger.warn(msg, data),
  error: (msg: string, data?: Record<string, unknown>) => fnLogger.error(msg, data),
};
