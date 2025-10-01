"use client";

import { useSearchParams } from "next/navigation";
import VideoChat from "../Components/VideoChat";
import { Suspense } from "react";

export default function VideoCallPageWrapper() {
    return (
        <Suspense fallback={<div>Loading Video...</div>}>
            <VideoCallPage />
        </Suspense>
    );
}

function VideoCallPage() {
    const searchParams = useSearchParams();
    const roomId = searchParams.get("room") || `room-${Math.floor(Math.random() * 10000)}`;

    return (
        <div className="w-screen h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
            <VideoChat roomId={roomId} />
        </div>
    );
}
