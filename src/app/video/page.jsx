// src/app/video/page.jsx
"use client";

import { useSearchParams } from "next/navigation";
import VideoChat from "../Components/VideoChat";

export default function VideoPage() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("room");

  if (!roomId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-800 dark:text-gray-200 text-lg">
          No room ID provided. Please use a valid invite link.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Webinar Room
      </h1>
      <VideoChat roomId={roomId} />
    </main>
  );
}
