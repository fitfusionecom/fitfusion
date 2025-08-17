"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { fitfusionConfig } from "@/lib/fitfusion-config";
import FooterSection from "./FooterSection";
import FooterMobile from "./FooterMobile";
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
  const [isMobile, setIsMobile] = useState(false);
  const [openSections, setOpenSections] = useState<{
    categories: boolean;
    products: boolean;
    links: boolean;
  }>({
    categories: false,
    products: false,
    links: false,
  });

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // 768px is the breakpoint for md screens
    };

    // Check on mount
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Render mobile footer for small screens
  if (isMobile) {
    return <FooterMobile />;
  }

  // Render desktop footer for medium and large screens
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
            <div className="col-12 col-sm-6 col-lg-2 mb-4">
              <FooterSection
                title="Popular Categories"
                items={[
                  "Lifestyle & Habit Control",
                  "Vigor & Vitality",
                  "Men Health",
                  "Immunity Boosters",
                  "Digestion Care",
                  "All Collections",
                ]}
                isOpen={openSections.categories}
                onToggle={() => toggleSection("categories")}
                linkType="category"
              />
            </div>

            {/* Popular Products */}
            <div className="col-12 col-sm-6 col-lg-2 mb-4">
              <FooterSection
                title="Popular Products"
                items={[
                  "Massage Oil",
                  "Men's Health Kit",
                  "Josh Power Capsule",
                  "Sugar Medic",
                  "Ashwagandha Capsules",
                  "Shilajit Resin",
                  "Digestive Supplements",
                  "View All Products",
                ]}
                isOpen={openSections.products}
                onToggle={() => toggleSection("products")}
                linkType="product"
              />
            </div>

            {/* Quick Links */}
            <div className="col-12 col-sm-6 col-lg-2 mb-4">
              <FooterSection
                title="Quick Links"
                items={[
                  { name: "About Us", href: "/about" },
                  { name: "Contact Us", href: "/contact" },
                  {
                    name: "Cancellation & Refund Policy",
                    href: "/return-policy",
                  },
                  { name: "Privacy Policy", href: "/privacy" },
                  { name: "FAQs", href: "/faqs" },
                  { name: "Shipping Policy", href: "/shipping-delivery" },
                  { name: "Terms & Conditions", href: "/terms" },
                  { name: "Blog", href: "/blog" },
                ]}
                isOpen={openSections.links}
                onToggle={() => toggleSection("links")}
                linkType="custom"
              />
            </div>

            {/* Social Media Only */}
            <div className="col-12 col-sm-6 col-lg-2 mb-4">
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
                <div className="d-flex flex-wrap gap-2 mb-4">
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

                {/* Payment Methods Section */}
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
                    We Accept
                  </h4>
                  <div className="d-flex flex-wrap gap-2">
                    {[
                      { name: "Visa", src: "/assets/images/footer/visa.webp" },
                      {
                        name: "American Express",
                        src: "/assets/images/footer/amex.png",
                      },
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
                      {
                        name: "Airtel Payment Bank",
                        src: "/assets/images/footer/airtel-payment-bank.avif",
                      },
                      {
                        name: "M-Payment",
                        src: "/assets/images/footer/m-payment.webp",
                      },
                    ].map((payment, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          width: "50px",
                          height: "32px",
                          backgroundColor: "white",
                          borderRadius: "4px",
                          padding: "3px",
                          border: "1px solid #e0e0e0",
                        }}
                        title={payment.name}
                      >
                        <Image
                          src={payment.src}
                          alt={payment.name}
                          width={44}
                          height={26}
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
