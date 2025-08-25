"use client";

import React, { useState, useEffect } from "react";
import { Star, StarHalf, Check } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ProductReviews.css";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

interface ProductReviewsProps {
  productId?: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const [activeTab, setActiveTab] = useState<"summary" | "reviews">("summary");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Dummy data for reviews
  const reviews: Review[] = [
    // {
    //   id: "1",
    //   author: "Sarah Johnson",
    //   rating: 5,
    //   date: "2024-01-15",
    //   title: "Exceptional Quality & Results!",
    //   comment:
    //     "This product has completely transformed my wellness routine. The quality is outstanding and I've noticed significant improvements in just a few weeks. The natural ingredients make me feel confident about what I'm putting in my body. Highly recommend to anyone looking for authentic Ayurvedic solutions!",
    //   verified: true,
    // },
    // {
    //   id: "2",
    //   author: "Michael Chen",
    //   rating: 4,
    //   date: "2024-01-12",
    //   title: "Great Value & Effective",
    //   comment:
    //     "Excellent product with reasonable pricing. The delivery was fast and the packaging was secure. I appreciate the attention to detail and the product works as described. Would definitely buy again and recommend to friends and family.",
    //   verified: true,
    // },
    // {
    //   id: "3",
    //   author: "Emily Rodriguez",
    //   rating: 5,
    //   date: "2024-01-10",
    //   title: "Perfect for My Needs",
    //   comment:
    //     "Exactly what I was looking for! The product is durable, effective, and the customer service was exceptional. I love how it integrates seamlessly into my daily routine. This has become an essential part of my wellness journey.",
    //   verified: true,
    // },
    // {
    //   id: "4",
    //   author: "David Thompson",
    //   rating: 3,
    //   date: "2024-01-08",
    //   title: "Good but Could Be Better",
    //   comment:
    //     "The product is decent and serves its purpose. There are some minor issues with the packaging, but overall it works as expected. It's a solid option if you're looking for something in this price range.",
    //   verified: true,
    // },
    // {
    //   id: "5",
    //   author: "Lisa Wang",
    //   rating: 5,
    //   date: "2024-01-05",
    //   title: "Life-Changing Experience!",
    //   comment:
    //     "I absolutely love this product! It has improved my daily routine significantly and I feel more energized and balanced. The quality is top-notch and the results speak for themselves. This is exactly what I needed!",
    //   verified: true,
    // },
    // {
    //   id: "6",
    //   author: "Robert Kim",
    //   rating: 4,
    //   date: "2024-01-03",
    //   title: "Very Satisfied Customer",
    //   comment:
    //     "Great product, fast shipping, and excellent customer support. The product exceeded my expectations and I'm very happy with my purchase. Will definitely recommend to friends and family. Thank you!",
    //   verified: true,
    // },
    // {
    //   id: "7",
    //   author: "Jennifer Lee",
    //   rating: 1,
    //   date: "2024-01-01",
    //   title: "Not As Expected",
    //   comment:
    //     "Unfortunately, the product didn't meet my expectations. It seems to be of lower quality than advertised and didn't provide the results I was hoping for. I was disappointed with this purchase.",
    //   verified: true,
    // },
  ];

  const totalReviews = reviews.length;
  // Fix NaN issue by checking if there are reviews
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      : 0;

