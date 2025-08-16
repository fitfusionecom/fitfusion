"use client";

import React, { useRef, useState } from "react";
import { Video } from "@/lib/data/video";
import { ChevronLeft, ChevronRight, Play, Eye } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import VideoModal from "./VideoModal";
import "./VideoGallery.css";

interface VideoGalleryProps {
  videos: Video[];
}

const VideoGallery: React.FC<VideoGalleryProps> = ({ videos }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const swiperRef = useRef<any>(null);

  const openModal = (index: number) => {
    setModalIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const prevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  return (
    <section className="video-gallery-section">
      <div className="container">
        <div className="section-header">
          <h2>Video Gallery</h2>
          <p>
            Watch our amazing customer success stories and product
            demonstrations
          </p>
        </div>

        <div className="video-carousel-container">
          <button
            className="carousel-nav-btn prev-btn"
            onClick={prevSlide}
            disabled={false}
          >
            <ChevronLeft />
          </button>

          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1200: { slidesPerView: 5 },
            }}
            navigation={{
              nextEl: ".next-btn",
              prevEl: ".prev-btn",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="video-swiper"
          >
            {videos.map((video, index) => (
              <SwiperSlide key={video.id}>
                <div className="video-card" onClick={() => openModal(index)}>
                  <div className="video-thumbnail">
                    <video
                      src={video.url}
                      poster={video.thumbnail}
                      className="video-preview"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                    <div className="video-overlay">
                      <div className="play-icon">
                        <Play className="w-8 h-8" />
                      </div>
                    </div>
                  </div>
                  <div className="video-info">
                    <div className="views-count">
                      <Eye className="w-4 h-4" />
                      {video.views || Math.floor(Math.random() * 1000) + 100}
                    </div>
                  </div>
                  <div className="video-title">
                    <h4>{video.title || `Video ${index + 1}`}</h4>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            className="carousel-nav-btn next-btn"
            onClick={nextSlide}
            disabled={false}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <VideoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        videos={videos}
        initialIndex={modalIndex}
      />
    </section>
  );
};

export default VideoGallery;
