import { createLogger } from 'winston';
import { loggerTransports, loggerFormat, loggerLevel } from './config.logger.service';

const logger = createLogger({
  level: loggerLevel,
  format: loggerFormat,
  transports: loggerTransports,
  exitOnError: false,
});

export default logger;
