import { Socket } from 'socket.io-client';
import logger from '@/services/Logger/index.logger.service';

export const registerHandlers = (socket: Socket) => {
  socket.on('user_ready', (data) => {
    logger.info(`User ready event: ${JSON.stringify(data)}`);
  });

  socket.on('private_message', ({ from, message }) => {
    logger.info(`[Private] ${from}: ${message}`);
  });

  socket.on('public_message', ({ from, message }) => {
    logger.info(`[Public] ${from}: ${message}`);
  });

  socket.on('server_announcement', ({ title, content, timestamp }) => {
    logger.info(`[Server Announcement] ${title} at ${timestamp}\n${content}`);
  });

  socket.on('disconnect', (reason) => {
    logger.info(`Disconnected from server: ${reason}`);
  });
};
