"use client";

import { useSearchParams } from "next/navigation";
import VideoChat from "../Components/VideoChat";

export default function VideoCallPage() {
    const searchParams = useSearchParams();
    const roomId = searchParams.get("room") || `room-${Math.floor(Math.random() * 10000)}`;

    //   video chat
    return (
        <div className="w-screen h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
            <VideoChat roomId={roomId} />
        </div>
    );
}
