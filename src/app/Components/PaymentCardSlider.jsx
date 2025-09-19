"use client";

export default function PaymentCardSlider() {
  const cards = [
    { id: 1, img: "/images/mastercard.png" },
    { id: 2, img: "/images/visa.png" },
    { id: 3, img: "/images/paypal.png" },
    { id: 4, img: "/images/unionpay.png" },
    { id: 5, img: "/images/amex.png" },
    { id: 6, img: "/images/discover.png" },
    { id: 7, img: "/images/applepay.png" },
    { id: 8, img: "/images/googlepay.png" },
    { id: 9, img: "/images/skrill.png" },
    { id: 10, img: "/images/neteller.png" },
    { id: 11, img: "/images/stripe.png" },
    { id: 12, img: "/images/shopify.png" },
    { id: 13, img: "/images/payoneer.png" },
    { id: 14, img: "/images/alipay.png" },
    { id: 15, img: "/images/wechatpay.png" },
  ];

  return (
    <div className="overflow-hidden w-full py-6">
      <div className="flex w-max animate-scroll">
        {[...cards, ...cards].map((card, index) => (
          <div
            key={index}
            className="mx-6 flex items-center justify-center w-32 h-16 bg-white object-cover  rounded-xl shadow-md"
          >
            <img src={card.img} alt="card" className="h-12 object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}
