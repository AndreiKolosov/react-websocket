import { IChatMessage, IClientMessage, IResponseMessage, WS_EVENTS } from '../../types';
import { type RawData, WebSocket } from 'ws';
import { v4 as uuid } from 'uuid';

// I'm maintaining all active connections in this object
const clients: { [key: string]: WebSocket } = {};
// I'm maintaining all active users in this object
const users: { [key: string]: { username: string; id: string } } = {};
// User activity history.
const usersActivity: string[] = [];
// Chat
const chatData: IChatMessage[] = []
// The current editor content is maintained here.
let editorContent: string = '';

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

  const response: IResponseMessage = { type: message.type, payload: {} };

  if (message.type === WS_EVENTS.USER_EVENT && message.payload.user) {
    const username = message.payload.user.username;
    users[userId] = { id: userId, username };
    usersActivity.push(`${username} → joined the document`);
    response.payload = { users, usersActivity, editorContent, chatData };
  }

  if (message.type === WS_EVENTS.USER_EVENT && message.payload.chatMessage) {
    chatData.push(message.payload.chatMessage)
    response.payload = { chatData }
  }

  if (message.type === WS_EVENTS.CONTENT_CHANGE && message.payload.editorContent) {
    const content = message.payload.editorContent;
    editorContent = content;
    response.payload = { editorContent };
  }
  
  broadcastMessage(response);
}

function handleDisconnect(userId: string) {
  console.log(`${userId} disconnected.`);
  
  const response: IResponseMessage = { type: WS_EVENTS.USER_EVENT, payload: {} };
  const username = users[userId]?.username ?? users[userId]?.id;

  usersActivity.push(`${username} ← left the document`);
  response.payload = { users, usersActivity };

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
