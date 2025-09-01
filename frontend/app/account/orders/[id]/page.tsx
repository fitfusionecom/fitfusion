"use client";

import { retrieveOrder } from "@/lib/data/orders";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import OrderOverview from "@/components/account/order-overview";
import { FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";
// import { retrieveOrder } from "@/lib/data/order";

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const response = await retrieveOrder(orderId).catch(() => null);
        if (response.id) {
          setOrder(response);
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
      <div className="loading-container">
        <div className="spinner-border loading-spinner" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="text-center py-5">
        <div className="empty-state">
          <FaExclamationTriangle size={48} className="empty-state-icon mb-3" />
          <h4 className="empty-state-title mb-3">Order Not Found</h4>
          <p className="empty-state-desc mb-4">
            {error ||
              "The order you're looking for doesn't exist or you don't have permission to view it."}
          </p>
          <Link href="/account/orders" className="btn btn-primary">
            <FaArrowLeft className="me-2" />
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="order-detail-page">
      {JSON.stringify(order)}
      {/* Header */}
      {/* <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="account-header mb-1">Order #{order.display_id}</h2>
            <p className="account-header mb-0">
              Placed on {new Date(order.created_at).toLocaleDateString()}
            </p>
          </div>
          <Link href="/account/orders" className="btn btn-outline">
            <FaArrowLeft className="me-2" />
            Back to Orders
          </Link>
        </div>
      </div>

      <OrderOverview order={order} /> */}
    </div>
  );
}
