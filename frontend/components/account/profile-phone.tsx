"use client";

import { useState } from "react";
import { updateCustomer } from "@/lib/data/customer";
import { FaEdit, FaSpinner } from "react-icons/fa";

interface ProfilePhoneProps {
  customer: any;
}

export default function ProfilePhone({ customer }: ProfilePhoneProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [phone, setPhone] = useState(customer?.phone || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await updateCustomer({
        phone: phone,
      });
      setSuccess("Phone number updated successfully!");
      setIsEditing(false);
    } catch (err) {
      setError("Failed to update phone number. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setPhone(customer?.phone || "");
    setError("");
    setSuccess("");
    setIsEditing(false);
  };

  return (
    <div className="profile-section">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="mb-1" style={{ color: "#cd8973", fontWeight: 700 }}>
            Phone Number
          </h4>
          <p className="text-muted mb-0">Update your phone number</p>
        </div>
        {!isEditing && (
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={() => setIsEditing(true)}
            style={{
              borderColor: "#cd8973",
              color: "#cd8973",
              borderRadius: "0.5rem",
            }}
          >
            <FaEdit className="me-2" />
            Edit
          </button>
        )}
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone Number <span className="text-danger">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit phone number"
              style={{ borderRadius: "0.5rem" }}
            />
          </div>
          <div className="d-flex gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
              style={{
                background: "#cd8973",
                borderColor: "#cd8973",
                borderRadius: "0.5rem",
              }}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="fa-spin me-2" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleCancel}
              disabled={isLoading}
              style={{ borderRadius: "0.5rem" }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div
          className="card shadow-sm"
          style={{ borderRadius: "1rem", border: "none" }}
        >
          <div className="card-body">
            <small className="text-muted d-block">Phone Number</small>
            <span className="fw-semibold">
              {customer?.phone || "Not provided"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
