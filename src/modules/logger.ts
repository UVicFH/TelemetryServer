/**
 * @file Logging service
 *
 * @author Jayden Chan
 */

// Libaries
import * as winston from "winston";
import * as util from "util";
import chalk from "chalk";

const MODULE_PAD_WIDTH = 9;
const LEVEL_PAD_WIDTH = 17;

/**
 * Creates an instance of a Winston logger
 * that is used by all other modules
 *
 * @param {string} moduleName The name of the calling module
 *
 * @return {Logger} A logger instance
 */
export function getLogger(moduleName: string): winston.Logger {
  const logFormat = winston.format.printf(({ timestamp, level, message }) => {
    const messageFormatted =
      typeof message === "object" ? util.format("%o", message) : message;

    let levelFormatted: string;
    switch (level.toLowerCase()) {
      case "info":
        levelFormatted = chalk.green(level);
        break;
      case "warn":
        levelFormatted = chalk.yellow(level);
        break;
      case "error":
        levelFormatted = chalk.red(level);
        break;
      default:
        levelFormatted = level;
        break;
    }

    return util.format(
      "%s %s %s %s",
      `[${timestamp}]`,
      `[${moduleName}]`.padEnd(MODULE_PAD_WIDTH),
      `[${levelFormatted}]`.padEnd(LEVEL_PAD_WIDTH),
      messageFormatted
    );
  });

  const logger = winston.createLogger({
    level: "debug",
    format: winston.format.combine(
      winston.format.timestamp({
        format: "h:mm:ss A"
      }),
      logFormat
    ),
    transports: [new winston.transports.Console()]
  });

  return logger;
}
