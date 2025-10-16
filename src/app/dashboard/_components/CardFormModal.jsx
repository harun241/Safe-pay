"use client";

import { useState } from "react";

export default function CardFormModal({ theme, card, onClose, onSave }) {
  const [name, setName] = useState(card?.name || "");
  const [number, setNumber] = useState(card?.number || "");
  const [expiry, setExpiry] = useState(card?.expiry || "");
  const [isDefault, setIsDefault] = useState(card?.default || false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCard = {
      id: card?.id || Date.now().toString(),
      name,
      last4: number.slice(-4),
      number,
      expiry,
      default: isDefault,
    };
    onSave(newCard);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-md`}>
        <h2 className={`text-xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
          {card ? "Edit Card" : "Add Card"}
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Card Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`p-2 rounded border ${
              theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-slate-900"
            }`}
            required
          />
          <input
            type="text"
            placeholder="Card Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className={`p-2 rounded border ${
              theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-slate-900"
            }`}
            required
          />
          <input
            type="text"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className={`p-2 rounded border ${
              theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-slate-900"
            }`}
            required
          />
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={isDefault} onChange={(e) => setIsDefault(e.target.checked)} />
            Set as default
          </label>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white font-semibold"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
