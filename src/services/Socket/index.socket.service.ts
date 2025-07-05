import { io, Socket } from 'socket.io-client';
import logger from '@/services/Logger/index.logger.service';
import { SocketConfig } from '@/config/environment.config';
import { registerHandlers } from './handlers.socket.service';

let socket: Socket | null = null;

export const connectSocket = (opt: object): Promise<Socket> => {
  return new Promise((resolve, reject) => {
    socket = io(SocketConfig.url, {
      auth: { ...opt },
      withCredentials: true,
      reconnectionAttempts: 5,
      timeout: 5000,
    });

    socket.on('connect', () => {
      logger.info(`Socket connected: ${socket?.id}`);
      registerHandlers(socket);
      resolve(socket!);
    });

    socket.on('connect_error', (err) => {
      logger.error(`Socket connection error: ${err.message}`);
      reject(err);
    });

    socket.on('disconnect', (reason) => {
      logger.info(`Socket disconnected: ${reason}`);
    });
  });
};

export const getSocket = (): Socket => {
  if (!socket) throw new Error('Socket not connected');
  return socket;
};

export const disconnectSocket = () => {
  if (!socket) return;
  socket.disconnect();
  socket = null;
};
