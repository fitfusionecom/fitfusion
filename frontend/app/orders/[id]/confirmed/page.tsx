"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useOrder } from "@/hooks/useOrders";
import { convertToLocale } from "@/lib/util/money";
import Image from "next/image";
import { getProxiedImageUrl } from "@/lib/utils/image-proxy";
import {
  FaCheck,
  FaEnvelope,
  FaCog,
  FaShippingFast,
  FaPhone,
  FaList,
  FaShoppingCart,
  FaHeadset,
  FaClock,
  FaTruck,
  FaUndo,
  FaShieldAlt,
} from "react-icons/fa";

export default function OrderConfirmedPage() {
  const params = useParams();
  const orderId = params.id as string;
  const { order, isLoading, error } = useOrder(orderId);

  const getAmount = (amount?: number | null) => {
    if (!amount || !order) {
      return;
    }
    return convertToLocale({
      amount,
      currency_code: order.currency_code,
    });
  };

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

  if (error) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "40vh" }}
      >
        <h5 className="text-danger mb-3">Failed to load order</h5>
        <p className="text-muted">
          {error?.message || "Something went wrong while loading your order."}
        </p>
      </div>
    );
  }

  return (
    <div className="order-confirmed-page">
      {/* Success Header */}
      <div className="text-center mb-5">
        <div className="mb-4">
          <div
            className="rounded-circle d-inline-flex align-items-center justify-content-center"
            style={{
              width: "100px",
              height: "100px",
              background: "#28a745",
            }}
          >
            <FaCheck size={48} className="text-white" />
          </div>
        </div>
        <h1 className="mb-3" style={{ color: "black", fontWeight: 700 }}>
          Order Confirmed!
        </h1>
        <p className="text-muted fs-5">
          Thank you for your order. We've received your payment and your order
          is being processed.
        </p>
        {order && (
          <div className="mt-3">
            <span
              className="badge fs-6 px-3 py-2"
              style={{ background: "#cd8973" }}
            >
              Order #{order.display_id}
            </span>
          </div>
        )}
      </div>

      {/* Order Details Card */}
      <div className="row justify-content-center mb-5">
        <div className="col-lg-8">
          <div
            className="card shadow-sm"
            style={{ borderRadius: "1rem", border: "none" }}
          >
            <div className="card-body p-4">
              <h4 className="mb-4" style={{ color: "black", fontWeight: 700 }}>
                What's Next?
              </h4>

              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="d-flex align-items-start">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                      style={{
                        width: "50px",
                        height: "50px",
                        background: "#f6f1ed",
                      }}
                    >
                      <FaEnvelope size={20} style={{ color: "black" }} />
                    </div>
                    <div>
                      <h6 className="mb-2">Confirmation Email</h6>
                      <p className="text-muted small mb-0">
                        You'll receive a confirmation email with your order
                        details shortly.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="d-flex align-items-start">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                      style={{
                        width: "50px",
                        height: "50px",
                        background: "#f6f1ed",
                      }}
                    >
                      <FaCog size={20} style={{ color: "black" }} />
                    </div>
                    <div>
                      <h6 className="mb-2">Order Processing</h6>
                      <p className="text-muted small mb-0">
                        We'll start processing your order and prepare it for
                        shipping.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="d-flex align-items-start">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                      style={{
                        width: "50px",
                        height: "50px",
                        background: "#f6f1ed",
                      }}
                    >
                      <FaShippingFast size={20} style={{ color: "black" }} />
                    </div>
                    <div>
                      <h6 className="mb-2">Shipping Updates</h6>
                      <p className="text-muted small mb-0">
                        You'll get tracking information once your order ships.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="d-flex align-items-start">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                      style={{
                        width: "50px",
                        height: "50px",
                        background: "#f6f1ed",
                      }}
                    >
                      <FaPhone size={20} style={{ color: "black" }} />
                    </div>
                    <div>
                      <h6 className="mb-2">Need Help?</h6>
                      <p className="text-muted small mb-0">
                        Contact our customer support if you have any questions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Products */}
      {order && order.items && order.items.length > 0 && (
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8">
            <div
              className="card shadow-sm"
              style={{ borderRadius: "1rem", border: "none" }}
            >
              <div className="card-body p-4">
                <h4
                  className="mb-4"
                  style={{ color: "black", fontWeight: 700 }}
                >
                  Order Items
                </h4>
                <div className="row">
                  {order.items.map((item: any, index: number) => {
                    const productImage =
                      item.thumbnail ||
                      item.variant?.product?.images?.[0]?.url ||
                      null;
                    const productTitle = item.product_title || "Product";
                    const productDescription =
                      item.variant?.product?.subtitle || "";
                    const sku = item.variant?.sku || "N/A";
                    const quantity = item.quantity || 1;

                    return (
                      <div key={item.id || index} className="col-12 mb-4">
                        <div
                          className="d-flex gap-3 p-3"
                          style={{
                            background: "#f9f9f9",
                            borderRadius: "0.75rem",
                          }}
                        >
                          {/* Product Image */}
                          <div
                            className="flex-shrink-0 position-relative"
                            style={{
                              width: "100px",
                              height: "100px",
                              minWidth: "100px",
                            }}
                          >
                            {productImage ? (
                              <Image
                                src={getProxiedImageUrl(productImage)}
                                alt={productTitle}
                                fill
                                className="rounded"
                                style={{
                                  objectFit: "cover",
                                }}
                                sizes="100px"
                              />
                            ) : (
                              <div className="d-flex align-items-center justify-content-center bg-light rounded position-absolute top-0 start-0 w-100 h-100">
                                <FaShoppingCart
                                  size={24}
                                  className="text-muted"
                                />
                              </div>
                            )}
                          </div>

                          {/* Product Details */}
                          <div className="flex-grow-1">
                            <h6
                              id={`product-title-${index}`}
                              className="mb-2"
                              style={{ color: "black", fontWeight: 600 }}
                            >
                              {productTitle}
                            </h6>
                            {productDescription && (
                              <p
                                id={`product-subtitle-${index}`}
                                className="text-muted small mb-2"
                                style={{
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {productDescription}
                              </p>
                            )}
                            <div className="d-flex flex-wrap gap-3 align-items-center">
                              <span
                                id={`product-sku-${index}`}
                                className="text-muted small sku-text"
                              >
                                <strong>SKU:</strong> {sku}
                              </span>
                              <span className="text-muted small">
                                <strong>Qty:</strong> {quantity}
                              </span>
                              {item.unit_price && (
                                <span className="text-muted small">
                                  <strong>Price:</strong>{" "}
                                  {getAmount(item.unit_price)}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Item Total */}
                          {item.total && (
                            <div className="flex-shrink-0 text-end">
                              <div
                                className="h6 mb-0"
                                style={{ color: "black", fontWeight: 600 }}
                              >
                                {getAmount(item.total)}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Order Total */}
                <div className="mt-4 pt-4 border-top">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted">Subtotal</span>
                        <span className="text-muted">
                          {getAmount(order.subtotal)}
                        </span>
                      </div>
                      {order.discount_total > 0 && (
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="text-muted">Discount</span>
                          <span className="text-danger">
                            - {getAmount(order.discount_total)}
                          </span>
                        </div>
                      )}
                      {order.shipping_total > 0 && (
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="text-muted">Shipping</span>
                          <span className="text-muted">
                            {getAmount(order.shipping_total)}
                          </span>
                        </div>
                      )}
                      {order.tax_total > 0 && (
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="text-muted">Taxes</span>
                          <span className="text-muted">
                            {getAmount(order.tax_total)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <hr className="my-3" />
                  <div className="d-flex justify-content-between align-items-center">
                    <h5
                      className="mb-0"
                      style={{ color: "black", fontWeight: 700 }}
                    >
                      Total
                    </h5>
                    <h5
                      id="order-total-price"
                      className="mb-0"
                      style={{ color: "#cd8973", fontWeight: 700 }}
                    >
                      {getAmount(order.total)}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div
            className="card shadow-sm"
            style={{ borderRadius: "1rem", border: "none" }}
          >
            <div className="card-body p-4">
              <div className="d-flex gap-3 flex-wrap justify-content-center">
                <Link
                  href="/shop"
                  className="btn btn-primary"
                  style={{
                    background: "black",
                    borderColor: "black",
                    borderRadius: "0.75rem",
                    minWidth: "150px",
                  }}
                >
                  <FaShoppingCart className="me-2" />
                  Continue Shopping
                </Link>

                <Link
                  href="/contact"
                  className="btn btn-outline-secondary"
                  style={{
                    borderRadius: "0.75rem",
                    minWidth: "150px",
                  }}
                >
                  <FaHeadset className="me-2" />
                  Get Help
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="row justify-content-center mt-5">
        <div className="col-lg-8">
          <div
            className="card shadow-sm"
            style={{ borderRadius: "1rem", border: "none" }}
          >
            <div className="card-body p-4">
              <h5 className="mb-3" style={{ color: "black", fontWeight: 700 }}>
                Important Information
              </h5>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <FaClock className="me-2" style={{ color: "black" }} />
                    <strong>Processing Time</strong>
                  </div>
                  <p className="text-muted small mb-0">
                    Orders are typically processed within 1-2 business days.
                  </p>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <FaTruck className="me-2" style={{ color: "black" }} />
                    <strong>Shipping</strong>
                  </div>
                  <p className="text-muted small mb-0">
                    Free shipping on orders over ₹500. Standard delivery 3-5
                    days.
                  </p>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <FaUndo className="me-2" style={{ color: "black" }} />
                    <strong>Returns</strong>
                  </div>
                  <p className="text-muted small mb-0">
                    30-day return policy for most items. Easy returns process.
                  </p>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <FaShieldAlt className="me-2" style={{ color: "black" }} />
                    <strong>Secure Payment</strong>
                  </div>
                  <p className="text-muted small mb-0">
                    Your payment information is secure and encrypted.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
