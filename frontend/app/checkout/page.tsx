import { Metadata } from "next";
import { notFound } from "next/navigation";
import { retrieveCart } from "@/lib/data/cart";
import { retrieveCustomer } from "@/lib/data/customer";
import CheckoutForm from "@/components/checkout/checkout-form";
import CheckoutSummary from "@/components/checkout/summary";
import DiscountCode from "@/components/checkout/discount";
``;
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
    <div>
      {/* Checkout Form */}
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-lg-8 mb-4 mb-lg-0">
            <CheckoutForm cart={cart} customer={customer} />
          </div>
          <div className="col-12 col-lg-4">
            <CheckoutSummary cart={cart} />
            <DiscountCode cart={cart} />
          </div>
        </div>
      </div>
    </div>
  );
}
