import { Metadata } from "next";
import { retrieveCart } from "@/lib/data/cart";
import { retrieveCustomer } from "@/lib/data/customer";
import CartTemplate from "@/components/cart/template";
import EmptyCartMessage from "@/components/cart/empty-cart";

export const metadata: Metadata = {
  title: "Cart",
  description: "View your cart",
};

export default async function Cart() {
  const cart = await retrieveCart();
  const customer = await retrieveCustomer();

  if (!cart) {
    return (
      <div>
        <EmptyCartMessage />
      </div>
    );
  }

  return <CartTemplate cart={cart} customer={customer} />;
}
