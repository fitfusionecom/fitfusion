"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import "./Banner.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
    desktopImage: "/assets/images/banners/1.png",
    alt: "Banner 1",
  },
  {
    id: 2,
    mobileImage: "/assets/images/banners/mobile/2.png",
    desktopImage: "/assets/images/banners/2.png",
    alt: "Banner 2",
  },
  {
    id: 3,
    mobileImage: "/assets/images/banners/mobile/3.png",
    desktopImage: "/assets/images/banners/3.png",
    alt: "Banner 3",
  },
];

export default function Banner() {
  const swiperRef = useRef(null);
  const isMobile = useResponsiveImage();

  return (
    <section className="banner-carousel position-relative overflow-hidden">
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
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons with unique classes */}
      <button
        className="swiper-button-prev swiper-button-custom banner-prev"
        aria-label="Previous slide"
      ></button>

      <button
        className="swiper-button-next swiper-button-custom banner-next"
        aria-label="Next slide"
      ></button>

      {/* Custom Pagination */}
      <div className="swiper-pagination banner-pagination"></div>
    </section>
  );
}
