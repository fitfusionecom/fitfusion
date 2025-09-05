"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./GoogleReviews.css";

const googleReviews = [
  {
    id: 1,
    rating: 5,
    text: "I booked a consultation with FitFusion's Ayurvedic doctor and received a personalized wellness plan. The advice was practical and the follow-up support was excellent. Highly recommended for anyone seeking holistic health solutions.",
    name: "Amit Verma",
    source: "Posted on Google",
  },
  {
    id: 2,
    rating: 5,
    text: "FitFusion's online consultation service was seamless and informative. The doctor listened patiently and suggested natural remedies that really helped my digestion issues. Thank you for the genuine care!",
    name: "Sneha Patel",
    source: "Posted on Google",
  },
  {
    id: 3,
    rating: 4,
    text: "I tried FitFusion's wellness consultation for stress management. The session was insightful and the recommended lifestyle changes have made a noticeable difference. Great service!",
    name: "Rohit Singh",
    source: "Posted on Google",
  },
  {
    id: 4,
    rating: 5,
    text: "The FitFusion team is very knowledgeable. My consultation for immunity boosting tips was thorough and the advice was easy to follow. I appreciate the genuine concern for my health.",
    name: "Meera Joshi",
    source: "Posted on Google",
  },
  {
    id: 5,
    rating: 5,
    text: "Excellent service! The Ayurvedic consultation was detailed and the doctor explained everything clearly. I feel more energetic and balanced after following the recommendations.",
    name: "Vikas Sharma",
    source: "Posted on Google",
  },
];

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, index) => (
    <FaStar
      key={index}
      className={`text-warning ${
        index < rating ? "text-warning" : "text-muted"
      }`}
      style={{ fontSize: "18px" }}
    />
  ));
}

export default function GoogleReviews() {
  return (
    <section className="google-reviews-section py-5 bg-light">
      <div className="container">
        {/* Header */}
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h2 className="h2 text-dark mb-2">Customer Reviews</h2>
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
                modules={[Navigation, Pagination, Autoplay]}
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
                {googleReviews.map((review) => (
                  <SwiperSlide key={review.id}>
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body p-4">
                        {/* Rating Stars */}
                        <div className="mb-3">{renderStars(review.rating)}</div>

                        {/* Review Text */}
                        <p
                          className="card-text text-muted mb-3"
                          style={{ fontSize: "14px", lineHeight: "1.5" }}
                        >
                          {review.text}
                        </p>

                        {/* Reviewer Name */}
                        <h6
                          className="card-title mb-2 text-dark"
                          style={{ fontSize: "16px", fontWeight: "600" }}
                        >
                          {review.name}
                        </h6>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Buttons */}
              <div className="swiper-button-prev custom-swiper-nav"></div>
              <div className="swiper-button-next custom-swiper-nav"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
