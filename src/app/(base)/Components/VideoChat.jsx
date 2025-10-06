"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "../../../lib/supabaseClient"; // relative to your folder

// A small helper to create stable client id
const makeClientId = () => `peer-${Math.random().toString(36).slice(2, 9)}`;

export default function VideoChat({ roomId }) {
  const localVideoRef = useRef(null);
  const [remoteParticipants, setRemoteParticipants] = useState([]); // [{ id, stream }]
  const peerConnections = useRef({}); // { peerId: RTCPeerConnection }
  const localStreamRef = useRef(null);
  const channelRef = useRef(null);
  const clientId = useRef(makeClientId());
  const [status, setStatus] = useState("idle"); // idle, joining, joined, error
  const [errorMessage, setErrorMessage] = useState("");

  // guard if supabase not configured
  if (!supabase) {
    return (
      <div className="p-4 text-sm text-red-600 bg-red-50 rounded">
        Supabase client is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.
      </div>
    );
  }

  useEffect(() => {
  if (!roomId) {
    setErrorMessage("roomId is required.");
    return;
  }

  let mounted = true;
  const channel = supabase.channel(`webrtc:${roomId}`);
  channelRef.current = channel;

  // helper to send broadcast messages
  const sendSignal = async (payload) => {
    try {
      await channel.send({
        type: "broadcast",
        event: "signal",
        payload,
      });
    } catch (err) {
      console.warn("Signal send failed", err);
    }
  };

  // handle messages
  const onSignal = async ({ payload }) => {
    if (!mounted) return;
    const { from, to, type, description, candidate } = payload;
    if (!from) return;
    if (from === clientId.current) return; // ignore self
    if (to && to !== clientId.current) return; // not for me

    switch (type) {
      case "join":
        if (localStreamRef.current) await createAndSendOffer(from);
        break;
      case "offer":
        await handleOffer(from, description, sendSignal);
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

  // listen to 'signal' events
  channel.on("broadcast", { event: "signal" }, onSignal);

  // ✅ FIXED subscribe syntax (no await, no .catch)
  const subscription = channel.subscribe((status) => {
    if (status === "SUBSCRIBED") {
      console.log("✅ Joined room:", roomId);
      sendSignal({ from: clientId.current, type: "join" });
    } else if (status === "CHANNEL_ERROR") {
      console.warn("⚠️ Supabase channel error for", roomId);
    } else if (status === "TIMED_OUT") {
      console.warn("⚠️ Supabase channel timed out for", roomId);
    }
  });

  // cleanup
  return () => {
    mounted = false;
    try {
      channel.unsubscribe();
    } catch (e) {
      console.warn("unsubscribe failed", e);
    }

    Object.values(peerConnections.current).forEach((pc) => {
      try {
        pc.close();
      } catch {}
    });
    peerConnections.current = {};

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
    }
  };
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [roomId]);


  // create RTCPeerConnection for a peer
  function createPeerConnection(peerId) {
    // reuse if exists and not closed
    const existing = peerConnections.current[peerId];
    if (existing && existing.connectionState !== "closed") return existing;

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    // attach remote tracks
    pc.ontrack = (event) => {
      const stream = event.streams[0];
      setRemoteParticipants((prev) => {
        if (prev.find((p) => p.id === peerId)) return prev;
        return [...prev, { id: peerId, stream }];
      });
    };

    // send ICE candidates for this peer
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

    // handle connection state cleanup
    pc.onconnectionstatechange = () => {
      if (pc.connectionState === "failed" || pc.connectionState === "closed" || pc.connectionState === "disconnected") {
        // remove from list
        setRemoteParticipants((prev) => prev.filter((p) => p.id !== peerId));
      }
    };

    peerConnections.current[peerId] = pc;
    return pc;
  }

  // add local tracks to pc (safe)
  function addLocalTracksToPc(pc) {
    const stream = localStreamRef.current;
    if (!stream) return;
    // Avoid adding duplicate tracks
    const senders = pc.getSenders().map((s) => s.track).filter(Boolean);
    stream.getTracks().forEach((track) => {
      if (!senders.includes(track)) pc.addTrack(track, stream);
    });
  }

  // Create an offer and send to target peerId
  async function createAndSendOffer(targetPeerId) {
    try {
      const pc = createPeerConnection(targetPeerId);
      addLocalTracksToPc(pc);

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // send offer to specific peer
      await channelRef.current.send({
        type: "broadcast",
        event: "signal",
        payload: {
          from: clientId.current,
          to: targetPeerId,
          type: "offer",
          description: pc.localDescription,
        },
      });
    } catch (err) {
      console.error("createAndSendOffer error", err);
    }
  }

  // Handle incoming offer (targeted to me)
  async function handleOffer(fromPeerId, description, sendSignalFn) {
    try {
      const pc = createPeerConnection(fromPeerId);
      // ensure local tracks attached (if available)
      addLocalTracksToPc(pc);
      await pc.setRemoteDescription(description);

      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      // send answer back to offerer
      await (sendSignalFn
        ? sendSignalFn({ from: clientId.current, to: fromPeerId, type: "answer", description: pc.localDescription })
        : channelRef.current.send({
            type: "broadcast",
            event: "signal",
            payload: {
              from: clientId.current,
              to: fromPeerId,
              type: "answer",
              description: pc.localDescription,
            },
          }));
    } catch (err) {
      console.error("handleOffer error", err);
    }
  }

  // Handle incoming answer
  async function handleAnswer(fromPeerId, description) {
    try {
      const pc = peerConnections.current[fromPeerId];
      if (!pc) {
        console.warn("Answer received for unknown peer", fromPeerId);
        return;
      }
      await pc.setRemoteDescription(description);
    } catch (err) {
      console.error("handleAnswer error", err);
    }
  }

  // Handle incoming remote ICE candidate
  async function handleCandidate(fromPeerId, candidate) {
    try {
      const pc = peerConnections.current[fromPeerId];
      if (!pc) {
        console.warn("Candidate for unknown peer", fromPeerId);
        return;
      }
      await pc.addIceCandidate(candidate);
    } catch (err) {
      console.error("handleCandidate error", err);
    }
  }

  // Start local camera/mic and announce join (called automatically on mount)
  useEffect(() => {
    let mounted = true;
    const start = async () => {
      setStatus("joining");
      setErrorMessage("");
      try {
        // Request media
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (!mounted) {
          // stop tracks if unmounted during permission flow
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        localStreamRef.current = stream;
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
        setStatus("joined");

        // If channel already subscribed, announce join so others will offer
        if (channelRef.current) {
          await channelRef.current.send({
            type: "broadcast",
            event: "signal",
            payload: { from: clientId.current, type: "join" },
          });
        }
      } catch (err) {
        console.error("getUserMedia error", err);
        setErrorMessage(err?.name === "NotAllowedError" ? "Permission denied. Allow camera & microphone." : "Cannot access camera/microphone.");
        setStatus("error");
      }
    };

    // Start automatically (since component is mounted by user click in your UI)
    start();

    return () => {
      mounted = false;
    };
  }, [roomId]);

  // End call: close pcs and stop tracks
  const endCall = () => {
    Object.values(peerConnections.current).forEach((pc) => {
      try {
        pc.close();
      } catch {}
    });
    peerConnections.current = {};
    setRemoteParticipants([]);
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
    }
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    setStatus("idle");
    setErrorMessage("");
    // notify others (optional)
    if (channelRef.current) {
      channelRef.current.send({
        type: "broadcast",
        event: "signal",
        payload: { from: clientId.current, type: "leave" },
      }).catch(() => {});
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative rounded-lg overflow-hidden bg-black">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-64 object-cover rounded-lg"
          />
          <span className="absolute bottom-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">You</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {remoteParticipants.map((p) => (
            <div key={p.id} className="relative rounded-lg overflow-hidden bg-black">
              <video
                autoPlay
                playsInline
                className="w-full h-40 object-cover rounded-lg"
                ref={(el) => {
                  if (el && !el.srcObject) el.srcObject = p.stream;
                }}
              />
              <span className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">Client</span>
            </div>
          ))}

          {remoteParticipants.length === 0 && (
            <div className="flex items-center justify-center text-sm text-gray-400">
              Waiting for other participants to join...
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <div className="text-sm text-gray-600 mr-2">Status: {status}</div>
        {errorMessage && <div className="text-sm text-red-600">{errorMessage}</div>}
        <button onClick={endCall} className="ml-auto px-4 py-2 bg-red-500 text-white rounded">End Demo</button>
      </div>
    </div>
  );
}
