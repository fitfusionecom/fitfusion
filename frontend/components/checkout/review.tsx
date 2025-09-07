"use client";

import PaymentButton from "./payment-btn";
import { useSearchParams } from "next/navigation";

const Review = ({ cart, isBuyNow }: { cart: any; isBuyNow?: boolean }) => {
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("step") === "review";
  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0;
  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    (cart.payment_collection || paidByGiftcard);

  return (
    <div className="mt-4 pb-5">
      {isOpen && previousStepsCompleted && (
        <>
          <PaymentButton
            cart={cart}
            data-testid="submit-order-button"
            isBuyNow={isBuyNow}
          />
        </>
      )}
    </div>
  );
};

export default Review;
