"use client";
import { useState, useRef, useEffect } from "react";
import { Loader2, Send, Hospital, User } from "lucide-react"; // added User icon

export default function ChatBox() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to latest
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/symptom-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage.text }),
    });

    if (!res.body) {
      setLoading(false);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let assistantMessage = { role: "assistant", text: "" };

    setMessages((prev) => [...prev, assistantMessage]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      assistantMessage.text += chunk;
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = { ...assistantMessage };
        return newMessages;
      });
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col border border-gray-200 rounded-2xl shadow-md bg-white h-[500px] max-w-2xl mx-auto">
      {/* Header */}
      <div className="px-5 py-3 border-b border-gray-100 bg-[#2a6db3] rounded-t-2xl">
        <h2 className="text-white font-semibold text-lg">AI Symptom Checker</h2>
        <p className="text-blue-100 text-xs">
          I am not a doctor, but I can help you understand your symptoms.
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-2 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {/* Avatar for assistant */}
            {msg.role === "assistant" && (
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2a6db3]/10 text-[#2a6db3] shadow-sm">
                <Hospital className="h-5 w-5" />
              </div>
            )}

            {/* Message bubble */}
            <div
              className={`px-4 py-2 rounded-lg text-sm shadow-sm max-w-[75%] ${
                msg.role === "user"
                  ? "bg-[#2a6db3] text-white"
                  : "bg-white border border-gray-200 text-gray-900"
              }`}
            >
              {msg.text}
            </div>

            {/* Avatar for user */}
            {msg.role === "user" && (
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 shadow-sm">
                <User className="h-5 w-5" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex items-center text-xs text-gray-500 gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            AI is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-100 bg-white flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Describe your symptoms..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2a6db3] shadow-sm"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-[#2a6db3] hover:bg-[#1c5599] disabled:bg-gray-400 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm flex items-center gap-2"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          Send
        </button>
      </div>
    </div>
  );
}
