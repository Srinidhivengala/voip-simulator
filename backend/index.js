const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

let stats = {
  sent: 0,
  dropped: 0,
  received: 0,
  jitter_ms: 30,
  packet_loss: 0.02,
};

app.get("/settings", (req, res) => {
  res.json(stats);
});

app.post("/update", (req, res) => {
  const data = req.body;
  if (data.sent !== undefined) stats.sent = data.sent;
  if (data.dropped !== undefined) stats.dropped = data.dropped;
  if (data.received !== undefined) stats.received = data.received;
  if (data.jitter_ms !== undefined) stats.jitter_ms = data.jitter_ms;
  if (data.packet_loss !== undefined) stats.packet_loss = data.packet_loss;

  io.emit("stats", stats);
  res.json({ status: "OK" });
});

server.listen(5000, () => console.log("Node realtime server running on http://localhost:5000"));
