"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Pagination } from "swiper/modules";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import { BsArrowsFullscreen } from "react-icons/bs";

// Custom styles for pagination, navigation, and floating enlarge button
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
  
  /* Swiper button styles are now handled globally in swiper-custom.css */

  .enlarge-float-btn {
    position: absolute;
    bottom: 18px;
    right: 18px;
    z-index: 30;
    display: flex;
    align-items: center;
    background: rgba(34, 34, 34, 0.85);
    color: #fff;
    border-radius: 9999px;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
    border: none;
    outline: none;
    transition: background 0.2s, box-shadow 0.2s;
    font-size: 1rem;
    gap: 0.5rem;
  }
  .enlarge-float-btn:hover, .enlarge-float-btn:focus {
    background: #222;
    box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  }
  .enlarge-float-btn .enlarge-text {
    opacity: 0;
    max-width: 0;
    margin-left: 0;
    transition: opacity 0.2s, max-width 0.2s, margin-left 0.2s;
    white-space: nowrap;
    overflow: hidden;
    font-size: 0.98rem;
    font-weight: 500;
    letter-spacing: 0.01em;
  }
  .enlarge-float-btn:hover .enlarge-text,
  .enlarge-float-btn:focus .enlarge-text {
    opacity: 1;
    max-width: 200px;
    margin-left: 0.5rem;
  }

  /* Thumbnail carousel styles */
  .thumbnail-carousel {
    margin-top: 12px;
  }
  
  .thumbnail-carousel .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px !important;
    height: 80px !important;
  }
  
  .thumbnail-carousel .swiper-wrapper {
    align-items: center;
    display: flex;
  }
  
  .thumbnail-carousel .swiper-container {
    overflow: visible;
  }

  /* Hide scrollbar for webkit browsers */
  .overflow-auto::-webkit-scrollbar {
    display: none;
  }
  
  /* Ensure thumbnails have no extra spacing */
  .gap-2 > * {
    margin: 0 !important;
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
  const [lightboxOpen, setLightboxOpen] = useState(false);

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

  // Prepare slides for Lightbox
  const lightboxSlides = images.map((img, idx) => ({
    src: img,
    alt: `${productTitle} - View ${idx + 1}`,
  }));

  return (
    <div className="w-100">
      {/* Main Image Carousel */}
      <div className="position-relative ratio ratio-1x1 w-100 rounded bg-white border mb-3">
        {/* Inject custom styles for Swiper and floating button */}
        <style>{carouselStyles}</style>
        <Swiper
          spaceBetween={0}
          navigation={true}
          pagination={{
            clickable: true,
            type: "bullets",
          }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Navigation, Thumbs, Pagination]}
          className="h-100 product-image-carousel"
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
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Floating enlarge button */}
        <button
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: 30,
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "transparent",
            color: "black",
            border: "2px solid black",
            outline: "none",
            padding: "0",
          }}
          type="button"
          aria-label="Click to enlarge"
          onClick={() => setLightboxOpen(true)}
          tabIndex={0}
        >
          <BsArrowsFullscreen />
        </button>
      </div>

      {/* Thumbnail Carousel */}
      {images.length > 1 && (
        <div className="w-100 mt-3">
          <div
            className="d-flex gap-2 overflow-auto"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="position-relative cursor-pointer flex-shrink-0"
                style={{
                  width: "60px",
                  height: "60px",
                  border:
                    activeImage === index
                      ? "2px solid #d4af37"
                      : "2px solid transparent",
                  borderRadius: "8px",
                  overflow: "hidden",
                  backgroundColor: "whitesmoke",
                }}
                onClick={() => {
                  if (thumbsSwiper) {
                    thumbsSwiper.slideTo(index);
                  }
                }}
              >
                <Image
                  src={image}
                  alt={`${productTitle} - View ${index + 1}`}
                  fill
                  className="object-fit-cover"
                  priority={index === 0}
                  sizes="80px"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        index={activeImage}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom, Captions]}
        on={{
          view: ({ index }) => setActiveImage(index),
        }}
        render={
          {
            // Optionally, you can customize the slide rendering here
          }
        }
      />
    </div>
  );
};

export default ProductImageCarousel;
