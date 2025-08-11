"use client";

import Image from "next/image";
import Link from "next/link";
import { FaLeaf, FaHeart, FaStar, FaArrowRight } from "react-icons/fa";
import "./About.css";

export default function About() {
  const achievements = [
    {
      icon: FaLeaf,
      number: "10+",
      label: "Years of Excellence",
      description: "Decades of Ayurvedic wisdom",
    },
    {
      icon: FaHeart,
      number: "50K+",
      label: "Happy Customers",
      description: "Trusted by families nationwide",
    },
    {
      icon: FaStar,
      number: "4.8",
      label: "Customer Rating",
      description: "Consistently excellent service",
    },
  ];

  const features = [
    "100% Natural Ingredients",
    "Traditional Ayurvedic Formulations",
    "Expert Consultation Available",
    "Quality Assured Products",
  ];

  return (
    <section className="about-section spacer-top spacer-bottom">
      <div className="container">
        {/* Header Section */}
        <div className="row align-items-center mb-5">
          <div className="col-12">
            <div className="about-header">
              <h2 className="about-title">About FitFusion</h2>
              <div className="about-line"></div>
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="row align-items-center mb-5">
          <div className="col-lg-6 col-md-12 col-sm-12 mb-4">
            <div className="about-image-wrapper">
              <div className="about-main-image">
                <Image
                  src="/assets/images/ban-head-Image.png"
                  alt="FitFusion Ayurveda"
                  width={561}
                  height={348}
                  className="img-fluid"
                />
                <div className="about-image-overlay">
                  <div className="overlay-content">
                    <FaLeaf className="overlay-icon" />
                    <span>Natural Healing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="about-content">
              <h3 className="about-subtitle">Empowering Body, Mind & Soul</h3>
              <h4 className="about-heading">with Ancient Ayurvedic Wisdom</h4>

              <p className="about-description">
                At FitFusion, we believe in a holistic approach to health and
                wellness, rooted in the ancient wisdom of Ayurveda. Our mission
                is to empower you to achieve total well-being by balancing mind,
                body, and spirit with natural, time-tested remedies and rituals.
              </p>

              <p className="about-description">
                Discover the natural way to optimal health and harmony—because
                you deserve to thrive, not just survive. Our expert team
                combines traditional knowledge with modern understanding to
                provide you with the best of both worlds.
              </p>

              <div className="about-actions">
                <Link href="/contact" className="about-btn primary-btn">
                  Contact Us
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
