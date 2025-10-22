import { connectDb } from "@/lib/connectDb";
import Subscription from "@/models/SubscriptionModel";
import User from "@/models/usersModel";


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

 


   

  //  get device info
  
const devices = {
 
  os: payload.value_d,
  browser: payload.value_c,
  
};



  // 7. Create Subscription document
  const txnDoc = {
    transaction_id: payload.tran_id,
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

  // console.log(txnDoc)

  try {
    const created = await Subscription.create(txnDoc);
    // console.log("Saved txn:", created.transaction_id);
  } catch (err) {
    console.error("Failed to save txn:", err);
  }

   // 6. Update user's subscription plan
  try {
    await User.findOneAndUpdate(
      { uid: userId },
      { subscriptionPlans: payload.value_b },
      { new: true }
    );
  } catch (err) {
    console.error("Failed to update user subscription:", err);
  }



  // 8. Redirect to frontend
  const redirectHtml = `
    <html>
      <head>
        <meta http-equiv="refresh" content="0; url=http://localhost:3000/" />
      </head>
      <body>
        <p>Payment processed. Redirecting...</p>
        <script>window.location.href = "http://localhost:3000/plans/success/?payment=success";</script>
      </body>
    </html>
  `;

  return new Response(redirectHtml, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}
