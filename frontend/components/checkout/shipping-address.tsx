import { HttpTypes } from "@medusajs/types";
import { Container } from "@medusajs/ui";
import { mapKeys } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import AddressSelect from "./address-select";
import CountrySelect from "./country-select";

// Array of all Indian states and union territories
const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

const ShippingAddress = ({
  customer,
  cart,
  checked,
  onChange,
}: {
  customer: HttpTypes.StoreCustomer | null;
  cart: HttpTypes.StoreCart | null;
  checked: boolean;
  onChange: () => void;
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({
    "shipping_address.first_name": cart?.shipping_address?.first_name || "",
    "shipping_address.last_name": cart?.shipping_address?.last_name || "",
    "shipping_address.address_1": cart?.shipping_address?.address_1 || "",
    // "shipping_address.company": cart?.shipping_address?.company || "",
    "shipping_address.postal_code": cart?.shipping_address?.postal_code || "",
    "shipping_address.city": cart?.shipping_address?.city || "",
    "shipping_address.country_code": cart?.shipping_address?.country_code || "",
    "shipping_address.province": cart?.shipping_address?.province || "",
    "shipping_address.phone": cart?.shipping_address?.phone || "",
    email: "",
  });

  const countriesInRegion = useMemo(
    () => cart?.region?.countries?.map((c) => c.iso_2),
    [cart?.region]
  );

  const addressesInRegion = useMemo(
    () =>
      customer?.addresses.filter(
        (a) => a.country_code && countriesInRegion?.includes(a.country_code)
      ),
    [customer?.addresses, countriesInRegion]
  );

  const setFormAddress = (
    address?: HttpTypes.StoreCartAddress,
    email?: string
  ) => {
    address &&
      setFormData((prevState: Record<string, any>) => ({
        ...prevState,
        "shipping_address.first_name": address?.first_name || "",
        "shipping_address.last_name": address?.last_name || "",
        "shipping_address.address_1": address?.address_1 || "",
        // "shipping_address.company": address?.company || "",
        "shipping_address.postal_code": address?.postal_code || "",
        "shipping_address.city": address?.city || "",
        "shipping_address.country_code": address?.country_code || "",
        "shipping_address.province": address?.province || "",
        "shipping_address.phone": address?.phone || "",
      }));

    email &&
      setFormData((prevState: Record<string, any>) => ({
        ...prevState,
        email: email,
      }));
  };

  useEffect(() => {
    if (cart && cart.shipping_address) {
      setFormAddress(cart?.shipping_address, "");
    }

    if (cart && !cart.email && customer?.email) {
      setFormAddress(undefined, "");
    }
  }, [cart]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  return (
    <>
      {customer && (addressesInRegion?.length || 0) > 0 && (
        <Container className="mb-6 flex flex-col gap-y-4 p-5">
          <p className="text-small-regular">
            {`Hi ${customer.first_name}, do you want to use one of your saved addresses?`}
          </p>
          <AddressSelect
            addresses={customer.addresses}
            addressInput={
              mapKeys(formData, (_, key) =>
                key.replace("shipping_address.", "")
              ) as HttpTypes.StoreCartAddress
            }
            onSelect={setFormAddress}
          />
        </Container>
      )}
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="ayur-form-input ayur-check-form">
            <label>
              First Name <span>*</span>
            </label>
            <input
              name="shipping_address.first_name"
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
              name="shipping_address.last_name"
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
              name="shipping_address.address_1"
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

        {/* <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="ayur-form-input ayur-check-form">
            <label>Company</label>
            <input
              name="shipping_address.company"
              type="text"
              className="form-control"
              placeholder=""
              value={formData["shipping_address.company"]}
              onChange={handleChange}
              data-testid="shipping-company-input"
            />
          </div>
        </div> */}

        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="ayur-form-input ayur-check-form">
            <label>
              Postal Code <span>*</span>
            </label>
            <input
              name="shipping_address.postal_code"
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
              name="shipping_address.city"
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
            <select
              name="shipping_address.province"
              className="form-control"
              value={formData["shipping_address.province"]}
              onChange={handleChange}
              required
              data-testid="shipping-province-select"
            >
              <option value="">Select State</option>
              {INDIAN_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12">
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

        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="ayur-form-input ayur-check-form">
            <label>
              Phone <span>*</span>
            </label>
            <input
              name="shipping_address.phone"
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
            <label>Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder=""
              value={formData.email}
              onChange={handleChange}
              data-testid="shipping-email-input"
            />
          </div>
        </div>

        {/* <div className="col-lg-6 col-md-6 col-sm-12">
          <div
            className="ayur-form-input ayur-check-form d-flex align-items-center justify-content-center"
            style={{ marginTop: "30px" }}
          >
            <div className="custom-checkbox" style={{ marginRight: "10px" }}>
              <input
                type="checkbox"
                id="billing_same_as_shipping"
                name="billing_same_as_shipping"
                checked={checked}
                onChange={onChange}
              />
              <label
                htmlFor="billing_same_as_shipping"
                style={{ marginBottom: 0 }}
              ></label>
            </div>
            <label
              htmlFor="billing_same_as_shipping"
              style={{
                fontWeight: 400,
                fontSize: "16px",
                color: "var(--ayur-banheading-color)",
                marginBottom: 0,
                cursor: "pointer",
                paddingTop: "10px",
                paddingLeft: "10px",
              }}
            >
              Billing address same as shipping address
            </label>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default ShippingAddress;
