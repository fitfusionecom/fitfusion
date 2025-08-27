"use client";

import { useEffect, useState } from "react";
import { listOrders } from "@/lib/data/orders";
import OrderCard from "@/components/account/order-card";
import { FaShoppingBag } from "react-icons/fa";

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
      <div className="loading-container">
        <div className="spinner-border loading-spinner" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      {/* Header */}
      <div className="mb-4">
        <h2 className="account-header mb-2">Orders</h2>
        <p className="account-header">View and track your order history.</p>
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
          <div className="empty-state">
            <FaShoppingBag size={48} className="empty-state-icon mb-3" />
            <h5 className="empty-state-title">No orders found</h5>
            <p className="empty-state-desc">
              Start shopping to see your orders here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
