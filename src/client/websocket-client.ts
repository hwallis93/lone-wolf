const url = window.location.href.replace(/^https?:/, "ws:");
const socket = new WebSocket(url);

const queue: string[] = [];

socket.addEventListener("message", (message) => {
  console.log(message);
});
socket.addEventListener("open", () => {
  queue.forEach((message) => socket.send(message));
});

export const sendMessage = (message: string) => {
  socket.readyState === socket.OPEN
    ? socket.send(message)
    : queue.push(message);
};
