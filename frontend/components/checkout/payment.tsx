"use client";

import { RadioGroup } from "@headlessui/react";
import { isStripe as isStripeFunc, paymentInfoMap } from "@/lib/constants";
import { initiatePaymentSession } from "@/lib/data/cart";
import { CheckCircleSolid, CreditCard } from "@medusajs/icons";
import { Container } from "@medusajs/ui";
// import ErrorMessage from "@modules/checkout/components/error-message";
import PaymentContainer from "./payment-container";
// import Divider from "@modules/common/components/divider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Spinner from "../blocks/spinner";
import { BiEdit } from "react-icons/bi";

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: any;
  availablePaymentMethods: any[];
}) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === "pending"
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardBrand, setCardBrand] = useState<string | null>(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? "pp_razorpay_my-custom-payment"
  );

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = searchParams.get("step") === "payment";

  const isStripe = isStripeFunc(selectedPaymentMethod);

  const setPaymentMethod = async (method: string) => {
    setError(null);
    setSelectedPaymentMethod(method);
    if (isStripeFunc(method)) {
      await initiatePaymentSession(cart, {
        provider_id: method,
      });
    }
  };

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0;

  const paymentReady =
    (activeSession && cart?.shipping_methods.length !== 0) || paidByGiftcard;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const shouldInputCard =
        isStripeFunc(selectedPaymentMethod) && !activeSession;

      // const checkActiveSession =
      //   activeSession?.provider_id === selectedPaymentMethod

      // if (!checkActiveSession) {
      //   await initiatePaymentSession(cart, {
      //     provider_id: selectedPaymentMethod,
      //   })
      // }

      if (!activeSession) {
        await initiatePaymentSession(cart, {
          provider_id: selectedPaymentMethod,
        });
      }

      if (!shouldInputCard) {
        return router.push(
          pathname + "?" + createQueryString("step", "review"),
          {
            scroll: false,
          }
        );
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setError(null);
  }, [isOpen]);

  return (
    <div className="bg-white mt-4">
      <div className="d-flex flex-row align-items-center justify-content-between mb-4">
        <h2 className="d-flex flex-row gap-2 align-items-baseline fs-2">
          Payment
          {!isOpen && paymentReady && <CheckCircleSolid />}
        </h2>
        {!isOpen && paymentReady && (
          <button
            onClick={handleEdit}
            style={{
              padding: "5px 20px",
              background: "whitesmoke",
              border: "none",
              borderRadius: "10px",
              minWidth: "90px",
            }}
            data-testid="edit-address-button"
          >
            <BiEdit /> Edit
          </button>
        )}
      </div>
      <div>
        <div className={isOpen ? "" : "d-none"}>
          {!paidByGiftcard && availablePaymentMethods?.length && (
            <>
              <RadioGroup
                value={selectedPaymentMethod}
                onChange={(value: string) => setPaymentMethod(value)}
              >
                {availablePaymentMethods.map((paymentMethod) => (
                  <div key={paymentMethod.id}>
                    <PaymentContainer
                      paymentInfoMap={paymentInfoMap}
                      paymentProviderId={paymentMethod.id}
                      selectedPaymentOptionId={selectedPaymentMethod}
                    />
                  </div>
                ))}
              </RadioGroup>
            </>
          )}

          {paidByGiftcard && (
            <div className="d-flex flex-column" style={{ width: "33%" }}>
              <h5
                style={{
                  color: "black",
                }}
                className="fw-bold  mb-2 "
              >
                Payment method
              </h5>
              <h6
                className="fw-normal text-secondary"
                data-testid="payment-method-summary"
              >
                Gift card
              </h6>
            </div>
          )}

          {/* <ErrorMessage
            error={error}
            data-testid="payment-method-error-message"
          /> */}

          <button
            className="mt-4 ayur-btn ayur-btn-primary px-5"
            onClick={handleSubmit}
            disabled={
              (isStripe && !cardComplete) ||
              (!selectedPaymentMethod && !paidByGiftcard)
            }
            data-testid="submit-payment-button"
          >
            {!activeSession && isStripeFunc(selectedPaymentMethod)
              ? " Enter card details"
              : "Continue to review"}
            {isLoading && <Spinner />}
          </button>
        </div>

        <div className={isOpen ? "d-none" : ""}>
          {cart && paymentReady && activeSession ? (
            <div className="d-flex align-items-start gap-1 w-100">
              <div className="d-flex flex-column" style={{ width: "33%" }}>
                <h5
                  style={{
                    color: "black",
                  }}
                  className="fw-bold  mb-2 "
                >
                  Payment method
                </h5>
                <h6
                  className="fw-normal text-secondary"
                  data-testid="payment-method-summary"
                >
                  {paymentInfoMap[activeSession?.provider_id]?.title ||
                    activeSession?.provider_id}
                </h6>
              </div>
              <div className="d-flex flex-column" style={{ width: "33%" }}>
                <h5
                  style={{
                    color: "black",
                  }}
                  className="fw-bold  mb-2 "
                >
                  Payment details
                </h5>
                <div
                  className="d-flex gap-2 fw-normal text-secondary align-items-center"
                  data-testid="payment-details-summary"
                >
                  <Container
                    className="d-flex align-items-center"
                    style={{
                      height: "28px",
                      width: "fit-content",
                      padding: "8px",
                      background: "#f3f4f6",
                    }}
                  >
                    {paymentInfoMap[selectedPaymentMethod]?.icon || (
                      <CreditCard />
                    )}
                  </Container>
                  <h6>
                    {isStripeFunc(selectedPaymentMethod) && cardBrand
                      ? cardBrand
                      : "Another step will appear"}
                  </h6>
                </div>
              </div>
            </div>
          ) : paidByGiftcard ? (
            <div className="d-flex flex-column" style={{ width: "33%" }}>
              <h5
                style={{
                  color: "black",
                }}
                className="fw-bold  mb-2 "
              >
                Payment method
              </h5>
              <h6
                className="fw-normal text-secondary"
                data-testid="payment-method-summary"
              >
                Gift card
              </h6>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Payment;
