"use client";

import { useEffect, useState } from "react";
import { listOrders } from "@/lib/data/orders";
import OrderCard from "@/components/account/order-card";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const ordersData = await listOrders();
        setOrders(ordersData || []);
      } catch (error) {
        console.error("Error loading orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

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

  return (
    <div className="orders-page">
      {/* Header */}
      <div className="mb-4">
        <h2 className="mb-2" style={{ color: "#cd8973", fontWeight: 700 }}>
          Orders
        </h2>
        <p className="text-muted">View and track your order history.</p>
      </div>

      {/* Orders List */}
      <div className="orders-list">
        {orders && orders.length > 0 ? (
          <div className="row">
            {orders.map((order) => (
              <div key={order.id} className="col-12 mb-3">
                <OrderCard order={order} />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="card shadow-sm"
            style={{ borderRadius: "1rem", border: "none" }}
          >
            <div className="card-body text-center py-5">
              <i
                className="fa fa-shopping-bag fa-3x mb-3"
                style={{ color: "#ccc" }}
              ></i>
              <h5 className="text-muted">No orders found</h5>
              <p className="text-muted mb-0">
                Start shopping to see your orders here
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
