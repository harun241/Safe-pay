

import { Server } from "socket.io";

let io; // Keep a single instance

export async function GET(req) {
  if (!io) {
    console.log("🚀 Initializing Socket.io...");

    // Ensure we attach io only once
    io = new Server({
      path: "/api/socket",
      addTrailingSlash: false,
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket) => {
      console.log("✅ A user connected:", socket.id);

      socket.on("join-room", (roomId) => {
        socket.join(roomId);
        console.log(`📡 User ${socket.id} joined room: ${roomId}`);
      });

      socket.on("signal", ({ roomId, data }) => {
        socket.to(roomId).emit("signal", data);
      });

      socket.on("disconnect", () => {
        console.log("❌ A user disconnected:", socket.id);
      });
    });
  }

  return new Response("Socket.io server is running", { status: 200 });
}
