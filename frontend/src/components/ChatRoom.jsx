import MessageList from "./MessageList.jsx";
import MessageInput from "./MessageInput.jsx";

export default function ChatRoom({ username, onlineCount, messages, onSend }) {
  return (
    <div className="h-full flex flex-col">
      <header className="flex items-center justify-between px-4 py-3 border-b border-line bg-panel">
        <div>
          <h1 className="text-slate-100 font-semibold text-sm">Wire</h1>
          <p className="text-xs font-mono text-slate-500">
            you are{" "}
            <span className="text-accent">{username ?? "connecting..."}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          {onlineCount} online
        </div>
      </header>

      <MessageList messages={messages} currentUsername={username} />
      <MessageInput onSend={onSend} />
    </div>
  );
}
