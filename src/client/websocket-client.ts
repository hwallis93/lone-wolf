import { store } from "./store";

const url = window.location.href.replace(/^https?:/, "ws:");
const socket = new WebSocket(url);

socket.onmessage = (message: MessageEvent<string>) => {
  store.dispatch({ type: "fromServer", payload: JSON.parse(message.data) });
};

const queue: string[] = [];
socket.onopen = () => {
  queue.forEach((message) => socket.send(message));
};

export const sendObject = (object: Record<string, unknown>) =>
  sendString(JSON.stringify(object));

export const sendString = (message: string) => {
  socket.readyState === socket.OPEN
    ? socket.send(message)
    : queue.push(message);
};
