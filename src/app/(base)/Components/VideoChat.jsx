// "use client";

// import { useEffect, useRef, useState } from "react";
// import {
//   Mic,
//   MicOff,
//   Camera,
//   CameraOff,
//   MonitorUp,
//   MessageSquare,
//   PhoneOff,
// } from "lucide-react";

// import { supabase } from "../../../lib/supabaseClient";

// import { useRouter } from "next/navigation";

// const makeClientId = () => `peer-${Math.random().toString(36).slice(2, 9)}`;

// export default function VideoChat({ roomId }) {
//   const localVideoRef = useRef(null);
//   const [remoteParticipants, setRemoteParticipants] = useState([]);
//   const peerConnections = useRef({});
//   const localStreamRef = useRef(null);
//   const channelRef = useRef(null);
//   const clientId = useRef(makeClientId());
//   const [status, setStatus] = useState("idle");
//   const [errorMessage, setErrorMessage] = useState("");
//   const router = useRouter();
//   const [copied, setCopied] = useState(false);
//   const [hoverCopy, setHoverCopy] = useState(false);
//   const [exitHover, setExitHover] = useState(false);

//   // ✅ Persistent camera/mic state
//   const [cameraOn, setCameraOn] = useState(() => {
//     if (typeof window !== "undefined") {
//       return localStorage.getItem("cameraOn") === "false" ? false : true;
//     }
//     return true;
//   });
//   const [micOn, setMicOn] = useState(() => {
//     if (typeof window !== "undefined") {
//       return localStorage.getItem("micOn") === "false" ? false : true;
//     }
//     return true;
//   });

//   if (!supabase) {
//     return (
//       <div className="p-4 text-sm text-red-600 bg-red-50 rounded">
//   Supabase client is not configured.
//   <br />
//   Please set{" "}
//   <strong>
//     NEXT_PUBLIC_SUPABASE_URL
//   </strong>{" "}
//   and{" "}
//   <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY</strong>.
// </div>

//     );
//   }

//   // ✅ Peer connection setup
//   const createPeerConnection = (peerId) => {
//     const existing = peerConnections.current[peerId];
//     if (existing && existing.connectionState !== "closed") return existing;

//  const pc = new RTCPeerConnection({
//   iceServers: [
//     { urls: "stun:stun.l.google.com:19302" },
//     {
//       urls: process.env.NEXT_PUBLIC_TURN_URLS.split(","),
//       username: process.env.NEXT_PUBLIC_TURN_USERNAME,
//       credential: process.env.NEXT_PUBLIC_TURN_CREDENTIAL,
//     }
//   ]
// });



//     pc.ontrack = (event) => {
//       const stream = event.streams[0];
//       setRemoteParticipants((prev) => {
//         if (prev.find((p) => p.id === peerId)) return prev;
//         return [...prev, { id: peerId, stream }];
//       });
//     };

//     pc.onicecandidate = (event) => {
//       if (event.candidate && channelRef.current) {
//         channelRef.current.send({
//           type: "broadcast",
//           event: "signal",
//           payload: {
//             from: clientId.current,
//             to: peerId,
//             type: "candidate",
//             candidate: event.candidate,
//           },
//         });
//       }
//     };

//     pc.oniceconnectionstatechange = () => {
//       if (
//         ["failed", "disconnected", "closed"].includes(pc.iceConnectionState)
//       ) {
//         setRemoteParticipants((prev) => prev.filter((p) => p.id !== peerId));
//       }
//     };

//     peerConnections.current[peerId] = pc;
//     return pc;
//   };

//   const addLocalTracksToPc = (pc) => {
//     const stream = localStreamRef.current;
//     if (!stream) return;
//     const existingTracks = pc.getSenders().map((s) => s.track);
//     stream.getTracks().forEach((track) => {
//       if (!existingTracks.includes(track)) pc.addTrack(track, stream);
//     });
//   };

//   const createAndSendOffer = async (targetPeerId) => {
//     try {
//       const pc = createPeerConnection(targetPeerId);
//       addLocalTracksToPc(pc);
//       const offer = await pc.createOffer();
//       await pc.setLocalDescription(offer);
//       await channelRef.current.send({
//         type: "broadcast",
//         event: "signal",
//         payload: {
//           from: clientId.current,
//           to: targetPeerId,
//           type: "offer",
//           description: pc.localDescription,
//         },
//       });
//     } catch (err) {
//       console.error("❌ Error creating/sending offer:", err);
//     }
//   };

