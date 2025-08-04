"use client";

// import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/data/cart";
import { HttpTypes } from "@medusajs/types";
// import { Check, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
// import OptionSelect from "../components/product-actions/option-select";
// import Divider from "@modules/common/components/divider";
import { isEqual } from "lodash";
// import ProductPrice from "../components/product-price";
// import ProductDescription from "../description/indext";
import Link from "next/link";
import Head from "next/head";
// import { WEBSITE } from "brand.config";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import "react-quill/dist/quill.snow.css";
import { Input } from "@medusajs/ui";
import OptionSelect from "./option-select";
import ProductPrice from "./product-price";

type ProductDetailsProps = {
  product: HttpTypes.StoreProduct;
  region: HttpTypes.StoreRegion;
  countryCode: string;
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
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [options, setOptions] = useState<Record<string, string | undefined>>(
    {}
  );
  const [isAdding, setIsAdding] = useState(false);

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

  //console.log(product, "product...............")
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
        <meta property="og:image" content={productImages[activeImage]} />
        {/* <meta
          property="og:url"
          content={`${WEBSITE}/in/products/${product.handle}`}
        /> */}
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="Yakaawa" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.title} />
        <meta name="twitter:description" content={product.description || ""} />
        <meta name="twitter:image" content={productImages[activeImage]} />
      </Head>

      {/*----------- Header Section End ---------*/}
      {/*----------- Breadcrumb Section start ---------*/}
      <div className="ayur-bread-section">
        <div className="ayur-breadcrumb-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="ayur-bread-content">
                  <h2>Product Page</h2>
                  <div className="ayur-bread-list">
                    <span>
                      <a href="index.html">Home</a>
                    </span>
                    <span className="">
                      <a href="shop.html">Shop</a>
                    </span>
                    <span className="ayur-active-page">Product Page</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*----------- Breadcrumb Section end ---------*/}
      {/*----------- Shop single page Section start ---------*/}
      <div className="ayur-bgcover ayur-shopsin-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="w-full h-full">
                <div className="position-relative ratio ratio-1x1 w-100 rounded bg-white border">
                  <Image
                    src={productImages[activeImage] || "/placeholder.svg"}
                    alt="Duck Climb Stairs Toy"
                    fill
                    className="object-fit-contain w-100 h-100"
                    priority
                  />
                </div>
                <Swiper
                  slidesPerView={4}
                  spaceBetween={8}
                  breakpoints={{
                    320: {
                      slidesPerView: 4,
                      spaceBetween: 4,
                    },
                    700: {
                      slidesPerView: 6,
                      spaceBetween: 8,
                    },
                    1024: {
                      slidesPerView: 6,
                      spaceBetween: 8,
                    },
                  }}
                  className="ayur-shopsin-img mt-2"
                  modules={[Navigation]}
                >
                  {productImages.map((image, index) => (
                    <SwiperSlide
                      key={index}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <button
                        className={`position-relative overflow-hidden rounded border ${
                          activeImage === index
                            ? "border-dark"
                            : "border-secondary"
                        } p-0`}
                        style={{ width: "64px", height: "64px" }}
                        onClick={() => setActiveImage(index)}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Product view ${index + 1}`}
                          fill
                          className="object-fit-cover w-100 h-100"
                        />
                        {index === 0 && (
                          <div
                            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center text-center"
                            style={{ fontSize: "8px", lineHeight: "1.1" }}
                          >
                            {index + 1}
                          </div>
                        )}
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="ayur-shopsin-details">
                <div className="ayur-tpro-price">
                  <ProductPrice product={product} variant={selectedVariant} />
                </div>
                <div className="ayur-shopsin-heaing">
                  <h3>{product.title}</h3>
                  <h6>{product.subtitle}</h6>
                  {/* <div className="ayur-tpro-star">
                    <img src="assets/images/star-icon.png" alt="star" />
                    <img src="assets/images/star-icon.png" alt="star" />
                    <img src="assets/images/star-icon.png" alt="star" />
                    <img src="assets/images/star-icon.png" alt="star" />
                    <img src="assets/images/star-icon.png" alt="star" />
                    <p>(2 Customer Reviews)</p>
                  </div> */}
                  <div className="product-description mb-3">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: product.description as any,
                      }}
                    />
                  </div>
                </div>

                <div>
                  {(product.variants?.length ?? 0) > 1 && (
                    <div className="space-y-3 pt-2">
                      <h3 className="font-medium">Select Variant</h3>
                      {(product.variants?.length ?? 0) > 1 && (
                        <div className="flex flex-col gap-y-4">
                          {(product.options || []).map((option) => {
                            return (
                              <div key={option.id}>
                                <OptionSelect
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
                    </div>
                  )}
                </div>

                <div className="ayur-shopsin-quantity">
                  <input
                    type="number"
                    className="form-control"
                    min={1}
                    max={10}
                    value={quantity}
                    onChange={(event) => {
                      if (!isNaN(parseInt(event.target.value))) {
                        setQuantity(parseInt(event.target.value));
                      }
                    }}
                  />
                  <button className="shop-add" onClick={incrementQuantity}>
                    <span />
                  </button>
                  <button className="shop-sub" onClick={decrementQuantity}>
                    <span />
                  </button>
                </div>
                <div className="ayur-shopsin-btn">
                  <button
                    className="ayur-btn"
                    onClick={handleAddToCart}
                    disabled={
                      !inStock ||
                      !selectedVariant ||
                      isAdding ||
                      !isValidVariant
                    }
                  >
                    {!selectedVariant && !options
                      ? "Select variant"
                      : !inStock || !isValidVariant
                      ? "Out of stock"
                      : `Add to cart ${isAdding ? "..." : ""}`}
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="col-lg-12 co-md-12 col-sm-12">
              <div className="ayur-shopsin-tablist">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="nav-home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-home"
                      type="button"
                      role="tab"
                      aria-controls="nav-home"
                      aria-selected="true"
                    >
                      Product Description
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="nav-profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-profile"
                      type="button"
                      role="tab"
                      aria-controls="nav-profile"
                      aria-selected="false"
                    >
                      Customer Reviews
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                    tabIndex={0}
                  >
                    <div className="ayur-product-desc">
                      <p>
                        Praesent ultricies luctus sapien quis vulputate.
                        Praesent molestie, diam vel sagittis venenatis, augue
                        enim lacinia ex, sit amet aliquam massa eros ac felis.
                        Nulla elementum dignissim ipsum, vel dignissim nibh
                        pharetra vel. Quisque ac nisi nec nulla blandit
                        scelerisque eu ut arcu. Mauris ultrices, nisi id semper
                        gravida, arcu odio cursus arcu, a accumsan augue lacus
                        eget ex. Nunc rutrum nulla in lorem elementum
                        condimentum. Nunc in turpis accumsan, blandit ipsum in,
                        ullamcorper nibh.
                      </p>
                      <p>
                        Proin eu tempus magna. Quisque suscipit nunc eget
                        consequat placerat. Fusce eleifend placerat massa,
                        mollis congue lorem eleifend in. Morbi porttitor
                        interdum lacus.{" "}
                      </p>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab"
                    tabIndex={0}
                  >
                    <div className="ayur-post-div ayur-shop-post">
                      <div className="review-author">
                        <img
                          src="https://dummyimage.com/100x100/"
                          alt=""
                          className="img-responsive"
                        />
                      </div>
                      <div className="ayur-blog-post-para">
                        <h3>
                          Marion Alvarado <span>(12.04.24)</span>
                        </h3>
                        <p>
                          Sed ut perspiciatis unde omnis iste natus error sit
                          voluptatem accusantium doloremque laudantium, totam
                          rem aperiam, eaque ipsa quae ab illo inventore
                          veritatis et quasi architecto beatae vitae dicta sunt
                          explicabo.
                        </p>
                      </div>
                      <div className="ayur-shop-review">
                        <img src="assets/images/star-icon.png" alt="star" />
                        <img src="assets/images/star-icon.png" alt="star" />
                        <img src="assets/images/star-icon.png" alt="star" />
                        <img src="assets/images/star-icon.png" alt="star" />
                        <img src="assets/images/star-icon.png" alt="star" />
                      </div>
                    </div>
                    <div className="ayur-post-div ayur-shop-post">
                      <div className="review-author">
                        <img
                          src="https://dummyimage.com/100x100/"
                          alt=""
                          className="img-responsive"
                        />
                      </div>
                      <div className="ayur-blog-post-para">
                        <h3>
                          Steffi Smith <span>(23.04.24)</span>{" "}
                        </h3>
                        <p>
                          Sed ut perspiciatis unde omnis iste natus error sit
                          voluptatem accusantium doloremque laudantium, totam
                          rem aperiam, eaque ipsa quae ab illo inventore
                          veritatis et quasi architecto beatae vitae dicta sunt
                          explicabo.
                        </p>
                      </div>
                      <div className="ayur-shop-review">
                        <img src="assets/images/star-icon.png" alt="star" />
                        <img src="assets/images/star-icon.png" alt="star" />
                        <img src="assets/images/star-icon.png" alt="star" />
                        <img src="assets/images/star-icon.png" alt="star" />
                        <img src="assets/images/star-icon.png" alt="star" />
                      </div>
                    </div>
                    <div className="ayur-comments-form ayur-shopsin-form">
                      <h3>Add A Review</h3>
                      <div className="ayur-shopsin-formrate">
                        <p>Rate This Product</p>
                        <img src="assets/images/star-gray.svg" alt="star" />
                        <img src="assets/images/star-gray.svg" alt="star" />
                        <img src="assets/images/star-gray.svg" alt="star" />
                        <img src="assets/images/star-gray.svg" alt="star" />
                        <img src="assets/images/star-gray.svg" alt="star" />
                      </div>
                      <form method="" className="ayur-leave-form">
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="ayur-form-input">
                              <input
                                type="text"
                                className="form-control require"
                                placeholder="Enter Your Name"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="ayur-form-input">
                              <input
                                type="text"
                                className="form-control require"
                                name="email"
                                placeholder="Enter Your Email"
                                data-valid="email"
                                data-error="Email should be valid."
                              />
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12">
                            <div className="ayur-form-input">
                              <textarea
                                name="your-message"
                                cols={3}
                                rows={8}
                                className="form-control require"
                                placeholder="Enter Your Message..."
                                defaultValue={""}
                              />
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12">
                            <button
                              type="button"
                              className="ayur-btn ayur-con-btn submitForm"
                            >
                              Post Review
                            </button>
                            <div className="response" />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="ayur-bgshape ayur-shopsin">
          <img src="/assets/images/bg-shape1.png" alt="img" />
        </div>
      </div>
      {/*----------- Shop single page Section end ---------*/}
      {/*----------- Testimonial Section start ---------*/}
      {/* <div className="ayur-bgcover ayur-testimonial-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="ayur-heading-wrap">
                <h5>Our Testimonial</h5>
                <h3>What Our&nbsp;Client’s&nbsp;Say</h3>
              </div>
            </div>
          </div>
          <div className="ayur-testimonial-section">
            <div className="swiper ayur-testimonial-slider">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="ayur-test-box">
                    <div className="ayur-test-text">
                      <p>
                        Amet minim mollit non deserunt ullamco est sit aliqua as
                        dolor do amet. officia consequat duis enim velit mollit.
                        Exercitation it’s veam consequat sunt nostrud amet.
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id es.
                      </p>
                    </div>
                    <div className="ayur-test-namesec">
                      <div className="ayur-testname">
                        <img src="https://dummyimage.com/56x56/" alt="image" />
                        <h3>Leslie Alexander</h3>
                      </div>
                      <div className="ayur-testquote">
                        <svg
                          width={74}
                          height={53}
                          viewBox="0 0 74 53"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            opacity="0.1"
                            d="M13.8133 18.3798C12.1853 14.2231 9.62 10.1164 6.19133 6.16C5.106 4.90796 4.958 3.10504 5.846 1.70277C6.53667 0.600975 7.67133 0 8.90467 0C9.25 0 9.59533 0.0250397 9.94067 0.150242C17.1927 2.30374 34.1387 9.94113 34.6073 34.4309C34.78 43.8712 27.972 51.9844 19.1167 52.9109C14.208 53.4117 9.324 51.784 5.698 48.4787C3.90464 46.8276 2.47128 44.8141 1.48999 42.5673C0.508697 40.3205 0.0011672 37.8902 0 35.4325C0 27.1691 5.772 19.9324 13.8133 18.3798ZM58.4847 52.9109C53.6007 53.4117 48.7167 51.784 45.0907 48.4787C43.2972 46.8277 41.8638 44.8142 40.8824 42.5674C39.9011 40.3206 39.3937 37.8902 39.3927 35.4325C39.3927 27.1691 45.1647 19.9324 53.206 18.3798C51.578 14.2231 49.0127 10.1164 45.584 6.16C44.4987 4.90796 44.3507 3.10504 45.2387 1.70277C45.9293 0.600975 47.064 0 48.2973 0C48.6427 0 48.988 0.0250397 49.3333 0.150242C56.5853 2.30374 73.5313 9.94113 74 34.4309V34.7815C74 44.0715 67.266 51.9844 58.4847 52.9109Z"
                            fill="#CD8973"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="ayur-test-box">
                    <div className="ayur-test-text">
                      <p>
                        Amet minim mollit non deserunt ullamco est sit aliqua as
                        dolor do amet. officia consequat duis enim velit mollit.
                        Exercitation it’s veam consequat sunt nostrud amet.
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id es.
                      </p>
                    </div>
                    <div className="ayur-test-namesec">
                      <div className="ayur-testname">
                        <img src="https://dummyimage.com/56x56/" alt="image" />
                        <h3>Brooklyn Simmons</h3>
                      </div>
                      <div className="ayur-testquote">
                        <svg
                          width={74}
                          height={53}
                          viewBox="0 0 74 53"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            opacity="0.1"
                            d="M13.8133 18.3798C12.1853 14.2231 9.62 10.1164 6.19133 6.16C5.106 4.90796 4.958 3.10504 5.846 1.70277C6.53667 0.600975 7.67133 0 8.90467 0C9.25 0 9.59533 0.0250397 9.94067 0.150242C17.1927 2.30374 34.1387 9.94113 34.6073 34.4309C34.78 43.8712 27.972 51.9844 19.1167 52.9109C14.208 53.4117 9.324 51.784 5.698 48.4787C3.90464 46.8276 2.47128 44.8141 1.48999 42.5673C0.508697 40.3205 0.0011672 37.8902 0 35.4325C0 27.1691 5.772 19.9324 13.8133 18.3798ZM58.4847 52.9109C53.6007 53.4117 48.7167 51.784 45.0907 48.4787C43.2972 46.8277 41.8638 44.8142 40.8824 42.5674C39.9011 40.3206 39.3937 37.8902 39.3927 35.4325C39.3927 27.1691 45.1647 19.9324 53.206 18.3798C51.578 14.2231 49.0127 10.1164 45.584 6.16C44.4987 4.90796 44.3507 3.10504 45.2387 1.70277C45.9293 0.600975 47.064 0 48.2973 0C48.6427 0 48.988 0.0250397 49.3333 0.150242C56.5853 2.30374 73.5313 9.94113 74 34.4309V34.7815C74 44.0715 67.266 51.9844 58.4847 52.9109Z"
                            fill="#CD8973"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="ayur-test-box">
                    <div className="ayur-test-text">
                      <p>
                        Amet minim mollit non deserunt ullamco est sit aliqua as
                        dolor do amet. officia consequat duis enim velit mollit.
                        Exercitation it’s veam consequat sunt nostrud amet.
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id es.
                      </p>
                    </div>
                    <div className="ayur-test-namesec">
                      <div className="ayur-testname">
                        <img src="https://dummyimage.com/56x56/" alt="image" />
                        <h3>Leslie Alexander</h3>
                      </div>
                      <div className="ayur-testquote">
                        <svg
                          width={74}
                          height={53}
                          viewBox="0 0 74 53"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            opacity="0.1"
                            d="M13.8133 18.3798C12.1853 14.2231 9.62 10.1164 6.19133 6.16C5.106 4.90796 4.958 3.10504 5.846 1.70277C6.53667 0.600975 7.67133 0 8.90467 0C9.25 0 9.59533 0.0250397 9.94067 0.150242C17.1927 2.30374 34.1387 9.94113 34.6073 34.4309C34.78 43.8712 27.972 51.9844 19.1167 52.9109C14.208 53.4117 9.324 51.784 5.698 48.4787C3.90464 46.8276 2.47128 44.8141 1.48999 42.5673C0.508697 40.3205 0.0011672 37.8902 0 35.4325C0 27.1691 5.772 19.9324 13.8133 18.3798ZM58.4847 52.9109C53.6007 53.4117 48.7167 51.784 45.0907 48.4787C43.2972 46.8277 41.8638 44.8142 40.8824 42.5674C39.9011 40.3206 39.3937 37.8902 39.3927 35.4325C39.3927 27.1691 45.1647 19.9324 53.206 18.3798C51.578 14.2231 49.0127 10.1164 45.584 6.16C44.4987 4.90796 44.3507 3.10504 45.2387 1.70277C45.9293 0.600975 47.064 0 48.2973 0C48.6427 0 48.988 0.0250397 49.3333 0.150242C56.5853 2.30374 73.5313 9.94113 74 34.4309V34.7815C74 44.0715 67.266 51.9844 58.4847 52.9109Z"
                            fill="#CD8973"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-button-prev">
              <svg
                width={34}
                height={16}
                viewBox="0 0 34 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.765606 7.08664L0.766766 7.08542L7.50896 0.375738C8.01406 -0.126907 8.83103 -0.125037 9.33381 0.380125C9.83652 0.885222 9.83458 1.70219 9.32948 2.2049L4.80277 6.70968H32.1291C32.8418 6.70968 33.4194 7.28735 33.4194 8C33.4194 8.71265 32.8418 9.29032 32.1291 9.29032H4.80283L9.32942 13.7951C9.83451 14.2978 9.83645 15.1148 9.33374 15.6199C8.83097 16.1251 8.01393 16.1268 7.5089 15.6243L0.766701 8.91458L0.765541 8.91336C0.260185 8.40897 0.261799 7.58935 0.765606 7.08664Z"
                  fill="#797979"
                />
              </svg>
            </div>
            <div className="swiper-button-next">
              <svg
                width={34}
                height={16}
                viewBox="0 0 34 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32.6538 7.08664L32.6527 7.08542L25.9105 0.375738C25.4054 -0.126907 24.5884 -0.125037 24.0856 0.380125C23.5829 0.885222 23.5849 1.70219 24.09 2.2049L28.6167 6.70968H1.29032C0.577678 6.70968 0 7.28735 0 8C0 8.71265 0.577678 9.29032 1.29032 9.29032H28.6166L24.09 13.7951C23.5849 14.2978 23.583 15.1148 24.0857 15.6199C24.5885 16.1251 25.4055 16.1268 25.9105 15.6243L32.6527 8.91458L32.6539 8.91336C33.1592 8.40897 33.1576 7.58935 32.6538 7.08664Z"
                  fill="#CD8973"
                />
              </svg>
            </div>
          </div>
        </div>
      </div> */}
      {/*----------- Testimonial Section end ---------*/}
      {/*----------- Trending Product Section start ---------*/}

      {/*----------- Trending Product Section end ---------*/}
    </>
  );
};

export default ProductDetails;
