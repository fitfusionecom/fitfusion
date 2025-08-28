"use client";

import React, { useActionState } from "react";
// import { Badge, Heading, Input, Label, Text, Tooltip } from "@medusajs/ui"; //
import { applyPromotions, submitPromotionForm } from "@/lib/data/cart";
import { convertToLocale } from "@/lib/util/money";
import { InformationCircleSolid } from "@medusajs/icons";
import { HttpTypes } from "@medusajs/types";
import { Trash } from "lucide-react";

type DiscountCodeProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[];
  };
};

const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const { items = [], promotions = [] } = cart;
  const removePromotionCode = async (code: string) => {
    const validPromotions = promotions.filter(
      (promotion) => promotion.code !== code
    );

    await applyPromotions(
      validPromotions.filter((p) => p.code === undefined).map((p) => p.code!)
    );
  };

  const addPromotionCode = async (formData: FormData) => {
    const code = formData.get("code");
    if (!code) {
      return;
    }
    const input = document.getElementById(
      "promotion-input"
    ) as HTMLInputElement;
    const codes = promotions
      .filter((p) => p.code === undefined)
      .map((p) => p.code!);
    codes.push(code.toString());

    await applyPromotions(codes);

    if (input) {
      input.value = "";
    }
  };

  const [message, formAction] = useActionState(submitPromotionForm, null);

  return (
    <div className="rounded p-3">
      <div className="text-dark">
        <form action={(a) => addPromotionCode(a)} className="w-100 mb-4">
          <label className="d-flex gap-2 my-2 align-items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="btn btn-link text-dark text-decoration-none p-0 border-0 bg-transparent"
              data-testid="add-discount-button"
            >
              Add Promotion Code(s)
            </button>

            {/* <Tooltip content="You can add multiple promotion codes">
              <InformationCircleSolid color="var(--fg-muted)" />
            </Tooltip> */}
          </label>

          {isOpen && (
            <>
              <div className="d-flex w-100 gap-2">
                <input
                  className="flex-fill p-2"
                  style={{
                    background: "whitesmoke",
                  }}
                  id="promotion-input"
                  name="code"
                  type="text"
                  autoFocus={false}
                  data-testid="discount-input"
                />
                <button
                  className="btn btn-dark px-3"
                  data-testid="discount-apply-button"
                >
                  Apply
                </button>
              </div>

              {message && <p>{JSON.stringify(message)}</p>}
            </>
          )}
        </form>

        {promotions.length > 0 && (
          <div className="w-100 d-flex align-items-center">
            <div className="d-flex flex-column w-100">
              <h6 className="h6 text-dark mb-2">Promotion(s) applied:</h6>

              {promotions.map((promotion) => {
                return (
                  <div
                    key={promotion.id}
                    className="d-flex align-items-center justify-content-between w-100 mb-2 p-2 border border-secondary rounded"
                    data-testid="discount-row"
                  >
                    <p className="d-flex gap-1 align-items-baseline w-75 pr-2">
                      <span
                        className="text-truncate"
                        data-testid="discount-code"
                      >
                        <b
                          className={`${
                            promotion.is_automatic
                              ? "text-success"
                              : "text-muted"
                          }`}
                        >
                          {promotion.code}
                        </b>{" "}
                        (
                        {promotion.application_method?.value !== undefined &&
                          promotion.application_method.currency_code !==
                            undefined && (
                            <>
                              {promotion.application_method.type ===
                              "percentage"
                                ? `${promotion.application_method.value}%`
                                : convertToLocale({
                                    //@ts-ignore
                                    amount: promotion.application_method.value,
                                    currency_code:
                                      promotion.application_method
                                        .currency_code,
                                  })}
                            </>
                          )}
                        )
                        {/* {promotion.is_automatic && (
                          <Tooltip content="This promotion is automatically applied">
                            <InformationCircleSolid className="inline text-zinc-400" />
                          </Tooltip>
                        )} */}
                      </span>
                    </p>
                    {!promotion.is_automatic && (
                      <button
                        className="btn btn-outline-danger btn-sm d-flex align-items-center"
                        onClick={() => {
                          if (!promotion.code) {
                            return;
                          }

                          removePromotionCode(promotion.code);
                        }}
                        data-testid="remove-discount-button"
                      >
                        <Trash size={14} />
                        <span className="sr-only">
                          Remove discount code from order
                        </span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscountCode;
