import mongoose from "mongoose";


export const runtime = "nodejs";

const is_live = false;

export async function POST(request) {
  const {  user_id, amount,platform,screen,subscriptionPlans,os,deviceId,browser,  value_a, value_b,  value_c,  value_d  } =
    await request.json();
  
  const tran_id = `txn_${new mongoose.Types.ObjectId().toString()}`;


  const data = {
    store_id: "lily68cc567288bd2",
    store_passwd: "lily68cc567288bd2@ssl",
    total_amount: amount,
    currency: "BDT",
    tran_id,
   
    success_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/subscribe-plans/payment-success`,
    fail_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/subscribe-plans/payment-fail`,
    cancel_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/subscribe-plans/payment-cancel`,
    shipping_method: "NO",
    product_name: "Demo Product",
    product_category: "Test",
    product_profile: "general",
    cus_name: "Test User",
    cus_email: "test@test.com",
    cus_add1: "Dhaka",
    cus_city: "Dhaka", // 👈 Add this line
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    value_a: user_id,
    value_b: subscriptionPlans,
    value_c: value_c,
    value_d: value_d,
    
  }; 

  

  const response = await fetch(
    "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(data).toString(),
    }
  );


  const apiResponse = await response.json();




  return new Response(JSON.stringify({ url: apiResponse.GatewayPageURL }), {
    status: 200,
  });
}
