"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight, materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import { ClipboardIcon, CheckIcon } from "lucide-react";
import { useTheme } from "../Components/ThemeProvider";

export default function DocumentationPage() {
  const { theme } = useTheme();
  const [copiedCode, setCopiedCode] = useState(null);

  // Example code snippets
  const codeSnippets = [
    {
      id: "nodejs",
      title: "Node.js Example",
      code: `
const axios = require('axios');

const transaction = {
  amount: 100,
  card_type: "Visa",
  city: "Dhaka",
  country: "Bangladesh",
  device_browser: "Chrome",
  device_id: "device123",
  device_os: "Windows",
  is_fraud: 0,
  location: "23.8103,90.4125",
  merchant_id: "merchant01",
  payment_method: "Credit Card",
  status: "completed",
  user_id: "user001"
};

axios.post('http://localhost:3001/predict', transaction)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
      `
    },
    {
      id: "python",
      title: "Python Example",
      code: `
import requests
import json

url = 'http://127.0.0.1:8000/predict'
transaction = {
    "amount": 100,
    "card_type": "Visa",
    "city": "Dhaka",
    "country": "Bangladesh",
    "device_browser": "Chrome",
    "device_id": "device123",
    "device_os": "Windows",
    "is_fraud": 0,
    "location": "23.8103,90.4125",
    "merchant_id": "merchant01",
    "payment_method": "Credit Card",
    "status": "completed",
    "user_id": "user001"
}

response = requests.post(url, json=transaction)
print(response.json())
      `
    }
  ];

  const copyToClipboard = (code, id) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    });
  };

  return (
    <div className={`min-h-screen pt-26 pb-16 px-6 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Fraud Detection System Documentation</h1>

        {codeSnippets.map(snippet => (
          <div key={snippet.id} className="relative mb-10">
            <h2 className="text-2xl font-semibold mb-3">{snippet.title}</h2>

            <button
              onClick={() => copyToClipboard(snippet.code, snippet.id)}
              className="absolute top-2 right-2 flex items-center gap-1 bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            >
              {copiedCode === snippet.id ? <CheckIcon className="w-4 h-4 text-green-500" /> : <ClipboardIcon className="w-4 h-4" />}
              {copiedCode === snippet.id ? "Copied" : "Copy"}
            </button>

            <SyntaxHighlighter
              language={snippet.id === "python" ? "python" : "javascript"}
              style={theme === "dark" ? materialDark : materialLight}
              className="rounded-md"
            >
              {snippet.code}
            </SyntaxHighlighter>
          </div>
        ))}
      </div>
    </div>
  );
}





