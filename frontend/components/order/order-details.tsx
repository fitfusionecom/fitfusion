import { HttpTypes } from "@medusajs/types";

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder;
  showStatus?: boolean;
};

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
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
              {order.status}
              {/* TODO: Check where the statuses should come from */}
              {/* {formatStatus(order.fulfillment_status)} */}
            </span>
          </div>
          <div>
            <strong>Payment status:</strong>{" "}
            <span className="text-muted" data-testid="order-payment-status">
              {order.payment_status}
            </span>
          </div>
        </div>
      )}

      {/* Show cancellation details if order is cancelled */}
      {order.status === "canceled" && order.metadata && (
        <div className="mt-3 p-3 bg-light border rounded">
          <h6 className="text-danger mb-2">
            <i className="fas fa-times-circle me-2"></i>
            Order Cancelled
          </h6>
          <div className="row">
            {order.metadata.cancellation_reason && (
              <div className="col-md-6 mb-2">
                <strong>Reason:</strong>{" "}
                <span className="text-muted">
                  {/* @ts-ignore */}
                  {order?.metadata?.cancellation_reason}
                </span>
              </div>
            )}
            {order.metadata.cancelled_at && (
              <div className="col-md-6 mb-2">
                <strong>Cancelled on:</strong>{" "}
                <span className="text-muted">
                  {/* @ts-ignore */}
                  {new Date(order?.metadata?.cancelled_at).toLocaleString()}
                </span>
              </div>
            )}
            {order.metadata.cancelled_by && (
              <div className="col-md-6 mb-2">
                <strong>Cancelled by:</strong>{" "}
                <span className="text-muted">
                  {/* @ts-ignore */}
                  {order?.metadata?.cancelled_by}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
