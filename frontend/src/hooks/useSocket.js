import { useCallback, useRef, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:4000";

let idCounter = 0;
const nextId = () => `${Date.now()}-${idCounter++}`;

export function useSocket() {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState(null);
  const [onlineCount, setOnlineCount] = useState(0);
  const [messages, setMessages] = useState([]);

  const connect = useCallback(() => {
    if (socketRef.current) return;

    const socket = io(SOCKET_URL, { transports: ["websocket", "polling"] });
    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("welcome", ({ username, onlineCount }) => {
      setUsername(username);
      setOnlineCount(onlineCount);
    });

    socket.on("user-joined", ({ username, onlineCount }) => {
      setOnlineCount(onlineCount);
      setMessages((prev) => [
        ...prev,
        { id: nextId(), type: "system", text: `${username} joined the chat` },
      ]);
    });

    socket.on("user-left", ({ username, onlineCount }) => {
      setOnlineCount(onlineCount);
      setMessages((prev) => [
        ...prev,
        { id: nextId(), type: "system", text: `${username} left the chat` },
      ]);
    });

    socket.on("chat-message", ({ username, text, timestamp }) => {
      setMessages((prev) => [
        ...prev,
        { id: nextId(), type: "chat", username, text, timestamp },
      ]);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });
  }, []);

  const sendMessage = useCallback((text) => {
    if (!socketRef.current || !text.trim()) return;
    socketRef.current.emit("chat-message", text.trim());
  }, []);

  return { connect, connected, username, onlineCount, messages, sendMessage };
}
