"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { fetchTransactions } from "@/Redux/Slices/transactionsSlice";
import { getDeviceInfo } from "@/lib/getDeviceInfo";

export default function DemoPaymentPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo);
  const transactions = useSelector((state) => state.transactions);
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("payment");

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);


  // Fetch all transactions on mount
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
      ...deviceInfo
    }

    try {
      const res = await fetch("/api/payments/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(presentData),
      });

      console.log(res)
      const data = await res.json();
      // console.log('this is the data', data.data)
      if (data.url) window.location.href = data.url; // redirect to payment
      else alert("Payment initiation failed");
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  // ✅ Only get the latest transaction after successful payment
  const latestTransaction = useMemo(() => {
    if (paymentStatus === "success") {
      return transactions?.items; // latest transaction
    }
    return null;
  }, [paymentStatus, transactions]);


  // ✅ Send only the latest transaction to backend CSV
  useEffect(() => {
    if (latestTransaction && latestTransaction.transaction_id) {
      const lastSavedId = localStorage.getItem("lastSavedTransactionId");

      if (lastSavedId === latestTransaction.transaction_id) {
        console.log("Duplicate transaction detected — skipping save.");
        return;
      }

      // ✅ Flatten the nested devices object
      const flattenedTransaction = {
        ...latestTransaction,
        device_os: latestTransaction.devices?.os || "Unknown",
        device_browser: latestTransaction.devices?.browser || "Unknown",
        device_id: latestTransaction.devices?.deviceId || "Unknown",
      };

      // ✅ Remove the nested devices object to avoid [object Object]
      delete flattenedTransaction.devices;

      console.log("Sending latest transaction:", flattenedTransaction);

      fetch("http://localhost:8000/save-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([flattenedTransaction]), // Send full object
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("✅ Backend response:", data);
          localStorage.setItem(
            "lastSavedTransactionId",
            flattenedTransaction.transaction_id
          );
        })
        .catch((err) => console.error("❌ Save error:", err));


    }
  }, [latestTransaction]);




  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Beyond Transaction Monitoring
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          See how <span className="font-semibold">SafePay</span> can help you
          reduce fraud, stay compliant, and protect your bottom line with
          confidence.
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
            Test how our secure payment system works. No real charges applied in
            demo mode.
          </p>
        </div>
      </section>
    </div>
  );
}