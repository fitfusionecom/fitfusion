"use client";

import React, { useRef, useEffect, useState } from "react";
import { Video } from "@/lib/data/video";
import { ChevronLeft, ChevronRight, Play, X, Share2 } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "./VideoModal.css";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videos: Video[];
  initialIndex: number;
}

const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videos,
  initialIndex,
}) => {
  const [modalIndex, setModalIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControlsBriefly, setShowControlsBriefly] = useState(false);

  const modalSwiperRef = useRef<any>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setModalIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (isOpen && modalVideoRef.current) {
      modalVideoRef.current.play();
      setIsPlaying(true);
      setShowControlsBriefly(true);
      setTimeout(() => setShowControlsBriefly(false), 2000);
    }
  }, [isOpen, modalIndex]);

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setShowControlsBriefly(true);
    setTimeout(() => setShowControlsBriefly(false), 2000);
  };

  const togglePlay = () => {
    if (modalVideoRef.current) {
      if (isPlaying) {
        modalVideoRef.current.pause();
        setIsPlaying(false);
      } else {
        modalVideoRef.current.play();
        setIsPlaying(true);
        setShowControlsBriefly(true);
        setTimeout(() => setShowControlsBriefly(false), 2000);
      }
    }
  };

  const handleSlideChange = (swiper: any) => {
    const newIndex = swiper.activeIndex;
    setModalIndex(newIndex);
    setIsPlaying(false);
    setShowControlsBriefly(false);

    // Pause all videos
    const allVideos = document.querySelectorAll(
      ".modal-video"
    ) as NodeListOf<HTMLVideoElement>;
    allVideos.forEach((video) => video.pause());

    // Play the new active video after a short delay
    setTimeout(() => {
      if (modalVideoRef.current) {
        modalVideoRef.current.play();
        setIsPlaying(true);
        setShowControlsBriefly(true);
        setTimeout(() => setShowControlsBriefly(false), 2000);
      }
    }, 300);
  };

  const nextModalVideo = () => {
    if (modalSwiperRef.current) {
      modalSwiperRef.current.slideNext();
    }
  };

  const prevModalVideo = () => {
    if (modalSwiperRef.current) {
      modalSwiperRef.current.slidePrev();
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: videos[modalIndex]?.title || "Check out this video!",
          text:
            videos[modalIndex]?.description || "Amazing video from FitFusion",
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      } catch (error) {
        console.log("Error copying to clipboard:", error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X className="w-5 h-5" />
        </button>

        <div className="modal-video-container">
          <Swiper
            ref={modalSwiperRef}
            modules={[EffectCoverflow, Navigation, Pagination]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            initialSlide={modalIndex}
            onSlideChange={handleSlideChange}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 200,
              modifier: 1.5,
              slideShadows: false,
            }}
            navigation={{
              nextEl: ".modal-swiper-button-next",
              prevEl: ".modal-swiper-button-prev",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            className="modal-video-swiper"
          >
            {videos.map((video, index) => (
              <SwiperSlide key={video.id} className="modal-video-slide">
                <div className="modal-video-wrapper">
                  <video
                    ref={index === modalIndex ? modalVideoRef : null}
                    src={video.url}
                    poster={video.thumbnail}
                    onEnded={handleVideoEnded}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onClick={isPlaying ? togglePlay : undefined}
                    controls={false}
                    className="modal-video"
                    style={{ cursor: isPlaying ? "pointer" : "default" }}
                    muted={index !== modalIndex}
                    loop={index !== modalIndex}
                    playsInline
                  />

                  {/* Title Overlay */}
                  <div className="video-title-overlay">
                    <h3>{video.title || `Video ${index + 1}`}</h3>
                  </div>

                  {/* Video Branding */}
                  <div className="video-branding">
                    <span className="brand-logo">FitFusion</span>
                    <span className="speaker-icon">🔊</span>
                  </div>

                  {/* Customer Info */}
                  <div className="customer-info">
                    <div className="customer-name">
                      <div className="name-line"></div>
                      <span>{video.title?.split(" ")[0] || "Customer"}</span>
                    </div>
                    <div className="customer-type">FITFUSION CUSTOMER</div>
                  </div>

                  {/* Call to Action Button */}
                  <div className="cta-button">
                    <button className="action-btn">View Product</button>
                  </div>

                  {/* Video Controls - Only show for active video */}
                  {index === modalIndex && (
                    <div
                      className={`video-controls ${
                        showControlsBriefly ? "show-briefly" : ""
                      }`}
                    >
                      {!isPlaying && (
                        <button className="play-pause-btn" onClick={togglePlay}>
                          <Play className="w-8 h-8" />
                        </button>
                      )}
                    </div>
                  )}

                  {/* Side Video Overlay for non-active videos */}
                  {index !== modalIndex && (
                    <div className="side-video-overlay">
                      <div className="side-play-icon">
                        <Play className="w-6 h-6" />
                      </div>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Modal Navigation Buttons */}
          <button
            className="modal-nav-btn prev"
            onClick={prevModalVideo}
            disabled={modalIndex === 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="modal-nav-btn next"
            onClick={nextModalVideo}
            disabled={modalIndex === videos.length - 1}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Share Button */}
          <div className="video-actions">
            <button className="share-btn" onClick={handleShare}>
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
