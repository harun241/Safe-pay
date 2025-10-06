// src/app/api/admin/user-stats/route.js
import { connectDb } from "@/lib/connectDb";
import User from "@/models/usersModel";

export async function GET() {
  await connectDb();

  try {
    const totalUsers = await User.countDocuments();
    const adminUsers = await User.countDocuments({ role: "admin" });

    return new Response(JSON.stringify({
      totalUsers,
      adminUsers,
      growth: "+5.2%" // Placeholder
    }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}