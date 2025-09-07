"use client";

import { Button } from "@medusajs/ui";
import React, { useState } from "react";
import { placeOrder } from "@/lib/data/cart";
import { HttpTypes } from "@medusajs/types";
import { isManual, isRazorpay } from "@/lib/constants";
import { RazorpayPaymentButton } from "./razorpay-btn";

type PaymentButtonProps = {
  cart: HttpTypes.StoreCart;
  isBuyNow?: boolean;
  "data-testid": string;
};

const PaymentButton: React.FC<PaymentButtonProps> = ({
  cart,
  isBuyNow,
  "data-testid": dataTestId,
}) => {
  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.email ||
    (cart.shipping_methods?.length ?? 0) < 1;

  const paymentSession = cart.payment_collection?.payment_sessions?.[0];

  switch (true) {
    case isManual(paymentSession?.provider_id):
      return (
        <ManualTestPaymentButton notReady={notReady} data-testid={dataTestId} />
      );
    case isRazorpay(paymentSession?.provider_id):
      return (
        <RazorpayPaymentButton
          session={paymentSession as any}
          notReady={notReady}
          cart={cart}
          isBuyNow={isBuyNow}
        />
      );
    default:
      return <Button disabled>Select a payment method</Button>;
  }
};

const ManualTestPaymentButton = ({ notReady }: { notReady: boolean }) => {
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handlePayment = () => {
    setSubmitting(true);

    onPaymentCompleted();
  };

  return (
    <>
      <Button
        disabled={notReady}
        isLoading={submitting}
        onClick={handlePayment}
        size="large"
        className="ayur-btn ayur-btn-primary"
        data-testid="submit-order-button"
      >
        Place order
      </Button>
      {errorMessage && (
        <div className="text-red-500 text-small-regular mt-2">
          {errorMessage}
        </div>
      )}
    </>
  );
};

export default PaymentButton;
