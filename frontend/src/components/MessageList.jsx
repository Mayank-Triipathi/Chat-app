import { useEffect, useRef } from "react";

function formatTime(timestamp) {
  if (!timestamp) return "";
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MessageList({ messages, currentUsername }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto scroll-thin px-4 py-4 space-y-2">
      {messages.length === 0 && (
        <p className="text-center text-slate-500 text-sm mt-10">
          No messages yet. Say hello.
        </p>
      )}

      {messages.map((msg) => {
        if (msg.type === "system") {
          return (
            <div key={msg.id} className="text-center">
              <span className="text-xs font-mono text-slate-500 bg-panel px-3 py-1 rounded-full">
                {msg.text}
              </span>
            </div>
          );
        }

        const isOwn = msg.username === currentUsername;

        return (
          <div
            key={msg.id}
            className={`flex flex-col max-w-[80%] ${
              isOwn ? "ml-auto items-end" : "items-start"
            }`}
          >
            <div className="flex items-baseline gap-2 mb-1 px-1">
              <span
                className={`text-xs font-mono ${
                  isOwn ? "text-accent" : "text-slate-400"
                }`}
              >
                {isOwn ? "you" : msg.username}
              </span>
              <span className="text-[10px] text-slate-600">
                {formatTime(msg.timestamp)}
              </span>
            </div>
            <div
              className={`rounded-lg px-3 py-2 text-sm leading-relaxed break-words ${
                isOwn
                  ? "bg-accentDim text-slate-100"
                  : "bg-panel text-slate-200"
              }`}
            >
              {msg.text}
            </div>
          </div>
        );
      })}

      <div ref={bottomRef} />
    </div>
  );
}
