"use client";

import { FaTrash } from "react-icons/fa";

interface AddressCardProps {
  address: any;
  onDelete: () => void;
}

export default function AddressCard({ address, onDelete }: AddressCardProps) {
  const getCountryName = (code: string) => {
    const countries: { [key: string]: string } = {
      in: "India",
      us: "United States",
      uk: "United Kingdom",
      ca: "Canada",
    };
    return countries[code] || code.toUpperCase();
  };

  return (
    <div className="account-card h-100">
      <div className="account-card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            {address.is_default_billing && (
              <span
                className="badge me-2"
                style={{
                  background: "#1a1a1a",
                  color: "#fff",
                  fontSize: "0.75rem",
                }}
              >
                Billing
              </span>
            )}
            {address.is_default_shipping && (
              <span
                className="badge"
                style={{
                  background: "#1a1a1a",
                  color: "#fff",
                  fontSize: "0.75rem",
                }}
              >
                Shipping
              </span>
            )}
          </div>
          <button
            type="button"
            className="btn btn-sm btn-outline"
            onClick={onDelete}
            title="Delete address"
          >
            <FaTrash />
          </button>
        </div>

        <div className="address-content">
          {address.company && (
            <div className="mb-2">
              <small className="order-label d-block">Company</small>
              <span className="order-value">{address.company}</span>
            </div>
          )}

          <div className="mb-2">
            <small className="order-label d-block">Address</small>
            <div className="order-value">
              <div>{address.address_1}</div>
              {address.address_2 && <div>{address.address_2}</div>}
            </div>
          </div>

          <div className="mb-2">
            <small className="order-label d-block">City & Postal Code</small>
            <span className="order-value">
              {address.city}, {address.postal_code}
            </span>
          </div>

          <div>
            <small className="order-label d-block">Country</small>
            <span className="order-value">
              {getCountryName(address.country_code)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
