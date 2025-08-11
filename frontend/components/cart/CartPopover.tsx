"use client";

import { useQuery } from "react-query";
import { cartService } from "@/lib/services/cartService";
import { HttpTypes } from "@medusajs/types";
import { useState, useRef, useEffect } from "react";
import { BiCart, BiX, BiTrash } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import "./CartPopover.css";
import { retrieveCart } from "@/lib/data/cart";
import { useCartContext } from "@/lib/context/cart-context";
import LineItemUnitPrice from "./line-item-unit-price";
import { convertToLocale } from "@/lib/util/money";
import { deleteLineItem, updateLineItem } from "@/lib/data/cart";

interface CartPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement>;
}

export default function CartPopover({
  isOpen,
  onClose,
  triggerRef,
}: CartPopoverProps) {
  const router = useRouter();
  const popoverRef = useRef<HTMLDivElement>(null);
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());

  // Use the custom cart hook
  // const { updateLineItem } = useCart();

  // Use cart context for global state management
  const { shouldRefreshCart, triggerCartRefresh } = useCartContext();

  // Fetch cart data using React Query with better error handling
  const {
    data: cart,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const cart = await retrieveCart();
      return cart;
    },
    refetchOnWindowFocus: true,
    staleTime: 1000 * 30, // 30 seconds
    retry: 2,
    refetchOnMount: true,
    refetchInterval: 1000 * 60, // Refetch every minute
  });

  // Auto-refresh cart when shouldRefreshCart is true
  useEffect(() => {
    if (shouldRefreshCart) {
      refetch();
    }
  }, [shouldRefreshCart, refetch]);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef?.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  // Close popover on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleQuantityChange = async (lineId: string, quantity: number) => {
    if (quantity < 1) return;

    console.log("handleQuantityChange called:", { lineId, quantity });
    setUpdatingItems((prev) => new Set(prev).add(lineId));

    try {
      await updateLineItem({ lineId, quantity });
      console.log("Quantity updated successfully");
      // Trigger cart refresh after successful update
      triggerCartRefresh();
    } catch (error) {
      console.error("Error updating quantity:", error);
      // Refetch cart data to ensure UI is in sync
      refetch();
    } finally {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(lineId);
        return newSet;
      });
    }
  };

  const handleRemoveItem = async (lineId: string) => {
    console.log("handleRemoveItem called:", { lineId });
    setUpdatingItems((prev) => new Set(prev).add(lineId));

    try {
      await deleteLineItem(lineId);
      console.log("Item removed successfully");
      // Trigger cart refresh after successful removal
      triggerCartRefresh();
    } catch (error) {
      console.error("Error removing item:", error);
      // Refetch cart data to ensure UI is in sync
      refetch();
    } finally {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(lineId);
        return newSet;
      });
    }
  };

  const handleViewCart = () => {
    onClose();
    router.push("/cart");
  };

  const handleCheckout = () => {
    onClose();
    router.push("/checkout");
  };

  if (!isOpen) return null;

  // Calculate totals with proper price handling
  const total =
    cart?.items?.reduce((sum, item) => {
      // Handle both unit_price and calculated_price
      const itemPrice =
        item.unit_price ||
        item.variant?.calculated_price?.calculated_amount ||
        0;
      return sum + itemPrice * item.quantity;
    }, 0) || 0;

  const itemCount = cart?.items?.length || 0;

  // Helper function to format price correctly
  const formatPrice = (amount: number) => {
    // If amount is already in the correct format (e.g., 499 for ₹499), return as is
    // If amount is in cents (e.g., 49900 for ₹499.00), divide by 100
    if (amount >= 1000) {
      // Likely in cents, divide by 100
      return (amount / 100).toFixed(2);
    }
    // Already in correct format
    return amount.toFixed(2);
  };

  // Debug logging
  console.log("CartPopover Debug:", {
    isOpen,
    cart: cart
      ? {
          id: cart.id,
          itemCount: cart.items?.length,
          items: cart.items?.map((item) => ({
            id: item.id,
            title: item.title,
            quantity: item.quantity,
            unit_price: item.unit_price,
            calculated_price: item.variant?.calculated_price,
            variant_id: item.variant_id,
          })),
        }
      : null,
    itemCount,
    total,
    isLoading,
    error,
    cartId:
      typeof window !== "undefined"
        ? document.cookie
            .split(";")
            .find((cookie) => cookie.trim().startsWith("_medusa_cart_id="))
            ?.split("=")[1]
        : "server-side",
    timestamp: new Date().toISOString(),
  });

  return (
    <div className="cart-popover-overlay">
      <div className="cart-popover" ref={popoverRef}>
        {/* Cart Content */}
        <div className="popover-content">
          {isLoading ? (
            <div className="loading-state">
              <div className="mini-spinner"></div>
              <span>Loading cart...</span>
            </div>
          ) : error ? (
            <div className="error-state">
              <p>Error loading cart</p>
              <button onClick={() => refetch()} className="retry-btn">
                Retry
              </button>
            </div>
          ) : !cart || cart.items.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <p>Your cart is empty</p>
              <button
                className="shop-now-btn"
                onClick={() => router.push("/shop")}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="cart-items-list">
                {cart.items.map((item) => {
                  // Handle both unit_price and calculated_price
                  const itemPrice =
                    item.unit_price ||
                    item.variant?.calculated_price?.calculated_amount ||
                    0;
                  const originalPrice =
                    item.variant?.calculated_price?.original_amount ||
                    itemPrice;

                  return (
                    <div key={item.id} className="cart-item-compact">
                      {/* Product Image */}
                      <div className="item-image-compact">
                        {item.thumbnail ? (
                          <img
                            src={item.thumbnail}
                            alt={item.title || "Product"}
                            className="product-image-compact"
                          />
                        ) : (
                          <div className="product-image-placeholder-compact">
                            🏷️
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="item-details-compact">
                        <h4 className="product-name-compact">
                          {item.title || item.product_title || "Product"}
                        </h4>
                        <div className="price-info-compact">
                          <LineItemUnitPrice
                            item={item}
                            style="tight"
                            currencyCode={cart?.currency_code}
                          />
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="item-quantity-compact">
                        <div className="quantity-controls-compact">
                          <button
                            className="quantity-btn-compact minus"
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            disabled={updatingItems.has(item.id)}
                          >
                            -
                          </button>
                          <span className="quantity-display-compact">
                            {updatingItems.has(item.id) ? (
                              <div className="mini-spinner-compact"></div>
                            ) : (
                              item.quantity
                            )}
                          </span>
                          <button
                            className="quantity-btn-compact plus"
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            disabled={updatingItems.has(item.id)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="remove-btn-compact"
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={updatingItems.has(item.id)}
                          title="Remove item"
                        >
                          <BiTrash />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Cart Summary */}
              <div className="cart-summary-compact">
                <div className="summary-line-compact">
                  <span>Total</span>
                  <span className="total-amount-compact">
                    {convertToLocale({
                      amount: cart.total ?? 0,
                      currency_code: cart?.currency_code,
                    })}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="cart-actions-compact">
                <button
                  className="view-cart-btn-compact"
                  onClick={handleViewCart}
                >
                  View Cart
                </button>
                <button
                  className="checkout-btn-compact"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
