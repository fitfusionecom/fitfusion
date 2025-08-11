"use client";

import { useQuery } from "react-query";
import { cartService } from "@/lib/services/cartService";
import { BiCart } from "react-icons/bi";
import CartPopover from "./CartPopover";
import "./CartTrigger.css";
import { useRef } from "react";
import { useCartContext } from "@/lib/context/cart-context";

export default function CartTrigger() {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { isCartPopoverOpen, openCartPopover, closeCartPopover } =
    useCartContext();

  // Fetch cart data to get item count
  const { data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: cartService.retrieveCart,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 30, // 30 seconds
    refetchInterval: 1000 * 60, // Refetch every minute
  });

  const itemCount = cart?.items?.length || 0;

  return (
    <>
      <button
        ref={triggerRef}
        className="cart-trigger"
        onClick={openCartPopover}
        aria-label="Open cart"
      >
        <BiCart className="cart-icon" />
        {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
      </button>

      <CartPopover
        isOpen={isCartPopoverOpen}
        onClose={closeCartPopover}
        triggerRef={triggerRef}
      />
    </>
  );
}
