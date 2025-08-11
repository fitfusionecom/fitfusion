"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaShippingFast,
  FaMoneyBillWave,
  FaHeadset,
  FaArrowRight,
} from "react-icons/fa";
import { getAllBlogPosts } from "@/lib/data/blog";
import "./ExploreAyurveda.css";



const serviceFeatures = [
  {
    icon: FaShippingFast,
    title: "Free Shipping",
    subtitle: "on prepaid orders above ₹399",
  },
  {
    icon: FaMoneyBillWave,
    title: "COD Available",
    subtitle: "@ ₹49 per order",
  },
  {
    icon: FaHeadset,
    title: "Have Queries or Concerns?",
    subtitle: "",
    buttonText: "Contact-Us",
    buttonLink: "/contact",
  },
];

export default function ExploreAyurveda() {
  const blogPosts = getAllBlogPosts().slice(0, 2); // Get first 2 blog posts
  
  return (
    <section className="explore-ayurveda-section spacer-top spacer-bottom">
      <div className="container">
        {/* Header Section */}
        <div className="row align-items-center mb-5">
          <div className="col-lg-8 col-md-8 col-sm-12">
            <div className="explore-ayurveda-header">
              <h2 className="explore-ayurveda-title">Explore Ayurveda</h2>
              <div className="explore-ayurveda-line"></div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 text-end">
            <Link href="/blog" className="pa-btn explore-view-all-btn">
              View All
            </Link>
          </div>
        </div>

        {/* Articles Cards Section */}
        <div className="row mb-5">
          {blogPosts.map((post) => (
            <div key={post.id} className="col-lg-6 col-md-6 col-sm-12 mb-4">
              <div
                className="explore-ayurveda-card"
                style={{ backgroundColor: post.backgroundColor }}
              >
                <div className="row align-items-center">
                  <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="explore-ayurveda-image">
                      <Image
                        src={post.image}
                        alt={post.titleHindi}
                        width={120}
                        height={120}
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-8 col-sm-8">
                    <div className="explore-ayurveda-content">
                      <h3 className="explore-ayurveda-article-title">
                        {post.titleHindi}
                      </h3>
                      <p className="explore-ayurveda-article-desc">
                        {post.descriptionHindi}
                      </p>
                      <Link
                        href={`/blog/${post.id}`}
                        className="explore-ayurveda-read-more"
                      >
                        <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Service Information Section */}
        <div className="row">
          {serviceFeatures.map((feature, index) => (
            <div key={index} className="col-lg-4 col-md-4 col-sm-12 mb-4">
              <div className="explore-service-feature">
                <div className="explore-service-icon">
                  <feature.icon />
                </div>
                <div className="explore-service-content">
                  <h4 className="explore-service-title">{feature.title}</h4>
                  {feature.subtitle && (
                    <p className="explore-service-subtitle">
                      {feature.subtitle}
                    </p>
                  )}
                  {feature.buttonText && (
                    <Link
                      href={feature.buttonLink}
                      className="pa-btn explore-contact-btn"
                    >
                      {feature.buttonText}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
