"use client";

export default function SupportTable({ tickets, theme }) {
    return (
        <div className={`overflow-x-auto rounded-lg shadow-md ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className={theme === "dark" ? "bg-gray-800" : "bg-gray-50"}>
                    <tr>
                        {["Ticket ID", "Subject", "Status", "Created At"].map((head) => (
                            <th
                                key={head}
                                className={`px-4 py-2 text-left text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                                    }`}
                            >
                                {head}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={`divide-y ${theme === "dark" ? "divide-gray-700" : "divide-gray-200"}`}>
                    {tickets.length > 0 ? (
                        tickets.map((ticket) => (
                            <tr key={ticket.id} className={`hover:${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`}>
                                <td className="px-4 py-2">{ticket.id}</td>
                                <td className="px-4 py-2">{ticket.subject}</td>
                                <td
                                    className={`px-4 py-2 font-semibold ${ticket.status === "open"
                                            ? "text-yellow-400"
                                            : ticket.status === "closed"
                                                ? "text-green-400"
                                                : "text-gray-400"
                                        }`}
                                >
                                    {ticket.status}
                                </td>
                                <td className="px-4 py-2">{new Date(ticket.createdAt).toLocaleString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                                No support tickets found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
