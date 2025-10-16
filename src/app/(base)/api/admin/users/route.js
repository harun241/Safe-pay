import { connectDb } from "@/lib/connectDb";
import User from "@/models/usersModel";

export async function GET(request) {
  await connectDb();

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  try {
    const users = await User.find({}, "uid name email role status createdAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments();

    return new Response(JSON.stringify({
      users,
      totalUsers,
      page,
      totalPages: Math.ceil(totalUsers / limit)
    }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}