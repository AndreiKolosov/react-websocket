import { WebSocketServer } from 'ws';
import { onConnection } from './routes/websocket';
import express from 'express';
import { Request, Response } from 'express';
const { API_PORT = 4000, WS_PORT = 5000 } = process.env;

const app = express(); 
const wsServer = new WebSocketServer({ port: +WS_PORT });


app.get('/api/hello', ( req: Request, res: Response) => {
  res.send({ hello: 'Hello from Express!' });
}); 

app.listen(API_PORT, () => {
  console.log(`App listening on port ${API_PORT}`);
});

// A new client connection request received
wsServer.on('connection', onConnection);


