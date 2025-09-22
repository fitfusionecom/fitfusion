"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ordersService } from "@/lib/services/ordersService";
import Link from "next/link";
import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";

interface CancelOrderPageProps {
  params: Promise<{ id: string }>;
}

const CANCELLATION_REASONS = [
  "Changed my mind",
  "Found a better price elsewhere",
  "Product no longer needed",
  "Shipping address error",
  "Payment issue",
  "Duplicate order",
  "Other",
];

export default function CancelOrderPage({ params }: CancelOrderPageProps) {
  const router = useRouter();
  const [orderId, setOrderId] = useState<string>("");
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getOrderId = async () => {
      const resolvedParams = await params;
      setOrderId(resolvedParams.id);
    };
    getOrderId();
  }, [params]);

  const handleCancel = async () => {
    if (!selectedReason && !customReason) {
      setError("Please select a cancellation reason");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const reason = selectedReason === "Other" ? customReason : selectedReason;

      await ordersService.cancelOrder(orderId, reason, "customer");

      // Clear any cached data
      if (typeof window !== "undefined") {
        localStorage.removeItem("_medusa_cache_id");
        Object.keys(localStorage).forEach((key) => {
          if (key.includes("order") || key.includes("medusa")) {
            localStorage.removeItem(key);
          }
        });
      }

      // Redirect to order details page
      router.push(`/account/orders/${orderId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to cancel order");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            {/* Header */}
            <div className="mb-4">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 me-3">
                  <div
                    className="bg-danger bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "48px", height: "48px" }}
                  >
                    <FaExclamationTriangle className="text-danger" size={20} />
                  </div>
                </div>
                <div>
                  <h1 className="h2 mb-1 text-dark">Cancel Order</h1>
                  <p className="text-muted mb-0">Order #{orderId}</p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="card shadow-sm">
              {/* Warning Section */}
              <div className="alert alert-danger border-start border-danger border-4 mb-0">
                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <FaExclamationTriangle className="text-danger" />
                  </div>
                  <div className="ms-3">
                    <h5 className="alert-heading mb-2">Important Notice</h5>
                    <p className="mb-0">
                      Cancelling this order will immediately stop processing and
                      shipping. This action cannot be undone. If you have any
                      concerns, please contact our support team before
                      proceeding.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Section */}
              <div className="card-body">
                <div className="mb-4">
                  {/* Reason Selection */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Why are you cancelling this order?{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <select
                      value={selectedReason}
                      onChange={(e) => setSelectedReason(e.target.value)}
                      className="form-select"
                      disabled={isSubmitting}
                    >
                      <option value="">Select a reason</option>
                      {CANCELLATION_REASONS.map((reason) => (
                        <option key={reason} value={reason}>
                          {reason}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Custom Reason */}
                  {selectedReason === "Other" && (
                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        Please provide more details
                      </label>
                      <textarea
                        value={customReason}
                        onChange={(e) => setCustomReason(e.target.value)}
                        placeholder="Please explain why you're cancelling this order..."
                        rows={4}
                        className="form-control"
                        disabled={isSubmitting}
                      />
                    </div>
                  )}

                  {/* Error Message */}
                  {error && (
                    <div className="alert alert-danger d-flex align-items-center">
                      <svg
                        className="bi bi-exclamation-triangle-fill me-2"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                      </svg>
                      <div>{error}</div>
                    </div>
                  )}

                  {/* Confirmation Checkbox */}
                  <div className="form-check">
                    <input
                      id="confirm-cancellation"
                      type="checkbox"
                      className="form-check-input"
                      disabled={isSubmitting}
                    />
                    <label
                      htmlFor="confirm-cancellation"
                      className="form-check-label fw-semibold"
                    >
                      I understand that this action cannot be undone
                    </label>
                    <div className="form-text">
                      By checking this box, I confirm that I want to cancel this
                      order and understand that I will not be able to reverse
                      this action.
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="card-footer bg-light d-flex justify-content-between align-items-center">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSubmitting || (!selectedReason && !customReason)}
                  className="btn btn-danger"
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Cancelling Order...
                    </>
                  ) : (
                    "Cancel Order"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