//   const handleOffer = async (fromPeerId, description) => {
//     try {
//       const pc = createPeerConnection(fromPeerId);
//       addLocalTracksToPc(pc);
//       await pc.setRemoteDescription(description);
//       const answer = await pc.createAnswer();
//       await pc.setLocalDescription(answer);
//       await channelRef.current.send({
//         type: "broadcast",
//         event: "signal",
//         payload: {
//           from: clientId.current,
//           to: fromPeerId,
//           type: "answer",
//           description: pc.localDescription,
//         },
//       });
//     } catch (err) {
//       console.error("❌ Error handling offer:", err);
//     }
//   };

//   const handleAnswer = async (fromPeerId, description) => {
//     try {
//       const pc = peerConnections.current[fromPeerId];
//       if (pc) await pc.setRemoteDescription(description);
//     } catch (err) {
//       console.error("❌ Error setting remote description:", err);
//     }
//   };

//   const handleCandidate = async (fromPeerId, candidate) => {
//     try {
//       const pc = peerConnections.current[fromPeerId];
//       if (pc && candidate) await pc.addIceCandidate(candidate);
//     } catch (err) {
//       console.error("❌ Error adding ICE candidate:", err);
//     }
//   };

//   // ✅ Realtime signaling
//   useEffect(() => {
//     if (!roomId) {
//       setErrorMessage("roomId is required.");
//       return;
//     }

//     let mounted = true;
//     const channel = supabase.channel(`webrtc:${roomId}`, {
//       config: { broadcast: { self: false } },
//     });
//     channelRef.current = channel;

//     const sendSignal = async (payload) => {
//       try {
//         await channel.send({ type: "broadcast", event: "signal", payload });
//       } catch (err) {
//         console.warn("⚠️ Signal send failed", err);
//       }
//     };

//     const onSignal = async ({ payload }) => {
//       if (!mounted) return;
//       const { from, to, type, description, candidate } = payload || {};
//       if (!from || from === clientId.current) return;
//       if (to && to !== clientId.current) return;

//       switch (type) {
//         case "join":
//           await createAndSendOffer(from);
//           break;
//         case "offer":
//           await handleOffer(from, description);
//           break;
//         case "answer":
//           await handleAnswer(from, description);
//           break;
//         case "candidate":
//           await handleCandidate(from, candidate);
//           break;
//       }
//     };

//     channel.on("broadcast", { event: "signal" }, onSignal);

//     channel.subscribe((status) => {
//       if (status === "SUBSCRIBED") {
//         console.log("✅ Joined room:", roomId);
//         sendSignal({ from: clientId.current, type: "join" });
//       }
//     });

//     return () => {
//       mounted = false;
//       channel.unsubscribe();
//       Object.values(peerConnections.current).forEach((pc) => pc.close());
//       peerConnections.current = {};
//       if (localStreamRef.current) {
//         localStreamRef.current.getTracks().forEach((t) => t.stop());
//       }
//     };
//   }, [roomId]);

//   // ✅ Start local media
//   useEffect(() => {
//     let active = true;
//     const start = async () => {
//       setStatus("joining");
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true,
//         });
//         if (!active) return;
//         localStreamRef.current = stream;
//         if (localVideoRef.current) localVideoRef.current.srcObject = stream;

//         // Apply persistent camera/mic state
//         const videoTrack = stream.getVideoTracks()[0];
//         const audioTrack = stream.getAudioTracks()[0];
//         if (videoTrack) videoTrack.enabled = cameraOn;
//         if (audioTrack) audioTrack.enabled = micOn;

//         setStatus("joined");
//       } catch (err) {
//         console.error("🎥 Media access error:", err);
//         setErrorMessage("Camera/microphone access denied or unavailable.");
//         setStatus("error");
//       }
//     };
//     start();
//     return () => {
//       active = false;
//     };
//   }, [roomId]);

//   // ✅ Controls
//  const toggleCamera = async () => {
//   const stream = localStreamRef.current;
//   if (!stream) return;

//   const videoTrack = stream.getVideoTracks()[0];

//   if (cameraOn) {
//     // ✅ Just disable track — DO NOT stop/remove it
//     if (videoTrack) videoTrack.enabled = false;
//     setCameraOn(false);
//     localStorage.setItem("cameraOn", false);
//   } else {
//     // ✅ If browser removed or stopped track — request fresh one
//     if (!videoTrack || videoTrack.readyState === "ended") {
//       const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
//       const newTrack = newStream.getVideoTracks()[0];
//       stream.addTrack(newTrack);

