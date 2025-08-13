"use client";

import Image from "next/image";
import Link from "next/link";
import { FaLeaf, FaHeart, FaStar, FaArrowRight } from "react-icons/fa";
import "./About.css";

export default function About() {
  return (
    <section
      className="about-section spacer-top spacer-bottom"
      style={{
        background: "#fff5df",
      }}
    >
      <div className="container">
        {/* Header Section */}
        {/* <div className="row align-items-center mb-5">
          <div className="col-12">
            <div className="about-header">
              <h2 className="about-title">About FitFusion</h2>
              <div className="about-line"></div>
            </div>
          </div>
        </div> */}

        {/* Main Content Section */}
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12 col-sm-12 mb-4">
            <div className="about-image-wrapper">
              <div className="about-main-image">
                <Image
                  src="https://fitfusion-alpha.vercel.app/_next/image?url=https%3A%2F%2Ffitfusion.fullstackartists.com%2Fstatic%2F1754305436086-61KyALBMInL._SL1200_.jpg&w=828&q=75"
                  alt="FitFusion Ayurveda"
                  width={561}
                  height={348}
                  className="img-fluid"
                />
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="about-content">
              {/* <h3 className="about-subtitle">Empowering Body, Mind & Soul</h3> */}
              <h4
                className="about-heading"
                style={{
                  color: "black",
                }}
              >
                With Ancient Ayurvedic Wisdom
              </h4>

              <p className="about-description">
                We don’t just sell products we promote a lifestyle of health and
                balance. At Fit Fusion Ayurveda, our mission is to help people
                reconnect with nature, even in today’s fast paced life, and
                achieve long term wellness the natural way.
              </p>

              <div className="about-actions">
                <Link href="/about-us" className="about-btn primary-btn">
                  About Us
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
