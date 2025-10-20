

// "use client";

// import { useEffect, useRef, useState } from "react";
// import { supabase } from "../../../lib/supabaseClient";

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
//   const [cameraOn, setCameraOn] = useState(true);
//   const [micOn, setMicOn] = useState(true);

//   if (!supabase) {
//     return (
//       <div className="p-4 text-sm text-red-600 bg-red-50 rounded">
//         Supabase client is not configured.  
//         Please set <strong>NEXT_PUBLIC_SUPABASE_URL</strong> and  
//         <strong> NEXT_PUBLIC_SUPABASE_ANON_KEY</strong>.
//       </div>
//     );
//   }

//   // --- Peer connection setup ---
//   function createPeerConnection(peerId) {
//     const existing = peerConnections.current[peerId];
//     if (existing && existing.connectionState !== "closed") return existing;

// const pc = new RTCPeerConnection({
//   iceServers: [
//     { urls: "stun:stun.l.google.com:19302" },
//     {
//       urls: process.env.NEXT_PUBLIC_TURN_URLS.split(","),
//       username: process.env.NEXT_PUBLIC_TURN_USERNAME,
//       credential: process.env.NEXT_PUBLIC_TURN_CREDENTIAL,
//     },
//   ],
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
//       console.log(`🔄 ICE (${peerId}):`, pc.iceConnectionState);
//       if (["failed", "disconnected", "closed"].includes(pc.iceConnectionState)) {
//         setRemoteParticipants((prev) => prev.filter((p) => p.id !== peerId));
//       }
//     };

//     peerConnections.current[peerId] = pc;
//     return pc;
//   }

//   function addLocalTracksToPc(pc) {
//     const stream = localStreamRef.current;
//     if (!stream) return;
//     const senders = pc.getSenders().map((s) => s.track).filter(Boolean);
//     stream.getTracks().forEach((track) => {
//       if (!senders.includes(track)) pc.addTrack(track, stream);
//     });
//   }

//   async function createAndSendOffer(targetPeerId) {
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
//       console.log(`📤 Sent offer to ${targetPeerId}`);
//     } catch (err) {
//       console.error("Error creating/sending offer:", err);
//     }
//   }

//   async function handleOffer(fromPeerId, description) {
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
//       console.log(`📥 Received offer from ${fromPeerId} → Sent answer`);
//     } catch (err) {
//       console.error("Error handling offer:", err);
//     }
//   }

//   async function handleAnswer(fromPeerId, description) {
//     try {
//       const pc = peerConnections.current[fromPeerId];
//       if (pc) await pc.setRemoteDescription(description);
//       console.log(`✅ Answer received from ${fromPeerId}`);
//     } catch (err) {
//       console.error("Error setting remote description:", err);
//     }
//   }

//   async function handleCandidate(fromPeerId, candidate) {
//     try {
//       const pc = peerConnections.current[fromPeerId];
//       if (pc && candidate) await pc.addIceCandidate(candidate);
//     } catch (err) {
//       console.error("Error adding ICE candidate:", err);
//     }
//   }

//   // --- Realtime Signaling ---
//   useEffect(() => {
//     if (!roomId) {
//       setErrorMessage("roomId is required.");
//       return;
//     }

//     let mounted = true;
//     const channel = supabase.channel(`webrtc:${roomId}`);
//     channelRef.current = channel;

//     const sendSignal = async (payload) => {
//       try {
//         await channel.send({ type: "broadcast", event: "signal", payload });
//       } catch (err) {
//         console.warn("Signal send failed", err);
//       }
//     };

//     const onSignal = async ({ payload }) => {
//       if (!mounted) return;
//       const { from, to, type, description, candidate } = payload;
//       if (!from || from === clientId.current) return;
//       if (to && to !== clientId.current) return;

//       switch (type) {
//         case "join":
//           console.log(`📞 ${from} joined — sending offer`);
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

//   // --- Local Media ---
//   useEffect(() => {
//     let mounted = true;
//     const start = async () => {
//       setStatus("joining");
//       setErrorMessage("");
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true,
//         });
//         if (!mounted) return;
//         localStreamRef.current = stream;
//         if (localVideoRef.current) localVideoRef.current.srcObject = stream;
//         setStatus("joined");
//       } catch (err) {
//         console.error("🎥 Media access error:", err);
//         setErrorMessage(
//           err.name === "NotAllowedError"
//             ? "Camera/microphone permission denied."
//             : "Cannot access media devices."
//         );
//         setStatus("error");
//       }
//     };
//     start();
//     return () => {
//       mounted = false;
//     };
//   }, [roomId]);

//   // --- UI Controls ---
//   const toggleCamera = () => {
//     const stream = localStreamRef.current;
//     if (!stream) return;
//     const videoTrack = stream.getVideoTracks()[0];
//     if (videoTrack) {
//       videoTrack.enabled = !videoTrack.enabled;
//       setCameraOn(videoTrack.enabled);
//     }
//   };

