"use client";

import { useState } from "react";
import { updateCustomer } from "@/lib/data/customer";

interface ProfileNameProps {
  customer: any;
}

export default function ProfileName({ customer }: ProfileNameProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    first_name: customer?.first_name || "",
    last_name: customer?.last_name || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const formDataObj = new FormData();
      formDataObj.append("first_name", formData.first_name);
      formDataObj.append("last_name", formData.last_name);

      await updateCustomer({
        first_name: formData.first_name,
        last_name: formData.last_name,
      });
      setSuccess("Name updated successfully!");
      setIsEditing(false);
    } catch (err) {
      setError("Failed to update name. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      first_name: customer?.first_name || "",
      last_name: customer?.last_name || "",
    });
    setError("");
    setSuccess("");
    setIsEditing(false);
  };

  return (
    <div className="profile-section">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="mb-1" style={{ color: "#cd8973", fontWeight: 700 }}>
            Name
          </h4>
          <p className="text-muted mb-0">Update your first and last name</p>
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
            <i className="fa fa-edit me-2"></i>
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
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="first_name" className="form-label">
                First Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                className="form-control"
                value={formData.first_name}
                onChange={handleChange}
                required
                style={{ borderRadius: "0.5rem" }}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="last_name" className="form-label">
                Last Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                className="form-control"
                value={formData.last_name}
                onChange={handleChange}
                required
                style={{ borderRadius: "0.5rem" }}
              />
            </div>
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
                  <i className="fa fa-spinner fa-spin me-2"></i>
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
            <div className="row">
              <div className="col-md-6">
                <small className="text-muted d-block">First Name</small>
                <span className="fw-semibold">
                  {customer?.first_name || "Not provided"}
                </span>
              </div>
              <div className="col-md-6">
                <small className="text-muted d-block">Last Name</small>
                <span className="fw-semibold">
                  {customer?.last_name || "Not provided"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
