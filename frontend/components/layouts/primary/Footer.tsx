"use client";

import Image from "next/image";
import Link from "next/link";
import { fitfusionConfig } from "@/lib/fitfusion-config";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const socialIconMap: Record<string, React.ReactNode> = {
  facebook: <FaFacebookF />,
  twitter: <FaTwitter />,
  instagram: <FaInstagram />,
  youtube: <FaYoutube />,
};

export default function Footer() {
  return (
    <footer
      className="ayur-footer-section"
      style={{
        backgroundColor: "#FFF5EC",
        color: "black",
      }}
    >
      {/* Main Footer Content */}
      <div className="container">
        <div className="ayur-footer-sec py-5">
          <div className="row g-4">
            {/* Company Info & Contact */}
            <div className="col-12 col-sm-6 col-lg-4 mb-4">
              <div className="ayur-footer-logosec">
                <div className="ayur-footer-logo mb-3">
                  <Image
                    src={fitfusionConfig.brand.transparentLogo}
                    alt={fitfusionConfig.brand.logoAlt}
                    width={120}
                    height={50}
                    style={{ height: "auto", maxWidth: "120px" }}
                  />
                </div>
                <p
                  className="text-muted mb-3"
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

            {/* Popular Categories */}
            <div className="col-6 col-sm-6 col-lg-2 mb-4">
              <div className="ayur-footer-box">
                <h4
                  className="fw-semibold mb-3"
                  style={{
                    fontSize: "14px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "black",
                  }}
                >
                  Popular Categories
                </h4>
                <ul className="ayur-links list-unstyled">
                  {[
                    "Vigor & Vitality",
                    "Men Health",
                    "Ayurvedic Juices",
                    "Chyawanprash",
                    "Hair Care",
                    "Immunity Boosters",
                    "Digestion Care",
                    "Skin Care",
                    "Pain Management",
                    "Liver Care",
                    "All Collections",
                  ].map((category, index) => (
                    <li key={index} className="mb-2">
                      <Link
                        href={`/shop?category=${category
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="text-muted text-decoration-none"
                        style={{ fontSize: "13px", transition: "color 0.2s" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#e67e22")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#6c757d")
                        }
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Popular Products */}
            <div className="col-6 col-sm-6 col-lg-2 mb-4">
              <div className="ayur-footer-box">
                <h4
                  className="fw-semibold mb-3"
                  style={{
                    fontSize: "14px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "black",
                  }}
                >
                  Popular Products
                </h4>
                <ul className="ayur-links list-unstyled">
                  {[
                    "Ashwagandha Capsules",
                    "Shilajit Resin",
                    "Chyawanprash",
                    "Hair Growth Oil",
                    "Liver Care Tablets",
                    "Immunity Boosters",
                    "Digestive Supplements",
                    "Skin Care Creams",
                    "Pain Relief Oils",
                    "Honey Products",
                    "View All Products",
                  ].map((product, index) => (
                    <li key={index} className="mb-2">
                      <Link
                        href={`/shop?search=${product
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="text-muted text-decoration-none"
                        style={{ fontSize: "13px", transition: "color 0.2s" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#e67e22")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#6c757d")
                        }
                      >
                        {product}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-6 col-sm-6 col-lg-2 mb-4">
              <div className="ayur-footer-box">
                <h4
                  className="fw-semibold mb-3"
                  style={{
                    fontSize: "14px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "black",
                  }}
                >
                  Quick Links
                </h4>
                <ul className="ayur-links list-unstyled">
                  {[
                    { name: "About Us", href: "/about" },
                    { name: "Contact Us", href: "/contact" },
                    { name: "Return Policy", href: "/return-policy" },
                    { name: "Privacy Policy", href: "/privacy" },
                    { name: "FAQs", href: "/faqs" },
                    { name: "Shipping Policy", href: "/shipping" },
                    { name: "Terms of Service", href: "/terms" },
                    { name: "Refund Policy", href: "/refund" },
                    { name: "Blog", href: "/blog" },
                    // { name: "Sitemap", href: "/sitemap" },
                  ].map((link, index) => (
                    <li key={index} className="mb-2">
                      <Link
                        href={link.href}
                        className="text-muted text-decoration-none"
                        style={{ fontSize: "13px", transition: "color 0.2s" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#e67e22")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#6c757d")
                        }
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Social Media Only */}
            <div className="col-6 col-sm-6 col-lg-2 mb-4">
              <div className="ayur-footer-box">
                <h4
                  className="fw-semibold mb-3"
                  style={{
                    fontSize: "14px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "black",
                  }}
                >
                  Follow Us
                </h4>
                {/* Social Media Icons */}
                <div className="d-flex flex-wrap gap-2">
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
                        className="d-flex align-items-center justify-content-center text-decoration-none"
                        style={{
                          width: "36px",
                          height: "36px",
                          backgroundColor: "#FFF5EC",
                          borderRadius: "50%",
                          color: social.color,
                          fontSize: "16px",
                          border: `1px solid ${social.color}`,
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = social.color;
                          e.currentTarget.style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#f8f9fa";
                          e.currentTarget.style.color = social.color;
                        }}
                        aria-label={social.name}
                      >
                        <span
                          style={{
                            fontSize: "16px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {socialIconMap[social.icon]}
                        </span>
                      </a>
                    ))}
                </div>
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
