"use client";

import PaymentButton from "./payment-btn";
import { useSearchParams } from "next/navigation";

const Review = ({ cart }: { cart: any }) => {
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("step") === "review";
  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0;
  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    (cart.payment_collection || paidByGiftcard);

  return (
    <div className="bg-white mt-4 pb-5">
      <div className="d-flex flex-row align-items-center justify-content-between mb-2">
        <h2 className="d-flex flex-row gap-2 align-items-baseline fs-2 review-title">
          Review
        </h2>
      </div>
      {isOpen && previousStepsCompleted && (
        <>
          <div className="d-flex align-items-start gap-1 w-full mb-2">
            <div className="w-full">
              <h6 className="fw-normal text-muted mb-1 review-text">
                By clicking the Place Order button, you confirm that you have
                read, understand and accept our Terms of Use, Terms of Sale and
                Returns Policy and acknowledge that you have read Medusa
                Store&apos;s Privacy Policy.
              </h6>
            </div>
          </div>

          <PaymentButton cart={cart} data-testid="submit-order-button" />
        </>
      )}
    </div>
  );
};

export default Review;
