import { store } from "../store/store";

const url = window.location.href.replace(/^https?:/, "ws:");
const socket = new WebSocket(url);

const queue: string[] = [];

socket.onopen = () => {
  queue.forEach((message) => socket.send(message));
};

socket.onmessage = (message: MessageEvent<string>) => {
  store.dispatch({ type: "fromServer", payload: JSON.parse(message.data) });
};

export const sendObject = (object: Record<string, unknown>) =>
  sendString(JSON.stringify(object));

export const sendString = (message: string) => {
  socket.readyState === socket.OPEN
    ? socket.send(message)
    : queue.push(message);
};
