"use client";

import "./buy-now-button.css";
import React, { useState } from "react";
import { HttpTypes } from "@medusajs/types";
import { useBuyNow } from "@/hooks/useBuyNow";

type BuyNowButtonProps = {
  product: HttpTypes.StoreProduct;
  disabled?: boolean;
  variant?: "default" | "compact";
  countryCode?: string;
  quantity?: number;
  selectedVariant?: HttpTypes.StoreProductVariant;
  inStock?: boolean;
  isValidVariant?: boolean;
};

const BuyNowButton = ({
  disabled,
  countryCode = "in",
  quantity = 1,
  selectedVariant,
  inStock,
  isValidVariant,
}: BuyNowButtonProps) => {
  const { buyNow } = useBuyNow();
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  // Handle buy now action
  const handleBuyNow = async () => {
    if (!selectedVariant?.id) return null;
    if (quantity > 100) {
      alert("Maximum Quantity 100");
      return;
    }

    setIsBuyingNow(true);

    try {
      await buyNow({
        variantId: selectedVariant.id,
        quantity,
        countryCode,
      });
    } catch (error) {
      console.error("Failed to buy now:", error);
      alert("Failed to proceed with buy now. Please try again.");
    } finally {
      setIsBuyingNow(false);
    }
  };

  // For single variant products, show quantity selector and buy now button
  return (
    <button
      onClick={handleBuyNow}
      disabled={
        !inStock ||
        !selectedVariant ||
        !!disabled ||
        isBuyingNow ||
        !isValidVariant
      }
      className="ayur-btn btn btn-secondary"
      style={{
        padding: "10px 50px",
      }}
      data-testid="buy-now-button"
    >
      Buy Now{isBuyingNow && "..."}
    </button>
  );
};

export default BuyNowButton;
