"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client with environment variables


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );

export default function VideoChat({ roomId }) {
  const localVideoRef = useRef(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const peerConnections = useRef({}); // RTCPeerConnections keyed by peerId

  // Unique ID for this client
  const clientId = useRef(`peer-${Math.random().toString(36).slice(2)}`);

  if (!supabase) return <div>Loading...</div>;

  useEffect(() => {
    let localStream;
    const channel = supabase.channel(roomId);

    async function setup() {
      try {
        // 1️⃣ Get camera & mic
        localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream;
        }

        // 2️⃣ Listen for signaling messages from other peers
        channel.on("broadcast", { event: "signal" }, async ({ payload }) => {
          const { from, description, candidate } = payload;
          if (from === clientId.current) return; // Ignore own messages

          let pc = peerConnections.current[from];
          if (!pc) {
            pc = createPeerConnection(from, localStream, channel);
            peerConnections.current[from] = pc;
          }

          // Handle SDP description
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
          }

          // Handle ICE candidate
          if (candidate) {
            try {
              await pc.addIceCandidate(candidate);
            } catch (err) {
              console.error("Error adding ICE candidate", err);
            }
          }
        });

        // 3️⃣ Subscribe to Supabase channel
        await channel.subscribe(async (status) => {
          if (status === "SUBSCRIBED") {
            // Notify other peers by sending an offer
            broadcastOffer(localStream, channel);
          }
        });
      } catch (err) {
        console.error("Error accessing media devices:", err);
      }
    }

    setup();

    // 4️⃣ Cleanup on unmount
    return () => {
      channel.unsubscribe();
      Object.values(peerConnections.current).forEach((pc) => pc.close());
      if (localStream) localStream.getTracks().forEach((t) => t.stop());
    };
  }, [roomId]);

  // Create RTCPeerConnection
  function createPeerConnection(peerId, localStream, channel) {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    // Add local tracks
    localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));

    // Receive remote tracks
    pc.ontrack = (event) => {
      setRemoteStreams((prev) => {
        if (prev.find((s) => s.id === event.streams[0].id)) return prev;
        return [...prev, event.streams[0]];
      });
    };

    // Send ICE candidates to peers
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

  // Send offer to all other peers
  async function broadcastOffer(localStream, channel) {
    const peerId = `peer-${Date.now()}`;
    const pc = createPeerConnection(peerId, localStream, channel);
    peerConnections.current[peerId] = pc;

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    channel.send({
      type: "broadcast",
      event: "signal",
      payload: { from: clientId.current, description: pc.localDescription },
    });
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex flex-col gap-4">
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
            <div key={stream.id} className="relative rounded-lg overflow-hidden bg-black">
              <video
                autoPlay
                playsInline
                className="w-full h-40 object-cover rounded-lg"
                ref={(el) => {
                  if (el && !el.srcObject) el.srcObject = stream;
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
