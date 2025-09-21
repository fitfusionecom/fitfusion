"use client";

import { XMark } from "@medusajs/icons";
import { HttpTypes } from "@medusajs/types";
import Items from "./order-item";
import OrderDetails from "./order-details";
import OrderSummary from "./order-summary";
import ShippingDetails from "./shipping-details";
import React from "react";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";

type OrderDetailsTemplateProps = {
  order: HttpTypes.StoreOrder;
};

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  const canCancelOrder = (order: any) => {
    return (
      order.status === "pending" ||
      order.status === "confirmed" ||
      order.status === "processing"
    );
  };

  return (
    <div className="order-details-container">
      <div className="order-header mb-3">
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
          <h1 className="h2 mb-0">Order details</h1>
          <div className="d-flex align-items-center gap-2">
            {canCancelOrder(order) && (
              <Link
                href={`/account/orders/${order.id}/cancel`}
                className="btn btn-outline-danger d-flex align-items-center gap-2"
                title="Cancel Order"
              >
                <FaTimes /> Cancel Order
              </Link>
            )}
            <Link
              href="/account/orders"
              className="btn btn-outline-secondary d-flex align-items-center gap-2"
              data-testid="back-to-overview-button"
            >
              <XMark /> Back to overview
            </Link>
          </div>
        </div>
      </div>
      <div className="order-content" data-testid="order-details-container">
        <div className="order-card">
          <div className="order-card-body">
            <OrderDetails order={order} showStatus />
            <hr className="my-3" />
            <Items order={order} />
            <hr className="my-3" />
            <ShippingDetails order={order} />
            <hr className="my-3" />
            <OrderSummary order={order} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsTemplate;
