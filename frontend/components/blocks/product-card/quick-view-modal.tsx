"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { HttpTypes } from "@medusajs/types";
import PreviewPrice from "@/components/blocks/price";
import AddToCartButton from "@/components/blocks/addtocart";
import "./quick-view-modal.css";
import { toast } from "react-toastify";

interface QuickViewModalProps {
  product: HttpTypes.StoreProduct;
  isOpen: boolean;
  onClose: () => void;
  selectedImageIndex: number;
  onImageChange: (index: number) => void;
  productImages: string[];
  cheapestPrice: any;
}

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
  selectedImageIndex,
  onImageChange,
  productImages,
  cheapestPrice,
}: QuickViewModalProps) {
  const currentImage = productImages[selectedImageIndex] || product.thumbnail;

  const nextImage = useCallback(() => {
    onImageChange(
      selectedImageIndex === productImages.length - 1
        ? 0
        : selectedImageIndex + 1
    );
  }, [selectedImageIndex, productImages.length, onImageChange]);

  const prevImage = useCallback(() => {
    onImageChange(
      selectedImageIndex === 0
        ? productImages.length - 1
        : selectedImageIndex - 1
    );
  }, [selectedImageIndex, productImages.length, onImageChange]);

  const onSuccess = useCallback(() => {
    toast.success("Product added to cart successfully");
  }, []);

  if (!isOpen) return null;

  return (
    <div className="ayur-quickview-modal-overlay" onClick={onClose}>
      <div
        className="ayur-quickview-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="ayur-quickview-modal-close" onClick={onClose}>
          ×
        </button>

        <div className="ayur-quickview-modal-main">
          <button
            className="ayur-quickview-modal-nav ayur-quickview-modal-prev"
            onClick={prevImage}
          >
            ‹
          </button>

          <div className="ayur-quickview-modal-image">
            <Image
              src={currentImage}
              alt={product.title}
              width={600}
              height={400}
              className="ayur-quickview-modal-img"
            />
          </div>

          <button
            className="ayur-quickview-modal-nav ayur-quickview-modal-next"
            onClick={nextImage}
          >
            ›
          </button>
        </div>

        {/* Thumbnail gallery in modal */}
        {productImages.length > 1 && (
          <div className="ayur-quickview-modal-thumbnails">
            {productImages.map((image, index) => (
              <div
                key={index}
                className={`ayur-quickview-modal-thumbnail ${
                  selectedImageIndex === index ? "active" : ""
                }`}
                onClick={() => onImageChange(index)}
              >
                <Image
                  src={image}
                  alt={`${product.title} thumbnail ${index + 1}`}
                  width={80}
                  height={60}
                />
              </div>
            ))}
          </div>
        )}

        {/* Product info in modal */}
        <div className="ayur-quickview-modal-info">
          <h3>{product.title}</h3>
          <div className="d-flex align-items-center gap-2 justify-content-center">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
          <div className="ayur-quickview-modal-actions">
            <AddToCartButton
              product={product}
              disabled={false}
              onSuccess={onSuccess}
            />
            <Link
              href={`/product/${product.id}`}
              className="ayur-btn ayur-btn-secondary"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
