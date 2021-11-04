const express = require("express");
const http = require("http");
const path = require("path");

const app = express();
app.get("/", (_req: never, res: any) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use(express.static(path.join(__dirname, ".")));

const server = http.createServer(app);

let port = 4000;
let ip = "127.0.0.1";

server.listen(port, ip, function listening() {
  console.log("Listening on %d", server.address().port);
});

export {};
