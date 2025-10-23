'use client';

import { useTheme } from "next-themes";

const features = [
    {
        title: 'Project Overview',
        description: 'Plan and structure work efficiently. Quickly organize tasks and priorities.',
        iconColor: 'indigo',
        icon: (
            <svg className="stroke-current transition-all duration-500 group-hover:stroke-white" width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 27.5L15 25V21.25M15 25L20 27.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: 'App Integrations',
        description: 'Connect all your tools and apps seamlessly. Boost efficiency and workflow.',
        iconColor: 'pink',
        icon: (
            <svg className="stroke-current transition-all duration-500 group-hover:stroke-white" width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7.5" cy="7.5" r="5" strokeWidth="2" />
                <circle cx="7.5" cy="22.5" r="5" strokeWidth="2" />
                <circle cx="22.5" cy="7.5" r="5" strokeWidth="2" />
                <circle cx="22.5" cy="22.5" r="5" strokeWidth="2" />
            </svg>
        ),
    },
    {
        title: 'Data Reporting',
        description: 'Get real-time insights and track progress effectively.',
        iconColor: 'teal',
        icon: (
            <svg className="stroke-current transition-all duration-500 group-hover:stroke-white" width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.75 26.25H26.25M6.25 22.875V12.75C6.25 11.5074 7.25 10.5 8.75 10.5V20.625C8.75 21.8676 7.6307 22.875 6.25 22.875Z" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        title: 'Workflow Builder',
        description: 'Automate processes, coordinate teams, and enhance communication.',
        iconColor: 'orange',
        icon: (
            <svg className="stroke-current transition-all duration-500 group-hover:stroke-white" width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 12V21.25M5 21.25V20.8333H25V21.25" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
];

// Tailwind color mapping
const colorMap = {
    indigo: "bg-indigo-600 text-white",
    pink: "bg-pink-600 text-white",
    teal: "bg-teal-600 text-white",
    orange: "bg-orange-600 text-white",
};

export default function Revolutionary() {
    const { theme } = useTheme();

    return (
        <section className={`py-25 ${theme === "dark" ? "text-white" : "text-black"}`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-14 text-center">
                    <span className="py-1 px-4 bg-indigo-600/20 rounded-full text-xs font-medium text-indigo-400">
                        Features
                    </span>
                    <h2 className={`text-4xl font-bold py-5 ${theme === "dark" ? "text-white" : "text-black"}`}>Revolutionary Features</h2>
                    <p className={`text-lg font-normal max-w-md md:max-w-2xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                        SafePay provides advanced AI-powered features like real-time fraud monitoring, transaction analytics, integrations, and workflow automation.
                    </p>
                </div>

                {/* GRID layout */}
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, idx) => (
                        <div key={idx} className="relative text-center group">
                            <div className={`rounded-lg flex justify-center items-center mb-5 w-20 h-20 mx-auto cursor-pointer transition-all duration-500 ${colorMap[feature.iconColor]}`}>
                                {feature.icon}
                            </div>
                            <h4 className={`text-lg font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{feature.title}</h4>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
