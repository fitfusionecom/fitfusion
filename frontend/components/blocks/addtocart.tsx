"use client";
import { addToCart } from "@/lib/data/cart";
import { HttpTypes } from "@medusajs/types";
// import { Button } from "@medusajs/ui";
import { isEqual } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { useCartContext } from "@/lib/context/cart-context";

type CartButtonProps = {
  product: HttpTypes.StoreProduct;
  disabled?: boolean;
  variant?: "default" | "compact" | "modal";
  onSuccess?: () => void;
};

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value;
    return acc;
  }, {});
};

const AddToCartButton = ({
  product,
  disabled,
  variant = "default",
  onSuccess,
}: CartButtonProps) => {
  const [options, setOptions] = useState<Record<string, string | undefined>>(
    {}
  );

  const [isAdding, setIsAdding] = useState(false);
  const [showVariantSelector, setShowVariantSelector] = useState(false);

  // Use cart context for global state management
  const { openCartPopover, triggerCartRefresh } = useCartContext();

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    const variantOptions = optionsAsKeymap(
      product.variants && product.variants[0].options
    );
    setOptions(variantOptions ?? {});
  }, [product.variants]);

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return;
    }
    const fVariant = product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options);
      return isEqual(variantOptions, options);
    });
    return fVariant;
  }, [product.variants, options]);

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }));
  };

  //check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options);
      return isEqual(variantOptions, options);
    });
  }, [product.variants, options]);

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true;
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true;
    }

    if (
      selectedVariant?.inventory_quantity &&
      (selectedVariant?.inventory_quantity || 0) == 0
    ) {
      return true;
    }

    // If there is inventory available, we can add to cart
    if (
      // @ts-ignore
      selectedVariant?.inventory &&
      // @ts-ignore
      (selectedVariant?.inventory_items.length || 0) > 0
    ) {
      return true;
    }

    // Otherwise, we can't add to cart
    return false;
  }, [selectedVariant]);

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null;

    setIsAdding(true);

    try {
      await addToCart({
        variantId: selectedVariant.id,
        quantity: 1,
      });

      // Open cart popover and trigger refresh
      openCartPopover();
      triggerCartRefresh();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  // Get unique options for the product
  const productOptions = useMemo(() => {
    if (!product.options) return [];

    return product.options.map((option) => ({
      id: option.id,
      name: option.title || option.id,
      values: option.values?.map((v) => v.value) || [],
    }));
  }, [product.options]);

  const buttonText = useMemo(() => {
    if (!selectedVariant && !options) {
      return "Select variant";
    } else if (!inStock || !isValidVariant) {
      return "Out of stock";
    } else if (isAdding) {
      return "Adding...";
    } else {
      return "Add to Cart";
    }
  }, [selectedVariant, options, inStock, isValidVariant, isAdding]);

  const buttonClass = useMemo(() => {
    const baseClass =
      "add-to-cart-btn w-full d-flex justify-content-center align-items-center gap-2";
    if (variant === "compact") {
      return `${baseClass} ayur-btn-compact`;
    } else if (variant === "modal") {
      return `${baseClass} ayur-btn-modal`;
    }
    return baseClass;
  }, [variant]);

  if (productOptions.length > 0 && !selectedVariant && variant !== "compact") {
    return (
      <div className="ayur-variant-selector">
        <button
          onClick={() => setShowVariantSelector(!showVariantSelector)}
          className={buttonClass}
          disabled={disabled}
        >
          Select Options
        </button>

        {showVariantSelector && (
          <div className="ayur-variant-options">
            {productOptions.map((option) => (
              <div key={option.id} className="ayur-variant-option">
                <label className="ayur-variant-label">{option.name}:</label>
                <div className="ayur-variant-values">
                  {option.values.map((value) => (
                    <button
                      key={value}
                      onClick={() => setOptionValue(option.id, value)}
                      className={`ayur-variant-value ${
                        options[option.id] === value ? "active" : ""
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {isValidVariant && (
              <button
                data-action="add-to-cart"
                onClick={handleAddToCart}
                disabled={!inStock || isAdding}
                className="ayur-btn ayur-btn-primary"
              >
                {buttonText}
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      <button
        data-action="add-to-cart"
        onClick={handleAddToCart}
        disabled={
          !inStock ||
          !selectedVariant ||
          !!disabled ||
          isAdding ||
          !isValidVariant
        }
        className={buttonClass}
        data-testid="add-product-button"
      >
        {!selectedVariant && !options ? (
          "Select variant"
        ) : !inStock || !isValidVariant ? (
          "Out of stock"
        ) : (
          <>Add to Cart</>
        )}

        {isAdding && "..."}
      </button>
    </div>
  );
};

export default AddToCartButton;
