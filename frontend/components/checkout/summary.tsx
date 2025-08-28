import ItemsPreviewTemplate from "./preview";
import CartTotals from "../cart/cart-total";
// import DiscountCode from "@modules/checkout/components/discount-code"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="checkout-summary-container">
      <h4 className="d-flex flex-row gap-2 align-items-baseline fs-5 mb-4 checkout-summary-title">
        In your Cart
      </h4>
      <ItemsPreviewTemplate cart={cart} />
      <CartTotals totals={cart} />
    </div>
  );
};

export default CheckoutSummary;
