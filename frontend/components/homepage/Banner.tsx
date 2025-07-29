"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "/assets/images/ban-head-Image.png",
      alt: "headerimage",
    },
    {
      id: 2,
      image: "/assets/images/ban-head-Image.png",
      alt: "headerimage",
    },
    {
      id: 3,
      image: "/assets/images/ban-head-Image.png",
      alt: "headerimage",
    },
    {
      id: 4,
      image: "/assets/images/ban-head-Image.png",
      alt: "headerimage",
    },
    {
      id: 5,
      image: "/assets/images/ban-head-Image.png",
      alt: "headerimage",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="ayur-banner-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="ayur-banner-heading">
              <h1>
                We Are Here To Give You The Best <span>Herb Products</span>
              </h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud.
              </p>
              <Link href="/shop" className="ayur-btn">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="ayur-banner-slider-sec z-50 relative">
              <div className="ayur-banner-slider">
                <div
                  className="swiper-wrapper"
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  {slides.map((slide, index) => (
                    <div
                      key={slide.id}
                      className="swiper-slide"
                      style={{
                        display: index === currentSlide ? "block" : "none",
                        transition: "opacity 0.5s ease-in-out",
                      }}
                    >
                      <div className="ayur-ban-slide d-flex justify-content-center items-center">
                        <Image
                          src={slide.image}
                          alt={slide.alt}
                          width={600}
                          height={454}
                          className=" object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="swiper-button-prev"
                  onClick={prevSlide}
                  style={{ cursor: "pointer" }}
                >
                  <svg
                    width="46"
                    height="22"
                    viewBox="0 0 46 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.520424 9.74414L0.522022 9.74245L9.79254 0.51664C10.4871 -0.174498 11.6104 -0.171926 12.3017 0.522671C12.9929 1.21718 12.9903 2.34051 12.2958 3.03174L6.07152 9.22581H43.6452C44.6251 9.22581 45.4194 10.0201 45.4194 11C45.4194 11.9799 44.6251 12.7742 43.6452 12.7742H6.07161L12.2957 18.9683C12.9902 19.6595 12.9928 20.7828 12.3016 21.4773C11.6103 22.172 10.4869 22.1744 9.79245 21.4834L0.521931 12.2575L0.520336 12.2559C-0.17453 11.5623 -0.17231 10.4354 0.520424 9.74414Z"
                      fill="#F6F1ED"
                    />
                  </svg>
                </div>
                <div
                  className="swiper-button-next"
                  onClick={nextSlide}
                  style={{ cursor: "pointer" }}
                >
                  <svg
                    width="46"
                    height="22"
                    viewBox="0 0 46 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M44.899 9.74414L44.8974 9.74245L35.6269 0.51664C34.9324 -0.174498 33.8091 -0.171926 33.1177 0.522671C32.4265 1.21718 32.4292 2.34051 33.1237 3.03174L39.3479 9.22581H1.77419C0.794307 9.22581 0 10.0201 0 11C0 11.9799 0.794307 12.7742 1.77419 12.7742H39.3478L33.1238 18.9683C32.4293 19.6595 32.4266 20.7828 33.1178 21.4773C33.8091 22.172 34.9326 22.1744 35.627 21.4834L44.8975 12.2575L44.8991 12.2559C45.594 11.5623 45.5917 10.4354 44.899 9.74414Z"
                      fill="white"
                    />
                  </svg>
                </div>
                {/* Slide indicators */}
                <div
                  className="swiper-pagination"
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  {slides.map((_, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor:
                          index === currentSlide
                            ? "#fff"
                            : "rgba(255,255,255,0.5)",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ayur-ban-leaf">
        <Image
          src="/assets/images/ban-leafleft.png"
          alt="leaf-image"
          width={200}
          height={300}
        />
        <Image
          src="/assets/images/ban-leafright.png"
          alt="leaf-image"
          width={200}
          height={300}
        />
      </div>
    </div>
  );
}
