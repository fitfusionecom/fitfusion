import { HttpTypes } from "@medusajs/types";
import { listCartPaymentMethods } from "@/lib/data/payment";
import { listCartShippingMethods } from "@/lib/data/fulfillment";
import Addresses from "@/components/checkout/addresses";
import Shipping from "@/components/checkout/shipping";
import Payment from "@/components/checkout/payment";
import Review from "@/components/checkout/review";

export default async function CheckoutForm({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null;
  customer: HttpTypes.StoreCustomer | null;
}) {
  if (!cart) {
    return null;
  }

  const shippingMethods = await listCartShippingMethods(cart.id);
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "");

  if (!shippingMethods || !paymentMethods) {
    return null;
  }

  return (
    <div className="checkout-form-container">
      <Addresses cart={cart} customer={customer} />
      <Shipping cart={cart} availableShippingMethods={shippingMethods} />
      <Payment cart={cart} availablePaymentMethods={paymentMethods} />
      <Review cart={cart} />
    </div>
  );
}
