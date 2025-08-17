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
    text: "It's all about patience and consistency. Traya helped me to grow my hair back, a... Read More",
    name: "Shubham Nikam",
    source: "Posted on Google",
  },
  {
    id: 2,
    rating: 5,
    text: "Since i have started using Traya hair care regime, my hair have really improved ...Read More",
    name: "Bhawana Singh",
    source: "Posted on Google",
  },
  {
    id: 3,
    rating: 5,
    text: "The product is very goodThe results were visible after 15 itselfMust try essenti...Read More",
    name: "Sonia Hair Studio",
    source: "Posted on Google",
  },
  {
    id: 4,
    rating: 5,
    text: "Amazing results with FitFusion products! My skin has never felt better and the natural ingredients really work wonders.",
    name: "Rajesh Kumar",
    source: "Posted on Google",
  },
  {
    id: 5,
    rating: 5,
    text: "FitFusion's Ayurvedic supplements have transformed my health journey. Highly recommend their authentic Indian products!",
    name: "Priya Sharma",
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
            <h2 className="h2 text-dark mb-2">Google Reviews</h2>
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
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination",
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

                        {/* Source */}
                        <div className="d-flex align-items-center">
                          <div className="me-2">
                            <svg width="18" height="18" viewBox="0 0 24 24">
                              <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              />
                              <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              />
                              <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                              />
                              <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              />
                            </svg>
                          </div>
                          <small
                            className="text-muted"
                            style={{ fontSize: "12px" }}
                          >
                            {review.source}
                          </small>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Buttons */}
              <div className="swiper-button-prev custom-swiper-nav"></div>
              <div className="swiper-button-next custom-swiper-nav"></div>

              {/* Custom Pagination */}
              <div className="swiper-pagination custom-swiper-pagination"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
