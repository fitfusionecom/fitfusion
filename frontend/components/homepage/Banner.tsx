"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import "./Banner.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const slides = [
  {
    id: 1,
    mobileImage: "/assets/images/carousel/img2.webp",
    desktopImage: "/assets/images/carousel/img.webp",
    alt: "Banner 1",
  },
  {
    id: 2,
    mobileImage: "/assets/images/carousel/img2.webp",
    desktopImage: "/assets/images/carousel/img.webp",
    alt: "Banner 2",
  },
  {
    id: 3,
    mobileImage: "/assets/images/carousel/img2.webp",
    desktopImage: "/assets/images/carousel/img.webp",
    alt: "Banner 3",
  },
  {
    id: 4,
    mobileImage: "/assets/images/carousel/img2.webp",
    desktopImage: "/assets/images/carousel/img.webp",
    alt: "Banner 4",
  },
  {
    id: 5,
    mobileImage: "/assets/images/carousel/img2.webp",
    desktopImage: "/assets/images/carousel/img.webp",
    alt: "Banner 5",
  },
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="banner-carousel position-relative overflow-hidden">
      {/* Image Slides */}
      <div className="carousel-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-slide ${
              index === currentSlide ? "active" : ""
            }`}
            style={{
              transform: `translateX(${(index - currentSlide) * 100}%)`,
            }}
          >
            <Image
              src={isMobile ? slide.mobileImage : slide.desktopImage}
              alt={slide.alt}
              fill
              className="carousel-image"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        className="carousel-nav carousel-prev"
        onClick={goToPrevious}
        aria-label="Previous slide"
      >
        <FaAngleLeft />
      </button>

      <button
        className="carousel-nav carousel-next"
        onClick={goToNext}
        aria-label="Next slide"
      >
        <FaAngleRight />
      </button>

      {/* Dots Indicator */}
      <div className="carousel-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
