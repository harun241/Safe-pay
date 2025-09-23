import React from "react";

const Testimonial = ({ quote, name, role }) => (
  <blockquote className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
    <p className="text-gray-700 leading-relaxed">“{quote}”</p>
    <footer className="mt-6 flex items-center gap-2">
      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
        {name.charAt(0)}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900">{name}</p>
        <p className="text-xs text-gray-500">{role}</p>
      </div>
    </footer>
  </blockquote>
);

export default function Testimonials() {
  return (
    <section className="mb-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Testimonials */}
      <div className="lg:col-span-2 grid gap-6">
        <Testimonial
          quote="SafePay delivered tangible value within 90 days. We gained $100mm in new sales and reduced fraud by 30%."
          name="Senior VP"
          role="Fareportal"
        />
        <Testimonial
          quote="The usability of SafePay is night and day compared to our prior platform."
          name="Fraud Manager"
          role="Global Financial Institution"
        />
      </div>

      {/* CTA Aside */}
      <aside className="p-8 bg-gradient-to-br from-green-500 to-blue-500  text-white rounded-2xl flex flex-col justify-between shadow-lg">
        <div>
          <h4 className="text-2xl font-bold">Get Started Today</h4>
          <p className="mt-3 text-sm text-blue-100 leading-relaxed">
            See how SafePay can help you reduce fraud, stay compliant, and
            protect your bottom line with confidence.
          </p>
        </div>
        <div className="mt-8">
          <a
            href="/contact"
            className="border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-green-600 transition"
          >
            Request a Demo
          </a>
        </div>
      </aside>
    </section>
  );
}
