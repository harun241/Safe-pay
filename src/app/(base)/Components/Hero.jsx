// "use client";
// import Link from "next/link";
// import PaymentCardSlider from "./PaymentCardSlider";

// export default function Hero() {
//   return (
//     <section className="bg-gradient-to-r from-green-500 to-blue-500 text-white  md:py-28 px-6 md:px-20 text-center w-11/12 rounded-2xl mx-auto">
//       {/* Title */}
//       <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6">
//         Protect Your Transactions with AI
//       </h1>

//       {/* Sub heading */}
//       <p className="text-lg md:text-xl mb-6 md:mb-8">
//         SafePay is an AI-powered fraud detection platform that keeps your online
//         transactions safe in real-time.
//       </p>

//       {/* CTA buttons */}
//       <div className="flex justify-center gap-4 flex-wrap">
//         <Link
//           href="/features"
//           className="border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-green-600 transition"
//         >
//           Explore Features
//         </Link>
//         <Link
//           href="/contact"
//           className="border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-green-600 transition"
//         >
//           Contact Us
//         </Link>
//       </div>

//       {/* Trusted message */}
//       <p className="mt-6 md:mt-8 text-sm md:text-base text-white/80">
//         Trusted by thousands of users worldwide.
//       </p>

//       {/* Payment Card Slider */}
//       <div className="mt-8 md:mt-12">
//         <PaymentCardSlider />
//       </div>
//     </section>
//   );
// }

"use client";
import Link from "next/link";
import PaymentCardSlider from "./PaymentCardSlider";

export default function Hero() {
  return (
    <section className="relative w-11/12 rounded-2xl mx-auto overflow-hidden text-white text-center md:py-28 px-6 md:px-20">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/banner-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay (dark layer for readability) */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6">
          Protect Your Transactions with AI
        </h1>

        {/* Sub heading */}
        <p className="text-lg md:text-xl mb-6 md:mb-8">
          SafePay is an AI-powered fraud detection platform that keeps your
          online transactions safe in real-time.
        </p>

        {/* CTA buttons */}
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

        {/* Trusted message */}
        <p className="mt-6 md:mt-8 text-sm md:text-base text-white/80">
          Trusted by thousands of users worldwide.
        </p>

        {/* Payment Card Slider */}
        <div className="mt-8 md:mt-12">
          <PaymentCardSlider />
        </div>
      </div>
    </section>
  );
}
