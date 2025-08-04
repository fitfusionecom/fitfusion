"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const slides = [
  { id: 1, image: "/assets/images/ban-head-Image.png", alt: "headerimage" },
  { id: 2, image: "/assets/images/ban-head-Image.png", alt: "headerimage" },
  { id: 3, image: "/assets/images/ban-head-Image.png", alt: "headerimage" },
  { id: 4, image: "/assets/images/ban-head-Image.png", alt: "headerimage" },
  { id: 5, image: "/assets/images/ban-head-Image.png", alt: "headerimage" },
];

export default function Banner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(1200); // default fallback

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", () =>
        setWindowWidth(window.innerWidth)
      );
    }
  }, []);

  const getSlideStyle = (index) => {
    const isActive = index === activeIndex;
    return {
      transform: `scale(${isActive ? 1 : 0.75})`,
      opacity: isActive ? 1 : 0.5,
      zIndex: isActive ? 2 : 1,
      transition: "transform 0.3s ease, opacity 0.3s ease",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };
  };

  const getImageSize = () => {
    if (windowWidth < 640) return { width: 180, height: 180 };
    if (windowWidth < 1024) return { width: 240, height: 240 };
    return { width: 300, height: 300 };
  };

  return (
    <div
      className="ayur-banner-section"
      style={{
        position: "relative",
        // paddingBottom: "50px",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="ayur-banner-heading">
              <h1>
                FitFusion - Ayurvedic Products <span>For You</span>
              </h1>
              <p>
                Complete Ayurvedic Rituals to empower the Body, Mind & Soul for
                Total Well-Being. <br />
                <span>
                  Ayurveda is a holistic approach to health and wellness that
                  focuses on the balance of mind, body, and spirit.
                </span>
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
                {/* Left Button */}
                <button
                  onClick={() => swiperRef.current?.slidePrev()}
                  style={{
                    position: "absolute",
                    top: "55%",
                    left: 0,
                    transform: "translateY(-50%)",
                    background: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    cursor: "pointer",
                    zIndex: 5,
                  }}
                >
                  &#8592;
                </button>

                {/* Right Button */}
                <button
                  onClick={() => swiperRef.current?.slideNext()}
                  style={{
                    position: "absolute",
                    top: "55%",
                    right: 0,
                    transform: "translateY(-50%)",
                    background: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    cursor: "pointer",
                    zIndex: 5,
                  }}
                >
                  &#8594;
                </button>

                <Swiper
                  loop={true}
                  centeredSlides={true}
                  spaceBetween={20}
                  slidesPerView={1.2}
                  onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    setActiveIndex(swiper.realIndex);
                  }}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                  }}
                  modules={[Navigation]}
                >
                  {slides.map((slide, index) => {
                    const { width, height } = getImageSize();
                    return (
                      <SwiperSlide key={slide.id}>
                        <div style={getSlideStyle(index)}>
                          <Image
                            src={slide.image}
                            alt={slide.alt}
                            width={width}
                            height={height}
                            style={{ borderRadius: "16px" }}
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
