import { getSocket } from './index.socket.service';

export const disconnectSocket = () => {
  try {
    const socket = getSocket();
    socket.disconnect();
  } catch {}
};

export const sendReady = () => {
  try {
    const socket = getSocket();
    socket.emit('ready', { msg: 'Client ready!' });
  } catch {}
};

export const sendPublicMessage = (message: string) => {
  try {
    const socket = getSocket();
    socket.emit('public_message', { message });
  } catch {}
};

export const sendPrivateMessage = (toUserId: string, message: string) => {
  try {
    const socket = getSocket();
    socket.emit('private_message', { toUserId, message });
  } catch {}
};

export const kickUser = (targetId: string) => {
  try {
    const socket = getSocket();
    socket.emit('kick_user', { targetId });
  } catch {}
};
