import { useState } from "react";
import JoinScreen from "./components/JoinScreen.jsx";
import ChatRoom from "./components/ChatRoom.jsx";
import { useSocket } from "./hooks/useSocket.js";

export default function App() {
  const [hasJoined, setHasJoined] = useState(false);
  const { connect, username, onlineCount, messages, sendMessage } =
    useSocket();

  const handleJoin = () => {
    connect();
    setHasJoined(true);
  };

  return (
    <div className="h-screen bg-base flex items-center justify-center p-0 sm:p-6">
      <div className="w-full h-full sm:max-w-md sm:h-[640px] bg-base sm:rounded-2xl sm:border sm:border-line overflow-hidden">
        {hasJoined ? (
          <ChatRoom
            username={username}
            onlineCount={onlineCount}
            messages={messages}
            onSend={sendMessage}
          />
        ) : (
          <JoinScreen onJoin={handleJoin} />
        )}
      </div>
    </div>
  );
}
