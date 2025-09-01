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
    name: 'Prof. (Dr.) Irshad Ahmad Khan "Bayarvi"',
    image: "/assets/images/dr1.jpg",
    specialization: [
      "Unani & Ayurvedic Medicine",
      "General Physician",
      "Men's Health",
      "Lifestyle Disorders",
      "Chronic Illness Management",
    ],
    experience: "25+ Years",
    languages: ["Hindi", "English"],
    description:
      'Prof. (Dr.) Irshad Ahmad Khan "Bayarvi" (B.U.M.S, M.A, Ph.D) is a highly experienced practitioner specializing in Unani & Ayurvedic Medicine, general health, men\'s health, lifestyle disorders, and chronic illness management. With over 25 years of expertise, he has provided care to more than 20,000 patients, offering consultations in Hindi and English.',
    patients: "20,000+",
  },
];

const benefits = [
  {
    icon: FaCheck,
    title: "Expert Ayurveda Doctors",
    description: "Qualified and experienced practitioners",
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
    <section className="doctors-consultation-section spacer-top-- spacer-bottom--">
      <div className="container">
        {/* Header Section */}
        <div className="row align-items-center">
          <div className="col-12">
            <div className="doctors-consultation-header">
              <h2 className="doctors-consultation-title">
                Free Doctor Consultation
              </h2>
              <div className="doctors-consultation-line"></div>
            </div>
          </div>
        </div>

        {/* Doctors Section - No Carousel */}
        <div className="doctors-section">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="doctor-profile-card">
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

                    <p className="doctor-description">{doctor.description}</p>

                    {/* <button
                      onClick={() =>
                        handleWhatsAppConsultation(doctor.name)
                      }
                      className="consultation-btn"
                    >
                      <FaWhatsapp />
                      Get Free Consultation
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
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
