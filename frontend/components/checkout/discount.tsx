"use client";

import React from "react";
import { Trash } from "lucide-react";
import { toast } from "react-toastify";
import { HttpTypes } from "@medusajs/types";
import { listOrders } from "@/lib/data/orders";
import { convertToLocale } from "@/lib/util/money";
import { retrieveCustomer } from "@/lib/data/customer";
import { applyPromotions, applyPromotionsForBuyNow } from "@/lib/data/cart";

type DiscountCodeProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[];
  };
  isBuyNow?: boolean;
};

const firstOrderDiscountCode = "FITFA15";

const DiscountCode: React.FC<DiscountCodeProps> = ({ cart, isBuyNow }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const { items = [], promotions = [] } = cart;

  const removePromotionCode = async (code: string) => {
    const validPromotions = promotions.filter(
      (promotion) => promotion.code !== code
    );

    if (isBuyNow) {
      await applyPromotionsForBuyNow(
        validPromotions.filter((p) => p.code === undefined).map((p) => p.code!),
        cart.id
      );
    } else {
      await applyPromotions(
        validPromotions.filter((p) => p.code === undefined).map((p) => p.code!)
      );
    }
  };

  const addPromotionCode = async (formData: FormData) => {
    const code = formData.get("code")?.toString().toUpperCase();
    if (!code) {
      return;
    }
    if (code === firstOrderDiscountCode) {
      // validate logged in user
      const customer = await retrieveCustomer();
      if (!customer) {
        return toast.error("Please login to use this discount code");
      } else {
        const ordersData = await listOrders();
        if (ordersData && ordersData.length > 0) {
          return toast.error("You have already placed an order");
        }
      }
    }

    const input = document.getElementById(
      "promotion-input"
    ) as HTMLInputElement;
    const codes = promotions
      .filter((p) => p.code === undefined)
      .map((p) => p.code!);
    codes.push(code.toString());

    isBuyNow
      ? await applyPromotionsForBuyNow(codes, cart.id)
      : await applyPromotions(codes);

    if (input) {
      input.value = "";
    }
  };

  return (
    <div
      className="rounded p-3 discount-code-container"
      style={{ backgroundColor: "#f8f9fa", border: "1px solid #e9ecef" }}
    >
      <div className="text-dark" style={{ color: "#333" }}>
        <form
          //@ts-ignore
          action={(a) => addPromotionCode(a)}
          className="w-100 mb-4"
        >
          <label className="d-flex gap-2 my-2 align-items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="btn btn-link text-primary text-decoration-none p-0 border-0 bg-transparent discount-toggle-btn"
              data-testid="add-discount-button"
            >
              Add Promotion Code(s)
            </button>
          </label>

          {isOpen && (
            <>
              <div className="d-flex w-100 gap-2 discount-input-group">
                <input
                  className="flex-fill p-2 discount-input "
                  style={{
                    textTransform: "uppercase",
                    color: "black",
                  }}
                  id="promotion-input"
                  name="code"
                  type="text"
                  autoFocus={false}
                  data-testid="discount-input"
                />
                <button
                  className="btn btn-dark px-3 discount-apply-btn"
                  data-testid="discount-apply-button"
                >
                  Apply
                </button>
              </div>
            </>
          )}
        </form>

        {promotions.length > 0 && (
          <div className="w-100 d-flex align-items-center">
            <div className="d-flex flex-column w-100">
              <h6
                className="h6 text-dark mb-2 discount-applied-title"
                style={{ color: "#333", fontWeight: "600" }}
              >
                Promotion(s) applied:
              </h6>

              {promotions.map((promotion) => {
                return (
                  <div
                    key={promotion.id}
                    className="d-flex align-items-center justify-content-between w-100 mb-2 p-2 border border-secondary rounded discount-item"
                    data-testid="discount-row"
                    style={{ backgroundColor: "white", borderColor: "#dee2e6" }}
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
                              : "text-dark"
                          }`}
                          style={{
                            color: promotion.is_automatic ? "#28a745" : "#333",
                          }}
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
                        className="btn btn-outline-danger btn-sm d-flex align-items-center discount-remove-btn"
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
