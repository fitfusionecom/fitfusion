"use client";

import "./Banner.css";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

// Custom hook for responsive image handling
const useResponsiveImage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on mount
    checkScreenSize();

    // Add event listener for resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return isMobile;
};

const slides = [
  {
    id: 1,
    mobileImage: "/assets/images/banners/mobile/1.png",
    desktopImage: "/assets/images/banners/5.png",
    alt: "Banner 1",
    href: "/product/fit-fusion-ayurveda-josh-power-mens-health-combo-kit",
  },
  {
    id: 2,
    mobileImage: "/assets/images/banners/mobile/4.png",
    desktopImage: "/assets/images/banners/4.png",
    alt: "Banner 2",
    href: "/appointment", // Example link, adjust as needed
  },
  {
    id: 3,
    mobileImage: "/assets/images/banners/mobile/5.png",
    desktopImage: "/assets/images/banners/3.png",
    alt: "Banner 3",
    href: "/shop?category_handle=men's-health-and-wellness&maxPrice=50000", // Example link, adjust as needed
  },
];

export default function Banner() {
  const swiperRef = useRef(null);
  const isMobile = useResponsiveImage();

  return (
    <section className="banner-carousel position-relative">
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".banner-next",
          prevEl: ".banner-prev",
        }}
        pagination={{
          clickable: true,
          el: ".banner-pagination",
        }}
        className="banner-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Link href={slide.href} tabIndex={0} aria-label={slide.alt}>
              <div className="banner-slide">
                <Image
                  src={isMobile ? slide.mobileImage : slide.desktopImage}
                  alt={slide.alt}
                  fill
                  className="banner-image"
                  priority={slide.id === 1}
                  quality={100}
                  sizes={isMobile ? "100vw" : "100vw"}
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="banner-controls">
        <div className="banner-controls-inner container">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => {
              // @ts-ignore
              swiperRef.current?.swiper?.slidePrev();
            }}
          >
            <span
              aria-hidden="true"
              style={{
                fontSize: "1.6rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Left chevron SVG */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </span>
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => {
              // @ts-ignore
              swiperRef.current?.swiper?.slideNext();
            }}
          >
            <span
              aria-hidden="true"
              style={{
                fontSize: "1.6rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Right chevron SVG */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Custom Navigation Buttons with unique classes */}
      {/* <button
        className="swiper-button-prev swiper-button-custom banner-prev"
        aria-label="Previous slide"
      ></button>

      <button
        className="swiper-button-next swiper-button-custom banner-next"
        aria-label="Next slide"
      ></button> */}
    </section>
  );
}
