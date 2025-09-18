import { convertToLocale } from "@/lib/util/money";
import { HttpTypes } from "@medusajs/types";
import { Heading, Text } from "@medusajs/ui";

// import Divider from "@/components/blocks/divider"

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder;
};

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  return (
    <div>
      <h3 className="h5 mb-4">Delivery</h3>
      <div className="row">
        <div
          className="col-lg-4 col-md-6 col-12 mb-3"
          data-testid="shipping-address-summary"
        >
          <h6 className="fw-bold mb-2">Shipping Address</h6>
          <div className="text-muted">
            <div>
              {order.shipping_address?.first_name}{" "}
              {order.shipping_address?.last_name}
            </div>
            <div>
              {order.shipping_address?.address_1}{" "}
              {order.shipping_address?.address_2}
            </div>
            <div>
              {order.shipping_address?.postal_code},{" "}
              {order.shipping_address?.city}
            </div>
            <div>{order.shipping_address?.country_code?.toUpperCase()}</div>
          </div>
        </div>

        <div
          className="col-lg-4 col-md-6 col-12 mb-3"
          data-testid="shipping-contact-summary"
        >
          <h6 className="fw-bold mb-2">Contact</h6>
          <div className="text-muted">
            <div>{order.shipping_address?.phone}</div>
            {/* <div>{order.email}</div> */}
          </div>
        </div>

        <div
          className="col-lg-4 col-md-12 col-12 mb-3"
          data-testid="shipping-method-summary"
        >
          <h6 className="fw-bold mb-2">Method</h6>
          <div className="text-muted">
            {(order as any).shipping_methods[0]?.name} (
            {convertToLocale({
              amount: order.shipping_methods?.[0].total ?? 0,
              currency_code: order.currency_code,
            })
              .replace(/,/g, "")
              .replace(/\./g, ",")}
            )
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;
