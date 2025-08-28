import { Metadata } from "next";
import { notFound } from "next/navigation";
import { retrieveCart } from "@/lib/data/cart";
import "@/components/checkout/checkout-sidebar.css";
import { retrieveCustomer } from "@/lib/data/customer";
import DiscountCode from "@/components/checkout/discount";
import CheckoutSummary from "@/components/checkout/summary";
import CheckoutForm from "@/components/checkout/checkout-form";
import { buyNowService } from "@/lib/services/buyNowService";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Checkout page",
};

interface CheckoutProps {
  searchParams: Promise<{
    cartId?: string;
  }>;
}

export default async function Checkout({ searchParams }: CheckoutProps) {
  const { cartId } = await searchParams;
  // if cartId is provided, get the cart from the buyNowService, otherwise get the cart from the retrieveCart function
  const cart = await (cartId
    ? buyNowService.getBuyNowCart(cartId)
    : retrieveCart());

  // if cart is not found, return not found
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
            <CheckoutForm cart={cart} customer={customer} isBuyNow={!!cartId} />
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
