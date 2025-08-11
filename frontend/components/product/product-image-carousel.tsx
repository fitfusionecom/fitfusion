"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";

// Custom styles for pagination and navigation
const carouselStyles = `
  .swiper-pagination {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }
  
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background: rgba(255, 255, 255, 0.6);
    border: 2px solid rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    margin: 0 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .swiper-pagination-bullet-active {
    background: #fff;
    border-color: #fff;
    transform: scale(1.2);
  }
  
  .swiper-pagination-bullet:hover {
    background: rgba(255, 255, 255, 0.8);
    border-color: #fff;
  }
  
  .swiper-button-prev,
  .swiper-button-next {
    color: #333;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-top: -20px;
    transition: all 0.3s ease;
    z-index: 20;
    cursor: pointer;
  }
  
  .swiper-button-prev:hover,
  .swiper-button-next:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.1);
  }
  
  .swiper-button-prev::after,
  .swiper-button-next::after {
    font-size: 18px;
    font-weight: bold;
  }
  
  .swiper-button-prev {
    left: 10px;
  }
  
  .swiper-button-next {
    right: 10px;
  }
`;

interface ProductImageCarouselProps {
  images: string[];
  productTitle: string;
}

const ProductImageCarousel = ({
  images,
  productTitle,
}: ProductImageCarouselProps) => {
  const [activeImage, setActiveImage] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full">
        <div className="position-relative ratio ratio-1x1 w-100 rounded bg-white border">
          <Image
            src="/placeholder.svg"
            alt={`${productTitle} - No image available`}
            fill
            className="object-fit-contain w-100 h-100"
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div className="position-relative ratio ratio-1x1 w-100 rounded bg-white border mb-3">
      <Swiper
        spaceBetween={0}
        navigation={true}
        pagination={{
          clickable: true,
          type: "bullets",
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs, Pagination]}
        className="h-100"
        onSlideChange={(swiper) => setActiveImage(swiper.activeIndex)}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="position-relative w-100 h-100">
              <Image
                src={image}
                alt={`${productTitle} - View ${index + 1}`}
                fill
                className="object-fit-contain w-100 h-100"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductImageCarousel;