//       Object.values(peerConnections.current).forEach((pc) => {
//         const sender = pc.getSenders().find(s => s.track?.kind === "video");
//         if (sender) sender.replaceTrack(newTrack);
//         else pc.addTrack(newTrack, stream);
//       });
//     } else {
//       videoTrack.enabled = true;
//     }

//     setCameraOn(true);
//     localStorage.setItem("cameraOn", true);
//   }
// };



//   const toggleMic = () => {
//     const stream = localStreamRef.current;
//     if (!stream) return;
//     const audioTrack = stream.getAudioTracks()[0];
//     if (audioTrack) {
//       audioTrack.enabled = !audioTrack.enabled;
//       setMicOn(audioTrack.enabled);
//       localStorage.setItem("micOn", audioTrack.enabled);
//     }
//   };

//   const endCall = () => {
//     Object.values(peerConnections.current).forEach((pc) => pc.close());
//     peerConnections.current = {};
//     setRemoteParticipants([]);
//     if (localStreamRef.current) {
//       localStreamRef.current.getTracks().forEach((t) => t.stop());
//       localStreamRef.current = null;
//     }
//     if (localVideoRef.current) localVideoRef.current.srcObject = null;
//     setStatus("idle");
//     setErrorMessage("");
//   };

//   return (
//     <div className="relative w-full h-screen bg-black rounded-lg overflow-hidden flex flex-col">
//       <div className="relative w-full h-screen bg-black p-2 flex flex-col">
//         {/* Video Grid */}
//         <div
//           className="grid gap-2 w-full h-full"
//           style={{
//             gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
//             gridAutoRows: "minmax(120px, 1fr)",
//           }}
//         >
//           {/* Local + Remote participants */}
//           {[
//             { id: "local", stream: localStreamRef.current, name: "You" },
//             ...remoteParticipants,
//           ].map((p, idx) => (
//             <div
//               key={p.id}
//               className="relative bg-black rounded-xl overflow-hidden border border-gray-700"
//               style={{
//                 gridColumn: idx === 0 ? "span 2" : "span 1", // first user bigger
//                 gridRow: idx === 0 ? "span 2" : "span 1",
//               }}
//             >
//               <video
//                 ref={(el) =>
//                   el && p.stream && !el.srcObject && (el.srcObject = p.stream)
//                 }
//                 autoPlay
//                 playsInline
//                 muted={idx === 0}
//                 className="w-full h-full object-cover"
//               />
//               <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md">
//                 {p.name || "Guest"}
//               </span>
//             </div>
//           ))}
//         </div>

       
//       </div>

//       {/* ✅ Bottom Control Bar */}
//       <div
//         className="absolute bottom-6 left-1/2 -translate-x-1/2 
//       flex gap-4 bg-black/40 backdrop-blur-md p-3 px-5 rounded-full
//       border border-gray-700 z-50"
//       >
//         {/* Copy Room Link */}

//         <button
//           onMouseEnter={() => setHoverCopy(true)}
//           onMouseLeave={() => setHoverCopy(false)}
//           onClick={() => {
//             navigator.clipboard.writeText(
//               `${window.location.origin}/video-call/${roomId}`
//             );
//             setCopied(true);
//             setTimeout(() => setCopied(false), 2000); // reset text after 2 sec
//           }}
//           className="relative w-12 h-12 bg-gray-700 hover:bg-blue-600 text-white rounded-full flex items-center justify-center"
//         >
//           🔗
//           {/* ✅ Tooltip */}
//           {(hoverCopy || copied) && (
//             <span
//               className="absolute -top-8 left-1/2 -translate-x-1/2 
//       bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
//             >
//               {copied ? "Copied!" : "Copy Link"}
//             </span>
//           )}
//         </button>

//         {/* Camera */}
//         <button
//           onClick={toggleCamera}
//           className={`w-12 h-12 rounded-full flex items-center justify-center 
//           ${cameraOn ? "bg-gray-700" : "bg-red-600"} text-white`}
//         >
//           {cameraOn ? <Camera size={22} /> : <CameraOff size={22} />}
//         </button>

//         {/* Mic */}
//         <button
//           onClick={toggleMic}
//           className={`w-12 h-12 rounded-full flex items-center justify-center 
//           ${micOn ? "bg-gray-700" : "bg-red-600"} text-white`}
//         >
//           {micOn ? <Mic size={22} /> : <MicOff size={22} />}
//         </button>

