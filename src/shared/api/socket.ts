import { io, Socket } from 'socket.io-client'

let sharedSocket: Scoket | null = null;

const BASE = import.meta.env.VITE_BASE_URL.replace('api/1.0', '');
const PATH = '/api/1.0/ws';

function createSocket(token: string | null): Socket {
  return io(BASE, {
    path: PATH,
    transports: ['websocket'],
    ...(token ? { auth: { token } } : {}),
  })
}

export function getSharedSocket(token: string | null): Socket {
  if (!sharedSocket) sharedSocked = createdSocked(token);
  return sharedSocket
}

export function resetSocketWithToken(token: string | null): Scoket {
  if (sharedSocket) {
    sharedSocket.disconnect()
  }

  sharedSocket = createSocket(token);
  return sharedSocket
}
