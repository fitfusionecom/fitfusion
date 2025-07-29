"use client";

import { useActionState } from "react";
import { HttpTypes } from "@medusajs/types";
import { setAddresses } from "@/lib/data/cart";
import compareAddresses from "@/lib/util/compare-addresses";
import { CheckCircleSolid } from "@medusajs/icons";
import { useToggleState } from "@medusajs/ui";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ShippingAddress from "./shipping-address";
// import BillingAddress from "./billing-address";
import Spinner from "../blocks/spinner";

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null;
  customer: HttpTypes.StoreCustomer | null;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = searchParams.get("step") === "address";

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  );

  const handleEdit = () => {
    router.push(pathname + "?step=address");
  };

  const [message, formAction] = useActionState(setAddresses, null);

  return (
    <div>
      <div className="d-flex flex-row align-items-center justify-content-between mb-2">
        <h2 className="d-flex flex-row gap-2 align-items-baseline fs-2">
          Shipping Address
          {!isOpen && <CheckCircleSolid />}
        </h2>

        {!isOpen && cart?.shipping_address && (
          <button
            onClick={handleEdit}
            className="btn btn-link p-0 text-primary"
            data-testid="edit-address-button"
            style={{ textDecoration: "underline" }}
          >
            Edit
          </button>
        )}
      </div>
      {isOpen ? (
        <form action={formAction}>
          <div className="pb-8">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {/* {!sameAsBilling && (
              <div>
                <Heading
                  level="h2"
                  className="text-3xl-regular gap-x-4 pb-6 pt-8"
                >
                  Billing address
                </Heading>

                <BillingAddress cart={cart} />
              </div>
            )} */}
            <button
              className="ayur-btn ayur-btn-primary"
              data-testid="submit-address-button"
            >
              Continue to delivery
            </button>

            {message && <div className="text-red-500">{message}</div>}

            {/* <ErrorMessage error={message} data-testid="address-error-message" /> */}
          </div>
        </form>
      ) : (
        <div>
          <div className="fs-6">
            {cart && cart.shipping_address ? (
              <div className="row align-items-start g-4">
                <div
                  className="col-md-4"
                  data-testid="shipping-address-summary"
                >
                  <h5
                    style={{
                      color: "#cd8973",
                    }}
                    className="fw-bold  mb-2 "
                  >
                    Shipping Address
                  </h5>
                  <h6 className="text-secondary fw-normal mb-1">
                    {cart.shipping_address.first_name}{" "}
                    {cart.shipping_address.last_name}
                  </h6>
                  <h6 className="text-secondary fw-normal mb-1">
                    {cart.shipping_address.address_1}{" "}
                    {cart.shipping_address.address_2}
                  </h6>
                  <h6 className="text-secondary fw-normal mb-1">
                    {cart.shipping_address.postal_code},{" "}
                    {cart.shipping_address.city}
                  </h6>
                  <h6 className="text-secondary fw-normal mb-1">
                    {cart.shipping_address.country_code?.toUpperCase()}
                  </h6>
                </div>

                <div
                  className="col-md-4"
                  data-testid="shipping-contact-summary"
                >
                  <h5
                    style={{
                      color: "#cd8973",
                    }}
                    className="fw-bold mb-2 "
                  >
                    Contact
                  </h5>
                  <h6 className="text-secondary fw-normal mb-1">
                    {cart.shipping_address.phone}
                  </h6>
                  <h6 className="text-secondary fw-normal mb-1">
                    {cart.email}
                  </h6>
                </div>

                <div className="col-md-4" data-testid="billing-address-summary">
                  <h5
                    style={{
                      color: "#cd8973",
                    }}
                    className="fw-bold mb-2 "
                  >
                    Billing Address
                  </h5>
                  {sameAsBilling ? (
                    <h6 className="text-secondary fw-normal mb-1">
                      Billing- and delivery address are the same.
                    </h6>
                  ) : (
                    <>
                      <h6 className="text-secondary fw-normal mb-1">
                        {cart.billing_address?.first_name}{" "}
                        {cart.billing_address?.last_name}
                      </h6>
                      <h6 className="text-secondary fw-normal mb-1">
                        {cart.billing_address?.address_1}{" "}
                        {cart.billing_address?.address_2}
                      </h6>
                      <h6 className="text-secondary fw-normal mb-1">
                        {cart.billing_address?.postal_code},{" "}
                        {cart.billing_address?.city}
                      </h6>
                      <h6 className="text-secondary fw-normal mb-1">
                        {cart.billing_address?.country_code?.toUpperCase()}
                      </h6>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center py-4">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Addresses;
