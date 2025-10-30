

// "use client";

// import { Suspense, useState } from "react";
// import dynamic from "next/dynamic";
// import { useParams, useRouter } from "next/navigation";
// import { Copy, LogOut } from "lucide-react";

// const VideoChat = dynamic(
//   () => import("@/app/(base)/Components/VideoChat"),
//   { ssr: false }
// );

// export default function RoomPage() {
//   const params = useParams();
//   const router = useRouter();
//   const roomId = params.room;
//   const [copied, setCopied] = useState(false);

//   if (!roomId) return <p>Loading room...</p>;

//   // ✅ Copy invite link
//   const handleCopy = () => {
//     navigator.clipboard.writeText(
//       `${window.location.origin}/video-call/${roomId}`
//     );
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   // ✅ Exit to home (not leave call)
//   const handleExit = () => router.push("/");

//   return (
//     <Suspense fallback={<div>Loading Video...</div>}>
//       <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex flex-col items-center p-6">
        
//         {/* Header */}
//         <div className="w-full max-w-5xl flex justify-between items-center mb-5">
//           <h2 className="text-white text-xl font-semibold">
//             Room: <span className="text-green-400">{roomId}</span>
//           </h2>

//           {/* Copy Invite Link + Exit */}
//           <div className="flex items-center gap-3">
//             <button
//               onClick={handleCopy}
//               className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white"
//               title="Copy Room Link"
//             >
//               <Copy size={18} />
//             </button>
//             {copied && <span className="text-green-400">Copied!</span>}

//             <button
//               onClick={handleExit}
//               className="p-2 bg-red-500 hover:bg-red-600 rounded-full text-white"
//               title="Exit Room"
//             >
//               <LogOut size={18} />
//             </button>
//           </div>
//         </div>

//         {/* ✅ Video Preview (No controls here) */}
//         <div className="w-full max-w-5xl bg-black/40 p-3 rounded-lg">
//           <VideoChat roomId={roomId} />
//         </div>

//       </div>
//     </Suspense>
//   );
// }

"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

const VideoChat = dynamic(
  () => import("@/app/(base)/Components/VideoChat"),
  { ssr: false }
);

export default function RoomPage() {
  const params = useParams();
  const roomId = params.room;

  if (!roomId) return <p>Loading...</p>;

  return (
    <Suspense fallback={<div className="text-white">Loading Video...</div>}>
      {/* ✅ Full-Screen Video Modal */}
      <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center">
        <VideoChat roomId={roomId} />
      </div>
    </Suspense>
  );
}
