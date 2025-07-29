import React, { useState } from "react";
import { HttpTypes } from "@medusajs/types";
import CountrySelect from "./country-select";
// import Input from "@modules/common/components/input";

const BillingAddress = ({ cart }: { cart: HttpTypes.StoreCart | null }) => {
  const [formData, setFormData] = useState<any>({
    "billing_address.first_name": cart?.billing_address?.first_name || "",
    "billing_address.last_name": cart?.billing_address?.last_name || "",
    "billing_address.address_1": cart?.billing_address?.address_1 || "",
    "billing_address.company": cart?.billing_address?.company || "",
    "billing_address.postal_code": cart?.billing_address?.postal_code || "",
    "billing_address.city": cart?.billing_address?.city || "",
    "billing_address.country_code": cart?.billing_address?.country_code || "",
    "billing_address.province": cart?.billing_address?.province || "",
    "billing_address.phone": cart?.billing_address?.phone || "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="ayur-form-input ayur-check-form">
            <label>
              First Name <span>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              value={formData["shipping_address.first_name"]}
              onChange={handleChange}
              required
              data-testid="shipping-first-name-input"
            />
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="ayur-form-input ayur-check-form">
            <label>
              Last Name <span>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              value={formData["shipping_address.last_name"]}
              onChange={handleChange}
              required
              data-testid="shipping-last-name-input"
            />
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="ayur-form-input ayur-check-form">
            <label>
              Address <span>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              value={formData["shipping_address.address_1"]}
              onChange={handleChange}
              required
              data-testid="shipping-address-input"
            />
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="ayur-form-input ayur-check-form">
            <label>
              Company <span>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              value={formData["shipping_address.company"]}
              onChange={handleChange}
              required
              data-testid="shipping-company-input"
            />
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="ayur-form-input ayur-check-form">
            <label>
              Postal Code <span>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              value={formData["shipping_address.postal_code"]}
              onChange={handleChange}
              required
              data-testid="shipping-postal-code-input"
            />
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="ayur-form-input ayur-check-form">
            <label>
              City <span>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              value={formData["shipping_address.city"]}
              onChange={handleChange}
              required
              data-testid="shipping-city-input"
            />
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="ayur-form-input ayur-check-form">
            <label>
              State / Province <span>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              value={formData["shipping_address.province"]}
              onChange={handleChange}
              required
              data-testid="shipping-province-input"
            />
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="ayur-form-input ayur-check-form">
            <CountrySelect
              name="shipping_address.country_code"
              autoComplete="country"
              region={cart?.region}
              value={formData["shipping_address.country_code"]}
              onChange={handleChange}
              required
              data-testid="shipping-country-select"
            />
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="ayur-form-input ayur-check-form">
            <label>
              Phone <span>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              value={formData["shipping_address.phone"]}
              onChange={handleChange}
              required
              data-testid="shipping-phone-input"
            />
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="ayur-form-input ayur-check-form">
            <label>
              Email <span>*</span>
            </label>
            <input
              type="email"
              className="form-control"
              placeholder=""
              value={formData.email}
              onChange={handleChange}
              required
              data-testid="shipping-email-input"
            />
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="ayur-form-input ayur-check-form">
            <label>
              Billing address same as shipping address <span>*</span>
            </label>
            <input
              type="checkbox"
              className="form-control"
              // checked={checked}
              // onChange={onChange}
              data-testid="billing-address-checkbox"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BillingAddress;
