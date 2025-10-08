"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import to prevent SSR issues
const VideoChat = dynamic(
  () => import("@/app/(base)/Components/VideoChat"),
  { ssr: false }
);


export default function VideoCallPage() {
  return (
    <Suspense fallback={<div>Loading Video...</div>}>
      <VideoCallContent />
    </Suspense>
  );
}

function VideoCallContent() {
  const searchParams = useSearchParams();
  const roomId =
    searchParams.get("room") || `room-${Math.floor(Math.random() * 10000)}`;

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Video Chat Room: <span className="text-green-500">{roomId}</span>
      </h2>
      <VideoChat roomId={roomId} />
    </div>
  );
}
