"use client";

import { convertToLocale } from "@/lib/util/money";
import React from "react";

type CartTotalsProps = {
  totals: {
    total?: number | null;
    subtotal?: number | null;
    tax_total?: number | null;
    shipping_total?: number | null;
    discount_total?: number | null;
    gift_card_total?: number | null;
    currency_code: string;
    shipping_subtotal?: number | null;
  };
};

const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
  const {
    currency_code,
    total,
    subtotal,
    tax_total,
    discount_total,
    gift_card_total,
    shipping_subtotal,
  } = totals;

  return (
    <div className="cart-totals-container">
      <table className="table table-bordere cart-totals-table">
        <tbody>
          {!!shipping_subtotal && (
            <tr className="ayur-cartsubtotal">
              <th className="cart-total-label">Shipping</th>
              <td className="cart-total-value">
                <span
                  data-testid="cart-shipping"
                  data-value={shipping_subtotal || 0}
                >
                  {convertToLocale({
                    amount: shipping_subtotal ?? 0,
                    currency_code,
                  })}
                </span>
              </td>
            </tr>
          )}
          {!!tax_total && (
            <tr className="ayur-cartsubtotal">
              <th className="cart-total-label">Taxes</th>
              <td className="cart-total-value">
                <span data-testid="cart-taxes" data-value={tax_total || 0}>
                  {convertToLocale({ amount: tax_total ?? 0, currency_code })}
                </span>
              </td>
            </tr>
          )}
          {!!gift_card_total && (
            <tr className="ayur-cartsubtotal">
              <th className="cart-total-label">Gift card</th>
              <td className="cart-total-value">
                <span
                  className="text-ui-fg-interactive"
                  data-testid="cart-gift-card-amount"
                  data-value={gift_card_total || 0}
                >
                  -{" "}
                  {convertToLocale({
                    amount: gift_card_total ?? 0,
                    currency_code,
                  })}
                </span>
              </td>
            </tr>
          )}

          <tr className="ayur-cartsubtotal">
            <th className="cart-total-label">Subtotal</th>
            <td className="cart-total-value">
              <span data-testid="cart-subtotal" data-value={subtotal || 0}>
                {convertToLocale({ amount: subtotal ?? 0, currency_code })}
              </span>
            </td>
          </tr>
          {!!discount_total && (
            <tr className="ayur-cartsubtotal">
              <th className="cart-total-label">Discount</th>
              <td className="cart-total-value">
                <span
                  className="text-ui-fg-interactive"
                  data-testid="cart-discount"
                  data-value={discount_total || 0}
                >
                  -{" "}
                  {convertToLocale({
                    amount: discount_total ?? 0,
                    currency_code,
                  })}
                </span>
              </td>
            </tr>
          )}

          <tr className="ayur-ordertotal">
            <th className="cart-total-label cart-total-final">Total</th>
            <td className="cart-total-value cart-total-final">
              <span data-testid="cart-total" data-value={total || 0}>
                {convertToLocale({ amount: total ?? 0, currency_code })}
              </span>
              <p className="cart-total-note">(Price Inclusive Of Tax)</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CartTotals;
export { CartTotals };