//         {/* Chat */}
//         <button
//           title="Chat panel coming soon"
//           className="w-12 h-12 bg-gray-700 hover:bg-blue-600 text-white 
//         rounded-full flex items-center justify-center"
//         >
//           <MessageSquare size={22} />
//         </button>

//         {/* ✅ Leave call + Go home (Google Meet style) */}
//         <button
//           onMouseEnter={() => setExitHover(true)}
//           onMouseLeave={() => setExitHover(false)}
//           onClick={() => {
//             endCall();
//             router.push("/");
//           }}
//           className="relative w-12 h-12 bg-red-600 hover:bg-red-700 
//   text-white rounded-full flex items-center justify-center transition"
//         >
//           {/* Rotated PhoneOff icon -> like Google Meet exit */}
//           <PhoneOff size={24} className="rotate-135" />

//           {/* ✅ Hover Tooltip */}
//           {exitHover && (
//             <span
//               className="absolute -top-8 left-1/2 -translate-x-1/2 
//       bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
//             >
//               Exit Room
//             </span>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// }

// File: VideoChat.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Camera, CameraOff, MessageSquare, PhoneOff } from "lucide-react";
import { supabase } from "../../../lib/supabaseClient";
import { useRouter } from "next/navigation";

const makeClientId = () => `client-${Math.random().toString(36).substring(2, 10)}`;
const makeDefaultDisplayName = () => `User-${Math.random().toString(36).substring(2, 6)}`;

