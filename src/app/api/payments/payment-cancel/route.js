import { connectDb } from "@/lib/connectDb";
import Transaction from "@/models/transactionModel";

export async function POST(request) {
  await connectDb();
  const body = await request.formData();
  const payload = Object.fromEntries(body);

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

  await Transaction.create({
    transaction_id: payload.tran_id,
    user_id: payload.value_a,
    amount: payload.amount,
    payment_method: payload.card_brand,
    merchant_id: payload.store_id,
    country,
    city,
    location,
    status: "CANCELLED",
    timestamp: new Date(),
  });

  // 8. Redirect to frontend
  const redirectHtml = `
    <html>
      <head>
        <meta http-equiv="refresh" content="0; url=http://localhost:3000/" />
      </head>
      <body>
        <p>Payment processed. Redirecting...</p>
        <script>window.location.href = "http://localhost:3000/examplePayforTest/?payment=cancel";</script>
      </body>
    </html>
  `;

  return new Response(redirectHtml, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}
