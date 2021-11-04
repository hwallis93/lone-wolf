const express = require("express");
const http = require("http");
const path = require("path");

const app = express();
app.get("/", (_req: never, res: any) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use(express.static(path.join(__dirname, ".")));

const server = http.createServer(app);

let port = process.env.PORT || 4000;
server.listen(port);
server.on("listening", () => console.log("Express listening"));

export {};
