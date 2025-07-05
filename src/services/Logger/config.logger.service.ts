import { format, transports } from 'winston';
import { Runtime } from '@/config/environment.config';
import CustomLogTransport from './transport.logger.service';

const isProd = Runtime.environment === 'production';

export const loggerLevel = isProd ? 'info' : 'debug';

export const loggerTransports = [
  new transports.Console({
    level: isProd ? 'info' : 'debug',
    format: format.combine(
      format.colorize(),
      format.printf(({ timestamp, level, message, stack }) => {
        return stack
          ? `${timestamp} [${level}]: ${message} - ${stack}`
          : `${timestamp} [${level}]: ${message}`;
      }),
    ),
  }),
  ...(isProd ? [new CustomLogTransport({ level: 'warn' })] : []),
];

export const loggerFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.errors({ stack: true }),
  format.splat(),
  format.json(),
);
