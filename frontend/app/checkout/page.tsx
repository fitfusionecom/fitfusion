import { Metadata } from "next";
import { notFound } from "next/navigation";
import { retrieveCart } from "@/lib/data/cart";
import "@/components/checkout/checkout-sidebar.css";
import { retrieveCustomer } from "@/lib/data/customer";
import DiscountCode from "@/components/checkout/discount";
import CheckoutSummary from "@/components/checkout/summary";
import CheckoutForm from "@/components/checkout/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Checkout page",
};

export default async function Checkout() {
  const cart = await retrieveCart();
  if (!cart) {
    return notFound();
  }
  const customer = await retrieveCustomer();
  return (
    <div className="checkout-page">
      {/* Checkout Form */}
      <div className="container mt-2">
        <div className="row g-4 checkout-layout">
          <div className="col-12 col-lg-8 mb-4 mb-lg-0 checkout-form-section">
            <CheckoutForm cart={cart} customer={customer} />
          </div>
          <div className="col-12 col-lg-4 checkout-summary-section">
            <CheckoutSummary cart={cart} />
            <DiscountCode cart={cart} />
          </div>
        </div>
      </div>
    </div>
  );
}
