"use client";
import { useState } from "react";
import { useSelector } from 'react-redux'
import { useSearchParams } from "next/navigation";

export default function PayButton() {
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

  // if (paymentStatus === "success") {
  //   return (
  //     <div className="h-[300px] bg-gray-50 flex flex-col items-center justify-center  ">
  //       {paymentStatus === "success" && (
  //         <div className="bg-green-100  text-green-800 p-4 rounded mb-4">
  //           ✅ Payment successful! Thank you.
  //         </div>
  //       )}

  //       {/* Your normal homepage content below */}
  //       <h1>Welcome to the site</h1>
  //     </div>
  //   );
  // }
  return (
    <div className="w-full flex flex-col items-center justify-center h-screen">
      {paymentStatus === "success" && (
        <div className="bg-green-100  text-green-800 p-4 rounded mb-4">
          ✅ Payment successful! Thank you.
        </div>
      )}
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
