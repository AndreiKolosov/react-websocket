import { IClientMessage, IResponseMessage, WS_EVENTS } from '../types';
import { type RawData, WebSocket } from 'ws';
import { v4 as uuid } from 'uuid';

// I'm maintaining all active connections in this object
const clients: { [key: string]: WebSocket } = {};
// I'm maintaining all active users in this object
const users: { [key: string]: { username: string; id: string } } = {};
// The current editor content is maintained here.
let editorContent: string = '';
// User activity history.
let usersActivity: string[] = [];

function broadcastMessage(data: IResponseMessage) {
  // We are sending the current data to all connected clients
  const response = JSON.stringify(data);
  for (let userId in clients) {
    let client = clients[userId];
    if (client.readyState === WebSocket.OPEN) {
      client.send(response);
    }
  }
}

function handleMessage(rawMessage: RawData, userId: string) {
  const message: IClientMessage = JSON.parse(rawMessage.toString());

  const response: IResponseMessage = { type: message.type, data: {} };

  if (message.type === WS_EVENTS.USER_EVENT && message.data.user) {
    const username = message.data.user.username;
    users[userId] = { id: userId, username };
    usersActivity.push(`${username} → joined the document`);
    response.data = { users, usersActivity, editorContent };
  }

  if (message.type === WS_EVENTS.CONTENT_CHANGE && message.data.editorContent) {
    const content = message.data.editorContent;
    editorContent = content;
    response.data = { editorContent };
  }

  broadcastMessage(response);
}

function handleDisconnect(userId: string) {
  console.log(`${userId} disconnected.`);

  const response: IResponseMessage = { type: WS_EVENTS.USER_EVENT, data: {} };
  const username = users[userId].username || userId;

  usersActivity.push(`${username} ← left the document`);
  response.data = { users, usersActivity };

  delete clients[userId];
  delete users[userId];

  broadcastMessage(response);
}

const onConnection = (connection: WebSocket) => {
  const userId = uuid();

  console.log('Recieved a new connection');

  // Store the new connection and handle messages
  clients[userId] = connection;
  console.log(`${userId} connected.`);
  connection.on('message', (message) => handleMessage(message, userId));

  // User disconnected
  connection.on('close', () => handleDisconnect(userId));
};

export { onConnection };
