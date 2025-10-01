"use client";

import { useSearchParams } from "next/navigation";
import VideoChat from "../Components/VideoChat";
import { Suspense } from "react";

export default function VideoCall() {
    const searchParams = useSearchParams();
    const roomId = searchParams.get("room") || `room-${Math.floor(Math.random() * 10000)}`;

    //   video chat
    return (
        <div className="w-screen h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
            <VideoChat roomId={roomId} />
        </div>
    );
}


export function VideoCallPage() {
    return (
        <Suspense fallback={<div>Loading Video......</div>}>
            <VideoCall></VideoCall>
        </Suspense>
    )
}