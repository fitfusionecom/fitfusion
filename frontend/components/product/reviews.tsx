"use client";

import { getProductReviews } from "@/lib/data/product";
import { Star, StarSolid } from "@medusajs/icons";
import { StoreProductReview } from "@/lib/data/product";
import { Button } from "@medusajs/ui";
import { useState, useEffect } from "react";
import ProductReviewsForm from "./review-form";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import "./GoogleReviews.css";
import "../homepage/GoogleReviews.css";

type ProductReviewsProps = {
  productId: string;
};

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [page, setPage] = useState(1);
  const defaultLimit = 10;
  const [reviews, setReviews] = useState<StoreProductReview[]>([]);
  const [rating, setRating] = useState(0);
  const [hasMoreReviews, setHasMoreReviews] = useState(false);
  const [count, setCount] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    getProductReviews({
      productId,
      limit: defaultLimit,
      offset: (page - 1) * defaultLimit,
    }).then(({ reviews: paginatedReviews, average_rating, count, limit }) => {
      setReviews((prev) => {
        const newReviews = paginatedReviews.filter(
          (review) => !prev.some((r) => r.id === review.id)
        );
        return [...prev, ...newReviews];
      });
      setRating(Math.round(average_rating));
      console.log(count, limit, page, count > limit * page);
      setHasMoreReviews(count > limit * page);
      setCount(count);
    });
  }, [page, refreshTrigger]);

  // Function to refresh reviews when a new review is submitted
  const handleReviewSubmitted = () => {
    // Reset reviews and trigger refresh
    setReviews([]);
    setPage(1);
    setRefreshTrigger((prev) => prev + 1);
  };

  if (reviews.length === 0) {
    return null;
  }

  return (
    <div className="product-page-constraint">
      {/* <div className="flex flex-col items-center text-center mb-16">
        <span className="text-base-regular text-gray-600 mb-6">
          Product Reviews
        </span>
        <p className="text-2xl-regular text-ui-fg-base max-w-lg">
          See what our customers are saying about this product.
        </p>
        <div className="flex gap-x-2 justify-center items-center">
          <div className="flex gap-x-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index}>
                {!rating || index > rating ? (
                  <Star />
                ) : (
                  <StarSolid className="text-ui-tag-orange-icon" />
                )}
              </span>
            ))}
          </div>
          <span className="text-base-regular text-gray-600">
            {count} reviews
          </span>
        </div>
      </div> */}
      <section className="google-reviews-section py-5 bg-light mt-2">
        <div className="container">
          {/* Header */}
          <div className="row mb-4">
            <div className="col-12 text-center">
              <h2 className="h2 text-dark mb-2">Reviews</h2>
              <div
                className="mx-auto"
                style={{
                  width: "100px",
                  height: "2px",
                  backgroundColor: "#6c757d",
                }}
              ></div>
            </div>
          </div>

          {/* Reviews Swiper */}
          <div className="row">
            <div className="col-12">
              <div className="position-relative">
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={20}
                  slidesPerView={1}
                  navigation={{
                    nextEl: ".custom-swiper-nav.swiper-button-next",
                    prevEl: ".custom-swiper-nav.swiper-button-prev",
                  }}
                  pagination={{
                    clickable: true,
                    el: ".custom-swiper-pagination",
                  }}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  breakpoints={{
                    576: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 30,
                    },
                    992: {
                      slidesPerView: 3,
                      spaceBetween: 30,
                    },
                    1200: {
                      slidesPerView: 3,
                      spaceBetween: 40,
                    },
                  }}
                  className="google-reviews-swiper"
                >
                  {reviews.map((review) => (
                    <SwiperSlide key={review.id}>
                      <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-4">
                          {/* Rating Stars */}
                          <div className="mb-3">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <span key={index}>
                                {index < review.rating ? (
                                  <StarSolid className="text-ui-tag-orange-icon" />
                                ) : (
                                  <Star />
                                )}
                              </span>
                            ))}
                          </div>

                          {/* Review Text */}
                          <p
                            className="card-text text-muted mb-3"
                            style={{ fontSize: "14px", lineHeight: "1.5" }}
                          >
                            {review.content}
                          </p>

                          {/* Reviewer Name */}
                          <h6
                            className="card-title mb-2 text-dark"
                            style={{ fontSize: "16px", fontWeight: "600" }}
                          >
                            {review.first_name} {review.last_name}
                          </h6>

                          {/* Source */}
                          <div className="d-flex align-items-center">
                            <small
                              className="text-muted"
                              style={{ fontSize: "12px" }}
                            >
                              Posted on Fit Fusion Ayurveda
                            </small>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className="mt-4 d-flex justify-content-center align-items-center">
                  <ProductReviewsForm
                    productId={productId}
                    onReviewSubmitted={handleReviewSubmitted}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
