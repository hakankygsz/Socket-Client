import 'dotenv/config';

const env = process.env;

function must<T>(value: T | undefined | '', name: string): T {
  if (value === undefined || value === null || value === '') {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const Runtime = {
  environment: must(env.NODE_ENV, 'NODE_ENV'),
};

export const SocketConfig = {
  url: env.SOCKET_URL || 'http://localhost:3000'
};