  const ratingCounts = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  };

  const renderStars = (
    rating: number,
    size: "large" | "medium" | "small" = "medium"
  ) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const starSizes = {
      large: "w-8 h-8",
      medium: "w-5 h-5",
      small: "w-4 h-4",
    };

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            key={i}
            className={`${starSizes[size]} fill-amber-400 text-amber-400`}
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <StarHalf
            key={i}
            className={`${starSizes[size]} fill-amber-400 text-amber-400`}
          />
        );
      } else {
        stars.push(
          <Star key={i} className={`${starSizes[size]} text-gray-300`} />
        );
      }
    }
    return stars;
  };

  const renderRatingBar = (rating: number, count: number) => {
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return (
      <div className="rating-row">
        <div className="rating-stars-small">{renderStars(rating, "small")}</div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="rating-count">{count}</span>
      </div>
    );
  };

  // If no reviews, show empty state
  if (totalReviews === 0) {
    return (
      <section className="reviews-section">
        <div className="reviews-container">
          <div className="max-w-4xl mx-auto px-4">
            <div className="reviews-header">
              <h2 className="reviews-title">Customer Reviews</h2>
              <p className="reviews-subtitle">
                Be the first to review this product
              </p>
            </div>
            <div className="empty-reviews">
              <p className="text-center text-gray-500 py-8">
                No reviews yet. Share your experience with this product!
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`reviews-section ${isVisible ? "fade-in" : ""}`}>
      <div className="reviews-container">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header Section */}
          <div className="reviews-header">
            <h2 className="reviews-title">Customer Reviews</h2>
            <p className="reviews-subtitle">
              Discover what our valued customers have to say about their
              experience with our products
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="reviews-tabs">
            <div className="tab-container">
              <button
                onClick={() => setActiveTab("summary")}
                className={`tab-button ${
                  activeTab === "summary" ? "active" : ""
                }`}
              >
                Review Summary
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`tab-button ${
                  activeTab === "reviews" ? "active" : ""
                }`}
              >
                All Reviews ({totalReviews})
              </button>
            </div>
          </div>

          {activeTab === "summary" && (
            <div className={`summary-card ${isVisible ? "slide-up" : ""}`}>
              <div className="summary-grid">
                {/* Left side - Overall rating */}
                <div className="overall-rating">
                  <div className="rating-stars">
                    {renderStars(averageRating, "large")}
                  </div>
                  <div className="rating-number">
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="rating-text">out of 5 stars</div>
                  <div className="rating-text">
                    Based on {totalReviews} verified reviews
                  </div>
                  {totalReviews > 0 && (
                    <div className="verified-badge">
                      <Check className="check-icon" />
                      <span>Verified purchases</span>
                    </div>
                  )}
                </div>

                {/* Right side - Rating breakdown */}
                <div className="rating-breakdown">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating}>
                      {renderRatingBar(
                        rating,
                        ratingCounts[rating as keyof typeof ratingCounts]
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className={`reviews-carousel ${isVisible ? "slide-up" : ""}`}>
              <div className="position-relative">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={20}
                  slidesPerView={1}
                  navigation={{
                    nextEl: ".reviews-swiper-button-next",
                    prevEl: ".reviews-swiper-button-prev",
                  }}
                  pagination={{
                    clickable: true,
                    el: ".reviews-swiper-pagination",
                  }}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  breakpoints={{
                    576: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 25,
                    },
                    992: {
                      slidesPerView: 3,
                      spaceBetween: 30,
                    },
                    1200: {
                      slidesPerView: 3,
                      spaceBetween: 30,
                    },
                  }}
                  className="reviews-swiper"
                >
                  {reviews.map((review) => (
                    <SwiperSlide key={review.id}>
                      <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-4">
                          {/* Rating Stars */}
                          <div className="mb-3">
                            {renderStars(review.rating, "medium")}
                          </div>

                          {/* Review Title */}
                          <h6
                            className="card-title mb-2 text-dark"
                            style={{ fontSize: "16px", fontWeight: "600" }}
                          >
                            {review.title}
                          </h6>

                          {/* Review Text */}
                          <p
                            className="card-text text-muted mb-3"
                            style={{ fontSize: "14px", lineHeight: "1.5" }}
                          >
                            {review.comment}
                          </p>

                          {/* Reviewer Name */}
                          <h6
                            className="card-title mb-2 text-dark"
                            style={{ fontSize: "16px", fontWeight: "600" }}
                          >
                            {review.author}
                          </h6>

                          {/* Date and Verified Badge */}
                          <div className="d-flex align-items-center justify-content-between">
                            <small
                              className="text-muted"
                              style={{ fontSize: "12px" }}
                            >
                              {new Date(review.date).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </small>
                            {review.verified && (
                              <div className="review-verified">
                                <Check className="check-icon" />
                                <span>Verified</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Custom Navigation Buttons */}
                <div className="reviews-swiper-button-prev custom-swiper-nav"></div>
                <div className="reviews-swiper-button-next custom-swiper-nav"></div>

                {/* Custom Pagination */}
                <div className="reviews-swiper-pagination custom-swiper-pagination"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductReviews;
