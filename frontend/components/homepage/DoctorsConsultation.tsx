"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  FaWhatsapp,
  FaCheck,
  FaLeaf,
  FaHeart,
  FaFileAlt,
  FaSmile,
  FaHandHoldingHeart,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./DoctorsConsultation.css";

interface Doctor {
  id: number;
  name: string;
  image: string;
  specialization: string[];
  experience: string;
  languages: string[];
  description: string;
  patients: string;
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Pragati Panwar",
    image: "/assets/images/carousel/dr.webp",
    specialization: [
      "Gynecological",
      "Stomach",
      "Skin",
      "Panchakarma",
      "Lifestyle Issues",
    ],
    experience: "2+ Years",
    languages: ["Hindi", "English"],
    description:
      "Dr. Pragati Panwar is an experienced Ayurvedic practitioner with 2+ years of expertise in gynecological health, stomach disorders, skin care, Panchakarma therapy, and lifestyle-related issues. She has successfully consulted 3,000+ patients, providing personalized care in Hindi and English for overall well-being.",
    patients: "3,000+",
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    image: "/assets/images/carousel/dr.webp",
    specialization: [
      "Digestive Health",
      "Respiratory",
      "Joint Pain",
      "Stress Management",
    ],
    experience: "5+ Years",
    languages: ["Hindi", "English", "Sanskrit"],
    description:
      "Dr. Rajesh Kumar specializes in digestive health, respiratory disorders, joint pain management, and stress-related conditions. With over 5 years of experience, he has helped 5,000+ patients achieve optimal health through traditional Ayurvedic methods.",
    patients: "5,000+",
  },
  {
    id: 3,
    name: "Dr. Priya Sharma",
    image: "/assets/images/carousel/dr.webp",
    specialization: [
      "Women's Health",
      "Hormonal Balance",
      "Skin Care",
      "Weight Management",
    ],
    experience: "3+ Years",
    languages: ["Hindi", "English", "Gujarati"],
    description:
      "Dr. Priya Sharma focuses on women's health, hormonal balance, skin care, and weight management. Her holistic approach has benefited 4,000+ patients, combining traditional wisdom with modern understanding of health.",
    patients: "4,000+",
  },
  {
    id: 4,
    name: "Dr. Amit Patel",
    image: "/assets/images/carousel/dr.webp",
    specialization: [
      "Cardiac Health",
      "Diabetes",
      "Hypertension",
      "Lifestyle Medicine",
    ],
    experience: "8+ Years",
    languages: ["Hindi", "English", "Marathi"],
    description:
      "Dr. Amit Patel is a senior Ayurvedic physician specializing in cardiac health, diabetes management, hypertension, and lifestyle medicine. With 8+ years of experience, he has successfully treated 7,000+ patients.",
    patients: "7,000+",
  },
  {
    id: 5,
    name: "Dr. Meera Singh",
    image: "/assets/images/carousel/dr.webp",
    specialization: [
      "Pediatric Care",
      "Immunity",
      "Growth & Development",
      "Nutrition",
    ],
    experience: "4+ Years",
    languages: ["Hindi", "English", "Punjabi"],
    description:
      "Dr. Meera Singh specializes in pediatric care, immunity building, growth & development, and nutrition. Her gentle approach has made her a favorite among parents, helping 2,500+ children achieve better health.",
    patients: "2,500+",
  },
];

const benefits = [
  {
    icon: FaCheck,
    title: "Expert Ayurveda Doctors",
    description: "Qualified and experienced practitioners",
  },
  {
    icon: FaLeaf,
    title: "110+ Years of Zandu Ayurveda Legacy",
    description: "Trusted traditional wisdom",
  },
  {
    icon: FaHeart,
    title: "FREE Consultations",
    description: "No cost for expert advice",
  },
  {
    icon: FaFileAlt,
    title: "100% Discreet consultations and delivery",
    description: "Complete privacy guaranteed",
  },
  {
    icon: FaSmile,
    title: "2 Lac+ Satisfied Patients",
    description: "Proven track record",
  },
  {
    icon: FaHandHoldingHeart,
    title: "Personalised Care from Verified Doctors",
    description: "Individual attention for every patient",
  },
];

export default function DoctorsConsultation() {
  const handleWhatsAppConsultation = (doctorName: string) => {
    const phoneNumber = "+919876543210"; // Replace with actual WhatsApp number
    const message = `Hi, I would like to book a free consultation with ${doctorName} for Ayurvedic treatment.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="doctors-consultation-section spacer-top spacer-bottom">
      <div className="container">
        {/* Header Section */}
        <div className="row align-items-center mb-5">
          <div className="col-12">
            <div className="doctors-consultation-header">
              <h2 className="doctors-consultation-title">
                Free Doctor Consultation
              </h2>
              <div className="doctors-consultation-line"></div>
            </div>
          </div>
        </div>

        {/* Doctors Carousel Section */}
        <div className="doctors-carousel-wrapper">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="doctors-swiper"
          >
            {doctors.map((doctor) => (
              <SwiperSlide key={doctor.id}>
                <div className="doctor-profile-card">
                  <div className="row align-items-center">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <div className="doctor-image-section">
                        <div className="doctor-main-image">
                          <Image
                            src={doctor.image}
                            alt={doctor.name}
                            width={200}
                            height={250}
                            className="img-fluid"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-12">
                      <div className="doctor-content">
                        <h3 className="doctor-name">{doctor.name}</h3>

                        <div className="doctor-details">
                          <div className="detail-item">
                            <strong>Specialization:</strong>
                            <span>{doctor.specialization.join(", ")}</span>
                          </div>
                          <div className="detail-item">
                            <strong>Experience:</strong>
                            <span>{doctor.experience}</span>
                          </div>
                          <div className="detail-item">
                            <strong>Languages:</strong>
                            <span>{doctor.languages.join(" & ")}</span>
                          </div>
                          <div className="detail-item">
                            <strong>Patients:</strong>
                            <span>{doctor.patients}</span>
                          </div>
                        </div>

                        <p className="doctor-description">
                          {doctor.description}
                        </p>

                        <button
                          onClick={() =>
                            handleWhatsAppConsultation(doctor.name)
                          }
                          className="consultation-btn"
                        >
                          <FaWhatsapp />
                          Get Free Consultation
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            {/* Custom Navigation Buttons */}
            <div className="swiper-button-prev">
              <FaChevronLeft />
            </div>
            <div className="swiper-button-next">
              <FaChevronRight />
            </div>

            {/* Custom Pagination */}
            <div className="swiper-pagination"></div>
          </Swiper>
        </div>

        {/* Benefits Section */}
        <div className="benefits-section">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              576: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
              992: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="benefits-swiper"
          >
            {benefits.map((benefit, index) => (
              <SwiperSlide key={index}>
                <div className="benefit-item ">
                  <div className="benefit-icon">
                    <benefit.icon />
                  </div>
                  <div className="benefit-content">
                    <h4 className="benefit-title">{benefit.title}</h4>
                    <p className="benefit-description">{benefit.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            {/* Custom Pagination */}
          </Swiper>
        </div>

        {/* Main CTA Button */}
        <div className="text-center mt-5">
          <button
            onClick={() => handleWhatsAppConsultation("our Ayurvedic doctors")}
            className="main-consultation-btn"
          >
            <FaWhatsapp />
            Get Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
