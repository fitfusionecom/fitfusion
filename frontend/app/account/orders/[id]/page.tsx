"use client";

import { retrieveOrder } from "@/lib/data/orders";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  FaExclamationTriangle,
  FaArrowLeft,
  FaBox,
  FaShoppingCart,
  FaStar,
  FaTruck,
  FaCreditCard,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaReceipt,
  FaDownload,
  FaPrint,
  FaRedo,
  FaCheckCircle,
  FaClock,
  FaCog,
  FaShippingFast,
  FaTimesCircle,
  FaUndo,
} from "react-icons/fa";

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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

  const getStatusIcon = (status: string) => {
    const statusIcons: { [key: string]: any } = {
      pending: FaClock,
      confirmed: FaCheckCircle,
      processing: FaCog,
      shipped: FaShippingFast,
      delivered: FaCheckCircle,
      cancelled: FaTimesCircle,
      refunded: FaUndo,
    };
    return statusIcons[status] || FaClock;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const response = await retrieveOrder(orderId).catch(() => null);
        if (response?.id) {
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
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <div className="text-center">
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="card border-0 shadow-sm">
              <div className="card-body py-5">
                <FaExclamationTriangle
                  size={64}
                  className="text-warning mb-4"
                />
                <h4 className="card-title mb-3">Order Not Found</h4>
                <p className="card-text text-muted mb-4">
                  {error ||
                    "The order you're looking for doesn't exist or you don't have permission to view it."}
                </p>
                <Link href="/account/orders" className="btn btn-primary">
                  <FaArrowLeft className="me-2" />
                  Back to Orders
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const StatusIcon = getStatusIcon(order.status);

  return (
    <div className="container-fluid py-4" style={{ maxWidth: "1200px" }}>
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
            <div>
              <h1
                className="h2 mb-1"
                style={{ fontWeight: "600", fontSize: "1.75rem" }}
              >
                Order #{order.display_id || order.id}
              </h1>
              <div className="d-flex align-items-center gap-2 mb-2">
                <span
                  className="badge px-3 py-1"
                  style={{
                    backgroundColor: "#fef3c7",
                    color: "#92400e",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    borderRadius: "6px",
                    textTransform: "capitalize",
                  }}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-muted mb-0" style={{ fontSize: "0.875rem" }}>
                {formatDate(order.created_at)} Order Placed
              </p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-outline-secondary d-flex align-items-center"
                style={{
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  padding: "8px 16px",
                  fontSize: "0.875rem",
                }}
              >
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Main Content */}
        <div className="col-lg-8">
          {/* Order Items Card */}
          <div className="mb-4">
            <div
              className="bg-white border rounded"
              style={{ borderRadius: "8px" }}
            >
              <div className="p-4 border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                  <h3 className="h5 mb-0" style={{ fontWeight: "600" }}>
                    Order Item
                  </h3>
                </div>
              </div>

              <div className="p-4">
                {order.items && order.items.length > 0 ? (
                  <div>
                    {order.items.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="d-flex align-items-center mb-3"
                      >
                        <div className="me-3">
                          <div
                            className="rounded d-flex align-items-center justify-content-center"
                            style={{
                              width: "80px",
                              height: "80px",
                              backgroundColor: "#f8fafc",
                              border: "1px solid #e2e8f0",
                            }}
                          >
                            {item.thumbnail ? (
                              <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="img-fluid rounded"
                                style={{
                                  maxWidth: "100%",
                                  maxHeight: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              <FaBox size={32} className="text-muted" />
                            )}
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center mb-1">
                            <h6 className="mb-0 fw-bold">{item.title}</h6>
                          </div>
                          <div className="d-flex align-items-center gap-2 mb-2">
                            {item.variant?.title && (
                              <span
                                className="badge bg-light text-dark"
                                style={{ fontSize: "0.75rem" }}
                              >
                                {item.variant.title}
                              </span>
                            )}
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <span className="fw-bold">
                              {item.quantity} x{" "}
                              {formatCurrency(
                                item.unit_price,
                                order.currency_code
                              )}{" "}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <FaBox size={48} className="text-muted mb-3" />
                    <p className="text-muted">No items found</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="mb-4">
            <div
              className="bg-white border rounded"
              style={{ borderRadius: "8px" }}
            >
              <div className="p-4 border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                  <h3 className="h5 mb-0" style={{ fontWeight: "600" }}>
                    Order Summary
                  </h3>
                </div>
              </div>

              <div className="p-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Subtotal</span>
                  <div className="text-end">
                    <div className="small text-muted">
                      {order.items?.length || 0} item
                    </div>
                    <div className="fw-medium">
                      {formatCurrency(
                        order.subtotal || order.total,
                        order.currency_code
                      )}
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Discount</span>
                  <div className="text-end">
                    <div className="small text-muted">New customer</div>
                    <div className="fw-medium text-success">
                      -{formatCurrency(100, order.currency_code)}
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Shipping</span>
                  <div className="text-end">
                    <div className="small text-muted">
                      Free shipping (0.0 lb)
                    </div>
                    <div className="fw-medium">
                      {formatCurrency(0, order.currency_code)}
                    </div>
                  </div>
                </div>

                <hr className="my-3" />

                <div className="d-flex justify-content-between mb-3">
                  <span className="fw-bold">Total</span>
                  <span className="fw-bold">
                    {formatCurrency(order.total - 100, order.currency_code)}
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Paid by customer</span>
                  <span className="fw-medium">
                    {formatCurrency(0, order.currency_code)}
                  </span>
                </div>

                <p className="text-muted mb-3" style={{ fontSize: "0.875rem" }}>
                  Review your order at a glance on the Order Summary page.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-lg-4">
          {/* Customers Card */}
          {/* Shipping Address Card */}
          {order.shipping_address && (
            <div className="mb-4">
              <div
                className="bg-white border rounded"
                style={{ borderRadius: "8px" }}
              >
                <div className="p-4 border-bottom">
                  <div className="d-flex justify-content-between align-items-center">
                    <h3 className="h5 mb-0" style={{ fontWeight: "600" }}>
                      Shipping address
                    </h3>
                  </div>
                </div>
                <div className="p-4">
                  <div className="d-flex align-items-center mb-2">
                    <FaMapMarkerAlt
                      className="me-2"
                      style={{ fontSize: "0.875rem", color: "#6b7280" }}
                    />
                    <span
                      className="fw-medium"
                      style={{ fontSize: "0.875rem" }}
                    >
                      {order.shipping_address.first_name}{" "}
                      {order.shipping_address.last_name}
                    </span>
                  </div>
                  <div
                    className="text-muted mb-1"
                    style={{ fontSize: "0.875rem" }}
                  >
                    {order.shipping_address.address_1}
                  </div>
                  {order.shipping_address.address_2 && (
                    <div
                      className="text-muted mb-1"
                      style={{ fontSize: "0.875rem" }}
                    >
                      {order.shipping_address.address_2}
                    </div>
                  )}
                  <div
                    className="text-muted mb-1"
                    style={{ fontSize: "0.875rem" }}
                  >
                    {order.shipping_address.city}{" "}
                    {order.shipping_address.postal_code}
                  </div>
                  <div
                    className="text-muted mb-1"
                    style={{ fontSize: "0.875rem" }}
                  >
                    {order.shipping_address.country_code?.toUpperCase()}
                  </div>
                  {order.shipping_address.phone && (
                    <div
                      className="text-muted mb-2"
                      style={{ fontSize: "0.875rem" }}
                    >
                      {order.shipping_address.phone}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Billing Address Card */}
          <div className="mb-4">
            <div
              className="bg-white border rounded"
              style={{ borderRadius: "8px" }}
            >
              <div className="p-4 border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                  <h3 className="h5 mb-0" style={{ fontWeight: "600" }}>
                    Billing address
                  </h3>
                </div>
              </div>
              <div className="p-4">
                <div className="text-muted" style={{ fontSize: "0.875rem" }}>
                  Same as shipping address
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
