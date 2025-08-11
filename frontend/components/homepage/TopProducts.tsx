"use client";

import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/blocks/product-card";
import { HttpTypes } from "@medusajs/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import component styles
import "./TopProducts.css";

interface TopProductsProps {
  products: HttpTypes.StoreProduct[];
}

export default function TopProducts({ products }: TopProductsProps) {
  return (
    <div className="ayur-bgcover ayur-topproduct-sec">
      <div className="container">
        <div className="row align-items-center mb-5">
          <div className="col-lg-8 col-md-8 col-sm-12">
            <div className="explore-ayurveda-header">
              <h2 className="explore-ayurveda-title">Explore Ayurveda</h2>
              <div className="explore-ayurveda-line"></div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 text-end">
            <Link href="/blog" className="pa-btn explore-view-all-btn">
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
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
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

          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev swiper-button-custom"></div>
          <div className="swiper-button-next swiper-button-custom"></div>
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
