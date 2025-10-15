"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { fetchTransactions } from "@/Redux/Slices/transactionsSlice";
import { getDeviceInfo } from "@/lib/getDeviceInfo";

export default function DemoPaymentPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo);
  const transactions = useSelector((state) => state?.transactions);
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("payment");

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch transactions on mount
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handlePayment = async () => {
    const deviceInfo = await getDeviceInfo();

    if (!amount || isNaN(amount)) {
      alert("Enter a valid amount");
      return;
    }

    setLoading(true);
    const presentData = {
      user_id: user?.uid || "guest_demo",
      amount: Number(amount),
      ...deviceInfo,
    };

    try {
      const res = await fetch("/api/payments/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(presentData),
      });

      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("Payment initiation failed");
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (paymentStatus === "success") {
    // console.log(transactions?.items)
    if (transactions?.status === "loading")
      return <p className="h-screen flex items-center justify-center">Predictiong</p>

    // const data = transactions?.items
    // console.log(data)

    // const predict = async () => {
    //   const response = await fetch("http://localhost:8000/predict", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(data),
    //   });
    //   console.log(response)


    // }

    // predict()

  }





  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Beyond Transaction Monitoring
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          See how <span className="font-semibold">SafePay</span> can help you
          reduce fraud, stay compliant, and protect your bottom line.
        </p>
        {paymentStatus === "success" && (
          <div className="bg-green-100 text-green-800 p-4 rounded mt-6 max-w-md mx-auto">
            ✅ Payment successful! Thank you.
          </div>
        )}
      </section>

      {/* Payment Demo Section */}
      <section className="py-20 bg-indigo-50 flex justify-center px-6">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            🔒 Test Payment
          </h2>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border border-gray-300 rounded-md w-full px-4 py-2 mb-4"
          />

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Redirecting..." : "Pay Now"}
          </button>

          <p className="text-sm text-gray-500 text-center mt-4">
            Test how our secure payment system works. No real charges in demo
            mode.
          </p>
        </div>
      </section>
    </div>
  );
}
