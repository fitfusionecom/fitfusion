"use client";

import { useState } from "react";
import { addCustomerAddress, deleteCustomerAddress } from "@/lib/data/customer";
import AddressCard from "./address-card";

interface AddressBookProps {
  customer: any;
}

export default function AddressBook({ customer }: AddressBookProps) {
  const [isAdding, setIsAdding] = useState(false);
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
      setSuccess("Address added successfully!");
      setIsAdding(false);
      setFormData({
        address_1: "",
        address_2: "",
        city: "",
        postal_code: "",
        country_code: "in",
        company: "",
      });
      // Refresh the page to show new address
      window.location.reload();
    } catch (err) {
      setError("Failed to add address. Please try again.");
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
    setIsAdding(false);
  };

  const handleDelete = async (addressId: string) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await deleteCustomerAddress(addressId);
        window.location.reload();
      } catch (err) {
        setError("Failed to delete address. Please try again.");
      }
    }
  };

  return (
    <div className="address-book">
      {/* Add New Address Button */}
      <div className="mb-4">
        {!isAdding && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setIsAdding(true)}
            style={{
              background: "#cd8973",
              borderColor: "#cd8973",
              borderRadius: "0.75rem",
            }}
          >
            <i className="fa fa-plus me-2"></i>
            Add New Address
          </button>
        )}
      </div>

      {/* Error and Success Messages */}
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

      {/* Add Address Form */}
      {isAdding && (
        <div
          className="card shadow-sm mb-4"
          style={{ borderRadius: "1rem", border: "none" }}
        >
          <div className="card-body">
            <h5 className="mb-3" style={{ color: "#cd8973", fontWeight: 700 }}>
              Add New Address
            </h5>
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
                    className="form-control"
                    value={formData.company}
                    onChange={handleChange}
                    style={{ borderRadius: "0.5rem" }}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="country_code" className="form-label">
                    Country <span className="text-danger">*</span>
                  </label>
                  <select
                    id="country_code"
                    name="country_code"
                    className="form-select"
                    value={formData.country_code}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "0.5rem" }}
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
                  className="form-control"
                  value={formData.address_1}
                  onChange={handleChange}
                  required
                  style={{ borderRadius: "0.5rem" }}
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
                  className="form-control"
                  value={formData.address_2}
                  onChange={handleChange}
                  style={{ borderRadius: "0.5rem" }}
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
                    className="form-control"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "0.5rem" }}
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
                    className="form-control"
                    value={formData.postal_code}
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
                      Adding...
                    </>
                  ) : (
                    "Add Address"
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
          </div>
        </div>
      )}

      {/* Address List */}
      <div className="address-list">
        {customer?.addresses && customer.addresses.length > 0 ? (
          <div className="row">
            {customer.addresses.map((address: any) => (
              <div key={address.id} className="col-md-6 col-lg-4 mb-3">
                <AddressCard
                  address={address}
                  onDelete={() => handleDelete(address.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="card shadow-sm"
            style={{ borderRadius: "1rem", border: "none" }}
          >
            <div className="card-body text-center py-5">
              <i
                className="fa fa-map-marker-alt fa-3x mb-3"
                style={{ color: "#ccc" }}
              ></i>
              <h5 className="text-muted">No addresses found</h5>
              <p className="text-muted mb-0">
                Add your first address to get started
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
