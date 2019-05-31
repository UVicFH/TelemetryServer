/**
 * @file Logging service
 */

import * as winston from 'winston';
import { Logger } from 'winston';

let logger: Logger;

export function getLogger() {
  if (!logger) {
    const logFormat = winston.format.printf(({ level, message }) => {
      return `[${level.toUpperCase()}] ${message}`;
    });

    logger = winston.createLogger({
      level: 'debug',
      format: winston.format.combine(
        logFormat
      ),
      transports: [new winston.transports.Console()],
    });
  }

  return logger;
}
