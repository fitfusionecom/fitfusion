"use client";

import "./header.css";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import CategoryBar from "./CategoryBar";
import { useState, useEffect } from "react";
import { retrieveCustomer } from "@/lib/data/customer";
import { fitfusionConfig } from "@/lib/fitfusion-config";
import CartTrigger from "@/components/cart/CartTrigger";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [customer, setCustomer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleSearchModal = () => {
    setIsSearchModalOpen((prev) => !prev);
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
              {/* Hamburger Toggle for Mobile - First on Mobile */}
              <div className="col-2 col-md-1 col-lg-0 d-flex d-lg-none align-items-center">
                <div
                  className="ayur-toggle-btn"
                  onClick={toggleMenu}
                  style={{ cursor: "pointer" }}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>

              {/* Logo */}
              <div className="col-4 col-md-3 col-lg-2 d-flex align-items-center">
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
              <div className="col-6 col-md-8 col-lg-2 d-flex justify-content-end align-items-center">
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
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Bar - Desktop Only */}
        <div className="d-none d-lg-block">
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
        <>
          {/* Backdrop */}
          <div
            className="mobile-menu-backdrop"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu Container */}
          <div className="mobile-menu-container">
            <div className="mobile-menu-header">
              <h3 className="mobile-menu-title">Menu</h3>
              <button
                className="mobile-menu-close"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <nav className="mobile-menu-nav">
              <div className="mobile-menu-section">
                <h4 className="mobile-menu-section-title">Main</h4>
                <ul className="mobile-menu-list">
                  <li>
                    <Link
                      href="/"
                      onClick={() => setIsMenuOpen(false)}
                      className="mobile-menu-link"
                    >
                      <span className="mobile-menu-icon">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M3 10L10 3L17 10L17 17H13V13H7V17H3V10Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span>Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop"
                      onClick={() => setIsMenuOpen(false)}
                      className="mobile-menu-link"
                    >
                      <span className="mobile-menu-icon">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 17.6 16.6 18 16 18H8C7.4 18 7 17.6 7 17V13H17Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span>Shop</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      onClick={() => setIsMenuOpen(false)}
                      className="mobile-menu-link"
                    >
                      <span className="mobile-menu-icon">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M4 19H20V5C20 3.9 19.1 3 18 3H6C4.9 3 4 3.9 4 5V19ZM4 21C2.9 21 2 20.1 2 19V5C2 3.9 2.9 3 4 3H6C4.9 3 4 3.9 4 5V21ZM6 7H18V17H6V7Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span>Blog</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      onClick={() => setIsMenuOpen(false)}
                      className="mobile-menu-link"
                    >
                      <span className="mobile-menu-icon">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M2 3H18C19.1 3 20 3.9 20 5V17C20 18.1 19.1 19 18 19H2C0.9 19 0 18.1 0 17V5C0 3.9 0.9 3 2 3ZM2 5V7L10 12L18 7V5H2ZM18 17V9L10 14L2 9V17H18Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span>Contact</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="mobile-menu-section">
                <h4 className="mobile-menu-section-title">Account</h4>
                <ul className="mobile-menu-list">
                  {!customer ? (
                    <li>
                      <Link
                        href="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="mobile-menu-link"
                      >
                        <span className="mobile-menu-icon">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.6 18 2 14.4 2 10C2 5.6 5.6 2 10 2C14.4 2 18 5.6 18 10C18 14.4 14.4 18 10 18ZM10 6C8.3 6 7 7.3 7 9C7 10.7 8.3 12 10 12C11.7 12 13 10.7 13 9C13 7.3 11.7 6 10 6ZM10 10C9.4 10 9 9.6 9 9C9 8.4 9.4 8 10 8C10.6 8 11 8.4 11 9C11 9.6 10.6 10 10 10Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span>Login</span>
                      </Link>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link
                          href="/account"
                          onClick={() => setIsMenuOpen(false)}
                          className="mobile-menu-link"
                        >
                          <span className="mobile-menu-icon">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.6 18 2 14.4 2 10C2 5.6 5.6 2 10 2C14.4 2 18 5.6 18 10C18 14.4 14.4 18 10 18ZM10 6C8.3 6 7 7.3 7 9C7 10.7 8.3 12 10 12C11.7 12 13 10.7 13 9C13 7.3 11.7 6 10 6ZM10 10C9.4 10 9 9.6 9 9C9 8.4 9.4 8 10 8C10.6 8 11 8.4 11 9C11 9.6 10.6 10 10 10Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span>My Account</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/account/orders"
                          onClick={() => setIsMenuOpen(false)}
                          className="mobile-menu-link"
                        >
                          <span className="mobile-menu-icon">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M16 2H4C2.9 2 2 2.9 2 4V18C2 19.1 2.9 20 4 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2ZM16 18H4V4H16V18ZM6 6H14V8H6V6ZM6 10H14V12H6V10ZM6 14H10V16H6V14Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span>My Orders</span>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              <div className="mobile-menu-section">
                <h4 className="mobile-menu-section-title">Quick Actions</h4>
                <ul className="mobile-menu-list">
                  <li>
                    <Link
                      href="/cart"
                      onClick={() => setIsMenuOpen(false)}
                      className="mobile-menu-link"
                    >
                      <span className="mobile-menu-icon">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 17.6 16.6 18 16 18H8C7.4 18 7 17.6 7 17V13H17Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span>View Cart</span>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={toggleSearchModal}
                      className="mobile-menu-link mobile-menu-button"
                    >
                      <span className="mobile-menu-icon">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M15.5 15.5L11.5 11.5M13.1667 7.33333C13.1667 10.555 10.555 13.1667 7.33333 13.1667C4.11167 13.1667 1.5 10.555 1.5 7.33333C1.5 4.11167 4.11167 1.5 7.33333 1.5C10.555 1.5 13.1667 4.11167 13.1667 7.33333Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span>Search Products</span>
                    </button>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
