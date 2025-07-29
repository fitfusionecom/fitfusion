"use client";

import CartTotals from "./cart-total";
import { HttpTypes } from "@medusajs/types";
import Link from "next/link";

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[];
  };
};

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address";
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery";
  } else {
    return "payment";
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart);
  return (
    <div className="ayur-carttotal-wrapper">
      <div className="ayur-cart-total">
        <h2>Cart Totals</h2>
        <CartTotals totals={cart} />
        <div className="ayur-checkout-btn">
          <Link href={"/checkout?step=" + step} className="ayur-btn">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Summary;
