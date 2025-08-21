"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaLeaf,
  FaHeart,
  FaStar,
  FaArrowRight,
  FaUsers,
  FaAward,
  FaShieldAlt,
  FaGlobe,
  FaHandshake,
  FaLightbulb,
} from "react-icons/fa";
import "./AboutUsPage.css";

const achievements = [
  {
    icon: FaAward,
    number: 100,
    text: "Product Purity",
    suffix: "%",
    description: "Quality guaranteed",
    color: "#e67e22",
  },
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
  {
    icon: FaLeaf,
    number: 10,
    text: "Years of Excellence",
    suffix: "+",
    description: "Decades of Ayurvedic wisdom",
    color: "#d4af37",
  },
];

const teamMembers = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    position: "Chief Ayurvedic Consultant",
    image: "https://dummyimage.com/259x244/",
    smallImage: "https://dummyimage.com/120x120/",
    expertise: "Ayurvedic Medicine & Wellness",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    position: "Head of Operations",
    image: "https://dummyimage.com/259x244/",
    smallImage: "https://dummyimage.com/120x120/",
    expertise: "Quality Assurance & Production",
  },
  {
    id: 3,
    name: "Anjali Patel",
    position: "Customer Experience Manager",
    image: "https://dummyimage.com/259x244/",
    smallImage: "https://dummyimage.com/120x120/",
    expertise: "Customer Relations & Support",
  },
  {
    id: 4,
    name: "Dr. Amit Singh",
    position: "Research & Development",
    image: "https://dummyimage.com/259x244/",
    smallImage: "https://dummyimage.com/120x120/",
    expertise: "Product Development & Innovation",
  },
];

const values = [
  {
    icon: FaLeaf,
    title: "Natural & Pure",
    description:
      "We use only 100% natural ingredients sourced from the finest locations, ensuring purity and authenticity in every product.",
  },
  {
    icon: FaHeart,
    title: "Customer First",
    description:
      "Your health and satisfaction are our top priorities. We're committed to providing personalized care and support.",
  },
  {
    icon: FaShieldAlt,
    title: "Quality Assurance",
    description:
      "Every product undergoes rigorous testing and quality checks to meet the highest standards of safety and efficacy.",
  },
  {
    icon: FaGlobe,
    title: "Sustainable Practices",
    description:
      "We're committed to eco-friendly practices and sustainable sourcing to protect our planet for future generations.",
  },
];

export default function AboutUsPage() {
  return (
    <div className="about-us-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 col-sm-12 mb-4">
              <div className="hero-content">
                <h1 className="hero-title">About FitFusion</h1>
                <div className="hero-line"></div>
                <h2 className="hero-subtitle">
                  Empowering Wellness with Ancient Ayurvedic Wisdom
                </h2>
                <p className="hero-description">
                  At FitFusion, we believe in the power of nature to heal and
                  restore. Our journey began with a simple mission: to bring
                  authentic Ayurvedic wellness solutions to modern life, helping
                  people achieve balance and harmony in body, mind, and spirit.
                </p>
                <div className="hero-actions">
                  <Link href="/shop" className="hero-btn primary-btn">
                    Explore Products
                    <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="hero-image-wrapper">
                <div className="hero-main-image">
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
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="section-header">
                <h2 className="section-title">Our Mission & Vision</h2>
                <div className="section-line"></div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 mb-4">
              <div className="mission-card">
                <div className="mission-icon">
                  <FaHeart />
                </div>
                <h3>Our Mission</h3>
                <p>
                  To empower individuals with authentic Ayurvedic solutions that
                  promote holistic wellness, helping them achieve optimal health
                  through natural, time-tested remedies and a balanced
                  lifestyle.
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 mb-4">
              <div className="vision-card">
                <div className="vision-icon">
                  <FaLightbulb />
                </div>
                <h3>Our Vision</h3>
                <p>
                  To become the most trusted name in Ayurvedic wellness,
                  bridging ancient wisdom with modern needs, and creating a
                  world where everyone has access to natural, effective health
                  solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="section-header">
                <h2 className="section-title">Our Core Values</h2>
                <div className="section-line"></div>
                <p className="section-description">
                  These principles guide everything we do, from product
                  development to customer service
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            {values.map((value, index) => (
              <div key={index} className="col-lg-3 col-md-6 col-sm-12 mb-4">
                <div className="value-card">
                  <div className="value-icon">
                    <value.icon />
                  </div>
                  <h4>{value.title}</h4>
                  <p>{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achievements-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="section-header">
                <h2 className="section-title">Our Achievements</h2>
                <div className="section-line"></div>
                <p className="section-description">
                  Milestones that reflect our commitment to excellence and
                  customer satisfaction
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            {achievements.map((achievement, index) => (
              <div key={index} className="col-lg-3 col-md-6 col-sm-12 mb-4">
                <div className="achievement-card">
                  <div
                    className="achievement-icon-wrapper"
                    style={{ backgroundColor: achievement.color }}
                  >
                    <achievement.icon className="achievement-icon" />
                  </div>
                  <div className="achievement-content">
                    <div className="achievement-number">
                      <span className="counter">{achievement.number}</span>
                      <span className="suffix">{achievement.suffix}</span>
                    </div>
                    <h4 className="achievement-text">{achievement.text}</h4>
                    <p className="achievement-description-text">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="team-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="section-header">
                <h2 className="section-title">Meet Our Team</h2>
                <div className="section-line"></div>
                <p className="section-description">
                  Dedicated professionals committed to your wellness journey
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            {teamMembers.map((member) => (
              <div key={member.id} className="col-lg-3 col-md-6 col-sm-6">
                <div className="team-card">
                  <div className="team-image-wrapper">
                    <div className="team-image">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={259}
                        height={244}
                      />
                    </div>
                  </div>
                  <div className="team-content">
                    <h3>{member.name}</h3>
                    <p className="team-position">{member.position}</p>
                    <p className="team-expertise">{member.expertise}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 text-center">
              <div className="cta-content">
                <h2>Ready to Start Your Wellness Journey?</h2>
                <p>
                  Join thousands of satisfied customers who trust FitFusion for
                  their health and wellness needs
                </p>
                <div className="cta-buttons">
                  <Link href="/shop" className="cta-btn primary">
                    Shop Now
                  </Link>
                  <Link href="/contact" className="cta-btn secondary">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
