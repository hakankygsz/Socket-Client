import { generateUUID } from '@/utils/string.util';
import fs from 'fs';
import path from 'path';
import TransportStream, { TransportStreamOptions } from 'winston-transport';

class CustomLogTransport extends TransportStream {
  private baseLogDir: string;

  constructor(opts: TransportStreamOptions & { logDir?: string }) {
    super(opts);
    this.baseLogDir = opts.logDir || path.resolve(__dirname, '../logs');
  }

  async log(info: any, callback: () => void) {
    setImmediate(() => this.emit('logged', info));

    try {
      if (info.level === 'warn' || info.level === 'error') {
        const logId = generateUUID();

        const now = new Date();
        const day = now.getDate();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();

        const dateString = `${day}-${month}-${year}`;
        const levelDir = path.join(this.baseLogDir, info.level);

        await this.ensureDirExists(levelDir);

        const logFile = path.join(levelDir, `${dateString}.log`);

        const logMessage = {
          id: logId,
          timestamp: now.toISOString(),
          level: info.level,
          message: info.message,
          stack: info.stack || undefined,
        };

        await fs.promises.appendFile(logFile, JSON.stringify(logMessage) + '\n', 'utf8');
      }
    } catch (error: any) {
      console.error(`CustomLogTransport error: ${error.message}`);
    } finally {
      callback();
    }
  }

  private async ensureDirExists(dir: string) {
    try {
      await fs.promises.access(dir, fs.constants.F_OK);
    } catch {
      await fs.promises.mkdir(dir, { recursive: true });
    }
  }
}

export default CustomLogTransport;
