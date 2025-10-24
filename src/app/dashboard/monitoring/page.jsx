"use client";

import { useEffect, useState } from "react";
import ModelCard from "../_components/ModelCard";
import ModelTable from "../_components/ModelTable";
import { useTheme } from "@/app/(base)/Components/ThemeProvider";

export default function ModelMonitoringPage() {
    const { theme } = useTheme();
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch models data
    useEffect(() => {
        const fetchModels = async () => {
            try {
                const res = await fetch("/api/models");
                const data = await res.json();
                setModels(data.models || []);
            } catch (err) {
                console.error("Failed to fetch models:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchModels();
    }, []);

    return (
        <div className={`flex flex-col gap-6 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            <h1 className="text-3xl font-bold">Model Monitoring</h1>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Track all your AI models, view metrics, and monitor performance in real-time.
            </p>

            {/* Model Cards */}
            <div className="grid gap-6 md:grid-cols-3">
                {loading
                    ? Array.from({ length: 3 }).map((_, i) => (
                        <div
                            key={i}
                            className={`h-40 rounded-lg animate-pulse ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"
                                }`}
                        />
                    ))
                    : models.map((model) => <ModelCard key={model.id} model={model} theme={theme} />)}
            </div>

            {/* Model Metrics Table */}
            <div className="mt-6">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div
                            className={`w-12 h-12 border-4 rounded-full animate-spin ${theme === "dark" ? "border-t-cyan-400 border-gray-700" : "border-t-green-500 border-gray-300"
                                }`}
                        />
                    </div>
                ) : (
                    <ModelTable models={models} theme={theme} />
                )}
            </div>
        </div>
    );
}
