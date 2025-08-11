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

const defaultCategories: Category[] = [
  {
    name: "Gym & Energy",
    href: "/category/gym-energy",
    subcategories: [
      { name: "Pre-Workout", href: "/category/pre-workout" },
      { name: "Post-Workout", href: "/category/post-workout" },
      { name: "Energy Boosters", href: "/category/energy-boosters" },
    ],
  },
  {
    name: "Weight, Sugar & Stress",
    href: "/category/weight-sugar-stress",
    subcategories: [
      { name: "Weight Management", href: "/category/weight-management" },
      { name: "Sugar Control", href: "/category/sugar-control" },
      { name: "Stress Relief", href: "/category/stress-relief" },
    ],
  },
  {
    name: "Liver & Gut",
    href: "/category/liver-gut",
    subcategories: [
      { name: "Liver Health", href: "/category/liver-health" },
      { name: "Digestive Health", href: "/category/digestive-health" },
      { name: "Detox Products", href: "/category/detox" },
    ],
  },
  {
    name: "Immunity",
    href: "/category/immunity",
    subcategories: [
      { name: "Immune Boosters", href: "/category/immune-boosters" },
      { name: "Vitamin C", href: "/category/vitamin-c" },
      { name: "Herbal Immunity", href: "/category/herbal-immunity" },
    ],
  },
  {
    name: "Hair, Skin & Oral Care",
    href: "/category/hair-skin-oral",
    subcategories: [
      { name: "Hair Care", href: "/category/hair-care" },
      { name: "Skin Care", href: "/category/skin-care" },
      { name: "Oral Care", href: "/category/oral-care" },
    ],
  },
  {
    name: "Superfoods & Juices",
    href: "/category/superfoods-juices",
    subcategories: [
      { name: "Superfoods", href: "/category/superfoods" },
      { name: "Fresh Juices", href: "/category/fresh-juices" },
      { name: "Health Drinks", href: "/category/health-drinks" },
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
