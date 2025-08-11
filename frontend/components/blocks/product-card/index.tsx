"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";
import { HttpTypes } from "@medusajs/types";
import PreviewPrice from "@/components/blocks/price";
import AddToCartButton from "@/components/blocks/addtocart";
import { getProductPrice } from "@/lib/util/get-product-price";
import QuickViewModal from "./quick-view-modal";
import ProductImage from "./thumbnail";
import { toast } from "react-toastify";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  product: HttpTypes.StoreProduct;
  showQuickView?: boolean;
}

export default function ProductCard({
  product,
  showQuickView = true,
}: ProductCardProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const { cheapestPrice } = getProductPrice({
    product,
  });

  // Get all product images including thumbnail
  const productImages = [
    product.thumbnail,
    ...(product.images?.map((img) => img.url) || []),
  ].filter(Boolean);

  const initialImage = product.thumbnail || product.images?.[0]?.url;

  const handleImageClick = useCallback(() => {
    if (showQuickView) {
      setIsQuickViewOpen(true);
    }
  }, [showQuickView]);

  const handleThumbnailClick = useCallback((index: number) => {
    setSelectedImageIndex(index);
  }, []);

  const closeQuickView = useCallback(() => {
    setIsQuickViewOpen(false);
  }, []);

  const handleImageChange = useCallback((index: number) => {
    setSelectedImageIndex(index);
  }, []);

  const onSuccess = useCallback(() => {
    toast.success("Product added to cart successfully");
  }, [product.title]);

  return (
    <>
      <div className="ayur-tpro-box">
        <div className="ayur-tpro-img">
          <ProductImage
            thumbnail={product.thumbnail}
            images={product.images}
            size="medium"
            isFeatured={false}
            className="cursor-pointer"
            onClick={handleImageClick}
          />

          {/* Image thumbnails */}
          {productImages.length > 1 && (
            <div className="ayur-tpro-thumbnails">
              {productImages.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className={`ayur-tpro-thumbnail ${
                    selectedImageIndex === index ? "active" : ""
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <Image
                    src={image}
                    alt={`${product.title} thumbnail ${index + 1}`}
                    width={60}
                    height={40}
                  />
                </div>
              ))}
              {productImages.length > 4 && (
                <div className="ayur-tpro-thumbnail-more">
                  <span>+{productImages.length - 4}</span>
                </div>
              )}
            </div>
          )}

          {/* Quick view overlay */}
          {showQuickView && (
            <div className="ayur-tpro-quickview" onClick={handleImageClick}>
              <span>Quick View</span>
            </div>
          )}
        </div>

        <div className="ayur-tpro-text">
          <h3
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "normal",
            }}
          >
            <Link
              href={`/product/${product.handle}`}
              style={{ textDecoration: "none" }}
            >
              {product.title}
            </Link>
          </h3>

          {/* Product description preview */}
          {product.description && (
            <p className="ayur-tpro-description">
              {product.description.length > 80
                ? `${product.description.substring(0, 80)}...`
                : product.description}
            </p>
          )}

          <div className="ayur-tpro-price">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>

          {/* Product variants if available */}
          {product.variants && product.variants.length > 1 && (
            <div className="ayur-tpro-variants">
              <span className="ayur-tpro-variant-count">
                {product.variants.length} variants available
              </span>
            </div>
          )}

          <div className="ayur-tpro-btn">
            <AddToCartButton
              product={product}
              disabled={false}
              onSuccess={onSuccess}
            />
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={closeQuickView}
        selectedImageIndex={selectedImageIndex}
        onImageChange={handleImageChange}
        productImages={productImages}
        cheapestPrice={cheapestPrice}
      />
    </>
  );
}
