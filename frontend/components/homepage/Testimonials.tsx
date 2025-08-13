"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  FaQuoteLeft,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Testimonials.css";

const testimonials = [
  {
    id: 1,
    text: "I have been using FitFusion's Ayurvedic products for the past 6 months and I can truly feel the difference. My energy levels have improved and my skin feels so much healthier. Thank you for bringing authentic Ayurveda to us!",
    name: "Priya Sharma",
    city: "Mumbai, Maharashtra",
    rating: 5,
    product: "Ayurvedic Wellness Kit",
  },
  {
    id: 2,
    text: "Being a working professional, I hardly get time to take care of my health. FitFusion's herbal supplements are easy to use and have helped me manage stress and improve my sleep. Highly recommended for everyone!",
    name: "Rahul Verma",
    city: "Bangalore, Karnataka",
    rating: 5,
    product: "Stress Relief Supplements",
  },
  {
    id: 3,
    text: "My mother suggested I try FitFusion for my hair fall issues. The natural oils and shampoos have worked wonders. I love that the products are made with traditional Indian herbs.",
    name: "Anjali Patel",
    city: "Ahmedabad, Gujarat",
    rating: 5,
    product: "Natural Hair Care Range",
  },
  {
    id: 4,
    text: "I was looking for genuine Ayurvedic solutions for my family. FitFusion's products are pure, effective, and remind me of the remedies my grandmother used to make at home.",
    name: "Suresh Kumar",
    city: "Chennai, Tamil Nadu",
    rating: 5,
    product: "Family Wellness Pack",
  },
  {
    id: 5,
    text: "The immunity booster from FitFusion has become a daily part of my routine. I feel more energetic and haven't fallen sick this season. Thank you for such wonderful Indian products!",
    name: "Meera Joshi",
    city: "Pune, Maharashtra",
    rating: 5,
    product: "Immunity Booster",
  },
  {
    id: 6,
    text: "FitFusion's herbal teas are my favourite! They taste amazing and help me relax after a long day. Proud to support an Indian brand that values our traditional knowledge.",
    name: "Amit Singh",
    city: "Delhi",
    rating: 5,
    product: "Herbal Tea Collection",
  },
];

function getInitial(name: string) {
  return name?.charAt(0).toUpperCase() || "";
}

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, index) => (
    <FaStar
      key={index}
      className={`star ${index < rating ? "filled" : "empty"}`}
    />
  ));
}

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="container">
        {/* Compact Header */}
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h2 className="testimonials-title">Customer Testimonials</h2>
            <p className="testimonials-description">
              Discover why thousands of customers trust FitFusion for their
              wellness journey
            </p>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="testimonials-carousel-wrapper">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
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
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            className="testimonials-swiper testimonials-section"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="testimonial-card">
                  <div className="testimonial-content">
                    <div className="quote-icon">
                      <FaQuoteLeft />
                    </div>

                    <div className="testimonial-text">
                      <p>{testimonial.text}</p>
                    </div>

                    <div className="testimonial-meta">
                      <div className="testimonial-rating">
                        {renderStars(testimonial.rating)}
                      </div>
                      <div className="testimonial-product">
                        <span>{testimonial.product}</span>
                      </div>
                    </div>
                  </div>

                  <div className="testimonial-author">
                    <div className="author-avatar">
                      <div className="avatar-initial">
                        {getInitial(testimonial.name)}
                      </div>
                    </div>
                    <div className="author-details">
                      <h4 className="author-name">{testimonial.name}</h4>
                      <p className="author-location">{testimonial.city}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            <div className="swiper-button-prev">
              <FaChevronLeft />
            </div>
            <div className="swiper-button-next">
              <FaChevronRight />
            </div>

            <div className="swiper-pagination"></div>
          </Swiper>
        </div>

        {/* Compact CTA */}
        {/* <div className="row mt-4">
          <div className="col-12 text-center">
            <div className="testimonials-cta">
              <h3>Join Our Happy Customer Family</h3>
              <p>
                Experience the FitFusion difference and share your story with us
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
