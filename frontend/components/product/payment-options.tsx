import Image from "next/image";

export default function PaymentOptions() {
  return (
    <>
      <p className="fs-6 fw-bold" style={{ color: "black" }}>
        Guaranteed Safe Checkout
      </p>

      <div
        className="d-flex flex-nowrap gap-2 mb-3"
        style={{
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {[
          { name: "Visa", src: "/assets/images/footer/visa.webp" },
          {
            name: "Paytm",
            src: "/assets/images/footer/paytm.avif",
          },
          {
            name: "PhonePe",
            src: "/assets/images/footer/phone-pe.webp",
          },
          {
            name: "UPI",
            src: "/assets/images/footer/upi-icon.webp",
          },
          {
            name: "Net Banking",
            src: "/assets/images/footer/net_banking.webp",
          },
        ].map((payment, index) => (
          <div
            key={index}
            className="d-flex align-items-center justify-content-center"
            style={{
              width: "80px",
              height: "52px",
            }}
            title={payment.name}
          >
            <Image
              src={payment.src}
              alt={payment.name}
              width={70}
              height={40}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
}
