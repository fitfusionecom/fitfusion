"use client";

import Link from "next/link";
import { FaBox, FaArrowLeft, FaShoppingCart, FaStar } from "react-icons/fa";
import { convertToLocale } from "@/lib/util/money";

interface OrderOverviewProps {
  order: any;
}

export default function OrderOverview({ order }: OrderOverviewProps) {
  const formatCurrency = (amount: number, currency: string = "INR") => {
    // Use convertToLocale like in product pages for consistent formatting
    return convertToLocale({
      amount: amount,
      currency_code: currency,
    });
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
    const statusIcons: { [key: string]: string } = {
      pending: "fa-clock",
      confirmed: "fa-check-circle",
      processing: "fa-cog",
      shipped: "fa-shipping-fast",
      delivered: "fa-check-double",
      cancelled: "fa-times-circle",
      refunded: "fa-undo",
    };
    return statusIcons[status] || "fa-question-circle";
  };

  return (
    <div className="order-overview">
      {/* Order Status */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="account-card">
            <div className="account-card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "60px",
                      height: "60px",
                      background: getStatusColor(order.status),
                    }}
                  >
                    <i
                      className={`fa ${getStatusIcon(
                        order.status
                      )} fa-2x text-white`}
                    ></i>
                  </div>
                  <div>
                    <h5 className="mb-1">Order Status</h5>
                    <span
                      className="badge fs-6"
                      style={{
                        background: getStatusColor(order.status),
                        color: "#fff",
                      }}
                    >
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>
                <div className="text-end">
                  <div className="text-muted">Order Total</div>
                  <div className="h4 mb-0 order-value">
                    {order.status === "cancelled" ||
                    order.status === "canceled" ? (
                      <span className="text-muted">-</span>
                    ) : (
                      formatCurrency(order.total, order.currency_code)
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Order Details */}
        <div className="col-lg-8 mb-4">
          <div className="account-card">
            <div className="card-header bg-transparent border-0 pb-0">
              <h5 className="profile-section-title mb-0">Order Items</h5>
            </div>
            <div className="card-body">
              {order.items && order.items.length > 0 ? (
                <div className="order-items">
                  {order.items.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="d-flex align-items-center py-3 border-bottom"
                    >
                      <div className="flex-shrink-0 me-3">
                        <div
                          className="rounded"
                          style={{
                            width: "60px",
                            height: "60px",
                            background: "#f3f4f6",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <FaBox size={32} className="order-arrow" />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{item.title}</h6>
                        <p className="text-muted mb-0 small">
                          Quantity: {item.quantity} ×{" "}
                          {formatCurrency(item.unit_price, order.currency_code)}
                        </p>
                      </div>
                      <div className="text-end">
                        <div className="fw-semibold">
                          {formatCurrency(
                            item.unit_price * item.quantity,
                            order.currency_code
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <FaBox size={48} className="empty-state-icon mb-3" />
                  <p className="empty-state-desc">No items found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-lg-4 mb-4">
          <div className="account-card">
            <div className="card-header bg-transparent border-0 pb-0">
              <h5 className="profile-section-title mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <div className="order-summary">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>
                    {formatCurrency(
                      order.subtotal || order.total,
                      order.currency_code
                    )}
                  </span>
                </div>
                {order.shipping_total > 0 && (
                  <div className="d-flex justify-content-between mb-2">
                    <span>Shipping</span>
                    <span>
                      {formatCurrency(
                        order.shipping_total,
                        order.currency_code
                      )}
                    </span>
                  </div>
                )}
                {order.tax_total > 0 && (
                  <div className="d-flex justify-content-between mb-2">
                    <span>Tax</span>
                    <span>
                      {formatCurrency(order.tax_total, order.currency_code)}
                    </span>
                  </div>
                )}
                <hr />
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total</span>
                  <span className="order-value">
                    {order.status === "cancelled" ||
                    order.status === "canceled" ? (
                      <span className="text-muted">-</span>
                    ) : (
                      formatCurrency(order.total, order.currency_code)
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          {order.shipping_address && (
            <div className="account-card mt-4">
              <div className="card-header bg-transparent border-0 pb-0">
                <h5 className="profile-section-title mb-0">Shipping Address</h5>
              </div>
              <div className="card-body">
                <div className="shipping-address">
                  <p className="mb-1 fw-semibold">
                    {order.shipping_address.address_1}
                  </p>
                  {order.shipping_address.address_2 && (
                    <p className="mb-1">{order.shipping_address.address_2}</p>
                  )}
                  <p className="mb-1">
                    {order.shipping_address.city},{" "}
                    {order.shipping_address.postal_code}
                  </p>
                  <p className="mb-0 text-muted">
                    {order.shipping_address.country_code?.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Billing Address */}
          {order.billing_address && (
            <div className="account-card mt-4">
              <div className="card-header bg-transparent border-0 pb-0">
                <h5 className="profile-section-title mb-0">Billing Address</h5>
              </div>
              <div className="card-body">
                <div className="billing-address">
                  <p className="mb-1 fw-semibold">
                    {order.billing_address.address_1}
                  </p>
                  {order.billing_address.address_2 && (
                    <p className="mb-1">{order.billing_address.address_2}</p>
                  )}
                  <p className="mb-1">
                    {order.billing_address.city},{" "}
                    {order.billing_address.postal_code}
                  </p>
                  <p className="mb-0 text-muted">
                    {order.billing_address.country_code?.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="row">
        <div className="col-12">
          <div className="account-card">
            <div className="account-card-body">
              <div className="d-flex gap-2 flex-wrap">
                <Link href="/account/orders" className="btn btn-outline">
                  <FaArrowLeft className="me-2" />
                  Back to Orders
                </Link>
                <Link href="/shop" className="btn btn-primary">
                  <FaShoppingCart className="me-2" />
                  Continue Shopping
                </Link>
                {order.status === "delivered" && (
                  <button className="btn btn-outline">
                    <FaStar className="me-2" />
                    Write Review
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
