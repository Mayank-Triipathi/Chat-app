const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

require("dotenv").config();
console.log("CLIENT_URL =", process.env.CLIENT_URL);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const PORT = process.env.PORT || 4000;

// ---- In-memory state (no database) ----
// Map of socket.id -> anonymous display name
const onlineUsers = new Map();

function generateAnonymousName() {
  const randomNumber = Math.floor(1000 + Math.random() * 9000); // 4-digit number
  return `Anonymous ${randomNumber}`;
}

app.get("/", (req, res) => {
  res.send("Chat server is running.");
});

io.on("connection", (socket) => {
  // Assign a random anonymous name to this connection
  const username = generateAnonymousName();
  onlineUsers.set(socket.id, username);

  // Tell the connecting client who they are + current online count
  socket.emit("welcome", {
    username,
    onlineCount: onlineUsers.size,
  });

  // Notify everyone else that a new user has joined
  socket.broadcast.emit("user-joined", {
    username,
    onlineCount: onlineUsers.size,
  });

  console.log(`${username} connected. Online: ${onlineUsers.size}`);

  // Handle incoming chat messages
  socket.on("chat-message", (text) => {
    if (typeof text !== "string") return;
    const trimmed = text.trim().slice(0, 1000); // basic length guard
    if (!trimmed) return;

    io.emit("chat-message", {
      username,
      text: trimmed,
      timestamp: Date.now(),
    });
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    onlineUsers.delete(socket.id);

    io.emit("user-left", {
      username,
      onlineCount: onlineUsers.size,
    });

    console.log(`${username} disconnected. Online: ${onlineUsers.size}`);
  });
});

server.listen(PORT, () => {
  console.log(`Chat server listening on http://localhost:${PORT}`);
});
