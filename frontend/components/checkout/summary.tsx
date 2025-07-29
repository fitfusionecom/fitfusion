import ItemsPreviewTemplate from "./preview";
import CartTotals from "../cart/cart-total";
// import DiscountCode from "@modules/checkout/components/discount-code"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div
      style={{
        borderLeft: "1px solid #e0e0e0",
        paddingLeft: "20px",
      }}
      className="sticky top-0 flex flex-col-reverse small:flex-col gap-y-8 py-8 small:py-0 bg-white"
    >
      <h2 className="d-flex flex-row gap-2 align-items-baseline fs-2 mb-4">
        In your Cart
      </h2>
      <CartTotals totals={cart} />
      <ItemsPreviewTemplate cart={cart} />
    </div>
  );
};

export default CheckoutSummary;
