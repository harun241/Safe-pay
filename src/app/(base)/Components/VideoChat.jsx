

"use client";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// 🔑 Supabase client (use your env vars)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function VideoChat({ roomId }) {
  const localVideoRef = useRef(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const peerConnections = useRef({}); // keyed by peer id

  // Simple unique id for this client
  const clientId = useRef(`peer-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    let localStream;
    const channel = supabase.channel(roomId);

    async function setup() {
      // Get camera + mic
      localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }

      // Subscribe to signaling messages
      channel.on("broadcast", { event: "signal" }, async ({ payload }) => {
        const { from, description, candidate } = payload;
        if (from === clientId.current) return; // ignore own signals

        let pc = peerConnections.current[from];
        if (!pc) {
          pc = createPeerConnection(from, localStream, channel);
          peerConnections.current[from] = pc;
        }

        if (description) {
          await pc.setRemoteDescription(description);
          if (description.type === "offer") {
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            channel.send({
              type: "broadcast",
              event: "signal",
              payload: { from: clientId.current, description: pc.localDescription },
            });
          }
        } else if (candidate) {
          try {
            await pc.addIceCandidate(candidate);
          } catch (err) {
            console.error("Error adding ICE", err);
          }
        }
      });

      await channel.subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          // Tell others I'm here by creating offers
          broadcastOffer(localStream, channel);
        }
      });
    }

    setup();

    return () => {
      channel.unsubscribe();
      Object.values(peerConnections.current).forEach((pc) => pc.close());
      if (localStream) localStream.getTracks().forEach((t) => t.stop());
    };
  }, [roomId]);

  function createPeerConnection(peerId, localStream, channel) {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    // Local tracks
    localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));

    // Remote tracks
    pc.ontrack = (event) => {
      setRemoteStreams((prev) => {
        const exists = prev.find((s) => s.id === event.streams[0].id);
        if (exists) return prev;
        return [...prev, event.streams[0]];
      });
    };

    // ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        channel.send({
          type: "broadcast",
          event: "signal",
          payload: { from: clientId.current, candidate: event.candidate },
        });
      }
    };

    return pc;
  }

  async function broadcastOffer(localStream, channel) {
    const pc = createPeerConnection("new-peer", localStream, channel);
    peerConnections.current["new-peer"] = pc;

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    channel.send({
      type: "broadcast",
      event: "signal",
      payload: { from: clientId.current, description: pc.localDescription },
    });
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Local video */}
        <div className="relative rounded-lg overflow-hidden bg-black">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-64 object-cover rounded-lg"
          />
          <span className="absolute bottom-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
            You
          </span>
        </div>

        {/* Remote participants */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {remoteStreams.map((stream) => (
            <div
              key={stream.id}
              className="relative rounded-lg overflow-hidden bg-black"
            >
              <video
                autoPlay
                playsInline
                className="w-full h-40 object-cover rounded-lg"
                ref={(el) => {
                  if (el && !el.srcObject) {
                    el.srcObject = stream;
                  }
                }}
              />
              <span className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                Client
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
