"use client";

import { useState } from "react";

const predefinedQA = [
  {
    question: "Learn about FraudNet products",
    answer:
      "safepay offers a comprehensive platform for fraud detection and risk management.",
  },
  {
    question: "Find solution to a problem",
    answer: "Please describe your issue, and we'll guide you with possible solutions.",
  },
  {
    question: "Speak with a representative",
    answer: "Connecting you to a representative...",
  },
];

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! What business problem can we help you solve today?" },
  ]);

  const handleClick = (qa) => {
    setMessages((prev) => [...prev, { from: "user", text: qa.question }]);

    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: qa.answer }]);
    }, 500);
  };

  return (
    <div className="w-80 h-96 bg-white dark:bg-gray-900 border rounded-xl shadow-lg flex flex-col transition-colors">
      {/* Chat Log */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={m.from === "bot" ? "text-left" : "text-right"}
          >
            <div
              className={`inline-block px-3 py-2 rounded-lg ${
                m.from === "bot"
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                  : "bg-blue-600 text-white"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Predefined Questions */}
      <div className="p-2 border-t dark:border-gray-700 flex flex-col gap-2">
        {predefinedQA.map((qa, i) => (
          <button
            key={i}
            onClick={() => handleClick(qa)}
            className="text-left px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-sm text-gray-800 dark:text-green-300"
          >
            {qa.question}
          </button>
        ))}
      </div>
    </div>
  );
}
