"use client";

import { XMark } from "@medusajs/icons";
import { HttpTypes } from "@medusajs/types";
import Items from "./order-item";
import OrderDetails from "./order-details";
import OrderSummary from "./order-summary";
import ShippingDetails from "./shipping-details";
import React from "react";
import Link from "next/link";

type OrderDetailsTemplateProps = {
  order: HttpTypes.StoreOrder;
};

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="h2 mb-0">Order details</h1>
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
      <div className="row" data-testid="order-details-container">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <OrderDetails order={order} showStatus />
              <hr className="my-4" />
              <Items order={order} />
              <hr className="my-4" />
              <ShippingDetails order={order} />
              <hr className="my-4" />
              <OrderSummary order={order} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsTemplate;
