import express from "express";
import http from "http";
import path from "path";

import { WebSocketServer } from "ws";
import { overwriteGm } from "../store/gm";
import { overwriteLonewolf } from "../store/lonewolf";
import { overwritePlayers } from "../store/player";

import { store } from "./store";

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
  console.log(`Broadcasting ${message}`);
  socketServer.clients.forEach((client) => client.send(message));
};

socketServer.on("connection", (ws) => {
  ws.on("message", (actionBuffer: string) => {
    const actionObject = JSON.parse(actionBuffer);
    store.dispatch(actionObject);

    broadcast(JSON.stringify(actionObject));
  });

  const state = store.getState();
  ws.send(JSON.stringify(overwritePlayers(state.players.all)));
  ws.send(JSON.stringify(overwriteLonewolf(state.lonewolf)));
  ws.send(JSON.stringify(overwriteGm(state.gm)));
});
