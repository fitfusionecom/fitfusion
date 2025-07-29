"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const whyFeatures = [
  {
    icon: "/assets/images/why-icon1.png",
    title: "100 % Organic",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit",
  },
  {
    icon: "/assets/images/why-icon2.png",
    title: "Best Quality",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit",
  },
  {
    icon: "/assets/images/why-icon3.png",
    title: "Hygienic Product",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit",
  },
  {
    icon: "/assets/images/why-icon4.png",
    title: "Health Care",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit",
  },
];

const benefits = [
  "Quis nostrud was exercitation.",
  "Quis nostrud was exercitation.",
  "Quis nostrud was exercitation.",
  "Quis nostrud was exercitation.",
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
              <h5>Best For You</h5>
              <h3>Why Pure Ayurveda</h3>
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
                      width={60}
                      height={60}
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
              <h3>Solve Your Problem with The Power of Nature</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,it's sed
                do eiusmod tempor incididunt ut labore et dolore was a magna
                aliqua.Ut enim ad minim veniam,quis nostrud exercitation that is
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                aute irure dolor in to reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur.
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
                    <p>{benefit}</p>
                  </li>
                ))}
              </ul>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </p>
              <div className="ayur-why-btn">
                <Link href="/services" className="ayur-btn">
                  Read More
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="ayur-video-section">
              <div className="ayur-video-img">
                <Image
                  src="https://dummyimage.com/1146x380/"
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
          </div>
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
