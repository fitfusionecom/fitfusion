"use client";

import { useActionState } from "react";
import { HttpTypes } from "@medusajs/types";
import { setAddresses } from "@/lib/data/cart";
import { useToggleState } from "@medusajs/ui";
import ShippingAddress from "./shipping-address";
import { CheckCircleSolid } from "@medusajs/icons";
import compareAddresses from "@/lib/util/compare-addresses";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import BillingAddress from "./billing-address";
import { BiEdit } from "react-icons/bi";
import { setAddressForBuyNow } from "@/lib/data/buy-now-cart";

const Addresses = ({
  cart,
  customer,
  isBuyNow,
}: {
  cart: HttpTypes.StoreCart | null;
  customer: HttpTypes.StoreCustomer | null;
  isBuyNow?: boolean;
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
    if (isBuyNow) {
      router.push(pathname + "?cartId=" + cart?.id + "&step=address");
    } else {
      router.push(pathname + "?step=address");
    }
  };

  const [message, formAction] = useActionState(
    isBuyNow ? setAddressForBuyNow : setAddresses,
    null
  );

  return (
    <div className="border rounded overflow-hidden">
      <div className="d-flex flex-row align-items-center justify-content-between mb-2 bg-black text-white px-3 py-3">
        <h2 className="d-flex flex-row gap-2 align-items-baseline fs-5 mb-0">
          Shipping Address
          {!isOpen && <CheckCircleSolid />}
        </h2>

        {!isOpen && cart?.shipping_address && (
          <button
            onClick={handleEdit}
            className="edit-address-btn"
            data-testid="edit-address-button"
          >
            <BiEdit /> Edit
          </button>
        )}
      </div>
      {isOpen ? (
        <form
          action={
            !isBuyNow
              ? formAction
              : (formData) => {
                  formData.append("cartId", cart?.id ?? "");
                  formAction(formData);
                }
          }
        >
          <div className="p-3">
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
              className="ayur-btn ayur-btn-primary px-5"
              data-testid="submit-address-button"
            >
              Next
            </button>

            {message && <div className="text-red-500">{message}</div>}

            {/* <ErrorMessage error={message} data-testid="address-error-message" /> */}
          </div>
        </form>
      ) : (
        <div>
          <div className="fs-6 p-3">
            {cart && cart.shipping_address ? (
              <div className="row align-items-start g-4">
                <div
                  className="col-md-4 col-12"
                  data-testid="shipping-address-summary"
                >
                  <h6 className="fw-bold mb-2 address-label">
                    Shipping Address
                  </h6>
                  <h6 className="text-secondary fw-normal mb-1 address-text">
                    {cart.shipping_address.first_name}{" "}
                    {cart.shipping_address.last_name}
                  </h6>
                  <h6 className="text-secondary fw-normal mb-1 address-text">
                    {cart.shipping_address.address_1}{" "}
                    {cart.shipping_address.address_2}
                  </h6>
                  <h6 className="text-secondary fw-normal mb-1 address-text">
                    {cart.shipping_address.postal_code},{" "}
                    {cart.shipping_address.city}
                  </h6>
                  <h6 className="text-secondary fw-normal mb-1 address-text">
                    {cart.shipping_address.country_code?.toUpperCase()}
                  </h6>
                </div>

                <div
                  className="col-md-4 col-12"
                  data-testid="shipping-contact-summary"
                >
                  <h6 className="fw-bold mb-2 address-label">
                    Contact Information
                  </h6>
                  <h6 className="text-secondary fw-normal mb-1 address-text">
                    {cart.shipping_address.phone}
                  </h6>
                  <h6 className="text-secondary fw-normal mb-1 address-text">
                    {cart.email}
                  </h6>
                </div>
              </div>
            ) : (
              <div className="text-center py-3">
                <p className="text-muted mb-0">No shipping address set</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Addresses;
