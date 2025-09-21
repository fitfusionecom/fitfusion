"use client";

import { useState } from "react";
import { ordersService } from "@/lib/services/ordersService";
import "./OrderCancelModal.css";

interface OrderCancelModalProps {
  orderId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
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

export default function OrderCancelModal({
  orderId,
  isOpen,
  onClose,
  onSuccess,
}: OrderCancelModalProps) {
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCancel = async () => {
    if (!selectedReason && !customReason) {
      setError("Please select a cancellation reason");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const reason = selectedReason === "Other" ? customReason : selectedReason;

      await ordersService.cancelOrder(orderId, reason, "customer");

      onSuccess();
      onClose();

      // Reset form
      setSelectedReason("");
      setCustomReason("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to cancel order");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setSelectedReason("");
      setCustomReason("");
      setError("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="order-cancel-modal">
      {/* Backdrop click to close */}
      <div className="order-cancel-modal-backdrop" onClick={handleClose} />

      {/* Modal Content */}
      <div className="order-cancel-modal-content">
        {/* Header */}
        <div className="order-cancel-modal-header">
          <div className="order-cancel-modal-title">
            <div className="order-cancel-modal-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3>Cancel Order</h3>
          </div>
          <button
            type="button"
            className="order-cancel-modal-close"
            onClick={handleClose}
            disabled={isLoading}
            aria-label="Close"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="order-cancel-modal-body">
          <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
            Are you sure you want to cancel this order? This action cannot be
            undone.
          </p>

          <div className="order-cancel-modal-form-group">
            <label className="order-cancel-modal-label">
              Reason for cancellation
            </label>
            <select
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              className="order-cancel-modal-input"
              disabled={isLoading}
            >
              <option value="">Select a reason</option>
              {CANCELLATION_REASONS.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </div>

          {selectedReason === "Other" && (
            <div className="order-cancel-modal-form-group">
              <label className="order-cancel-modal-label">Please specify</label>
              <textarea
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="Please provide more details..."
                rows={3}
                className="order-cancel-modal-input order-cancel-modal-textarea"
                disabled={isLoading}
              />
            </div>
          )}

          {error && (
            <div className="order-cancel-modal-error">
              <svg
                className="order-cancel-modal-error-icon"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="order-cancel-modal-error-text">{error}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="order-cancel-modal-footer">
          <button
            type="button"
            className="order-cancel-modal-button order-cancel-modal-button-secondary"
            onClick={handleClose}
            disabled={isLoading}
          >
            Keep Order
          </button>
          <button
            type="button"
            className="order-cancel-modal-button order-cancel-modal-button-danger"
            onClick={handleCancel}
            disabled={isLoading || (!selectedReason && !customReason)}
          >
            {isLoading ? (
              <div className="order-cancel-modal-loading">
                <svg
                  className="order-cancel-modal-spinner"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Cancelling...
              </div>
            ) : (
              "Cancel Order"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
