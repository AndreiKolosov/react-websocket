import { WebSocketServer } from 'ws';
import http from 'http';
import { onConnection } from './ws-rout';

const { PORT = 4000 } = process.env;

const server = http.createServer();
const wsServer = new WebSocketServer({ server });


server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// A new client connection request received
wsServer.on('connection', onConnection);


