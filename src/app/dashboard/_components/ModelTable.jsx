"use client";

export default function ModelTable({ models, theme }) {
    return (
        <div className={`overflow-x-auto rounded-lg shadow-md ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className={theme === "dark" ? "bg-gray-800" : "bg-gray-50"}>
                    <tr>
                        {["Model Name", "Version", "Status", "Accuracy", "Last Updated"].map((head) => (
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
                    {models.length > 0 ? (
                        models.map((model) => (
                            <tr key={model.id} className={`hover:${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`}>
                                <td className="px-4 py-2">{model.name}</td>
                                <td className="px-4 py-2">{model.version}</td>
                                <td
                                    className={`px-4 py-2 font-semibold ${model.status === "active" ? "text-green-400" : "text-yellow-400"
                                        }`}
                                >
                                    {model.status}
                                </td>
                                <td className="px-4 py-2">{model.accuracy}%</td>
                                <td className="px-4 py-2">{new Date(model.lastUpdated).toLocaleString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                                No models found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
