"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import { BsArrowsFullscreen } from "react-icons/bs";

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
        <Swiper
          spaceBetween={0}
          navigation={true}
          pagination={{
            clickable: true,
            type: "bullets",
          }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Navigation, Thumbs]}
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
            padding: "0",
            height: "40px",
            color: "black",
            outline: "none",
            borderRadius: "50%",
            border: "2px solid black",
            backgroundColor: "transparent",
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
