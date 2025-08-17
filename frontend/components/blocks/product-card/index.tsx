"use client";

import Link from "next/link";
import { useState } from "react";
import { HttpTypes } from "@medusajs/types";
import AddToCartButton from "@/components/blocks/addtocart";
import { getProductPrice } from "@/lib/util/get-product-price";
import ProductImage from "./thumbnail";
import { toast } from "react-toastify";
import "./product-card.css";
import PreviewPrice from "../price";

interface ProductCardProps {
  product: HttpTypes.StoreProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState(0);

  const { cheapestPrice } = getProductPrice({
    product,
  });

  // Get product variants for volume options
  const variants = product.variants || [];
  const hasVariants = variants.length > 1;

  // Calculate discount percentage if there's an original price
  const discountPercentage =
    cheapestPrice?.original_price_number &&
    cheapestPrice?.calculated_price_number
      ? Math.round(
          ((cheapestPrice.original_price_number -
            cheapestPrice.calculated_price_number) /
            cheapestPrice.original_price_number) *
            100
        )
      : 0;

  // Get product benefits/description (using tags or description)
  const getProductBenefits = () => {
    if (product.tags && product.tags.length > 0) {
      return product.tags.slice(0, 3).join(" | ");
    }
    if (product.description) {
      return product.description.length > 60
        ? `${product.description.substring(0, 60)}...`
        : product.description;
    }
    return "100% Natural | Ayurvedic | Premium Quality";
  };

  const onSuccess = () => {
    toast.success("Product added to cart successfully");
  };

  return (
    <div className="product-card">
      {/* Product Image Section */}
      <div>
        <ProductImage
          thumbnail={product.thumbnail}
          images={product.images}
          size="medium"
          isFeatured={false}
          className="product-image"
        />

        {/* Save Badge */}
        {discountPercentage > 0 && (
          <div className="save-badge">Save {discountPercentage}%</div>
        )}
      </div>

      {/* Product Information Section */}
      <div className="product-card-info">
        {/* Rating */}
        <div className="product-rating">
          <span className="star">★</span>
          <span className="rating-text">4.6 (13 reviews)</span>
        </div>

        {/* Product Title */}
        <h3
          className="product-title text-center"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "unset",
          }}
        >
          <Link href={`/product/${product.handle}`}>{product.title}</Link>
        </h3>

        {/* Product Benefits */}
        <p className="product-benefits text-center">{getProductBenefits()}</p>

        {/* Volume Options */}
        {hasVariants && (
          <div className="volume-options">
            {variants.slice(0, 2).map((variant, index) => (
              <button
                key={variant.id}
                className={`volume-option ${
                  selectedVariant === index ? "active" : ""
                }`}
                onClick={() => setSelectedVariant(index)}
              >
                {variant.title || `${variant.weight || "Standard"}ml`}
              </button>
            ))}
          </div>
        )}

        {/* Pricing */}
        <div className="product-pricing d-flex justify-content-center">
          <PreviewPrice price={cheapestPrice} />
        </div>

        {/* Add to Cart Button */}
        <div className="add-to-cart-section">
          <AddToCartButton
            product={product}
            disabled={false}
            onSuccess={onSuccess}
          />
        </div>
      </div>
    </div>
  );
}
