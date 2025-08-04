"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { HttpTypes } from "@medusajs/types";

// Import Swiper styles (if not already globally imported)
import "swiper/css";
import "swiper/css/navigation";

interface CareSliderProps {
  categories: HttpTypes.StoreProductCategory[];
}

export default function CareSlider({ categories }: CareSliderProps) {
  const swiperRef = useRef<HTMLDivElement>(null);
  const swiperInstanceRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;
    let Swiper: any;

    async function initSwiper() {
      if (typeof window !== "undefined" && swiperRef.current) {
        const mod = await import("swiper");
        Swiper = mod.default;
        if (!swiperInstanceRef.current) {
          swiperInstanceRef.current = new Swiper(
            swiperRef.current.querySelector(".swiper"),
            {
              slidesPerView: 5,
              spaceBetween: 20,
              loop: true,
              navigation: {
                nextEl: swiperRef.current.querySelector(".swiper-button-next"),
                prevEl: swiperRef.current.querySelector(".swiper-button-prev"),
              },
              breakpoints: {
                320: { slidesPerView: 2 },
                480: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
              },
            }
          );
        }
      }
    }

    initSwiper();

    return () => {
      isMounted = false;
      if (swiperInstanceRef.current && swiperInstanceRef.current.destroy) {
        swiperInstanceRef.current.destroy(true, true);
        swiperInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="ayur-care-slider-wrapper" ref={swiperRef}>
      <div className="container-fluid">
        <div className="ayur-care-slider-sec">
          <div className="swiper ayur-care-slider">
            <div className="swiper-wrapper">
              {categories.map((category, index) => (
                <div key={category.id || index} className="swiper-slide">
                  <div className="ayur-careslide-box">
                    <div className="ayur-careslider-img">
                      <Image
                        src={
                          typeof category.metadata?.image_url === "string" &&
                          category.metadata?.image_url
                            ? category.metadata.image_url
                            : "/assets/images/categories/care-img1.png"
                        }
                        alt={category.name || category.handle}
                        width={140}
                        height={180}
                      />
                    </div>
                    <h3>{category.name || category.handle}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="swiper-button-prev"
            tabIndex={0}
            role="button"
            aria-label="Previous slide"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 0C31.0284 0 40 8.97164 40 20C40 31.0284 31.0284 40 20 40C8.97164 40 0 31.0284 0 20C0 8.97164 8.97164 0 20 0ZM13.8216 21.1784L22.155 29.5116C22.3096 29.6666 22.4932 29.7896 22.6955 29.8734C22.8977 29.9572 23.1145 30.0002 23.3334 30C23.5523 30.0002 23.769 29.9572 23.9712 29.8733C24.1735 29.7895 24.3571 29.6666 24.5117 29.5116C25.1634 28.86 25.1634 27.8066 24.5117 27.155L17.3566 20L24.5116 12.845C25.1633 12.1934 25.1633 11.14 24.5116 10.4884C23.86 9.83672 22.8066 9.83672 22.155 10.4884L13.8216 18.8217C13.17 19.4734 13.17 20.5266 13.8216 21.1784Z"
                fill="#D6CDCA"
              />
            </svg>
          </div>
          <div
            className="swiper-button-next"
            tabIndex={0}
            role="button"
            aria-label="Next slide"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 0C8.97164 0 0 8.97164 0 20C0 31.0284 8.97164 40 20 40C31.0284 40 40 31.0284 40 20C40 8.97164 31.0284 0 20 0ZM26.1784 21.1784L17.845 29.5116C17.6904 29.6666 17.5068 29.7896 17.3045 29.8734C17.1023 29.9572 16.8855 30.0002 16.6666 30C16.4477 30.0002 16.231 29.9572 16.0288 29.8733C15.8265 29.7895 15.6429 29.6666 15.4883 29.5116C14.8366 28.86 14.8366 27.8066 15.4883 27.155L22.6434 20L15.4884 12.845C14.8367 12.1934 14.8367 11.14 15.4884 10.4884C16.14 9.83672 17.1934 9.83672 17.845 10.4884L26.1784 18.8217C26.83 19.4734 26.83 20.5266 26.1784 21.1784Z"
                fill="#CD8973"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
