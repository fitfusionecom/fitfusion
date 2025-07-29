"use client";

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
    <div
      className="card shadow-sm h-100"
      style={{ borderRadius: "1rem", border: "none" }}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            {address.is_default_billing && (
              <span
                className="badge me-2"
                style={{
                  background: "#cd8973",
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
                  background: "#1B5E20",
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
            className="btn btn-sm btn-outline-danger"
            onClick={onDelete}
            style={{ borderRadius: "0.5rem" }}
            title="Delete address"
          >
            <i className="fa fa-trash"></i>
          </button>
        </div>

        <div className="address-content">
          {address.company && (
            <div className="mb-2">
              <small className="text-muted d-block">Company</small>
              <span className="fw-semibold">{address.company}</span>
            </div>
          )}

          <div className="mb-2">
            <small className="text-muted d-block">Address</small>
            <div className="fw-semibold">
              <div>{address.address_1}</div>
              {address.address_2 && <div>{address.address_2}</div>}
            </div>
          </div>

          <div className="mb-2">
            <small className="text-muted d-block">City & Postal Code</small>
            <span className="fw-semibold">
              {address.city}, {address.postal_code}
            </span>
          </div>

          <div>
            <small className="text-muted d-block">Country</small>
            <span className="fw-semibold">
              {getCountryName(address.country_code)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
