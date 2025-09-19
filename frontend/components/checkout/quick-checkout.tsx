"use client";

const debug = false;

import { HttpTypes } from "@medusajs/types";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { setShippingMethod } from "@/lib/data/cart";
import { initiatePaymentSession } from "@/lib/data/cart";
import ButtonSpinner from "../blocks/button-spinner";
import { CheckCircleSolid } from "@medusajs/icons";
import { BiEdit } from "react-icons/bi";

interface QuickCheckoutProps {
  isBuyNow?: boolean;
  cart: HttpTypes.StoreCart;
  availablePaymentMethods: any[];
  availableShippingMethods: HttpTypes.StoreCartShippingOption[];
}

const paymentMethodMapForShippingMethod = {
  // prepaid
  so_01K5DTTKJBPJFB7VARRWM6XS6H: "pp_razorpay_my-custom-payment",
  //   cod
  so_01K4HM35WWKXST70X573GZ71NX: "pp_system_default",
};

const defaultPaymentMethodId = "pp_razorpay_my-custom-payment";
const defaultShippingMethodId = "so_01K4HM35WWKXST70X573GZ71NX";

const step = "delivery";

const QuickCheckout = ({
  cart,
  isBuyNow,
  availableShippingMethods,
  availablePaymentMethods,
}: QuickCheckoutProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isOpen = searchParams.get("step") === "delivery";

  const isAddressDetailsFilled =
    cart?.shipping_address && cart?.billing_address && cart?.email;

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [shippingMethodId, setShippingMethodId] = useState<string | null>(
    cart.shipping_methods?.at(-1)?.shipping_option_id || null
  );

  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === "pending"
  );

  const [paymentMethodId, setPaymentMethodId] = useState<string | null>(
    activeSession?.provider_id ?? defaultPaymentMethodId
  );

  // helper function to create query string
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleSetShippingMethod = async (shippingMethodId: string) => {
    console.log("handleSetShippingMethod", shippingMethodId);
    setError(null);
    let currentShippingMethodId: string | null = null;

    setIsLoading(true);
    setShippingMethodId((prev) => {
      currentShippingMethodId = prev;
      return shippingMethodId;
    });

    await setShippingMethod({
      cartId: cart.id,
      shippingMethodId: shippingMethodId,
    })
      .then(() => {
        handleSetPaymentMethod(
          paymentMethodMapForShippingMethod[shippingMethodId]
        );
      })
      .catch((err) => {
        setShippingMethodId(currentShippingMethodId);
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSetPaymentMethod = async (paymentMethodId: string) => {
    console.log("handleSetPaymentMethod", paymentMethodId);
    setError(null);
    let currentPaymentMethodId: string | null = null;
    setIsLoading(true);
    setPaymentMethodId((prev) => {
      currentPaymentMethodId = prev;
      return paymentMethodId;
    });

    await initiatePaymentSession(cart, {
      provider_id: paymentMethodId,
    })
      .catch((err) => {
        setPaymentMethodId(currentPaymentMethodId);
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });

    router.push(pathname + "?" + createQueryString("step", "review"), {
      scroll: false,
    });
  };

  const handleEdit = () => {
    if (isBuyNow) {
      router.push(pathname + "?cartId=" + cart?.id + "&step=" + step);
    } else {
      router.push(pathname + "?step=" + step);
    }
  };

  if (!isAddressDetailsFilled) {
    return null;
  }

  return (
    <div>
      <div className="border rounded overflow-hidden">
        <div className="d-flex flex-row align-items-center justify-content-between mb-2 bg-black text-white px-3 py-3">
          <h2 className="d-flex flex-row gap-2 align-items-baseline fs-5 mb-0">
            Delivery Options
            {!isOpen && <CheckCircleSolid />}
          </h2>

          {!isOpen && cart?.shipping_address && (
            <button
              onClick={handleEdit}
              className="edit-address-btn"
              data-testid="edit-address-button"
            >
              <BiEdit /> Edit
            </button>
          )}
        </div>
        {isOpen ? (
          <div className="p-3">
            <div className="shipping-methods-container">
              {availableShippingMethods.map((shippingMethod) => (
                <button
                  className={`shipping-method-btn ${
                    shippingMethodId === shippingMethod.id ? "selected" : ""
                  } ${isLoading ? "loading" : ""}`}
                  disabled={isLoading}
                  onClick={() => setShippingMethodId(shippingMethod.id)}
                  key={shippingMethod.id}
                >
                  <div className="shipping-method-content">
                    <span className="shipping-method-name">
                      {shippingMethod.name}
                    </span>

                    {isLoading && <ButtonSpinner />}
                  </div>
                </button>
              ))}
            </div>

            <div>
              <button
                disabled={isLoading}
                data-testid="submit-address-button"
                className="ayur-btn ayur-btn-primary px-5"
                onClick={() => handleSetShippingMethod(shippingMethodId)}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="fs-6 p-3">
              <div className="row align-items-start g-4">
                <div
                  className="col-md-4 col-12"
                  data-testid="shipping-address-summary"
                >
                  <h6 className="fw-bold mb-2 address-label">
                    Shipping Option
                  </h6>
                  <h6 className="text-secondary fw-normal mb-1 address-text">
                    {cart.shipping_methods.at(-1)?.name}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickCheckout;
