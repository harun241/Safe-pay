"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-32 px-6 md:px-20 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Protect Your Transactions with AI
      </h1>
      <p className="text-lg md:text-2xl mb-8">
        SafePay is an AI-powered fraud detection platform that keeps your online transactions safe in real-time.
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        <Link
          href="/features"
          className="border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-green-600 transition"
        >
          Explore Features
        </Link>
        <Link
          href="/contact"
          className="border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-green-600 transition"
        >
          Contact Us
        </Link>
      </div>
      <p className="mt-8 text-sm md:text-base text-white/80">
        Trusted by thousands of users worldwide.
      </p>
    </section>
  );
}
