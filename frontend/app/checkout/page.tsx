import { Metadata } from "next";
import { notFound } from "next/navigation";
import { retrieveCart } from "@/lib/data/cart";
import { retrieveCustomer } from "@/lib/data/customer";
import CheckoutForm from "@/components/checkout/checkout-form";
import CheckoutSummary from "@/components/checkout/summary";

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
      {/* Breadcrumb */}
      <div className="ayur-bread-section">
        <div className="ayur-breadcrumb-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="ayur-bread-content">
                  <h2>Checkout</h2>
                  <div className="ayur-bread-list">
                    <span>
                      <a href="index.html">Home</a>
                    </span>
                    <span className="ayur-active-page">Checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Checkout Form */}
      <div className="container mt-5">
        <div className="row g-4">
          <div className="col-12 col-lg-8 mb-4 mb-lg-0">
            <CheckoutForm cart={cart} customer={customer} />
          </div>
          <div className="col-12 col-lg-4">
            <CheckoutSummary cart={cart} />
          </div>
        </div>
      </div>
    </div>
  );
}
