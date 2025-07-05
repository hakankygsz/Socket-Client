import { connectSocket } from './services/Socket/index.socket.service';
import logger from './services/Logger/index.logger.service';

async function main() {
  logger.info('Starting Socket Client...');
  try {
    await connectSocket({
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiI5M2MwODhmZC0yODRhLTQ2ZDUtODA2YS1kNWYzODlhMTMxZjMiLCJ1c2VySWQiOiIwNWQwZTJkOS0wZjJiLTQ1MTYtOGM2Ni1iYmM5NDViMDVmNjUiLCJyb2xlcyI6W10sInRva2VuVmVyc2lvbiI6MCwiaWF0IjoxNzUxNzIyMTExLCJleHAiOjE3NTE3MjMwMTF9.eNK969CKT58W2-3FVq2DRgU2CjtGyPDmP1kXJT4zx_8',
    });

    logger.info('Socket Client connected.');
  } catch (error) {
    logger.error('Error connecting Socket Client:', error);
  }
}

main();
