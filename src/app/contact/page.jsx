"use client";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function ContactPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-green-500 mb-6">
        Contact Us
      </h1>

      <p className="text-gray-700 text-lg mb-2">📧 Email: support@safepay.com</p>
      <p className="text-gray-700 text-lg mb-6">📞 Phone: +880 1234 567890</p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Follow Us</h2>
      <div className="flex justify-center gap-6 mt-2">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition"
        >
          <FaFacebookF size={20} />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white bg-blue-400 p-3 rounded-full hover:bg-blue-500 transition"
        >
          <FaTwitter size={20} />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white bg-blue-700 p-3 rounded-full hover:bg-blue-800 transition"
        >
          <FaLinkedinIn size={20} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white bg-pink-500 p-3 rounded-full hover:bg-pink-600 transition"
        >
          <FaInstagram size={20} />
        </a>
      </div>

      <p className="mt-10 text-gray-500 text-sm">
      
      </p>
    </section>
  );
}
