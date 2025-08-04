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
    <Link
      href={`/account/orders/${order.id}`}
      style={{ textDecoration: "none" }}
    >
      <div
        className="card shadow-sm"
        style={{ borderRadius: "1rem", border: "none" }}
      >
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-3">
              <small className="text-muted d-block">Order Date</small>
              <span className="fw-semibold">
                {new Date(order.created_at).toLocaleDateString()}
              </span>
            </div>
            <div className="col-md-3">
              <small className="text-muted d-block">Order Number</small>
              <span className="fw-semibold">#{order.display_id}</span>
            </div>
            <div className="col-md-2">
              <small className="text-muted d-block">Total Amount</small>
              <span className="fw-semibold">
                {formatCurrency(order.total, order.currency_code)}
              </span>
            </div>
            <div className="col-md-2">
              <small className="text-muted d-block">Status</small>
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
              <FaChevronRight style={{ color: "#cd8973" }} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
