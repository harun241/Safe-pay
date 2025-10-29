// "use client";

// import { Suspense, useState } from "react";
// import dynamic from "next/dynamic";
// import { useParams, useRouter } from "next/navigation";

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

//   const handleCopyLink = () => {
//     const link = `${window.location.origin}/video-call/${roomId}`;
//     navigator.clipboard.writeText(link);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleExit = () => {
//     router.push("/"); // go back to homepage or desired page
//   };

//   return (
//     <Suspense fallback={<div>Loading Video...</div>}>
//       <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-start bg-gray-900/90 p-6 overflow-auto">
//         {/* Header / Info */}
//         <h2 className="text-2xl font-bold mb-4 text-white">
//           Video Chat Room: <span className="text-green-400">{roomId}</span>
//         </h2>

//         {/* Copy invite link */}
//         <div className="mb-4 flex gap-2 items-center">
//           <button
//             onClick={handleCopyLink}
//             className="px-3 py-2 bg-blue-500 text-white rounded"
//           >
//             Copy Invite Link
//           </button>
//           {copied && <span className="text-green-400">✅ Copied!</span>}
//         </div>

//         {/* Video Chat Component */}
//         <div className="w-full max-w-5xl flex-grow">
//           <VideoChat roomId={roomId} />
//         </div>

//         {/* Exit Room */}
//         <button
//           onClick={handleExit}
//           className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
//         >
//           Exit Room
//         </button>
//       </div>
//     </Suspense>
//   );
// }

// "use client";

// import { Suspense, useState } from "react";
// import dynamic from "next/dynamic";
// import { useParams, useRouter } from "next/navigation";

// import {
//   Mic,
//   MicOff,
//   Camera,
//   CameraOff,
//   MonitorUp,
//   MessageSquare,
//   Copy,
//   PhoneOff
// } from "lucide-react";

// const VideoChat = dynamic(
//   () => import("@/app/(base)/Components/VideoChat"),
//   { ssr: false }
// );

// export default function RoomPage() {
//   const params = useParams();
//   const router = useRouter();
//   const roomId = params.room;

//   const [copied, setCopied] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isCameraOff, setIsCameraOff] = useState(false);
//   const [showChat, setShowChat] = useState(false);

//   if (!roomId) return <p>Loading room...</p>;

//   // ✅ Copy Link
//   const handleCopy = () => {
//     navigator.clipboard.writeText(
//       `${window.location.origin}/video-call/${roomId}`
//     );
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   // ✅ Exit
//   const handleExit = () => router.push("/");

//   return (
//     <Suspense fallback={<div>Loading Video...</div>}>
//       <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex">
        
//         {/* ✅ Main Video Section */}
//         <div className="flex-1 flex flex-col items-center justify-between p-4">
          
//           {/* Header */}
//           <div className="w-full flex items-center justify-between text-white mb-3 p-2 bg-black/30 rounded-lg">
//             <span className="font-semibold">
//               Room: <span className="text-green-400">{roomId}</span>
//             </span>

//             <div className="flex items-center gap-3">
//               <button
//                 onClick={handleCopy}
//                 className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full"
//               >
//                 <Copy size={18} />
//               </button>
//               {copied && <span className="text-green-400">Copied!</span>}
//             </div>
//           </div>

//           {/* ✅ Video Grid */}
//           <div className="flex-1 w-full max-w-6xl rounded-lg p-2 bg-black/40">
//             <VideoChat
//               roomId={roomId}
//               isMuted={isMuted}
//               isCameraOff={isCameraOff}
//             />
//           </div>

//           {/* ✅ Bottom Controls */}
//           <div className="w-full flex items-center justify-center gap-6 mt-4">
//             {/* Toggle Mic */}
//             <button
//               onClick={() => setIsMuted(!isMuted)}
//               className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
//             >
//               {isMuted ? <MicOff size={22} /> : <Mic size={22} />}
//             </button>

//             {/* Toggle Camera */}
//             <button
//               onClick={() => setIsCameraOff(!isCameraOff)}
//               className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
//             >
//               {isCameraOff ? <CameraOff size={22} /> : <Camera size={22} />}
//             </button>

//             {/* Screen Share */}
//             <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white">
//               <MonitorUp size={22} />
//             </button>

//             {/* Chat Toggle */}
//             <button
//               onClick={() => setShowChat(!showChat)}
//               className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
//             >
//               <MessageSquare size={22} />
//             </button>

//             {/* End Call */}
//             <button
//               onClick={handleExit}
//               className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white"
//             >
//               <PhoneOff size={22} />
//             </button>
//           </div>
//         </div>

//         {/* ✅ Chat Panel Right Side */}
//         {showChat && (
//           <div className="w-80 bg-[#1d1d1d] text-white flex flex-col border-l border-gray-700">
//             <h3 className="p-3 border-b border-gray-600 font-semibold">
//               Chat
//             </h3>
//             <div className="flex-1 p-3 overflow-y-auto">
//               <p className="opacity-70">No messages yet...</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </Suspense>
//   );
// }


"use client";

import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { Copy, LogOut } from "lucide-react";

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

  // ✅ Copy invite link
  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/video-call/${roomId}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ✅ Exit to home (not leave call)
  const handleExit = () => router.push("/");

  return (
    <Suspense fallback={<div>Loading Video...</div>}>
      <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex flex-col items-center p-6">
        
        {/* Header */}
        <div className="w-full max-w-5xl flex justify-between items-center mb-5">
          <h2 className="text-white text-xl font-semibold">
            Room: <span className="text-green-400">{roomId}</span>
          </h2>

          {/* Copy Invite Link + Exit */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white"
              title="Copy Room Link"
            >
              <Copy size={18} />
            </button>
            {copied && <span className="text-green-400">Copied!</span>}

            <button
              onClick={handleExit}
              className="p-2 bg-red-500 hover:bg-red-600 rounded-full text-white"
              title="Exit Room"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* ✅ Video Preview (No controls here) */}
        <div className="w-full max-w-5xl bg-black/40 p-3 rounded-lg">
          <VideoChat roomId={roomId} />
        </div>

      </div>
    </Suspense>
  );
}
