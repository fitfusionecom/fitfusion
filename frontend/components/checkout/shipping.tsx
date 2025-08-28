"use client";

import { RadioGroup, Radio } from "@headlessui/react";
import { setShippingMethod } from "@/lib/data/cart";
import { calculatePriceForShippingOption } from "@/lib/data/fulfillment";
import { convertToLocale } from "@/lib/util/money";
import { CheckCircleSolid, Loader } from "@medusajs/icons";
import { HttpTypes } from "@medusajs/types";
import { Button, Heading, Text, clx } from "@medusajs/ui";
// import ErrorMessage from "@modules/checkout/components/error-message";
// import Divider from "@modules/common/components/divider";
// import MedusaRadio from "@modules/common/components/radio";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "../blocks/spinner";
import { BiEdit } from "react-icons/bi";

type ShippingProps = {
  cart: HttpTypes.StoreCart;
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null;
  isBuyNow?: boolean;
};

const Shipping: React.FC<ShippingProps> = ({
  cart,
  availableShippingMethods,
  isBuyNow,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPrices, setIsLoadingPrices] = useState(true);
  const [calculatedPricesMap, setCalculatedPricesMap] = useState<
    Record<string, number>
  >({});
  const [error, setError] = useState<string | null>(null);
  const [shippingMethodId, setShippingMethodId] = useState<string | null>(
    cart.shipping_methods?.at(-1)?.shipping_option_id || null
  );

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = searchParams.get("step") === "delivery";

  useEffect(() => {
    setIsLoadingPrices(true);

    if (availableShippingMethods?.length) {
      const promises = availableShippingMethods
        .filter((sm) => sm.price_type === "calculated")
        .map((sm) => calculatePriceForShippingOption(sm.id, cart.id));

      if (promises.length) {
        Promise.allSettled(promises).then((res) => {
          const pricesMap: Record<string, number> = {};
          res
            .filter((r) => r.status === "fulfilled")
            .forEach((p) => (pricesMap[p.value?.id || ""] = p.value?.amount!));

          setCalculatedPricesMap(pricesMap);
          setIsLoadingPrices(false);
        });
      }
    }
  }, [availableShippingMethods]);

  const handleEdit = () => {
    router.push(pathname + "?step=delivery", { scroll: false });
  };

  const handleSubmit = () => {
    router.push(pathname + "?step=payment", { scroll: false });
  };

  const handleSetShippingMethod = async (id: string) => {
    setError(null);
    let currentId: string | null = null;
    setIsLoading(true);
    setShippingMethodId((prev) => {
      currentId = prev;
      return id;
    });

    await setShippingMethod({ cartId: cart.id, shippingMethodId: id })
      .catch((err) => {
        setShippingMethodId(currentId);
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setError(null);
  }, [isOpen]);

  return (
    <div className="border rounded overflow-hidden mt-3">
      <div className="d-flex flex-row align-items-center justify-content-between mb-2 bg-black text-white px-3 py-3">
        <h2 className="d-flex flex-row gap-2 align-items-baseline fs-5 mb-0">
          Delivery
          {!isOpen && (cart.shipping_methods?.length ?? 0) > 0 && (
            <CheckCircleSolid />
          )}
        </h2>

        {!isOpen &&
          cart?.shipping_address &&
          cart?.billing_address &&
          cart?.email && (
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
        <div data-testid="delivery-options-container" className="p-3">
          <div>
            <RadioGroup
              value={shippingMethodId}
              onChange={handleSetShippingMethod}
            >
              {availableShippingMethods?.map((option) => {
                const isDisabled =
                  option.price_type === "calculated" &&
                  !isLoadingPrices &&
                  typeof calculatedPricesMap[option.id] !== "number";

                return (
                  <Radio
                    key={option.id}
                    value={option.id}
                    data-testid="delivery-option-radio"
                    disabled={isDisabled}
                    className={clx(
                      "d-flex align-items-center justify-content-between cursor-pointer py-3 border rounded px-4 mb-2 shipping-option",
                      {
                        "border-primary": option.id === shippingMethodId,
                        "cursor-not-allowed": isDisabled,
                      }
                    )}
                  >
                    <div className="d-flex align-items-center gap-3">
                      {/* <MedusaRadio checked={option.id === shippingMethodId} /> */}
                      <div className="custom-checkbox">
                        <input
                          type="radio"
                          checked={option.id === shippingMethodId}
                          disabled={isDisabled}
                        />
                        <label htmlFor={option.id} />
                      </div>
                      <span className="fw-normal shipping-option-name">
                        {option.name}
                      </span>
                    </div>
                    <span className="text-body shipping-option-price">
                      {option.price_type === "flat" ? (
                        convertToLocale({
                          amount: option.amount!,
                          currency_code: cart?.currency_code,
                        })
                      ) : calculatedPricesMap[option.id] ? (
                        convertToLocale({
                          amount: calculatedPricesMap[option.id],
                          currency_code: cart?.currency_code,
                        })
                      ) : isLoadingPrices ? (
                        <Loader />
                      ) : (
                        "-"
                      )}
                    </span>
                  </Radio>
                );
              })}
            </RadioGroup>
          </div>

          {/* <ErrorMessage
            error={error}
            data-testid="delivery-option-error-message"
          /> */}

          <button
            className="mt-4 ayur-btn ayur-btn-primary px-5"
            onClick={handleSubmit}
            disabled={!cart.shipping_methods?.[0]}
            data-testid="submit-delivery-option-button"
          >
            Continue to payment
            {isLoading && <Spinner />}
          </button>
        </div>
      ) : (
        <div>
          <div className="fw-normal p-3 ">
            {cart && (cart.shipping_methods?.length ?? 0) > 0 && (
              <div className="d-flex flex-column w-33">
                <h6
                  style={{
                    color: "black",
                  }}
                  className="fw-bold  mb-2 "
                >
                  Method
                </h6>
                <h6 className="fw-normal text-muted">
                  {cart.shipping_methods?.at(-1)?.name}
                  {" - "}
                  {convertToLocale({
                    amount: cart.shipping_methods.at(-1)?.amount!,
                    currency_code: cart?.currency_code,
                  })}
                </h6>
              </div>
            )}
          </div>
        </div>
      )}
      {/* <Divider className="mt-8" /> */}
    </div>
  );
};

export default Shipping;
