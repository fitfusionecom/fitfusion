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
      <div className="row mb-2">
        <div className="col-6">
          <strong>Subtotal</strong>
        </div>
        <div className="col-6 text-end">
          <strong>{getAmount(order.subtotal)}</strong>
        </div>
      </div>

      <div className="row mb-1">
        {order.discount_total > 0 && (
          <>
            <div className="col-6">Discount</div>
            <div className="col-6 text-end text-danger">
              - {getAmount(order.discount_total)}
            </div>
          </>
        )}
      </div>

      <div className="row mb-1">
        {order.gift_card_total > 0 && (
          <>
            <div className="col-6">Gift Card</div>
            <div className="col-6 text-end text-danger">
              - {getAmount(order.gift_card_total)}
            </div>
          </>
        )}
      </div>

      <div className="row mb-1">
        <div className="col-6">Shipping</div>
        <div className="col-6 text-end">{getAmount(order.shipping_total)}</div>
      </div>

      <div className="row mb-3">
        <div className="col-6">Taxes</div>
        <div className="col-6 text-end">{getAmount(order.tax_total)}</div>
      </div>

      <hr className="my-3" />

      <div className="row">
        <div className="col-6">
          <h5 className="mb-0">Total</h5>
        </div>
        <div className="col-6 text-end">
          <h5 className="mb-0 text-primary">{getAmount(order.total)}</h5>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
