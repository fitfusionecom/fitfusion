"use client";

import Link from "next/link";
import { useState } from "react";

interface Category {
  name: string;
  href: string;
  subcategories?: Category[];
}

interface CategoryBarProps {
  categories?: Category[];
}

// All category and subcategory hrefs now point to /shop
const defaultCategories: Category[] = [
  {
    name: "Gym & Energy",
    href: "/shop",
    subcategories: [
      { name: "Pre-Workout", href: "/shop" },
      { name: "Post-Workout", href: "/shop" },
      { name: "Energy Boosters", href: "/shop" },
    ],
  },
  {
    name: "Weight, Sugar & Stress",
    href: "/shop",
    subcategories: [
      { name: "Weight Management", href: "/shop" },
      { name: "Sugar Control", href: "/shop" },
      { name: "Stress Relief", href: "/shop" },
    ],
  },
  {
    name: "Liver & Gut",
    href: "/shop",
    subcategories: [
      { name: "Liver Health", href: "/shop" },
      { name: "Digestive Health", href: "/shop" },
      { name: "Detox Products", href: "/shop" },
    ],
  },
  {
    name: "Immunity",
    href: "/shop",
    subcategories: [
      { name: "Immune Boosters", href: "/shop" },
      { name: "Vitamin C", href: "/shop" },
      { name: "Herbal Immunity", href: "/shop" },
    ],
  },
  {
    name: "Hair, Skin & Oral Care",
    href: "/shop",
    subcategories: [
      { name: "Hair Care", href: "/shop" },
      { name: "Skin Care", href: "/shop" },
      { name: "Oral Care", href: "/shop" },
    ],
  },
  {
    name: "Superfoods & Juices",
    href: "/shop",
    subcategories: [
      { name: "Superfoods", href: "/shop" },
      { name: "Fresh Juices", href: "/shop" },
      { name: "Health Drinks", href: "/shop" },
    ],
  },
];

export default function CategoryBar({
  categories = defaultCategories,
}: CategoryBarProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Helper to handle both mouse and keyboard focus for accessibility
  const handleCategoryEnter = (name: string) => setHoveredCategory(name);
  const handleCategoryLeave = () => setHoveredCategory(null);

  return (
    <div className="category-bar">
      <div className="container">
        <nav className="category-nav">
          <ul className="category-list">
            {categories.map((category) => (
              <li
                key={category.name}
                className={`category-item${
                  category.subcategories ? " has-dropdown" : ""
                }`}
                onMouseEnter={() => handleCategoryEnter(category.name)}
                onMouseLeave={handleCategoryLeave}
                onFocus={() => handleCategoryEnter(category.name)}
                onBlur={handleCategoryLeave}
                tabIndex={0}
                style={{ position: "relative" }}
              >
                <Link
                  href={category.href}
                  className="category-link"
                  style={{
                    fontSize: "1rem", // 16px, base size for category title
                  }}
                >
                  {category.name}
                  {category.subcategories && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="dropdown-icon"
                      style={{ marginLeft: 4 }}
                    >
                      <path
                        d="M3 4.5L6 7.5L9 4.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </Link>

                {category.subcategories && (
                  <div
                    className="dropdown-menu"
                    style={{
                      display:
                        hoveredCategory === category.name ? "flex" : "none",
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      zIndex: 1000,
                      background: "#fff",
                      minWidth: 180,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                      borderRadius: 4,
                      padding: "0.15rem 0", // Reduced vertical padding
                      alignItems: "flex-start",
                    }}
                  >
                    <ul
                      className="subcategory-list"
                      style={{
                        margin: 0,
                        padding: "0.1rem 0",
                        listStyle: "none",
                      }}
                    >
                      {category.subcategories.map((subcategory, idx, arr) => (
                        <li
                          key={subcategory.name}
                          className="subcategory-item"
                          style={{
                            padding: "0.1rem 0.2rem", // Reduced padding for less gap
                            whiteSpace: "nowrap",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Link
                            href={subcategory.href}
                            className="subcategory-link"
                            tabIndex={
                              hoveredCategory === category.name ? 0 : -1
                            }
                            style={{
                              display: "flex",
                              alignItems: "center",
                              width: "100%",
                              justifyContent: "space-between",
                              textDecoration: "none",
                              color: "inherit",
                              fontSize: "0.95rem", // 15.2px, slightly smaller than category title
                            }}
                          >
                            <span>{subcategory.name}</span>
                            {/* Right Arrow */}
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              style={{ marginLeft: 8, flexShrink: 0 }}
                            >
                              <path
                                d="M5 3L9 7L5 11"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