export default function VideoChat({ roomId }) {
  const localVideoRef = useRef(null);
  const [remoteParticipants, setRemoteParticipants] = useState([]); // {id, stream, name}
  const peerConnections = useRef({});
  const localStreamRef = useRef(null);
  const channelRef = useRef(null); // wrapper with .raw and .send
  const clientId = useRef(makeClientId());
  const participantsNameMap = useRef({}); // id -> name
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  // persistent camera/mic
  const [cameraOn, setCameraOn] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("cameraOn") === "false" ? false : true;
    }
    return true;
  });
  const [micOn, setMicOn] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("micOn") === "false" ? false : true;
    }
    return true;
  });

  // display name: read from localStorage.displayName if present, else make a default
  const displayName = useRef(
    (typeof window !== "undefined" && localStorage.getItem("displayName")) || makeDefaultDisplayName()
  );

  if (!supabase) {
    return (
      <div className="p-4 text-sm text-red-600 bg-red-50 rounded">
        Supabase client is not configured.
        <br />
        Please set <strong>NEXT_PUBLIC_SUPABASE_URL</strong> and <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY</strong>.
      </div>
    );
  }

  // Build ICE servers safely (fallback to google STUNs)
  const buildIceServers = () => {
    try {
      const raw = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_TURN_URLS || "" : "";
      const urls = raw.split(",").map(s => s.trim()).filter(Boolean);
      const ice = [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" }
      ];
      if (urls.length) {
        ice.push({
          urls,
          username: process.env.NEXT_PUBLIC_TURN_USERNAME,
          credential: process.env.NEXT_PUBLIC_TURN_CREDENTIAL
        });
      }
      return ice;
    } catch (e) {
      console.warn("buildIceServers error", e);
      return [{ urls: "stun:stun.l.google.com:19302" }];
    }
  };

  // Create or reuse peer connection
  const createPeerConnection = (peerId) => {
    const existing = peerConnections.current[peerId];
    if (existing && existing.connectionState !== "closed") return existing;

    const pc = new RTCPeerConnection({ iceServers: buildIceServers() });

    pc.ontrack = (event) => {
      const stream = event.streams[0];
      setRemoteParticipants(prev => {
        // avoid duplicate
        if (prev.find(p => p.id === peerId)) {
          // update stream if changed
          return prev.map(p => p.id === peerId ? { ...p, stream, name: participantsNameMap.current[peerId] || p.name } : p);
        }
        return [...prev, { id: peerId, stream, name: participantsNameMap.current[peerId] || "Guest" }];
      });
    };

    pc.onicecandidate = (event) => {
      console.debug("[webrtc] onicecandidate", peerId, event.candidate);
      if (event.candidate && channelRef.current) {
        channelRef.current.send({
          from: clientId.current,
          to: peerId,
          type: "candidate",
          candidate: event.candidate,
        });
      }
    };

    pc.oniceconnectionstatechange = () => {
      console.debug("[webrtc] iceState", peerId, pc.iceConnectionState);
      if (["failed", "closed", "disconnected"].includes(pc.iceConnectionState)) {
        setRemoteParticipants(prev => prev.filter(p => p.id !== peerId));
      }
    };

    pc.onconnectionstatechange = () => {
      console.debug("[webrtc] connectionState", peerId, pc.connectionState);
    };

    peerConnections.current[peerId] = pc;
    return pc;
  };

  const addLocalTracksToPc = (pc) => {
    const stream = localStreamRef.current;
    if (!stream) return;
    const existing = pc.getSenders().map(s => s.track);
    stream.getTracks().forEach(track => {
      if (!existing.includes(track)) pc.addTrack(track, stream);
    });
  };

  const createAndSendOffer = async (targetPeerId) => {
    try {
      const pc = createPeerConnection(targetPeerId);
      addLocalTracksToPc(pc);
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      channelRef.current?.send({
        from: clientId.current,
        to: targetPeerId,
        type: "offer",
        description: pc.localDescription,
      });
    } catch (err) {
      console.error("createAndSendOffer error", err);
    }
  };

  const handleOffer = async (fromPeerId, description) => {
    try {
      const pc = createPeerConnection(fromPeerId);
      addLocalTracksToPc(pc);
      await pc.setRemoteDescription(description);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      channelRef.current?.send({
        from: clientId.current,
        to: fromPeerId,
        type: "answer",
        description: pc.localDescription,
      });
    } catch (err) {
      console.error("handleOffer error", err);
    }
  };

  const handleAnswer = async (fromPeerId, description) => {
    try {
      const pc = peerConnections.current[fromPeerId];
      if (pc) await pc.setRemoteDescription(description);
    } catch (err) {
      console.error("handleAnswer error", err);
    }
  };

  const handleCandidate = async (fromPeerId, candidate) => {
    try {
      const pc = peerConnections.current[fromPeerId];
      if (pc && candidate) await pc.addIceCandidate(candidate);
    } catch (err) {
      console.error("handleCandidate error", err);
    }
  };

  // Supabase channel: subscribe early but only send 'join' after local stream ready
  const subscribedRef = useRef(false);

  useEffect(() => {
    if (!roomId) {
      setErrorMessage("roomId is required.");
      return;
    }
    let mounted = true;
    const rawChannel = supabase.channel(`webrtc:${roomId}`, { config: { broadcast: { self: false } } });

    channelRef.current = {
      raw: rawChannel,
      send: async (payload) => {
        try {
          // supabase channel send expects {type:"broadcast", event:"signal", payload}
          await rawChannel.send({ type: "broadcast", event: "signal", payload });
        } catch (e) {
          console.warn("channel send error", e);
        }
      }
    };

    const onSignal = async ({ payload }) => {
      if (!mounted) return;
      const { from, to, type, description, candidate, name } = payload || {};
      if (!from || from === clientId.current) return;
      if (to && to !== clientId.current) return;

      // Save remote name if provided
      if (name) {
        participantsNameMap.current[from] = name;
        // update participant name if already present
        setRemoteParticipants(prev => prev.map(p => p.id === from ? { ...p, name } : p));
      }

      switch (type) {
        case "join":
          // remote peer announced itself -> create offer to them
          await createAndSendOffer(from);
          break;
        case "offer":
          await handleOffer(from, description);
          break;
        case "answer":
          await handleAnswer(from, description);
          break;
        case "candidate":
          await handleCandidate(from, candidate);
          break;
        default:
          break;
      }
    };

    rawChannel.on("broadcast", { event: "signal" }, onSignal);

    rawChannel.subscribe((status) => {
      console.debug("[supabase] channel status", status);
      if (status === "SUBSCRIBED") {
        subscribedRef.current = true;
        // If local stream already started, announce join now
        if (localStreamRef.current) {
          channelRef.current.send({
            from: clientId.current,
            type: "join",
            name: displayName.current
          });
        }
      }
    });

    return () => {
      mounted = false;
      try { rawChannel.unsubscribe(); } catch (e) {}
      Object.values(peerConnections.current).forEach(pc => pc.close());
      peerConnections.current = {};
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, [roomId]);

  // Start local media and announce join after subscribed
  useEffect(() => {
    let active = true;
    const start = async () => {
      setStatus("joining");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (!active) return;
        localStreamRef.current = stream;
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;

        // Apply persisted camera/mic state
        const videoTrack = stream.getVideoTracks()[0];
        const audioTrack = stream.getAudioTracks()[0];
        if (videoTrack) videoTrack.enabled = cameraOn;
        if (audioTrack) audioTrack.enabled = micOn;

        setStatus("joined");

        // If subscribed to channel, announce join
        if (subscribedRef.current && channelRef.current) {
          channelRef.current.send({
            from: clientId.current,
            type: "join",
            name: displayName.current
          });
        }
      } catch (err) {
        console.error("media error", err);
        setErrorMessage("Camera/microphone access denied or unavailable.");
        setStatus("error");
      }
    };
    start();
    return () => { active = false; };
  }, [roomId]);

  // Controls
  const toggleCamera = async () => {
    const stream = localStreamRef.current;
    if (!stream) return;
    let videoTrack = stream.getVideoTracks()[0];

    if (cameraOn) {
      if (videoTrack) videoTrack.enabled = false;
      setCameraOn(false);
      localStorage.setItem("cameraOn", false);
    } else {
      if (!videoTrack || videoTrack.readyState === "ended") {
        try {
          const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
          const newTrack = newStream.getVideoTracks()[0];
          stream.addTrack(newTrack);

          // Replace senders' tracks where possible
          Object.values(peerConnections.current).forEach(pc => {
            const sender = pc.getSenders().find(s => s.track?.kind === "video");
            try {
              if (sender && sender.replaceTrack) sender.replaceTrack(newTrack);
              else pc.addTrack(newTrack, stream);
            } catch (e) {
              console.warn("replace/add track error", e);
            }
          });

          if (localVideoRef.current) localVideoRef.current.srcObject = stream;
        } catch (e) {
          console.error("re-acquire video failed", e);
        }
      } else {
        videoTrack.enabled = true;
      }
      setCameraOn(true);
      localStorage.setItem("cameraOn", true);
    }
  };

  const toggleMic = () => {
    const stream = localStreamRef.current;
    if (!stream) return;
    const audioTrack = stream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setMicOn(audioTrack.enabled);
      localStorage.setItem("micOn", audioTrack.enabled);
    }
  };

  const endCall = () => {
    Object.values(peerConnections.current).forEach(pc => pc.close());
    peerConnections.current = {};
    setRemoteParticipants([]);
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(t => t.stop());
      localStreamRef.current = null;
    }
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <div className="relative w-full h-screen bg-black rounded-lg overflow-hidden flex flex-col">
      <div className="relative w-full h-screen bg-black p-2 flex flex-col">
        <div className="grid gap-2 w-full h-full"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gridAutoRows: "minmax(120px, 1fr)",
          }}
        >
          {[ { id: "local", stream: localStreamRef.current, name: displayName.current }, ...remoteParticipants ].map((p, idx) => (
            <div key={p.id}
              className="relative bg-black rounded-xl overflow-hidden border border-gray-700"
              style={{ gridColumn: idx === 0 ? "span 2" : "span 1", gridRow: idx === 0 ? "span 2" : "span 1" }}
            >
              <video
                ref={(el) => el && p.stream && !el.srcObject && (el.srcObject = p.stream)}
                autoPlay playsInline muted={idx === 0}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md">
                {p.name || "Guest"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 bg-black/40 backdrop-blur-md p-3 px-5 rounded-full border border-gray-700 z-50">
        <button
          onClick={() => {
            navigator.clipboard.writeText(`${window.location.origin}/video-call/${roomId}`);
            // small UX feedback is optional; omitted here for brevity
          }}
          className="w-12 h-12 bg-gray-700 text-white rounded-full flex items-center justify-center"
        >
          🔗
        </button>

        <button onClick={toggleCamera} className={`w-12 h-12 rounded-full flex items-center justify-center ${cameraOn ? "bg-gray-700" : "bg-red-600"} text-white`}>
          {cameraOn ? <Camera size={22} /> : <CameraOff size={22} />}
        </button>

        <button onClick={toggleMic} className={`w-12 h-12 rounded-full flex items-center justify-center ${micOn ? "bg-gray-700" : "bg-red-600"} text-white`}>
          {micOn ? <Mic size={22} /> : <MicOff size={22} />}
        </button>

        <button title="Chat" className="w-12 h-12 bg-gray-700 text-white rounded-full flex items-center justify-center">
          <MessageSquare size={22} />
        </button>

        <button onClick={() => { endCall(); router.push("/"); }} className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center">
          <PhoneOff size={22} />
        </button>
      </div>
    </div>
  );
}

