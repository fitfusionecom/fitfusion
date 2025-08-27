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
          <h4 className="profile-section-title mb-1">Phone Number</h4>
          <p className="profile-section-desc mb-0">Update your phone number</p>
        </div>
        {!isEditing && (
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => setIsEditing(true)}
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
              className="form-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit phone number"
            />
          </div>
          <div className="d-flex gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
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
              className="btn btn-outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="account-card">
          <div className="account-card-body">
            <small className="order-label d-block">Phone Number</small>
            <span className="order-value">
              {customer?.phone || "Not provided"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
