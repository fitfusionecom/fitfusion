import { HttpTypes } from "@medusajs/types";
import { Text } from "@medusajs/ui";

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder;
  showStatus?: boolean;
};

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ");

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1);
  };

  return (
    <div>
      <p className="mb-2">
        <strong>Order date:</strong>{" "}
        <span data-testid="order-date" className="text-muted">
          {new Date(order.created_at).toDateString()}
        </span>
      </p>
      <p className="mb-2">
        <strong>Order number:</strong>{" "}
        <span data-testid="order-id" className="text-primary">
          {order.display_id}
        </span>
      </p>

      {showStatus && (
        <div className="d-flex flex-wrap gap-3 mt-3">
          <div>
            <strong>Order status:</strong>{" "}
            <span className="text-muted" data-testid="order-status">
              {/* TODO: Check where the statuses should come from */}
              {/* {formatStatus(order.fulfillment_status)} */}
            </span>
          </div>
          <div>
            <strong>Payment status:</strong>{" "}
            <span className="text-muted" data-testid="order-payment-status">
              {/* {formatStatus(order.payment_status)} */}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
