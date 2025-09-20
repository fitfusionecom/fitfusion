"use client";

import { useEffect, useState } from "react";
import { retrieveCustomer } from "@/lib/data/customer";
import { listOrders } from "@/lib/data/orders";
import Link from "next/link";
import {
  FaUserCircle,
  FaMapMarkerAlt,
  FaShoppingBag,
  FaChevronRight,
  FaUser,
  FaShoppingCart,
} from "react-icons/fa";

export default function AccountOverview() {
  const [customer, setCustomer] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const customerData = await retrieveCustomer();
        const ordersData = await listOrders();
        setCustomer(customerData);
        setOrders(ordersData || []);
      } catch (error) {
        console.error("Error loading account data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
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

  const getProfileCompletion = (customer: any) => {
    let count = 0;
    if (!customer) return 0;

    if (customer.email) count++;
    if (customer.first_name && customer.last_name) count++;
    if (customer.phone) count++;

    const billingAddress = customer.addresses?.find(
      (addr: any) => addr.is_default_billing
    );
    if (billingAddress) count++;

    return Math.round((count / 4) * 100);
  };

  const formatCurrency = (amount: number, currency: string = "INR") => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
    }).format(amount / 100);
  };

  return (
    <div className="account-overview">
      {/* Header */}
      <div className="d-none d-md-block mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="account-header">
            <h2 className="mb-1">Hello {customer?.first_name || "User"}</h2>
            <p className="mb-0">
              Signed in as:{" "}
              <span className="fw-semibold">
                {customer?.phone || customer?.email}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {/* <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="stats-card">
            <div className="stats-card-body">
              <div className="mb-3">
                <FaUserCircle size={48} className="stats-icon" />
              </div>
              <h3 className="stats-number mb-2">
                {getProfileCompletion(customer)}%
              </h3>
              <p className="stats-label">Profile Completed</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="stats-card">
            <div className="stats-card-body">
              <div className="mb-3">
                <FaMapMarkerAlt size={48} className="stats-icon" />
              </div>
              <h3 className="stats-number mb-2">
                {customer?.addresses?.length || 0}
              </h3>
              <p className="stats-label">Saved Addresses</p>
            </div>
          </div>
        </div>
      </div> */}

      {/* Recent Orders */}
      <div className="mb-4">
        <div className="section-header">
          <h4 className="mb-0">Recent Orders</h4>
          <FaShoppingBag className="icon" />
        </div>

        {orders && orders.length > 0 ? (
          <div className="row">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="col-12 mb-3">
                <Link
                  href={`/account/orders/${order.id}`}
                  className="order-card"
                >
                  <div className="order-card-body">
                    <div className="row align-items-center">
                      <div className="col-md-3">
                        <small className="order-label d-block">
                          Date placed
                        </small>
                        <span className="order-value">
                          {new Date(order.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="col-md-3">
                        <small className="order-label d-block">
                          Order number
                        </small>
                        <span className="order-value">#{order.display_id}</span>
                      </div>
                      <div className="col-md-3">
                        <small className="order-label d-block">
                          Total amount
                        </small>
                        <span className="order-value">
                          {formatCurrency(order.total, order.currency_code)}
                        </span>
                      </div>
                      <div className="col-md-3 text-end">
                        <FaChevronRight className="order-arrow" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <FaShoppingBag size={48} className="empty-state-icon mb-3" />
            <h5 className="empty-state-title">No recent orders</h5>
            <p className="empty-state-desc">
              Start shopping to see your orders here
            </p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="row">
        <div className="col-12">
          <h4 className="section-header mb-3">Quick Actions</h4>
          <div className="row">
            <div className="col-md-4 mb-3">
              <Link href="/account/profile" className="quick-action-card">
                <div className="quick-action-card-body">
                  <FaUser size={32} className="quick-action-icon" />
                  <h6 className="quick-action-title">Update Profile</h6>
                  <p className="quick-action-desc">
                    Edit your personal information
                  </p>
                </div>
              </Link>
            </div>
            <div className="col-md-4 mb-3">
              <Link href="/account/addresses" className="quick-action-card">
                <div className="quick-action-card-body">
                  <FaMapMarkerAlt size={32} className="quick-action-icon" />
                  <h6 className="quick-action-title">Manage Addresses</h6>
                  <p className="quick-action-desc">
                    Add or edit your addresses
                  </p>
                </div>
              </Link>
            </div>
            <div className="col-md-4 mb-3">
              <Link href="/shop" className="quick-action-card">
                <div className="quick-action-card-body">
                  <FaShoppingCart size={32} className="quick-action-icon" />
                  <h6 className="quick-action-title">Start Shopping</h6>
                  <p className="quick-action-desc">Browse our products</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
