import { connectDb } from "@/lib/connectDb";
import Transaction from "@/models/transactionModel";


export async function POST(request) {
  await connectDb();

  // 1. Parse form-data from SSLCommerz
  const body = await request.formData();
  const payload = Object.fromEntries(body);
  const amount = Number(payload.amount || 0);
  const userId = payload.value_a;

  // 2. Extract IP address
  const forwarded = request.headers.get("x-forwarded-for");
  let ip = forwarded?.split(",")[0]?.trim() || request.ip || "unknown";
  if (ip === "::1" || ip.startsWith("127.")) {
    ip = "8.8.8.8"; // fallback for localhost
  }

  // 3. Resolve IP to geo-location
  let country = "Unknown",
    city = "Unknown",
    location = "Unknown";
  try {
    const resp = await fetch(`https://ipinfo.io/${ip}/json`);
    const data = await resp.json();
    country = data?.country_name || data?.country || "Unknown";
    city = data?.city || "Unknown";
    location = data?.loc || "Unknown";
  } catch (err) {
    console.warn("ipinfo failed:", err);
  }

  // 4. Count previous successful transactions in last 24h
  const prev24hCount = await Transaction.countDocuments({
    user_id: userId,
    status: "pending",
    timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
  });

  // 5. Compute total amount in last 30 days (excluding current txn)
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const agg = await Transaction.aggregate([
    {
      $match: {
        user_id: userId,
        status: "pending",
        timestamp: { $gte: thirtyDaysAgo },
      },
    },
    {
      $group: {
        _id: null,
        sumAmount: { $sum: "$amount" },
        cnt: { $sum: 1 },
      },
    },
  ]);

  const prevSum30d = agg[0]?.sumAmount || 0;


  // 6. Calculate new total INCLUDING current transaction
  const totalAmount30d = prevSum30d + amount;




  //  get device info

  const devices = {

    os: payload.value_d,
    browser: payload.value_c,
    deviceId: payload.value_b,
  };


  // 7. Create transaction document
  const txnDoc = {
    transaction_id: payload.tran_id,
    user_id: userId,
    amount,
    devices,
    payment_method: payload.card_brand || "sslcommerz",
    card_type: payload.card_type || null,
    merchant_id: payload.store_id || null,
    previous_txn_count_24h: prev24hCount,
    avg_amount_30d: totalAmount30d, // ✅ new field

    country,
    city,
    location,
    timestamp: new Date(),
  };

  // console.log(txnDoc)

  try {
    const created = await Transaction.create(txnDoc);
    // console.log("Saved txn:", created.transaction_id);
  } catch (err) {
    console.error("Failed to save txn:", err);
  }

  // 8. Redirect to frontend
  const redirectHtml = `
    <html>
      <head>
        <meta http-equiv="refresh" content="0; url=${process.env.NEXT_PUBLIC_API_BASE_URL}" />
      </head>
      <body>
        <p>Payment processed. Redirecting...</p>
        <script>window.location.href = "${process.env.NEXT_PUBLIC_API_BASE_URL}/demo-payment/?payment=success";</script>
      </body>
    </html>
  `;

  return new Response(redirectHtml, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}
