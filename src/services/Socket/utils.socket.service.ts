import logger from '@/services/Logger/index.logger.service';

export const generateRoomName = (userA: string, userB: string): string => {
  if (!userA || !userB) throw new Error('User IDs cannot be empty');
  if (userA === userB) throw new Error('Cannot create room with same user');
  return [userA.trim(), userB.trim()].sort().join('-');
};

export const broadcastToRoom = (socket: any, room: string, event: string, data: any): void => {
  if (!room) throw new Error('Room name must be specified');
  if (!event) throw new Error('Event name must be specified');

  try {
    socket.to(room).emit(event, data);
  } catch (error) {
    logger.error(`Broadcast error: ${error instanceof Error ? error.message : error}`);
  }
};
