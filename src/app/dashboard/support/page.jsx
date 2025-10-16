"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "next-themes";
import SupportTable from "../_components/SupportTable";

export default function SupportPage() {
  const { user } = useAuth();
  const { theme } = useTheme();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch existing tickets
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch(`/api/support?uid=${user?.uid}`);
        const data = await res.json();
        setTickets(data.tickets || []);
      } catch (err) {
        console.error("Failed to fetch tickets:", err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.uid) fetchTickets();
  }, [user?.uid]);

  // Submit new ticket
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject || !message) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user?.uid, subject, message }),
      });
      const data = await res.json();
      if (res.ok) {
        setTickets([data.ticket, ...tickets]);
        setSubject("");
        setMessage("");
      }
    } catch (err) {
      console.error("Failed to submit ticket:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`flex flex-col gap-6 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
      <h1 className="text-3xl font-bold">Support Center</h1>
      <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
        Submit a ticket or browse your support history below.
      </p>

      {/* Support Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={`p-2 rounded border ${
            theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-slate-900"
          }`}
          required
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`p-2 rounded border resize-none h-32 ${
            theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-slate-900"
          }`}
          required
        ></textarea>
        <button
          type="submit"
          disabled={submitting}
          className="w-max px-6 py-2 rounded bg-green-500 hover:bg-green-600 text-white font-semibold transition"
        >
          {submitting ? "Submitting..." : "Submit Ticket"}
        </button>
      </form>

      {/* Support Tickets Table */}
      <div className="mt-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div
              className={`w-12 h-12 border-4 rounded-full animate-spin ${
                theme === "dark" ? "border-t-cyan-400 border-gray-700" : "border-t-green-500 border-gray-300"
              }`}
            />
          </div>
        ) : (
          <SupportTable tickets={tickets} theme={theme} />
        )}
      </div>
    </div>
  );
}
