"use client";

import { Loader2 } from "lucide-react"; // Lucide spinner icon
import { useTheme } from "next-themes";

export default function Spinner({ size = 6 }) {
  const { theme } = useTheme();
  const color = theme === "dark" ? "text-white" : "text-gray-800";

  return (
    <div className="flex items-center justify-center">
      <Loader2 className={`animate-spin h-${size} w-${size} ${color}`} />
    </div>
  );
}
