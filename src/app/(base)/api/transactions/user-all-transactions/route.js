import { connectDb } from "@/lib/connectDb";
import Transaction from "@/models/transactionModel";

export async function GET(request) {
  await connectDb();

  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("uid");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  if (!uid) {
    return new Response(JSON.stringify({ error: "UID is required" }), {
      status: 400,
    });
  }

  try {
    const tran = await Transaction.find({ user_id: uid })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalCount = await Transaction.countDocuments({ user_id: uid });

    return new Response(JSON.stringify({
      tran,
      page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount
    }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}