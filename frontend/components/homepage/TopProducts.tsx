"use client";

import Link from "next/link";
import Image from "next/image";
import { HttpTypes } from "@medusajs/types";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "@/components/blocks/product-card";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import component styles
import "./TopProducts.css";

interface TopProductsProps {
  products: HttpTypes.StoreProduct[];
  title?: string;
  carouselId?: string;
  category_handle?: string;
}

export default function TopProducts({
  products,
  title = "Explore Ayurveda",
  carouselId = "default-carousel",
  category_handle = "best-selling",
}: TopProductsProps) {
  return (
    <div className="ayur-bgcover my-md-3 pb-0 pb-md-3">
      <div className="container pt-3">
        <div className="row align-items-center mb-3">
          <div className="col-lg-8 col-md-8 col-6">
            <div className="explore-ayurveda-header">
              <h2 className="explore-ayurveda-title">{title}</h2>
              <div className="explore-ayurveda-line"></div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-6 text-end">
            <Link
              href={`/shop?category_handle=${category_handle}`}
              className="explore-view-all-btn"
            >
              View All
            </Link>
          </div>
        </div>

        {/* Swiper Carousel */}
        <div className="top-products-carousel">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              nextEl: `.${carouselId}-next`,
              prevEl: `.${carouselId}-prev`,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            className="top-products-swiper"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons with unique classes */}
          <div
            className={`swiper-button-prev swiper-button-custom ${carouselId}-prev`}
          ></div>
          <div
            className={`swiper-button-next swiper-button-custom ${carouselId}-next`}
          ></div>
        </div>
      </div>
      <div className="ayur-bgshape ayur-tpro-bgshape">
        <Image
          src="/assets/images/bg-shape1.png"
          alt="shape"
          width={200}
          height={200}
        />
        <Image
          src="/assets/images/bg-leaf1.png"
          alt="leaf"
          width={150}
          height={150}
        />
      </div>
    </div>
  );
}
