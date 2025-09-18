import { convertToLocale } from "@/lib/util/money";
import { HttpTypes } from "@medusajs/types";

type OrderSummaryProps = {
  order: HttpTypes.StoreOrder;
};

const OrderSummary = ({ order }: OrderSummaryProps) => {
  const getAmount = (amount?: number | null) => {
    if (!amount) {
      return;
    }

    return convertToLocale({
      amount,
      currency_code: order.currency_code,
    });
  };

  return (
    <div>
      <h3 className="h5 mb-3">Order Summary</h3>
      <div className="order-summary-item">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span>
            <strong>Subtotal</strong>
          </span>
          <span>
            <strong>{getAmount(order.subtotal)}</strong>
          </span>
        </div>

        {order.discount_total > 0 && (
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span>Discount</span>
            <span className="text-danger">
              - {getAmount(order.discount_total)}
            </span>
          </div>
        )}

        {order.gift_card_total > 0 && (
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span>Gift Card</span>
            <span className="text-danger">
              - {getAmount(order.gift_card_total)}
            </span>
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center mb-1">
          <span>Shipping</span>
          <span>{getAmount(order.shipping_total)}</span>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <span>Taxes</span>
          <span>{getAmount(order.tax_total)}</span>
        </div>

        <hr className="my-3" />

        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Total</h5>
          <h5 className="mb-0 text-primary">{getAmount(order.total)}</h5>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
