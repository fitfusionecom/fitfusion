"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { retrieveCustomer } from "@/lib/data/customer";
import { fitfusionConfig } from "@/lib/fitfusion-config";
import SearchBar from "./SearchBar";
import CategoryBar from "./CategoryBar";
import CartTrigger from "@/components/cart/CartTrigger";
import "./header.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [customer, setCustomer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearchModal = () => {
    setIsSearchModalOpen(!isSearchModalOpen);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const customerData = await retrieveCustomer();
        setCustomer(customerData);
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleSearch = (query: string) => {
    // Search logic will be implemented here
    console.log("Search query:", query);
    setIsSearchModalOpen(false);
  };

  // Dynamic header height based on screen size
  const HEADER_HEIGHT_DESKTOP = 120; // px for desktop
  const HEADER_HEIGHT_MOBILE = 80; // px for mobile (without category bar)

  return (
    <>
      {/* Fixed Header */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1050,
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        {/* Top Bar */}
        <div className="top-bar">
          <div className="container">
            <div className="row align-items-center g-12">
              {/* Logo */}
              <div className="col-6 col-md-3 col-lg-2 d-flex align-items-center">
                <div className="ayur-menu-logo">
                  <Link href="/">
                    <Image
                      src={fitfusionConfig.brand.logo}
                      alt={fitfusionConfig.brand.logoAlt}
                      width={120}
                      height={40}
                      style={{ height: "auto", width: "100%", maxWidth: 150 }}
                    />
                  </Link>
                </div>
              </div>

              {/* Search Bar - Desktop Only */}
              <div className="d-none d-md-flex col-md-6 col-lg-8 align-items-center justify-content-center">
                <SearchBar onSearch={handleSearch} placeholder="Search" />
              </div>

              {/* User Actions */}
              <div className="col-6 col-md-3 col-lg-2 d-flex justify-content-end align-items-center">
                <div className="ayur-nav-icons d-flex align-items-center">
                  {/* Search Icon - Mobile Only */}
                  <div className="ayur-nav-search me-2 d-md-none">
                    <button
                      onClick={toggleSearchModal}
                      className="search-icon-btn"
                      style={{
                        background: "none",
                        border: "none",
                        padding: "8px",
                        cursor: "pointer",
                      }}
                    >
                      <span className="icon">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.5 15.5L11.5 11.5M13.1667 7.33333C13.1667 10.555 10.555 13.1667 7.33333 13.1667C4.11167 13.1667 1.5 10.555 1.5 7.33333C1.5 4.11167 4.11167 1.5 7.33333 1.5C10.555 1.5 13.1667 4.11167 13.1667 7.33333Z"
                            stroke="#222222"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>

                  {/* User Icon */}
                  <div className="ayur-nav-usear me-2">
                    {!isLoading && (
                      <>
                        {customer ? (
                          <Link href="/account">
                            <span className="icon">
                              <svg
                                width="15"
                                height="17"
                                viewBox="0 0 15 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M7.66405 0C10.1737 0 12.2106 2.03684 12.2106 4.54651C12.2106 7.05619 10.1737 9.09302 7.66405 9.09302C5.15438 9.09302 3.11754 7.05619 3.11754 4.54651C3.11754 2.03684 5.15438 0 7.66405 0ZM7.66405 1.18605C5.80907 1.18605 4.30359 2.69153 4.30359 4.54651C4.30359 6.40149 5.80907 7.90698 7.66405 7.90698C9.51903 7.90698 11.0245 6.40149 11.0245 4.54651C11.0245 2.69153 9.51903 1.18605 7.66405 1.18605ZM14.978 15.6163C14.978 15.9833 14.8322 16.3352 14.5727 16.5947C14.3132 16.8542 13.9613 17 13.5943 17H1.73382C1.36683 17 1.01488 16.8542 0.75538 16.5947C0.495882 16.3352 0.350098 15.9833 0.350098 15.6163C0.350098 13.9911 0.995714 12.4324 2.14492 11.2832C3.29413 10.134 4.85278 9.48837 6.478 9.48837H8.8501C10.4753 9.48837 12.034 10.134 13.1832 11.2832C14.3324 12.4324 14.978 13.9911 14.978 15.6163ZM14.4016 16.1927C14.3913 16.1967 14.385 16.2014 14.385 16.2093L14.4016 16.1927ZM1.53614 15.6163C1.53614 15.7254 1.6247 15.814 1.73382 15.814H13.5943C13.6467 15.814 13.697 15.7931 13.7341 15.7561C13.7711 15.719 13.792 15.6687 13.792 15.6163C13.792 14.3056 13.2713 13.0486 12.3445 12.1219C11.4177 11.1951 10.1608 10.6744 8.8501 10.6744H6.478C5.16734 10.6744 3.91036 11.1951 2.98358 12.1219C2.0568 13.0486 1.53614 14.3056 1.53614 15.6163Z"
                                  fill="#222222"
                                />
                              </svg>
                            </span>
                          </Link>
                        ) : (
                          <Link href="/login">
                            <span className="icon">
                              <svg
                                width="15"
                                height="17"
                                viewBox="0 0 15 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M7.66405 0C10.1737 0 12.2106 2.03684 12.2106 4.54651C12.2106 7.05619 10.1737 9.09302 7.66405 9.09302C5.15438 9.09302 3.11754 7.05619 3.11754 4.54651C3.11754 2.03684 5.15438 0 7.66405 0ZM7.66405 1.18605C5.80907 1.18605 4.30359 2.69153 4.30359 4.54651C4.30359 6.40149 5.80907 7.90698 7.66405 7.90698C9.51903 7.90698 11.0245 6.40149 11.0245 4.54651C11.0245 2.69153 9.51903 1.18605 7.66405 1.18605ZM14.978 15.6163C14.978 15.9833 14.8322 16.3352 14.5727 16.5947C14.3132 16.8542 13.9613 17 13.5943 17H1.73382C1.36683 17 1.01488 16.8542 0.75538 16.5947C0.495882 16.3352 0.350098 15.9833 0.350098 15.6163C0.350098 13.9911 0.995714 12.4324 2.14492 11.2832C3.29413 10.134 4.85278 9.48837 6.478 9.48837H8.8501C10.4753 9.48837 12.034 10.134 13.1832 11.2832C14.3324 12.4324 14.978 13.9911 14.978 15.6163ZM14.4016 16.1927C14.3913 16.1967 14.385 16.2014 14.385 16.2093L14.4016 16.1927ZM1.53614 15.6163C1.53614 15.7254 1.6247 15.814 1.73382 15.814H13.5943C13.6467 15.814 13.697 15.7931 13.7341 15.7561C13.7711 15.719 13.792 15.6687 13.792 15.6163C13.792 14.3056 13.2713 13.0486 12.3445 12.1219C11.4177 11.1951 10.1608 10.6744 8.8501 10.6744H6.478C5.16734 10.6744 3.91036 11.1951 2.98358 12.1219C2.0568 13.0486 1.53614 14.3056 1.53614 15.6163Z"
                                  fill="#222222"
                                />
                              </svg>
                            </span>
                          </Link>
                        )}
                      </>
                    )}
                  </div>

                  <div className="separator d-none d-lg-block"></div>

                  {/* Cart Icon */}
                  <div className="ayur-nav-product me-2">
                    <CartTrigger />
                  </div>

                  {/* Hamburger Toggle for Mobile */}
                  <div
                    className="ayur-toggle-btn d-inline-flex d-lg-none ms-2"
                    onClick={toggleMenu}
                    style={{ cursor: "pointer" }}
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Bar - Desktop Only */}
        <div className="d-none d-md-block">
          <CategoryBar />
        </div>
      </div>

      {/* Spacer to prevent content from being hidden behind the fixed header */}
      <div
        style={{
          height: `clamp(${HEADER_HEIGHT_MOBILE}px, 8vh, ${HEADER_HEIGHT_DESKTOP}px)`,
        }}
      />

      {/* Mobile Search Modal */}
      {isSearchModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1060,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: "100px",
          }}
          onClick={toggleSearchModal}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "400px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <SearchBar onSearch={handleSearch} placeholder="Search" />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="d-lg-none mt-3 p-3 rounded shadow"
          style={{
            backgroundColor: "#f8f9fa",
            position: "fixed",
            top: HEADER_HEIGHT_MOBILE,
            left: 0,
            right: 0,
            zIndex: 1049,
          }}
        >
          <ul className="list-unstyled mb-0">
            <li className="mb-2">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-dark text-decoration-none fw-medium"
              >
                Home
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/shop"
                onClick={() => setIsMenuOpen(false)}
                className="text-dark text-decoration-none fw-medium"
              >
                Shop
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="text-dark text-decoration-none fw-medium"
              >
                Contact
              </Link>
            </li>
            {!customer && (
              <li className="mb-2">
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-dark text-decoration-none fw-medium"
                >
                  Login
                </Link>
              </li>
            )}
            {customer && (
              <li className="mb-2">
                <Link
                  href="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-dark text-decoration-none fw-medium"
                >
                  Profile
                </Link>
              </li>
            )}
            <li className="mb-2">
              <Link
                href="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="text-dark text-decoration-none fw-medium"
              >
                Cart
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