//   const toggleMic = () => {
//     const stream = localStreamRef.current;
//     if (!stream) return;
//     const audioTrack = stream.getAudioTracks()[0];
//     if (audioTrack) {
//       audioTrack.enabled = !audioTrack.enabled;
//       setMicOn(audioTrack.enabled);
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

//   // --- Render ---
//   return (
//     <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex flex-col gap-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* Local Video */}
//         <div className="relative rounded-lg overflow-hidden bg-black">
//           <video
//             ref={localVideoRef}
//             autoPlay
//             playsInline
//             muted
//             className="w-full h-64 object-cover rounded-lg"
//           />
//           <span className="absolute bottom-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
//             You
//           </span>
//         </div>

//         {/* Remote Participants */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//           {remoteParticipants.map((p) => (
//             <div
//               key={p.id}
//               className="relative rounded-lg overflow-hidden bg-black"
//             >
//               <video
//                 autoPlay
//                 playsInline
//                 className="w-full h-40 object-cover rounded-lg"
//                 ref={(el) => el && !el.srcObject && (el.srcObject = p.stream)}
//               />
//               <span className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
//                 Client
//               </span>
//             </div>
//           ))}

//           {remoteParticipants.length === 0 && (
//             <div className="flex items-center justify-center text-sm text-gray-400">
//               Waiting for another participant...
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Controls */}
//       <div className="flex flex-wrap gap-2 items-center justify-between">
//         <div className="text-sm text-gray-600">Status: {status}</div>
//         {errorMessage && (
//           <div className="text-sm text-red-600">{errorMessage}</div>
//         )}
//         <div className="flex gap-2 ml-auto">
//           <button
//             onClick={toggleCamera}
//             className={`px-4 py-2 rounded ${
//               cameraOn ? "bg-blue-600" : "bg-gray-400"
//             } text-white`}
//           >
//             {cameraOn ? "Camera On" : "Camera Off"}
//           </button>
//           <button
//             onClick={toggleMic}
//             className={`px-4 py-2 rounded ${
//               micOn ? "bg-blue-600" : "bg-gray-400"
//             } text-white`}
//           >
//             {micOn ? "Mic On" : "Mic Off"}
//           </button>
//           <button
//             onClick={endCall}
//             className="px-4 py-2 bg-red-500 text-white rounded"
//           >
//             End Demo
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

const makeClientId = () => `peer-${Math.random().toString(36).slice(2, 9)}`;

