import { WebSocketServer } from 'ws';
import { onConnection } from './routes/websocket';
import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
const { API_PORT = 4000, WS_PORT = 5000 } = process.env;

const app = express(); 
const wsServer = new WebSocketServer({ port: +WS_PORT });

app.use(
  cors({
    origin: [
      'http://localhost:5173',
    ],
    optionsSuccessStatus: 200,
  }),
);

app.get('/api/hello', ( req: Request, res: Response) => {
  res.send({ hello: 'Hello from Express! ✌' });
}); 

app.listen(API_PORT, () => {
  console.log(`
    App listening on port ${API_PORT}
    WS port → ${WS_PORT}
  `);
});

// A new client connection request received
wsServer.on('connection', onConnection);


