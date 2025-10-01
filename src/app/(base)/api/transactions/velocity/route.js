import { connectDb } from "@/lib/connectDb";
import Transaction from "@/models/transactionModel";

export async function GET(request) {
  await connectDb();

  const { searchParams } = new URL(request.url);
  const window = searchParams.get("window") || "minute";
  const timezone = searchParams.get("tz") || "UTC";

  const groupFormat =
    window === "hour"
      ? "%Y-%m-%d %H:00"
      : window === "minute"
      ? "%Y-%m-%d %H:%M"
      : "%Y-%m-%d %H:%M:%S";

  const data = await Transaction.aggregate([
    {
      $match: {
        timestamp: {
          $gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    },
    {
      $group: {
        _id: {
          user_id: "$user_id",
          bucket: {
            $dateToString: {
              format: groupFormat,
              date: "$timestamp",
              timezone: timezone,
            },
          },
        },
        count: { $sum: 1 },
        total_amount: { $sum: "$amount" },
      },
    },
    {
      $sort: { "_id.bucket": 1 },
    },
  ]);

  const formatted = data.map((item) => ({
    user_id: item._id.user_id,
    date: item._id.bucket,
    count: item.count,
    amount: item.total_amount,
  }));

  return new Response(JSON.stringify(formatted), { status: 200 });
}
