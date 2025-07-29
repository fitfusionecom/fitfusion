import { Radio, Radio as RadioGroupOption } from "@headlessui/react";
import { Text, clx } from "@medusajs/ui";
import React, { useContext, useMemo, type JSX } from "react";

// import Radio from "@modules/common/components/radio";

import { isManual } from "@/lib/constants";
// import SkeletonCardDetails from "@modules/skeletons/components/skeleton-card-details";
// import { CardElement } from "@stripe/react-stripe-js";
// import { StripeCardElementOptions } from "@stripe/stripe-js";
import PaymentTest from "./payment-test";
// import { StripeContext } from "../payment-wrapper/stripe-wrapper";

type PaymentContainerProps = {
  paymentProviderId: string;
  selectedPaymentOptionId: string | null;
  disabled?: boolean;
  paymentInfoMap: Record<string, { title: string; icon: JSX.Element }>;
  children?: React.ReactNode;
};

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentProviderId,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
  children,
}) => {
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <RadioGroupOption
      key={paymentProviderId}
      value={paymentProviderId}
      disabled={disabled}
      className={clx(
        "d-flex flex-column gap-2 text-body cursor-pointer py-4 border rounded px-4 mb-2 payment-method-option",
        {
          "border-primary": selectedPaymentOptionId === paymentProviderId,
        }
      )}
    >
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-3">
          {/* <Radio checked={selectedPaymentOptionId === paymentProviderId} /> */}

          <input
            type="radio"
            checked={selectedPaymentOptionId === paymentProviderId}
            readOnly
          />
          <Text className="fw-normal">
            {paymentInfoMap[paymentProviderId]?.title || paymentProviderId}
          </Text>
          {isManual(paymentProviderId) && isDevelopment && (
            <PaymentTest className="d-none d-sm-block" />
          )}
        </div>
        <span className="text-body">
          {paymentInfoMap[paymentProviderId]?.icon}
        </span>
      </div>
      {isManual(paymentProviderId) && isDevelopment && (
        <PaymentTest className="d-sm-none" />
      )}
      {children}
    </RadioGroupOption>
  );
};

export default PaymentContainer;
