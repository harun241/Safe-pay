"use client";

import { Suspense, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";

// nothing
// 👇 Extract the content that uses useSearchParams
function PayButtonContent() {
  const user = useSelector((state) => state.userInfo);
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("payment");

  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/payments/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user?.uid,
          amount: 1800, // example amount
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // redirect to SSLCommerz payment page
      }
    } catch (err) {
      console.error("Payment error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (paymentStatus === "success") {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
          ✅ Payment successful! Thank you.
        </div>
        <h1>Welcome to the site</h1>

        <div className="p-4 mt-4 rounded shadow bg-gray-100 text-black">
          <h2 className="text-lg font-bold">Fraud Detection Result:</h2>
          <p>Fraud: 100%<span className={"text-green-600"}>
            { "✅ Safe"}
          </span></p>
          <h1>Risk: 0%</h1>
        </div>
      </div >
    );
  }

  return (
    <div className="w-full flex items-center justify-center h-screen">
      <button
        onClick={handlePayment}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}

// 👇 Wrap that content with Suspense here
export default function PayButton() {
  return (
    <Suspense fallback={<div>Loading payment page...</div>}>
      <PayButtonContent />
    </Suspense>
  );
}

//  Prevent static generation build crash
export const dynamic = "force-dynamic";
