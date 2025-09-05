"use client";

import ChatBox from "@/components/ChatBox";

export default function ChatPage() {
  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ color: "#2a6db3", marginBottom: 20 }}>AI Symptom Checker</h1>
      <ChatBox />
    </div>
  );
}
