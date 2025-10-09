"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Send, Bot, User } from "lucide-react";

export default function AiBot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! 👋 How can I help you today?" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMsg = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, userMsg]);
    setUserInput("");
    setLoading(true);

    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_AI_SERVER, {
        user_input: userInput,
      });
      const botReply = res.data.response || "Hmm... no response received.";
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Unable to connect to the AI server." },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f7f7f8]">
      {/* Chat container */}
      <div className="w-full max-w-3xl h-[80vh] flex flex-col bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b bg-white flex items-center justify-center font-semibold text-gray-800 text-lg">
          <Bot className="text-green-500 mr-2" /> Ai-Assitant
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {/* Bot avatar */}
              {msg.sender === "bot" && (
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                  <Bot size={18} />
                </div>
              )}

              {/* Message bubble */}
              <div
                className={`px-4 py-2 rounded-2xl max-w-[75%] text-[15px] leading-relaxed shadow-sm ${
                  msg.sender === "user"
                    ? "bg-[#10a37f] text-white rounded-br-none"
                    : "bg-gray-100 text-gray-900 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>

              {/* User avatar */}
              {msg.sender === "user" && (
                <div className="w-8 h-8 rounded-full bg-[#10a37f] flex items-center justify-center text-white">
                  <User size={18} />
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex items-center gap-3 text-gray-500">
              <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center text-white">
                <Bot size={18} />
              </div>
              <div className="bg-gray-100 text-gray-700 rounded-2xl px-4 py-2">
                Typing<span className="animate-pulse">...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="border-t p-4 bg-white flex items-center gap-3">
          <input
            type="text"
            placeholder="Message ChatGPT..."
            className="flex-1 bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-[#10a37f] hover:bg-[#0e8f6e] text-white px-5 py-3 rounded-xl transition flex items-center gap-2 disabled:opacity-60"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Footer */}
      <p className="text-gray-400 text-xs mt-3">
        ChatGPT-style UI recreated by <span className="font-semibold">Harun</span>
      </p>
    </div>
  );
}
