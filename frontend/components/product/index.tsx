"use client";

import Link from "next/link";
import Head from "next/head";
import { isEqual } from "lodash";
import { toast } from "react-toastify";
import { addToCart } from "@/lib/data/cart";
import { HttpTypes } from "@medusajs/types";
import { useEffect, useMemo, useState } from "react";
import ProductImageCarousel from "./product-image-carousel";

import "react-quill/dist/quill.snow.css";

import OptionSelect from "./option-select";
import ProductPrice from "./product-price2";
import SpecialOffer from "./SpecialOffer";
import { useCartContext } from "@/lib/context/cart-context";
import { BiCheck } from "react-icons/bi";
import ProductFeature from "./product-feature";
import PaymentOptions from "./payment-options";
import BuyNowButton from "@/components/blocks/buy-now-button";
import ButtonSpinner from "@/components/blocks/button-spinner";
import { useBuyNow } from "@/hooks/useBuyNow";

type ProductDetailsProps = {
  product: HttpTypes.StoreProduct;
  region: HttpTypes.StoreRegion;
  countryCode: string;
  reviews: any;
};

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value;
    return acc;
  }, {});
};

const ProductDetails = ({
  product,
  region,
  countryCode,
  reviews,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);
  const [options, setOptions] = useState<Record<string, string | undefined>>(
    {}
  );
  const [isAdding, setIsAdding] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);

  // Use cart context for global state management
  const { openCartPopover, triggerCartRefresh } = useCartContext();
  const { buyNow } = useBuyNow();

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

  // Product images - in a real app, these would be actual product images
  const productImages = product?.images
    ? product?.images?.map((img) => img.url)
    : [];

  const incrementQuantity = () => {
    // max quantity is 10
    if (quantity < 100) {
      setQuantity(quantity + 1);
    }
  };
  const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true;
    }
    if (selectedVariant?.allow_backorder) {
      return true;
    }
    if (
      selectedVariant?.inventory_quantity &&
      (selectedVariant?.inventory_quantity || 0) > 0
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

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null;
    if (quantity > 100) {
      alert("Maximum Quantity 100");
      return;
    }
    setIsAdding(true);
    await addToCart({
      variantId: selectedVariant.id,
      quantity,
      countryCode,
    });

    // Open cart popover and trigger refresh
    openCartPopover();
    triggerCartRefresh();

    toast.success("Product added to cart successfully");
    setIsAdding(false);
  };

  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = product.variants[0].options?.at(0);
      if (variantOptions !== null) {
        setOptionValue(variantOptions?.option_id, variantOptions?.value);
      }
    }
  }, [product.variants]);

  return (
    <>
      <Head>
        <title>{product.title} | Yakaawa</title>
        <meta name="description" content={product.description || ""} />

        {/* Open Graph */}
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.description || ""} />
        <meta property="og:image" content={productImages[0]} />
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="Yakaawa" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.title} />
        <meta name="twitter:description" content={product.description || ""} />
        <meta name="twitter:image" content={productImages[0]} />
      </Head>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes codPulse {
            0%, 100% {
              box-shadow: 0 0 0 0 rgba(40, 167, 69, 0.7),
                          0 0 10px 2px rgba(40, 167, 69, 0.3);
              transform: scale(1);
            }
            50% {
              box-shadow: 0 0 0 8px rgba(40, 167, 69, 0),
                          0 0 20px 4px rgba(40, 167, 69, 0.5);
              transform: scale(1.02);
            }
          }

          @keyframes codShine {
            0% {
              background-position: -200% center;
            }
            100% {
              background-position: 200% center;
            }
          }

          .cod-badge-flashy {
            animation: codPulse 2s ease-in-out infinite;
            background: linear-gradient(
              135deg,
              #28a745 0%,
              #20c997 50%,
              #28a745 100%
            );
            background-size: 200% auto;
            position: relative;
            overflow: hidden;
            color: white !important;
            font-weight: 700 !important;
            border: 2px solid #fff !important;
            box-shadow: 0 0 15px rgba(40, 167, 69, 0.4),
                        0 4px 8px rgba(0, 0, 0, 0.1) !important;
          }

          .cod-badge-flashy::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.4),
              transparent
            );
            animation: codShine 3s infinite;
            z-index: 1;
          }

          .cod-badge-flashy:hover {
            animation: codPulse 1s ease-in-out infinite;
            transform: scale(1.05);
            box-shadow: 0 0 25px rgba(40, 167, 69, 0.6),
                        0 6px 12px rgba(0, 0, 0, 0.15) !important;
          }

          .cod-badge-flashy > * {
            position: relative;
            z-index: 2;
          }

          @media (max-width: 767.98px) {
            .pb-mobile-sticky {
              padding-bottom: 80px !important;
            }
          }
        `,
        }}
      />

      {/*----------- Header Section End ---------*/}
      {/*----------- Breadcrumb Section end ---------*/}
      {/*----------- Shop single page Section start ---------*/}
      <div className={`ayur-bgcover pb-1 ${selectedVariant ? "" : ""}`}>
        <div className="container">
          <div>
            <nav aria-label="breadcrumb" className="mb-3  pt-2 pt-md-0">
              <ol className="breadcrumb bg-transparent p-0 m-0 d-flex align-items-center flex-wrap">
                <li className="breadcrumb-item">
                  <Link
                    href="/"
                    className="text-decoration-none text-muted small"
                  >
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link
                    href="/shop"
                    className="text-decoration-none text-muted small"
                  >
                    Shop
                  </Link>
                </li>
                <li className="breadcrumb-item active d-flex">
                  <span
                    className="text-dark small"
                    aria-current="page"
                    style={{
                      maxWidth: "100px",
                      marginTop: "2px",
                      display: "inline-block",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {product.title}
                  </span>
                </li>
              </ol>
            </nav>
          </div>
          <div className="row align-items-top">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="w-full h-full">
                <ProductImageCarousel
                  images={productImages}
                  productTitle={product.title}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 mt-md-0 mt-3">
              <div className="ayur-shopsin-details">
                <div className="ayur-shopsin-heaing">
                  <h3>{product.title}</h3>
                </div>
                <div className="product-description  mb-3">
                  {product.subtitle}
                </div>
                {/* Stock Status */}
                <div className="mb-2 d-flex align-items-center gap-2 gap-md-3 flex-wrap">
                  {inStock ? (
                    <span
                      className="text-success d-inline-flex align-items-center"
                      style={{
                        fontSize: "clamp(0.875rem, 2.5vw, 1rem)",
                        fontWeight: "600",
                      }}
                    >
                      <BiCheck
                        size={22}
                        className="d-none d-sm-inline-flex"
                        style={{ flexShrink: 0 }}
                      />
                      <BiCheck
                        size={20}
                        className="d-inline-flex d-sm-none"
                        style={{ flexShrink: 0 }}
                      />
                      <span className="ms-1">In Stock</span>
                    </span>
                  ) : (
                    <span
                      className="text-danger"
                      style={{
                        fontSize: "clamp(0.875rem, 2.5vw, 1rem)",
                        fontWeight: "600",
                      }}
                    >
                      Out of Stock
                    </span>
                  )}
                  {/* COD Badge */}
                  <span
                    className="cod-badge-flashy d-inline-flex align-items-center gap-1"
                    style={{
                      fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                      padding: "clamp(6px, 1.5vw, 8px) clamp(14px, 3vw, 18px)",
                      borderRadius: "25px",
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <BiCheck
                      size={18}
                      className="d-none d-sm-inline-flex"
                      style={{
                        flexShrink: 0,
                        filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))",
                      }}
                    />
                    <BiCheck
                      size={16}
                      className="d-inline-flex d-sm-none"
                      style={{
                        flexShrink: 0,
                        filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))",
                      }}
                    />
                    <span style={{ textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}>
                      COD Available
                    </span>
                  </span>
                </div>

                {reviews && (
                  <div>
                    ⭐ {reviews?.average_rating} ({reviews?.count} reviews)
                  </div>
                )}

                {/* @ts-ignore  */}
                {product?.variants?.at(0)?.inventory?.at(0)?.sku ? (
                  <div className="mt-2 mb-1 text-muted">
                    <small className="sku-text">
                      SKU : {/* @ts-ignore  */}
                      {String(product?.variants?.at(0)?.inventory?.at(0)?.sku)}
                    </small>
                  </div>
                ) : null}

                <ProductPrice product={product} variant={selectedVariant} />

                <div>
                  {(product.variants?.length ?? 0) > 1 && (
                    <div className="space-y-3">
                      {/* <h3 className="font-medium">Select Variant</h3> */}
                      {(product.variants?.length ?? 0) > 1 && (
                        <div className="flex flex-col gap-y-4">
                          {(product.options || []).map((option) => {
                            return (
                              <div key={option.id}>
                                <OptionSelect
                                  product={product}
                                  variants={product.variants || []}
                                  option={option}
                                  current={options[option.id]}
                                  updateOption={setOptionValue}
                                  title={option.title ?? ""}
                                  data-testid="product-options"
                                  disabled={isAdding}
                                />
                              </div>
                            );
                          })}
                        </div>
                      )}
                      <br />
                    </div>
                  )}
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div
                    className="input-group border"
                    style={{
                      width: "150px",
                      overflow: "hidden",
                      borderRadius: "1rem",
                    }}
                  >
                    <button
                      className="btn btn-outline-secondary border-0"
                      type="button"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="form-control text-center"
                      min={1}
                      max={10}
                      value={quantity}
                      onChange={(event) => {
                        const val = parseInt(event.target.value);
                        if (!isNaN(val) && val >= 1 && val <= 10) {
                          setQuantity(val);
                        }
                      }}
                      style={{ maxWidth: "90px" }}
                    />
                    <button
                      className="btn btn-outline-secondary border-0"
                      type="button"
                      onClick={incrementQuantity}
                      disabled={quantity >= 10}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Special Offer Section */}
                <SpecialOffer />

                <div className="mt-2">
                  <p>
                    <span style={{ fontSize: "0.95rem", color: "#555" }}>
                      Please read our{" "}
                      <Link
                        href="/shipping-delivery"
                        target="_blank"
                        style={{
                          textDecoration: "underline",
                          color: "#007bff",
                        }}
                      >
                        Shipping Policy
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/return-policy"
                        target="_blank"
                        style={{
                          textDecoration: "underline",
                          color: "#007bff",
                        }}
                      >
                        Refund Policy
                      </Link>{" "}
                      for more details.
                    </span>
                  </p>

                  {selectedVariant && (
                    <div className="d-none d-md-flex gap-2">
                      <button
                        className="ayur-btn btn btn-primary"
                        style={{
                          padding: "10px 50px",
                        }}
                        onClick={handleAddToCart}
                        disabled={
                          !inStock ||
                          !selectedVariant ||
                          isAdding ||
                          !isValidVariant
                        }
                      >
                        {!selectedVariant ? (
                          "Select variant"
                        ) : !inStock || !isValidVariant ? (
                          "Out of stock"
                        ) : (
                          <>
                            {isAdding && <ButtonSpinner />}
                            Add to cart
                          </>
                        )}
                      </button>

                      <BuyNowButton
                        product={product}
                        inStock={inStock}
                        quantity={quantity}
                        countryCode={countryCode}
                        isValidVariant={isValidVariant}
                        selectedVariant={selectedVariant}
                        disabled={
                          !inStock || !selectedVariant || !isValidVariant
                        }
                      />
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  {/* Features Section */}
                  <PaymentOptions />
                  {/* <ProductFeature /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ayur-bgshape ayur-shopsin">
        <img src="/assets/images/bg-shape1.png" alt="img" />
      </div>

      {/* Sticky Mobile Add to Cart Section */}
      {selectedVariant && (
        <div
          className="d-md-none sticky-mobile-cart"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            borderTop: "1px solid #e0e0e0",
            padding: "12px 16px",
            boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
            zIndex: 10000,
          }}
        >
          <div className="d-flex gap-2 w-100">
            <button
              className="ayur-btn btn btn-primary flex-fill"
              style={{
                padding: "12px 20px",
                fontSize: "0.95rem",
                fontWeight: "600",
              }}
              onClick={handleAddToCart}
              disabled={
                !inStock || !selectedVariant || isAdding || !isValidVariant
              }
            >
              {!selectedVariant ? (
                "Select variant"
              ) : !inStock || !isValidVariant ? (
                "Out of stock"
              ) : (
                <>
                  {isAdding && <ButtonSpinner />}
                  Add to cart
                </>
              )}
            </button>

            <button
              className="ayur-btn btn btn-secondary flex-fill"
              style={{
                padding: "12px 20px",
                fontSize: "0.95rem",
                fontWeight: "600",
                position: "relative",
              }}
              onClick={async () => {
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
              }}
              disabled={
                !inStock || !selectedVariant || !isValidVariant || isBuyingNow
              }
            >
              {isBuyingNow && <ButtonSpinner />}
              Buy Now
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
