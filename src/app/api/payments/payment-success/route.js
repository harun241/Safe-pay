import { connectDb } from "@/lib/connectDb";
import Transaction from "@/models/transactionModel";

export async function POST(request) {
 await connectDb()
  const body = await request.formData(); // SSLCommerz sends as form-data

  const payload = Object.fromEntries(body);
  const amount = Number(payload.amount);

  // Get IP
  const forwarded = request.headers.get("x-forwarded-for");
  let ip = forwarded?.split(",")[0]?.trim() || "unknown";
  if (ip === "::1" || ip.startsWith("127.")) {
    ip = "8.8.8.8"; // fallback for local dev (Google DNS IP)
  }

  // Get location info
  const response = await fetch(`https://ipinfo.io/${ip}/json`);
  const data = await response.json();

  console.log('id',payload.value_a);
  // Features: previous_txn_count_24h
  // -------------------------------
  const prev24hCount = await Transaction.countDocuments({
    user_id: payload.value_a,
    status: "SUCCESS",
    timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
  });

  // -------------------------------
  // Features: avg_amount_30d
  // -------------------------------
  const last30d = await Transaction.aggregate([
    {
      $match: {
        user_id: payload.value_a,
        status: "SUCCESS",
        timestamp: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      },
    },
    {
      $group: {
        _id: null,
        avgAmount: { $avg: "$amount" },
      },
    },
  ]);

  const avgAmount30d = last30d[0]?.avgAmount || 0;

  await Transaction.create({
    transaction_id: payload.tran_id,
    user_id: payload.value_a,
    amount,
    payment_method: payload.card_brand,
    card_type: payload.card_type,
    merchant_id: payload.store_id,
    country: data?.country_name || data?.country,
    city: data?.city,
    location: data?.loc,
    previous_txn_count_24h: prev24hCount,
    avg_amount_30d: avgAmount30d,
    status:'SUCCESS',

    timestamp: new Date(),
  });

  return new Response("Payment success & saved!", { status: 200 });
}
