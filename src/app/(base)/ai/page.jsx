"use client";
import { useState } from "react";
import axios from "axios";

export default function TransactionForm() {
  const [formData, setFormData] = useState({
    amount: "",
    card_type: "",
    city: "",
    country: "",
    device_browser: "",
    device_id: "",
    device_os: "",
    is_fraud: "",
    location: "",
    merchant_id: "",
    payment_method: "",
    status: "",
    user_id: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(formData)

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post("http://localhost:8000/predict", formData);
      console.log(res)
      setResult(res.data.prediction);
    } catch (err) {
      console.error(err);
      setResult("Error: Could not connect to the model server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex justify-center items-center p-6">
      <div className="w-full max-w-2xl bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-800">
        <h2 className="text-3xl font-bold text-center text-purple-400 mb-6">
          💳 Transaction Fraud Detection
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(formData).map((key) => (
            <div key={key} className="flex flex-col">
              <label className="text-sm text-gray-400 mb-1 capitalize">
                {key.replaceAll("_", " ")}
              </label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder={`Enter ${key}`}
                required
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="col-span-1 md:col-span-2 mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition"
          >
            {loading ? "Predicting..." : "Predict Transaction"}
          </button>
        </form>

        {result && (
          <div
            className={`mt-6 p-4 rounded-lg text-center font-bold text-lg ${
              result === "Fraudulent" ? "bg-red-900 text-red-300" : "bg-green-900 text-green-300"
            }`}
          >
            Prediction Result: {result}
          </div>
        )}
      </div>
    </div>
  );
}
