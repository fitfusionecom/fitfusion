"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { fitfusionConfig } from "@/lib/fitfusion-config";
import "./FooterMobile.css";
import {
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const socialIconMap: Record<string, React.ReactNode> = {
  facebook: <FaFacebookF />,
  instagram: <FaInstagram />,
};

export default function FooterMobile() {
  const [openSections, setOpenSections] = useState<{
    company: boolean;
    categories: boolean;
    products: boolean;
    links: boolean;
  }>({
    company: false,
    categories: false,
    products: false,
    links: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <footer
      className="ayur-footer-section"
      style={{
        backgroundColor: "#FFF5EC",
        color: "black",
      }}
    >
      {/* Mobile Footer Content */}
      <div className="container">
        <div className="ayur-footer-sec py-4">
          {/* Company Info Section */}
          <div className="mb-3">
            <div className="p-3">
              <div className="ayur-footer-logo mb-3 text-center">
                <Image
                  src={fitfusionConfig.brand.transparentLogo}
                  alt={fitfusionConfig.brand.logoAlt}
                  width={120}
                  height={50}
                  style={{ height: "auto", maxWidth: "120px" }}
                />
              </div>
              <p
                className="text-muted mb-3 text-center"
                style={{ fontSize: "14px", lineHeight: "1.6" }}
              >
                {fitfusionConfig.brand.tagline}
              </p>

              <div className="ayur-contact-list" style={{ fontSize: "13px" }}>
                <div className="d-flex align-items-start gap-2 mb-3">
                  <span
                    style={{
                      color: "black",
                      minWidth: 18,
                      display: "flex",
                      alignItems: "center",
                      marginTop: "2px",
                    }}
                  >
                    <FaMapMarkerAlt style={{ fontSize: "15px" }} />
                  </span>
                  <span className="text-muted" style={{ lineHeight: 1.4 }}>
                    {fitfusionConfig.contact.address.fullAddress}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <span
                    style={{
                      color: "black",
                      minWidth: 18,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <FaEnvelope style={{ fontSize: "14px" }} />
                  </span>
                  <span className="text-muted" style={{ lineHeight: 1.4 }}>
                    {fitfusionConfig.contact.supportEmail}
                  </span>
                </div>
                <div className="d-flex align-items-start gap-2 mb-3">
                  <span
                    style={{
                      color: "black",
                      minWidth: 18,
                      display: "flex",
                      alignItems: "center",
                      marginTop: "2px",
                    }}
                  >
                    <FaPhone style={{ fontSize: "14px" }} />
                  </span>
                  <span>
                    <span
                      className="text-muted fw-medium d-block"
                      style={{ lineHeight: 1.4 }}
                    >
                      {fitfusionConfig.contact.phone}
                    </span>
                    <span
                      className="text-muted d-block"
                      style={{ fontSize: "11px", marginTop: "2px" }}
                    >
                      ({fitfusionConfig.contact.workingHours})
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Categories Section */}
          <div className="mb-3">
            <div
              className="d-flex align-items-center justify-content-between p-3 accordion-header"
              onClick={() => toggleSection("categories")}
            >
              <h5
                className="mb-0 fw-semibold"
                style={{ fontSize: "16px", color: "black" }}
              >
                Popular Categories
              </h5>
              {openSections.categories ? (
                <FaChevronUp style={{ color: "black" }} />
              ) : (
                <FaChevronDown style={{ color: "black" }} />
              )}
            </div>

            {openSections.categories && (
              <div className="p-3 accordion-content">
                <ul className="list-unstyled mb-0">
                  {[
                    "Lifestyle & Habit Control",
                    "Vigor & Vitality",
                    "Men Health",
                    "Immunity Boosters",
                    "Digestion Care",
                    "All Collections",
                  ].map((category, index) => (
                    <li key={index} className="mb-2">
                      <Link
                        href={`/shop?category=${encodeURIComponent(category)}`}
                        className="text-decoration-none text-muted"
                        style={{ fontSize: "14px" }}
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Popular Products Section */}
          <div className="mb-3">
            <div
              className="d-flex align-items-center justify-content-between p-3 accordion-header"
              onClick={() => toggleSection("products")}
            >
              <h5
                className="mb-0 fw-semibold"
                style={{ fontSize: "16px", color: "black" }}
              >
                Popular Products
              </h5>
              {openSections.products ? (
                <FaChevronUp style={{ color: "black" }} />
              ) : (
                <FaChevronDown style={{ color: "black" }} />
              )}
            </div>

            {openSections.products && (
              <div className="p-3 accordion-content">
                <ul className="list-unstyled mb-0">
                  {[
                    "Massage Oil",
                    "Men's Health Kit",
                    "Josh Power Capsule",
                    "Sugar Medic",
                    "Ashwagandha Capsules",
                    "Shilajit Resin",
                    "Digestive Supplements",
                    "View All Products",
                  ].map((product, index) => (
                    <li key={index} className="mb-2">
                      <Link
                        href={`/shop?product=${encodeURIComponent(product)}`}
                        className="text-decoration-none text-muted"
                        style={{ fontSize: "14px" }}
                      >
                        {product}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Quick Links Section */}
          <div className="mb-3">
            <div
              className="d-flex align-items-center justify-content-between p-3 accordion-header"
              onClick={() => toggleSection("links")}
            >
              <h5
                className="mb-0 fw-semibold"
                style={{ fontSize: "16px", color: "black" }}
              >
                Quick Links
              </h5>
              {openSections.links ? (
                <FaChevronUp style={{ color: "black" }} />
              ) : (
                <FaChevronDown style={{ color: "black" }} />
              )}
            </div>

            {openSections.links && (
              <div className="p-3 accordion-content">
                <ul className="list-unstyled mb-0">
                  {[
                    { name: "About Us", href: "/about-us" },
                    { name: "Contact Us", href: "/contact" },
                    {
                      name: "Cancellation & Refund Policy",
                      href: "/return-policy",
                    },
                    { name: "Privacy Policy", href: "/privacy" },
                    { name: "FAQs", href: "/faqs" },
                    { name: "Shipping Policy", href: "/shipping" },
                    { name: "Terms & Conditions", href: "/terms" },
                    { name: "Blog", href: "/blog" },
                  ].map((link, index) => (
                    <li key={index} className="mb-2">
                      <Link
                        href={link.href}
                        className="text-decoration-none text-muted"
                        style={{ fontSize: "14px" }}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Social Media Section */}
          <div className="mb-3">
            <div className="p-3 text-center">
              <h5
                className="fw-semibold mb-3"
                style={{
                  fontSize: "16px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  color: "black",
                }}
              >
                Follow Us
              </h5>
              <div className="d-flex justify-content-center gap-3">
                {[
                  {
                    name: "Facebook",
                    href: fitfusionConfig.social?.facebook,
                    icon: "facebook",
                    color: "black",
                  },
                  {
                    name: "Instagram",
                    href: fitfusionConfig.social?.instagram,
                    icon: "instagram",
                    color: "black",
                  },
                ]
                  .filter((social) => !!social.href)
                  .map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="d-flex align-items-center justify-content-center text-decoration-none social-icon"
                      style={{
                        width: "44px",
                        height: "44px",
                        backgroundColor: "#FFF5EC",
                        borderRadius: "10%",
                        color: social.color,
                        fontSize: "18px",
                        border: `2px solid ${social.color}`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = social.color;
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#FFF5EC";
                        e.currentTarget.style.color = social.color;
                      }}
                      aria-label={social.name}
                    >
                      {socialIconMap[social.icon]}
                    </a>
                  ))}
              </div>
            </div>
          </div>

          {/* Payment Methods Section */}
          <div className="mb-3">
            <div className="p-3 text-center">
              <h5
                className="fw-semibold mb-3"
                style={{
                  fontSize: "16px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  color: "black",
                }}
              >
                We Accept
              </h5>
              <div className="d-flex flex-wrap justify-content-center gap-2">
                {[
                  { name: "Visa", src: "/assets/images/footer/visa.webp" },
                  {
                    name: "Paytm",
                    src: "/assets/images/footer/paytm.avif",
                  },
                  {
                    name: "PhonePe",
                    src: "/assets/images/footer/phone-pe.webp",
                  },
                  {
                    name: "UPI",
                    src: "/assets/images/footer/upi-icon.webp",
                  },
                  {
                    name: "Net Banking",
                    src: "/assets/images/footer/net_banking.webp",
                  },
                ].map((payment, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: "64px",
                      height: "40px",
                    }}
                    title={payment.name}
                  >
                    <Image
                      src={payment.src}
                      alt={payment.name}
                      width={56}
                      height={32}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "16px 0",
        }}
      >
        <div className="container text-center">
          <p className="mb-0" style={{ fontSize: "13px" }}>
            © 2025 {fitfusionConfig.brand.name}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
