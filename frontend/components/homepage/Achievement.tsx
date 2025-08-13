"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaLeaf,
  FaUsers,
  FaShieldAlt,
  FaAward,
  FaStar,
  FaHeart,
} from "react-icons/fa";
import "./Achievement.css";
import Link from "next/link";

const achievements = [
  {
    icon: FaAward,
    number: 100,
    text: "Product Purity",
    suffix: "%",
    description: "Quality guaranteed",
    color: "#e67e22",
  },
  // {
  //   icon: FaLeaf,
  //   number: 10,
  //   text: "Years of Excellence",
  //   suffix: "+",
  //   description: "Decades of Ayurvedic wisdom",
  //   color: "#d4af37",
  // },
  {
    icon: FaUsers,
    number: 1000,
    text: "Happy Customers",
    suffix: "+",
    description: "Trusted by families nationwide",
    color: "#556b2f",
  },
  {
    icon: FaShieldAlt,
    number: 50,
    text: "Natural Products",
    suffix: "+",
    description: "Pure and authentic formulations",
    color: "#2d5016",
  },
  // {
  //   icon: FaAward,
  //   number: 100,
  //   text: "Product Purity",
  //   suffix: "%",
  //   description: "Quality guaranteed",
  //   color: "#e67e22",
  // },
  // {
  //   icon: FaStar,
  //   number: 4.8,
  //   text: "Customer Rating",
  //   suffix: "",
  //   description: "Consistently excellent",
  //   color: "#f39c12",
  // },
  // {
  //   icon: FaHeart,
  //   number: 99,
  //   text: "Satisfaction Rate",
  //   suffix: "%",
  //   description: "Customer happiness",
  //   color: "#e74c3c",
  // },
];

export default function Achievement() {
  const [counts, setCounts] = useState(achievements.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.querySelector(".achievement-section");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    const timers = achievements.map((achievement, index) => {
      const target = achievement.number;
      let current = 0;

      const timer = setInterval(() => {
        current += target / steps;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }

        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = Math.floor(current);
          return newCounts;
        });
      }, stepDuration);

      return timer;
    });

    return () => timers.forEach((timer) => clearInterval(timer));
  }, [isVisible]);

  return (
    <section className="achievement-section">
      <div className="container">
        {/* Header Section */}
        <div className="row mb-5">
          <div className="col-12 text-center">
            <div className="achievement-header">
              <h2 className="achievement-title">
                Why Choose Fit Fusion Ayurveda?
              </h2>
              {/* <div className="achievement-subtitle">
                Empowering Wellness with Ayurveda
              </div> */}
              <div className="achievement-line"></div>
              <p
                className="achievement-description"
                style={{
                  color: "white",
                }}
              >
                At Fit Fusion Ayurveda, we are dedicated to delivering authentic
                Ayurvedic solutions that nurture your body, mind, and soul. Our
                commitment to quality and customer satisfaction has helped us
                achieve remarkable milestones.
              </p>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="row">
          {achievements.map((achievement, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="achievement-card">
                <div
                  className="achievement-icon-wrapper"
                  style={{ backgroundColor: achievement.color }}
                >
                  <achievement.icon className="achievement-icon" />
                </div>
                <div className="achievement-content">
                  <div className="achievement-number">
                    <span className="counter">{counts[index]}</span>
                    <span className="suffix">{achievement.suffix}</span>
                  </div>
                  <h4 className="achievement-text">{achievement.text}</h4>
                  <p className="achievement-description-text">
                    {achievement.description}
                  </p>
                </div>
                <div
                  className="achievement-glow"
                  style={{ backgroundColor: achievement.color }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        {/* <div className="row mt-5">
          <div className="col-12 text-center">
            <div className="achievement-cta">
              <div className="cta-content">
                <h3>Ready to Experience the FitFusion Difference?</h3>
                <p>
                  Join thousands of satisfied customers who trust us for their
                  wellness journey
                </p>
                <div className="cta-buttons">
                  <Link href="/shop" className="cta-btn primary">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      {/* Background Decorative Elements */}
      <div className="achievement-bg-elements">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>
    </section>
  );
}
