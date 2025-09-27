"use client";

import { useState, useRef } from "react";
import axios from "axios";

export default function AiBot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesContainerRef = useRef(null);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    // Add user message at the top
    setMessages((prev) => [{ sender: "user", text: userInput }, ...prev]);
    setLoading(true);

    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_AI_SERVER, {
        user_input: userInput,
      });
      const botReply = res.data.response;

      // Add bot reply at the top
      setMessages((prev) => [{ sender: "bot", text: botReply }, ...prev]);
    } catch (error) {
      console.error(
        "API Error:",
        error.response?.status,
        error.response?.data || error.message
      );
      setMessages((prev) => [
        { sender: "bot", text: "Error: API not reachable." },
        ...prev,
      ]);
    }

    setUserInput("");
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-lg bg-gray-50">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">AI Chat Bot</h2>

      {/* Messages Container */}
      <div
        ref={messagesContainerRef}
        className="h-80 overflow-y-auto border p-2 mb-4 bg-white rounded flex flex-col-reverse"
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`my-2 p-2 rounded-lg ${
              msg.sender === "user"
                ? "bg-indigo-400 text-white text-right"
                : "bg-green-300 text-gray-900 text-left"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div className="text-gray-500 mb-2">Bot is typing...</div>}
      </div>

      {/* Input */}
      <div className="flex">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-indigo-500 text-black px-4 rounded-r-lg hover:bg-indigo-600"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
