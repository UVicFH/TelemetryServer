/**
 * @file Logging service
 *
 * @author Jayden Chan
 */

import * as winston from 'winston';
import { Logger } from 'winston';

import * as util from 'util';
import chalk from 'chalk';

/**
 * Returns / creates the global instance of the Winston logger
 * that is used by all other modules
 *
 * @param {string} moduleName The name of the calling module
 *
 * @return {Logger} A logger instance
 */
export function getLogger(moduleName: string) {
  const logFormat = winston.format.printf(({ timestamp, level, message }) => {
    const messageFormatted = typeof message === 'object'
      ? util.format('%o', message)
      : message;

    let levelFormatted: string;
    switch (level.toLowerCase()) {
      case 'info':
        levelFormatted = chalk.green(level);
        break;
      case 'warn':
        levelFormatted = chalk.yellow(level);
        break;
      case 'error':
        levelFormatted = chalk.red(level);
        break;
      default:
        levelFormatted = level;
        break;
    }

    return `[${timestamp}] [${moduleName}] [${levelFormatted}] ${messageFormatted}`;
  });

  const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'HH:mm:ss',
      }),
      logFormat
    ),
    transports: [new winston.transports.Console()],
  });

  return logger;
}
