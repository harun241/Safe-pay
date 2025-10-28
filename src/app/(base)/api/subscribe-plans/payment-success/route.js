import { connectDb } from "@/lib/connectDb";
import Subscription from "@/models/SubscriptionModel";
import User from "@/models/usersModel";

export async function POST(request) {
  await connectDb();

  // 1. Parse form-data from SSLCommerz
  const body = await request.formData();
  const payload = Object.fromEntries(body);
  const amount = Number(payload.amount || 0);
  const userId = payload.value_a; // uid
  const planName = payload.value_b; // subscription plan
  const browser = payload.value_c;
  const email = payload.value_d;

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

  // 4. Get device info
  const devices = {
    browser,
  };

  // 5. Create Subscription document
  const txnDoc = {
    transaction_id: payload.tran_id,
    email,
    user_id: userId,
    amount,
    devices,
    payment_method: payload.card_brand || "sslcommerz",
    card_type: payload.card_type || null,
    merchant_id: payload.store_id || null,
    country,
    city,
    location,
    timestamp: new Date(),
  };

  try {
    await Subscription.create(txnDoc);
  } catch (err) {
    console.error("Failed to save txn:", err);
  }

  // 6. Update user's subscription plan history
  try {
    await User.findOneAndUpdate(
      { uid: userId },
      {
        $push: {
          subscriptionPlans: {
            plans: planName,
            time: new Date(),
          },
        },
      },
      { new: true }
    );
  } catch (err) {
    console.error("Failed to update user subscription:", err);
  }

  // 7. Redirect to frontend
  const redirectHtml = `
    <html>
      <head>
        <meta http-equiv="refresh" content="0; url=${process.env.NEXT_PUBLIC_API_BASE_URL}" />
      </head>
      <body>
        <p>Payment processed. Redirecting...</p>
        <script>window.location.href = "${process.env.NEXT_PUBLIC_API_BASE_URL}/plans/success/?payment=success";</script>
      </body>
    </html>
  `;

  return new Response(redirectHtml, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}