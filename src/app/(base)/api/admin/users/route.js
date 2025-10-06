import { connectDb } from "@/lib/connectDb";
import User from "@/models/usersModel";

export async function GET() {
  await connectDb();

  try {
    // Sort users by creation date (newest first)
    const users = await User.find({}, "uid name email role status").sort({ createdAt: -1 });

    return new Response(JSON.stringify(users), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}