export default function VideoChat({ roomId }) {
  const localVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const channelRef = useRef(null);
  const peerConnections = useRef({});
  const clientId = useRef(makeClientId());
  const [remoteParticipants, setRemoteParticipants] = useState([]);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);

  if (!supabase) {
    return (
      <div className="p-4 text-sm text-red-600 bg-red-50 rounded">
        Supabase client missing.  
        Check <strong>NEXT_PUBLIC_SUPABASE_URL</strong> &{" "}
        <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY</strong>.
      </div>
    );
  }

  // ---------- CREATE PEER CONNECTION ----------
  function createPeerConnection(peerId) {
    const existing = peerConnections.current[peerId];
    if (existing && existing.connectionState !== "closed") return existing;

    const urls = process.env.NEXT_PUBLIC_TURN_URLS?.split(",") ?? [];
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        {
          urls: [
            ...urls.map((u) =>
              u.includes("turn:") && !u.includes("?transport=")
                ? `${u}?transport=tcp`
                : u
            ),
          ],
          username: process.env.NEXT_PUBLIC_TURN_USERNAME,
          credential: process.env.NEXT_PUBLIC_TURN_CREDENTIAL,
        },
      ],
    });

    pc.ontrack = (event) => {
      const stream = event.streams[0];
      setRemoteParticipants((prev) => {
        if (prev.find((p) => p.id === peerId)) return prev;
        return [...prev, { id: peerId, stream }];
      });
    };

    pc.onicecandidate = (event) => {
      if (event.candidate && channelRef.current) {
        channelRef.current.send({
          type: "broadcast",
          event: "signal",
          payload: {
            from: clientId.current,
            to: peerId,
            type: "candidate",
            candidate: event.candidate,
          },
        });
      }
    };

    pc.onconnectionstatechange = () => {
      console.log(`🔗 ${peerId} connection:`, pc.connectionState);
      if (["failed", "disconnected", "closed"].includes(pc.connectionState)) {
        setRemoteParticipants((prev) => prev.filter((p) => p.id !== peerId));
      }
    };

    pc.oniceconnectionstatechange = () => {
      console.log(`🧊 ICE(${peerId}):`, pc.iceConnectionState);
    };

    peerConnections.current[peerId] = pc;
    return pc;
  }

  // ---------- LOCAL TRACKS ----------
  function addLocalTracks(pc) {
    const stream = localStreamRef.current;
    if (!stream) return;
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));
  }

  // ---------- SIGNALING ACTIONS ----------
  async function createAndSendOffer(targetPeerId) {
    try {
      const pc = createPeerConnection(targetPeerId);
      addLocalTracks(pc);
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      await channelRef.current.send({
        type: "broadcast",
        event: "signal",
        payload: {
          from: clientId.current,
          to: targetPeerId,
          type: "offer",
          description: offer,
        },
      });
      console.log(`📤 Sent offer → ${targetPeerId}`);
    } catch (err) {
      console.error("❌ Offer error:", err);
    }
  }

  async function handleOffer(from, description) {
    try {
      const pc = createPeerConnection(from);
      addLocalTracks(pc);
      await pc.setRemoteDescription(description);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      await channelRef.current.send({
        type: "broadcast",
        event: "signal",
        payload: {
          from: clientId.current,
          to: from,
          type: "answer",
          description: answer,
        },
      });
      console.log(`📥 Offer from ${from} → answered`);
    } catch (err) {
      console.error("❌ Handle offer error:", err);
    }
  }

  async function handleAnswer(from, description) {
    try {
      const pc = peerConnections.current[from];
      if (pc) await pc.setRemoteDescription(description);
      console.log(`✅ Answer set from ${from}`);
    } catch (err) {
      console.error("❌ Handle answer error:", err);
    }
  }

  async function handleCandidate(from, candidate) {
    try {
      const pc = peerConnections.current[from];
      if (pc && candidate) {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
        console.log(`🧊  Added ICE from ${from}`);
      }
    } catch (err) {
      console.error("❌ Candidate add error:", err);
    }
  }

  // ---------- SUPABASE CHANNEL ----------
  useEffect(() => {
    if (!roomId) {
      setErrorMessage("roomId required");
      return;
    }

    let mounted = true;
    const channel = supabase.channel(`webrtc:${roomId}`, {
      config: { broadcast: { self: true } },
    });
    channelRef.current = channel;

    const onSignal = async ({ payload }) => {
      if (!mounted) return;
      const { from, to, type, description, candidate } = payload;
      if (!from || from === clientId.current) return;
      if (to && to !== clientId.current) return;

      switch (type) {
        case "join":
          console.log(`📞 ${from} joined`);
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
      }
    };

    channel.on("broadcast", { event: "signal" }, onSignal);

    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        console.log("✅ Joined room:", roomId);
        await channel.send({
          type: "broadcast",
          event: "signal",
          payload: { from: clientId.current, type: "join" },
        });
      }
    });

    return () => {
      mounted = false;
      channel.unsubscribe();
      Object.values(peerConnections.current).forEach((pc) => pc.close());
      peerConnections.current = {};
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, [roomId]);

  // ---------- LOCAL MEDIA ----------
  useEffect(() => {
    let active = true;
    const start = async () => {
      setStatus("joining");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (!active) return;
        localStreamRef.current = stream;
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
        setStatus("joined");
      } catch (err) {
        console.error("🎥 Media error:", err);
        setErrorMessage("Camera/mic access denied or unavailable.");
        setStatus("error");
      }
    };
    start();
    return () => {
      active = false;
    };
  }, [roomId]);

  // ---------- CONTROLS ----------
  const toggleCamera = () => {
    const track = localStreamRef.current?.getVideoTracks()[0];
    if (track) {
      track.enabled = !track.enabled;
      setCameraOn(track.enabled);
    }
  };
  const toggleMic = () => {
    const track = localStreamRef.current?.getAudioTracks()[0];
    if (track) {
      track.enabled = !track.enabled;
      setMicOn(track.enabled);
    }
  };
  const endCall = () => {
    Object.values(peerConnections.current).forEach((pc) => pc.close());
    peerConnections.current = {};
    setRemoteParticipants([]);
    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    localVideoRef.current.srcObject = null;
    setStatus("idle");
  };

  // ---------- RENDER ----------
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Local */}
        <div className="relative bg-black rounded-lg overflow-hidden">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-64 object-cover"
          />
          <span className="absolute bottom-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
            You
          </span>
        </div>

        {/* Remote */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {remoteParticipants.map((p) => (
            <div key={p.id} className="relative bg-black rounded-lg overflow-hidden">
              <video
                autoPlay
                playsInline
                ref={(el) => el && !el.srcObject && (el.srcObject = p.stream)}
                className="w-full h-40 object-cover"
              />
              <span className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                Client
              </span>
            </div>
          ))}
          {remoteParticipants.length === 0 && (
            <div className="flex items-center justify-center text-sm text-gray-400">
              Waiting for another participant...
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="text-sm text-gray-600">Status: {status}</div>
        {errorMessage && <div className="text-sm text-red-600">{errorMessage}</div>}
        <div className="flex gap-2 ml-auto">
          <button
            onClick={toggleCamera}
            className={`px-4 py-2 rounded ${
              cameraOn ? "bg-blue-600" : "bg-gray-400"
            } text-white`}
          >
            {cameraOn ? "Camera On" : "Camera Off"}
          </button>
          <button
            onClick={toggleMic}
            className={`px-4 py-2 rounded ${
              micOn ? "bg-blue-600" : "bg-gray-400"
            } text-white`}
          >
            {micOn ? "Mic On" : "Mic Off"}
          </button>
          <button
            onClick={endCall}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            End Demo
          </button>
        </div>
      </div>
    </div>
  );
}
