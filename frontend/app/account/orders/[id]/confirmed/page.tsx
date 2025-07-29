"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function OrderConfirmedPage() {
  const params = useParams();
  const orderId = params.id as string;
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        // In a real implementation, you would fetch the specific order
        // For now, we'll simulate loading
        const response = await fetch(`/api/orders/${orderId}`);
        if (response.ok) {
          const orderData = await response.json();
          setOrder(orderData);
        }
      } catch (error) {
        console.error("Error loading order:", error);
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
            <i className="fa fa-check fa-3x text-white"></i>
          </div>
        </div>
        <h1 className="mb-3" style={{ color: "#cd8973", fontWeight: 700 }}>
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
              <h4
                className="mb-4"
                style={{ color: "#cd8973", fontWeight: 700 }}
              >
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
                      <i
                        className="fa fa-envelope fa-lg"
                        style={{ color: "#cd8973" }}
                      ></i>
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
                      <i
                        className="fa fa-cog fa-lg"
                        style={{ color: "#cd8973" }}
                      ></i>
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
                      <i
                        className="fa fa-shipping-fast fa-lg"
                        style={{ color: "#cd8973" }}
                      ></i>
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
                      <i
                        className="fa fa-phone fa-lg"
                        style={{ color: "#cd8973" }}
                      ></i>
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
                  href="/account/orders"
                  className="btn btn-outline-primary"
                  style={{
                    borderColor: "#cd8973",
                    color: "#cd8973",
                    borderRadius: "0.75rem",
                    minWidth: "150px",
                  }}
                >
                  <i className="fa fa-list me-2"></i>
                  View Orders
                </Link>

                <Link
                  href="/shop"
                  className="btn btn-primary"
                  style={{
                    background: "#cd8973",
                    borderColor: "#cd8973",
                    borderRadius: "0.75rem",
                    minWidth: "150px",
                  }}
                >
                  <i className="fa fa-shopping-cart me-2"></i>
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
                  <i className="fa fa-headset me-2"></i>
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
              <h5
                className="mb-3"
                style={{ color: "#cd8973", fontWeight: 700 }}
              >
                Important Information
              </h5>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <i
                      className="fa fa-clock me-2"
                      style={{ color: "#cd8973" }}
                    ></i>
                    <strong>Processing Time</strong>
                  </div>
                  <p className="text-muted small mb-0">
                    Orders are typically processed within 1-2 business days.
                  </p>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <i
                      className="fa fa-truck me-2"
                      style={{ color: "#cd8973" }}
                    ></i>
                    <strong>Shipping</strong>
                  </div>
                  <p className="text-muted small mb-0">
                    Free shipping on orders over ₹500. Standard delivery 3-5
                    days.
                  </p>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <i
                      className="fa fa-undo me-2"
                      style={{ color: "#cd8973" }}
                    ></i>
                    <strong>Returns</strong>
                  </div>
                  <p className="text-muted small mb-0">
                    30-day return policy for most items. Easy returns process.
                  </p>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <i
                      className="fa fa-shield-alt me-2"
                      style={{ color: "#cd8973" }}
                    ></i>
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
