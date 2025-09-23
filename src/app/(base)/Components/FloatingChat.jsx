"use client";

import { useState } from "react";
import ChatBot from "./ChatBot";



export default function FloatingChat() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating icon */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition z-50"
      >
        💬
      </button>

      {/* Chat widget */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 h-96 z-50">
      <ChatBot></ChatBot>
        </div>
      )}
    </>
  );
}
