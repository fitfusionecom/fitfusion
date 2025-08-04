"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const whyFeatures = [
  {
    icon: "/assets/images/why-icon1.png",
    title: "100% Natural Ingredients",
    description:
      "We use only pure, natural, and time-tested Ayurvedic ingredients to ensure the highest quality and effectiveness.",
  },
  {
    icon: "/assets/images/why-icon2.png",
    title: "Authentic Ayurveda",
    description:
      "Our products are rooted in the ancient wisdom of Ayurveda, crafted to balance mind, body, and spirit.",
  },
  {
    icon: "/assets/images/why-icon3.png",
    title: "Quality Assurance",
    description:
      "Every product undergoes rigorous quality checks to guarantee safety, purity, and customer satisfaction.",
  },
  {
    icon: "/assets/images/why-icon4.png",
    title: "Holistic Wellness",
    description:
      "We empower you to achieve total well-being with holistic solutions for body, mind, and soul.",
  },
];

const benefits = [
  "Holistic approach to health and wellness.",
  "Crafted with natural, time-tested remedies.",
  "Commitment to quality and customer satisfaction.",
  "Empowering you to thrive, not just survive.",
];

export default function WhySection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const openVideo = () => {
    setIsVideoOpen(true);
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
  };

  return (
    <div className="ayur-bgcover ayur-why-sec">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="ayur-heading-wrap ayur-why-head">
              <h5>Why Choose FitFusion?</h5>
              <h3>Empowering Wellness with Ayurveda</h3>
            </div>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="ayur-why-secbox">
              {whyFeatures.map((feature, index) => (
                <div key={index} className="ayur-why-box">
                  <div className="ayur-why-boxicon">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={30}
                      height={30}
                    />
                  </div>
                  <div className="ayur-why-boxtext">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="ayur-why-textheading">
              <h3>Discover the Natural Way to Optimal Health and Harmony</h3>
              <p>
                At FitFusion, we are dedicated to delivering authentic Ayurvedic
                solutions that nurture your body, mind, and soul. Our mission is
                to empower you to achieve total well-being by balancing mind,
                body, and spirit with natural, time-tested remedies and rituals.
              </p>
              <ul>
                {benefits.map((benefit, index) => (
                  <li key={index}>
                    <Image
                      src="/assets/images/tick.png"
                      alt="tick"
                      width={20}
                      height={20}
                    />
                    <p className="m-0">{benefit}</p>
                  </li>
                ))}
              </ul>
              <p>
                Experience the FitFusion difference—where ancient wisdom meets
                modern wellness, and your journey to holistic health begins.
              </p>
              <div className="ayur-why-btn">
                <Link href="/services" className="ayur-btn">
                  Read More
                </Link>
              </div>
            </div>
          </div>
          {/* <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="ayur-video-section">
              <div className="ayur-video-img">
                <Image
                  src="/assets/images/ban-head-Image.png"
                  alt="video thumbnail"
                  width={1146}
                  height={380}
                />
                <a
                  href="javascript:void(0)"
                  className="ayur-video-playicon"
                  onClick={openVideo}
                >
                  <Image
                    src="/assets/images/play-icon.svg"
                    alt="play icon"
                    width={60}
                    height={60}
                  />
                </a>
                {isVideoOpen && (
                  <div
                    id="videoPopup1"
                    className="ayur-popup"
                    style={{ display: "block" }}
                  >
                    <div className="ayur-popup-content">
                      <span className="close" onClick={closeVideo}>
                        ×
                      </span>
                      <iframe
                        src="https://www.youtube.com/embed/hJTmi9euoNg"
                        frameBorder="0"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div className="ayur-bgshape ayur-why-bgshape">
        <Image
          src="/assets/images/bg-shape4.png"
          alt="shape"
          width={200}
          height={200}
        />
        <Image
          src="/assets/images/bg-leaf4.png"
          alt="leaf"
          width={150}
          height={150}
        />
      </div>
    </div>
  );
}
