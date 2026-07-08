import { useState } from "react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-t border-line px-3 py-3 bg-panel"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        maxLength={1000}
        className="flex-1 bg-base text-slate-100 text-sm rounded-lg px-3 py-2
                   placeholder:text-slate-500 outline-none border border-line
                   focus:border-accent transition-colors"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="rounded-lg bg-accent text-base text-sm font-semibold px-4 py-2
                   hover:bg-teal-300 disabled:opacity-40 disabled:cursor-not-allowed
                   active:scale-[0.98] transition-all duration-150"
      >
        Send
      </button>
    </form>
  );
}
