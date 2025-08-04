"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import OrderOverview from "@/components/account/order-overview";
import { FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrder = async () => {
      try {
        // In a real implementation, you would fetch the specific order
        // For now, we'll simulate loading
        const response = await fetch(`/api/orders/${orderId}`);
        if (response.ok) {
          const orderData = await response.json();
          setOrder(orderData);
        } else {
          setError("Order not found");
        }
      } catch (error) {
        console.error("Error loading order:", error);
        setError("Failed to load order details");
      } finally {
        setIsLoading(false);
      }
    };

    if (orderId) {
      loadOrder();
    }
  }, [orderId]);

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "40vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="text-center py-5">
        <div
          className="card shadow-sm"
          style={{ borderRadius: "1rem", border: "none" }}
        >
          <div className="card-body py-5">
            <FaExclamationTriangle
              size={48}
              className="mb-3"
              style={{ color: "#cd8973" }}
            />
            <h4 className="text-muted mb-3">Order Not Found</h4>
            <p className="text-muted mb-4">
              {error ||
                "The order you're looking for doesn't exist or you don't have permission to view it."}
            </p>
            <Link
              href="/account/orders"
              className="btn btn-primary"
              style={{
                background: "#cd8973",
                borderColor: "#cd8973",
                borderRadius: "0.75rem",
              }}
            >
              <FaArrowLeft className="me-2" />
              Back to Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-detail-page">
      {/* Header */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="mb-1" style={{ color: "#cd8973", fontWeight: 700 }}>
              Order #{order.display_id}
            </h2>
            <p className="text-muted mb-0">
              Placed on {new Date(order.created_at).toLocaleDateString()}
            </p>
          </div>
          <Link
            href="/account/orders"
            className="btn btn-outline-primary"
            style={{
              borderColor: "#cd8973",
              color: "#cd8973",
              borderRadius: "0.75rem",
            }}
          >
            <FaArrowLeft className="me-2" />
            Back to Orders
          </Link>
        </div>
      </div>

      {/* Order Overview Component */}
      <OrderOverview order={order} />
    </div>
  );
}
