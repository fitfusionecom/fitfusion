"use client";

import { useQuery, useMutation, useQueryClient } from "react-query";
import { cartService } from "@/lib/services/cartService";
import { HttpTypes } from "@medusajs/types";
import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/navigation";
import "./CartPage.css";

export default function CartPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());

  // Fetch cart data using React Query
  const {
    data: cart,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: cartService.retrieveCart,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 30, // 30 seconds
    refetchInterval: 1000 * 60, // Refetch every minute
  });

  // Update line item quantity mutation
  const updateQuantityMutation = useMutation({
    mutationFn: ({ lineId, quantity }: { lineId: string; quantity: number }) =>
      cartService.updateLineItem(lineId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  // Delete line item mutation
  const deleteItemMutation = useMutation({
    mutationFn: (lineId: string) => cartService.deleteLineItem(lineId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const handleQuantityChange = async (lineId: string, quantity: number) => {
    if (quantity < 1) return;

    console.log("CartPage handleQuantityChange called:", { lineId, quantity });
    setUpdatingItems((prev) => new Set(prev).add(lineId));

    try {
      await updateQuantityMutation.mutateAsync({ lineId, quantity });
      console.log("CartPage quantity updated successfully");
    } catch (error) {
      console.error("CartPage error updating quantity:", error);
    } finally {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(lineId);
        return newSet;
      });
    }
  };

  const handleRemoveItem = async (lineId: string) => {
    console.log("CartPage handleRemoveItem called:", { lineId });
    try {
      await deleteItemMutation.mutateAsync(lineId);
      console.log("CartPage item removed successfully");
    } catch (error) {
      console.error("CartPage error removing item:", error);
    }
  };

  const handleViewCart = () => {
    // This could navigate to a detailed cart view or refresh the current page
    queryClient.invalidateQueries({ queryKey: ["cart"] });
  };

  const handleBuyNow = () => {
    if (cart) {
      router.push("/checkout");
    }
  };

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

  if (isLoading) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="cart-header">
            <button className="back-button" onClick={() => router.back()}>
              <BiArrowBack />
            </button>
            <h1>Cart</h1>
          </div>
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading cart...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="cart-header">
            <button className="back-button" onClick={() => router.back()}>
              <BiArrowBack />
            </button>
            <h1>Cart</h1>
          </div>
          <div className="error-state">
            <p>Error loading cart. Please try again.</p>
            <button
              onClick={() =>
                queryClient.invalidateQueries({ queryKey: ["cart"] })
              }
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="cart-header">
            <button className="back-button" onClick={() => router.back()}>
              <BiArrowBack />
            </button>
            <h1>Cart</h1>
          </div>
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some products to get started!</p>
            <button
              className="shop-now-btn"
              onClick={() => router.push("/shop")}
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate totals with proper price handling
  const subtotal = cart.items.reduce((sum, item) => {
    // Handle both unit_price and calculated_price
    const itemPrice =
      item.unit_price || item.variant?.calculated_price?.calculated_amount || 0;
    return sum + itemPrice * item.quantity;
  }, 0);

  const total = subtotal; // Add tax, shipping, etc. if needed
  const savings = cart.items.reduce((sum, item) => {
    const originalPrice =
      item.variant?.calculated_price?.original_amount || item.unit_price || 0;
    const currentPrice =
      item.unit_price || item.variant?.calculated_price?.calculated_amount || 0;
    return sum + (originalPrice - currentPrice) * item.quantity;
  }, 0);

  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* Header */}
        <div className="cart-header">
          <button className="back-button" onClick={() => router.back()}>
            <BiArrowBack />
          </button>
          <h1>Cart</h1>
        </div>

        {/* Cart Items */}
        <div className="cart-items">
          {cart.items.map((item) => {
            // Handle both unit_price and calculated_price
            const itemPrice =
              item.unit_price ||
              item.variant?.calculated_price?.calculated_amount ||
              0;
            const originalPrice =
              item.variant?.calculated_price?.original_amount || itemPrice;

            return (
              <div key={item.id} className="cart-item">
                {/* Product Image */}
                <div className="item-image">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.title || "Product"}
                      className="product-image"
                    />
                  ) : (
                    <div className="product-image-placeholder">🏷️</div>
                  )}
                </div>

                {/* Product Details */}
                <div className="item-details">
                  <h3 className="product-name">
                    {item.title || item.product_title || "Product"}
                  </h3>
                  <div className="price-info">
                    <span className="current-price">
                      ₹{formatPrice(itemPrice)}
                    </span>
                    {originalPrice > itemPrice && (
                      <span className="original-price">
                        ₹{formatPrice(originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="item-quantity">
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn minus"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      disabled={updatingItems.has(item.id)}
                    >
                      -
                    </button>
                    <span className="quantity-display">
                      {updatingItems.has(item.id) ? (
                        <div className="mini-spinner"></div>
                      ) : (
                        item.quantity
                      )}
                    </span>
                    <button
                      className="quantity-btn plus"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      disabled={updatingItems.has(item.id)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveItem(item.id)}
                    disabled={updatingItems.has(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cart Summary */}
        <div className="cart-summary">
          <div className="summary-line">
            <span>Total</span>
            <span className="total-amount">₹{formatPrice(total)}</span>
          </div>
          {savings > 0 && (
            <div className="savings-info">
              You saved ₹{formatPrice(savings)}!
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="cart-actions">
          <button className="view-cart-btn" onClick={handleViewCart}>
            VIEW CART
          </button>
          <button className="buy-now-btn" onClick={handleBuyNow}>
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
}
