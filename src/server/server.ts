import express from "express";
import http from "http";
import path from "path";

import { WebSocketServer } from "ws";

const app = express();

app.get("/", (_req: any, res: any) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.use(express.static(__dirname));

const server = http.createServer(app);

let port = process.env.PORT || 4000;
server.listen(port);
server.on("listening", () => console.log("Express listening"));

const socketServer = new WebSocketServer({ server });

const broadcast = (message: string) => {
  socketServer.clients.forEach((client) => client.send(message));
};

socketServer.on("connection", (ws) => {
  console.log("Connected");
  broadcast("A new client connected");
  ws.send("Connected");
  ws.on("message", (message) => {
    console.log(`Received ${message}`);
    ws.send(`Response to "${message}"`);
  });
});
