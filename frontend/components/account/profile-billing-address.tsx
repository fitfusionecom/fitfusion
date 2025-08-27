"use client";

import { useState } from "react";
import { addCustomerAddress } from "@/lib/data/customer";
import { FaPlus, FaSpinner, FaMapMarkerAlt } from "react-icons/fa";

interface ProfileBillingAddressProps {
  customer: any;
}

export default function ProfileBillingAddress({
  customer,
}: ProfileBillingAddressProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    address_1: "",
    address_2: "",
    city: "",
    postal_code: "",
    country_code: "in",
    company: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
      formDataObj.append("address_1", formData.address_1);
      formDataObj.append("address_2", formData.address_2);
      formDataObj.append("city", formData.city);
      formDataObj.append("postal_code", formData.postal_code);
      formDataObj.append("country_code", formData.country_code);
      formDataObj.append("company", formData.company);

      await addCustomerAddress(null, formDataObj);
      setSuccess("Billing address added successfully!");
      setIsEditing(false);
      setFormData({
        address_1: "",
        address_2: "",
        city: "",
        postal_code: "",
        country_code: "in",
        company: "",
      });
    } catch (err) {
      setError("Failed to add billing address. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      address_1: "",
      address_2: "",
      city: "",
      postal_code: "",
      country_code: "in",
      company: "",
    });
    setError("");
    setSuccess("");
    setIsEditing(false);
  };

  const billingAddress = customer?.addresses?.find(
    (addr: any) => addr.is_default_billing
  );

  return (
    <div className="profile-section">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="profile-section-title mb-1">Billing Address</h4>
          <p className="profile-section-desc mb-0">
            Manage your billing address
          </p>
        </div>
        {!isEditing && (
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => setIsEditing(true)}
          >
            <FaPlus className="me-2" />
            Add Address
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
              <label htmlFor="company" className="form-label">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                className="form-input"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="country_code" className="form-label">
                Country <span className="text-danger">*</span>
              </label>
              <select
                id="country_code"
                name="country_code"
                className="form-input"
                value={formData.country_code}
                onChange={handleChange}
                required
              >
                <option value="in">India</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="ca">Canada</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="address_1" className="form-label">
              Address Line 1 <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="address_1"
              name="address_1"
              className="form-input"
              value={formData.address_1}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="address_2" className="form-label">
              Address Line 2
            </label>
            <input
              type="text"
              id="address_2"
              name="address_2"
              className="form-input"
              value={formData.address_2}
              onChange={handleChange}
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="city" className="form-label">
                City <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="form-input"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="postal_code" className="form-label">
                Postal Code <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="postal_code"
                name="postal_code"
                className="form-input"
                value={formData.postal_code}
                onChange={handleChange}
                required
              />
            </div>
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
                "Save Address"
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
            {billingAddress ? (
              <div>
                <div className="row">
                  <div className="col-md-6">
                    <small className="order-label d-block">Address</small>
                    <span className="order-value">
                      {billingAddress.address_1}
                    </span>
                    {billingAddress.address_2 && (
                      <div className="order-value">
                        {billingAddress.address_2}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <small className="order-label d-block">
                      City & Postal Code
                    </small>
                    <span className="order-value">
                      {billingAddress.city}, {billingAddress.postal_code}
                    </span>
                  </div>
                </div>
                {billingAddress.company && (
                  <div className="mt-2">
                    <small className="order-label d-block">Company</small>
                    <span className="order-value">
                      {billingAddress.company}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-3">
                <FaMapMarkerAlt size={48} className="empty-state-icon mb-3" />
                <p className="empty-state-desc mb-0">
                  No billing address added yet
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
