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
    <div className="account-overview mt-5">
      {/* Header */}
      <div className="d-none d-md-block mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="mb-1" style={{ color: "#cd8973", fontWeight: 700 }}>
              Hello {customer?.first_name || "User"}
            </h2>
            <p className="text-muted mb-0">
              Signed in as:{" "}
              <span className="fw-semibold">
                {customer?.phone || customer?.email}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div
            className="card h-100 shadow-sm"
            style={{ borderRadius: "1rem", border: "none" }}
          >
            <div className="card-body text-center">
              <div className="mb-3">
                <FaUserCircle size={48} color="#cd8973" />
              </div>
              <h3
                className="mb-2"
                style={{ color: "#cd8973", fontWeight: 700 }}
              >
                {getProfileCompletion(customer)}%
              </h3>
              <p className="text-muted mb-0">Profile Completed</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div
            className="card h-100 shadow-sm"
            style={{ borderRadius: "1rem", border: "none" }}
          >
            <div className="card-body text-center">
              <div className="mb-3">
                <FaMapMarkerAlt size={48} color="#cd8973" />
              </div>
              <h3
                className="mb-2"
                style={{ color: "#cd8973", fontWeight: 700 }}
              >
                {customer?.addresses?.length || 0}
              </h3>
              <p className="text-muted mb-0">Saved Addresses</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mb-4">
        <div className="d-flex align-items-center gap-2 mb-3">
          <h4 className="mb-0" style={{ color: "#cd8973", fontWeight: 700 }}>
            Recent Orders
          </h4>
          <FaShoppingBag color="#cd8973" />
        </div>

        {orders && orders.length > 0 ? (
          <div className="row">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="col-12 mb-3">
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
                          <small className="text-muted d-block">
                            Date placed
                          </small>
                          <span className="fw-semibold">
                            {new Date(order.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="col-md-3">
                          <small className="text-muted d-block">
                            Order number
                          </small>
                          <span className="fw-semibold">
                            #{order.display_id}
                          </span>
                        </div>
                        <div className="col-md-3">
                          <small className="text-muted d-block">
                            Total amount
                          </small>
                          <span className="fw-semibold">
                            {formatCurrency(order.total, order.currency_code)}
                          </span>
                        </div>
                        <div className="col-md-3 text-end">
                          <FaChevronRight color="#cd8973" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="card shadow-sm"
            style={{ borderRadius: "1rem", border: "none" }}
          >
            <div className="card-body text-center py-5">
              <FaShoppingBag size={48} className="mb-3" color="#ccc" />
              <h5 className="text-muted">No recent orders</h5>
              <p className="text-muted mb-0">
                Start shopping to see your orders here
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="row">
        <div className="col-12">
          <h4 className="mb-3" style={{ color: "#cd8973", fontWeight: 700 }}>
            Quick Actions
          </h4>
          <div className="row">
            <div className="col-md-4 mb-3">
              <Link href="/account/profile" className="text-decoration-none">
                <div
                  className="card shadow-sm h-100"
                  style={{ borderRadius: "1rem", border: "none" }}
                >
                  <div className="card-body text-center">
                    <FaUser size={32} className="mb-3" color="#cd8973" />
                    <h6 className="mb-2">Update Profile</h6>
                    <p className="text-muted small mb-0">
                      Edit your personal information
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-4 mb-3">
              <Link href="/account/addresses" className="text-decoration-none">
                <div
                  className="card shadow-sm h-100"
                  style={{ borderRadius: "1rem", border: "none" }}
                >
                  <div className="card-body text-center">
                    <FaMapMarkerAlt
                      size={32}
                      className="mb-3"
                      color="#cd8973"
                    />
                    <h6 className="mb-2">Manage Addresses</h6>
                    <p className="text-muted small mb-0">
                      Add or edit your addresses
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-4 mb-3">
              <Link href="/shop" className="text-decoration-none">
                <div
                  className="card shadow-sm h-100"
                  style={{ borderRadius: "1rem", border: "none" }}
                >
                  <div className="card-body text-center">
                    <FaShoppingCart
                      size={32}
                      className="mb-3"
                      color="#cd8973"
                    />
                    <h6 className="mb-2">Start Shopping</h6>
                    <p className="text-muted small mb-0">Browse our products</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
