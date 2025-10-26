"use client";

import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";

const VideoChat = dynamic(
  () => import("@/app/(base)/Components/VideoChat"),
  { ssr: false }
);

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.room;
  const [copied, setCopied] = useState(false);

  if (!roomId) return <p>Loading room...</p>;

  const handleCopyLink = () => {
    const link = `${window.location.origin}/video-call/${roomId}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExit = () => {
    router.push("/"); // go back to homepage or desired page
  };

  return (
    <Suspense fallback={<div>Loading Video...</div>}>
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-start bg-gray-900/90 p-6 overflow-auto">
        {/* Header / Info */}
        <h2 className="text-2xl font-bold mb-4 text-white">
          Video Chat Room: <span className="text-green-400">{roomId}</span>
        </h2>

        {/* Copy invite link */}
        <div className="mb-4 flex gap-2 items-center">
          <button
            onClick={handleCopyLink}
            className="px-3 py-2 bg-blue-500 text-white rounded"
          >
            Copy Invite Link
          </button>
          {copied && <span className="text-green-400">✅ Copied!</span>}
        </div>

        {/* Video Chat Component */}
        <div className="w-full max-w-5xl flex-grow">
          <VideoChat roomId={roomId} />
        </div>

        {/* Exit Room */}
        <button
          onClick={handleExit}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Exit Room
        </button>
      </div>
    </Suspense>
  );
}
