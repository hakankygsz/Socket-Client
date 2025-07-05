# Socket-Client

A lightweight and easy-to-use Socket.IO client wrapper with TypeScript support for modern frontend projects.

---

## Features

- Easy connection management with Socket.IO Client
- Automatic logging of connection, error, and disconnect events
- Modular event handler structure
- Full TypeScript support
- Reconnection attempts and timeout settings

---

## Installation

```bash
npm install socket.io-client
```

or

```bash
yarn add socket.io-client
```

---

## Usage

### Connecting to Socket

```ts
import { connectSocket, getSocket, disconnectSocket } from '@/services/Socket/index.socket.service';

async function initSocket() {
  try {
    const socket = await connectSocket({ token: 'YOUR_AUTH_TOKEN' });
    console.log(`Socket connected with id: ${socket.id}`);

    // You can emit or listen to events using the socket instance
    socket.emit('hello', { msg: 'Hello there' });
  } catch (err) {
    console.error('Socket connection error:', err);
  }
}

initSocket();
```

### Getting the Socket Instance

```ts
import { getSocket } from '@/services/Socket/index.socket.service';

try {
  const socket = getSocket();
  socket.emit('test', { data: 123 });
} catch (err) {
  console.error(err.message);
}
```

### Disconnecting the Socket

```ts
import { disconnectSocket } from '@/services/Socket/index.socket.service';

disconnectSocket();
```

---

## Configuration

Set the server URL and other configurations in `src/config/environment.config.ts`:

```ts
export const SocketConfig = {
  url: 'http://localhost:3000', // Socket.IO server address
};
```

---

## Logger

Connection and error events are logged via the `Logger` service, outputting info and error messages to the console.

---

## Development

- `reconnectionAttempts`: Tries to reconnect 5 times if connection fails
- `timeout`: 5000ms timeout for connection requests
- `withCredentials`: Enabled for cookie sending in CORS

---

## License

BSD 3-Clause License © Hakan Kaygusuz

---

---

### Happy coding, play with sockets, build networks! ⚡
