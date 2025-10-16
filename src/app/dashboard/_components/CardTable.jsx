"use client";

import { Edit, Trash2, CheckCircle } from "lucide-react";

export default function CardTable({ cards, theme, onEdit, onDelete }) {
  return (
    <div className={`overflow-x-auto rounded-lg shadow-md ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className={theme === "dark" ? "bg-gray-800" : "bg-gray-50"}>
          <tr>
            {["Card Name", "Card Number", "Expiry", "Default", "Actions"].map((head) => (
              <th
                key={head}
                className={`px-4 py-2 text-left text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={`divide-y ${theme === "dark" ? "divide-gray-700" : "divide-gray-200"}`}>
          {cards.length > 0 ? (
            cards.map((card) => (
              <tr
                key={card.id}
                className={`hover:${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`}
              >
                <td className="px-4 py-2">{card.name}</td>
                <td className="px-4 py-2">**** **** **** {card.last4}</td>
                <td className="px-4 py-2">{card.expiry}</td>
                <td className="px-4 py-2">
                  {card.default && (
                    <span className="flex items-center gap-1 text-green-400 font-semibold">
                      <CheckCircle className="w-4 h-4" /> Default
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => onEdit(card)}
                    className="text-blue-500 hover:text-blue-600 transition"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(card.id)}
                    className="text-red-500 hover:text-red-600 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                No cards found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
