import { RawData, WebSocket, WebSocketServer } from 'ws';
import http from 'http';
import { v4 as uuid } from 'uuid';

type TJson = {type: string, data?: {users?: {[key: string]: {username: string, type: string}}, editorContent?: string, userActivity: string[] }}

const { PORT = 4000 } = process.env;

const server = http.createServer();
const wsServer = new WebSocketServer({ server });

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
}) 

// I'm maintaining all active connections in this object
const clients: {[key: string]: WebSocket} = {};
// I'm maintaining all active users in this object
const users: {[key: string]: {username: string, type: string}} = {};
// The current editor content is maintained here.
let editorContent: string = '';
// User activity history.
let userActivity: string[] = [];

// Event types
const typesDef = {
  USER_EVENT: 'userevent',
  CONTENT_CHANGE: 'contentchange'
}

function broadcastMessage(json: TJson) {
  // We are sending the current data to all connected clients
  const data = JSON.stringify(json);
  for(let userId in clients) {
    let client = clients[userId];
    if(client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  };
}

function handleMessage(message: RawData, userId: string) {
  const dataFromClient = JSON.parse(message.toString());
  const json: TJson = { type: dataFromClient.type };
  if (dataFromClient.type === typesDef.USER_EVENT) {
    users[userId] = dataFromClient;
    userActivity.push(`${dataFromClient.username} joined to edit the document`);
    json.data = { users, userActivity };
  } else if (dataFromClient.type === typesDef.CONTENT_CHANGE) {
    editorContent = dataFromClient.content;
    json.data = { editorContent, userActivity };
  }
  broadcastMessage(json);
}

function handleDisconnect(userId: string) {
    console.log(`${userId} disconnected.`);

    const json: TJson = { type: typesDef.USER_EVENT };
    const username = users[userId]?.username || userId;
    userActivity.push(`${username} left the document`);
    json.data = { users, userActivity };
    delete clients[userId];
    delete users[userId];
    broadcastMessage(json);
}

// A new client connection request received
wsServer.on('connection', function(connection) {
  // Generate a unique code for every user
  const userId = uuid();

  console.log('Recieved a new connection');

  // Store the new connection and handle messages
  clients[userId] = connection;
  console.log(`${userId} connected.`);
  connection.on('message', (message) => handleMessage(message, userId));
  // User disconnected
  connection.on('close', () => handleDisconnect(userId));
});
