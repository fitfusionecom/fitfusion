"use client";

import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

interface OrderCardProps {
  order: any;
}

export default function OrderCard({ order }: OrderCardProps) {
  const formatCurrency = (amount: number, currency: string = "INR") => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
    }).format(amount / 100);
  };

  const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      pending: "#ffc107",
      confirmed: "#17a2b8",
      processing: "#007bff",
      shipped: "#28a745",
      delivered: "#28a745",
      cancelled: "#dc3545",
      refunded: "#6c757d",
    };
    return statusColors[status] || "#6c757d";
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <Link href={`/account/orders/${order.id}`} className="order-card">
      <div className="order-card-body">
        {/* Desktop Layout */}
        <div className="d-none d-md-flex row align-items-center">
          <div className="col-md-3">
            <small className="order-label d-block">Order Date</small>
            <span className="order-value">
              {new Date(order.created_at).toLocaleDateString()}
            </span>
          </div>
          <div className="col-md-3">
            <small className="order-label d-block">Order Number</small>
            <span className="order-value">#{order.display_id}</span>
          </div>
          <div className="col-md-2">
            <small className="order-label d-block">Total Amount</small>
            <span className="order-value">
              {formatCurrency(order.total, order.currency_code)}
            </span>
          </div>
          <div className="col-md-2">
            <small className="order-label d-block">Status</small>
            <span
              className="badge"
              style={{
                background: getStatusColor(order.status),
                color: "#fff",
                fontSize: "0.75rem",
              }}
            >
              {getStatusText(order.status)}
            </span>
          </div>
          <div className="col-md-2 text-end">
            <FaChevronRight className="order-arrow" />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="d-md-none">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <small className="order-label d-block">
                Order #{order.display_id}
              </small>
              <span className="order-value">
                {formatCurrency(order.total, order.currency_code)}
              </span>
            </div>
            <div className="text-end">
              <span
                className="badge"
                style={{
                  background: getStatusColor(order.status),
                  color: "#fff",
                  fontSize: "0.7rem",
                }}
              >
                {getStatusText(order.status)}
              </span>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <small className="order-label">
              {new Date(order.created_at).toLocaleDateString()}
            </small>
            <FaChevronRight className="order-arrow" />
          </div>
        </div>
      </div>
    </Link>
  );
}
