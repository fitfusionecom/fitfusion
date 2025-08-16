"use client";

import { useState } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./GoogleReviews.css";

const googleReviews = [
  {
    id: 1,
    rating: 5,
    text: "It's all about patience and consistency. Traya helped me to grow my hair back, a... Read More",
    name: "Shubham Nikam",
    source: "Posted on Google"
  },
  {
    id: 2,
    rating: 5,
    text: "Since i have started using Traya hair care regime, my hair have really improved ...Read More",
    name: "Bhawana Singh",
    source: "Posted on Google"
  },
  {
    id: 3,
    rating: 5,
    text: "The product is very goodThe results were visible after 15 itselfMust try essenti...Read More",
    name: "Sonia Hair Studio",
    source: "Posted on Google"
  },
  {
    id: 4,
    rating: 5,
    text: "Amazing results with FitFusion products! My skin has never felt better and the natural ingredients really work wonders.",
    name: "Rajesh Kumar",
    source: "Posted on Google"
  },
  {
    id: 5,
    rating: 5,
    text: "FitFusion's Ayurvedic supplements have transformed my health journey. Highly recommend their authentic Indian products!",
    name: "Priya Sharma",
    source: "Posted on Google"
  }
];

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, index) => (
    <FaStar
      key={index}
      className={`text-warning ${index < rating ? "text-warning" : "text-muted"}`}
      style={{ fontSize: "18px" }}
    />
  ));
}

export default function GoogleReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === googleReviews.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? googleReviews.length - 3 : prevIndex - 1
    );
  };

  const visibleReviews = googleReviews.slice(currentIndex, currentIndex + 3);

  return (
    <section className="google-reviews-section py-5 bg-light">
      <div className="container">
        {/* Header */}
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h2 className="h2 text-dark mb-2">Google Reviews</h2>
            <div className="mx-auto" style={{ width: "100px", height: "2px", backgroundColor: "#6c757d" }}></div>
          </div>
        </div>

        {/* Reviews Carousel */}
        <div className="row position-relative">
          {/* Navigation Arrows */}
          <div className="col-12 d-flex align-items-center justify-content-between">
            <button 
              onClick={prevSlide}
              className="btn btn-link text-muted p-0"
              style={{ fontSize: "24px" }}
            >
              <FaChevronLeft />
            </button>

            {/* Reviews Cards */}
            <div className="d-flex gap-3 justify-content-center flex-grow-1 mx-4">
              {visibleReviews.map((review) => (
                <div key={review.id} className="card border-0 shadow-sm" style={{ minWidth: "300px", maxWidth: "350px" }}>
                  <div className="card-body p-4">
                    {/* Rating Stars */}
                    <div className="mb-3">
                      {renderStars(review.rating)}
                    </div>

                    {/* Review Text */}
                    <p className="card-text text-muted mb-3" style={{ fontSize: "14px", lineHeight: "1.5" }}>
                      {review.text}
                    </p>

                    {/* Reviewer Name */}
                    <h6 className="card-title mb-2 text-dark" style={{ fontSize: "16px", fontWeight: "600" }}>
                      {review.name}
                    </h6>

                    {/* Source */}
                    <div className="d-flex align-items-center">
                      <div className="me-2">
                        <svg width="18" height="18" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                      </div>
                      <small className="text-muted" style={{ fontSize: "12px" }}>
                        {review.source}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={nextSlide}
              className="btn btn-link text-muted p-0"
              style={{ fontSize: "24px" }}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="row mt-4">
          <div className="col-12 text-center">
            <div className="d-flex justify-content-center gap-2">
              {Array.from({ length: Math.ceil(googleReviews.length / 3) }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * 3)}
                  className={`btn btn-sm rounded-circle ${
                    Math.floor(currentIndex / 3) === index 
                      ? "bg-primary" 
                      : "bg-secondary"
                  }`}
                  style={{ width: "10px", height: "10px", padding: "0" }}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
