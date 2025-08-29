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
export const defaultCategories: Category[] = [
  {
    name: "Men's Health & Wellness",
    href: "/shop?category_handle=men's-health-and-wellness",
    subcategories: [
      {
        name: "Sexual Wellness",
        href: "/shop?category_handle=sexual-wellness",
      },
      {
        name: "Stamina & Energy Boosters",
        href: "/shop?category_handle=stamina-and-energy-boosters",
      },
      {
        name: "Muscle Growth & Strength",
        href: "/shop?category_handle=muscle-growth-and-strength",
      },
    ],
  },
  {
    name: "Immunity & Vitality",
    href: "/shop?category_handle=immunity-and-vitality",
    subcategories: [
      {
        name: "Immune System Boosters",
        href: "/shop?category_handle=immune-system-boosters",
      },
      {
        name: "General Wellness",
        href: "/shop?category_handle=general-wellness",
      },
    ],
  },
  {
    name: "Lifestyle & Habit Control",
    href: "/shop?category_handle=lifestyle-and-habit-control",
    subcategories: [
      {
        name: "Detox & De-addiction",
        href: "/shop?category_handle=detox-and-de-addiction",
      },
      {
        name: "Stress & Anxiety Relief",
        href: "/shop?category_handle=stress-and-anxiety-relief",
      },
      {
        name: "Sleep Support (Sleep-O-Fit)",
        href: "/shop?category_handle=sleep-support-sleep-o-fit",
      },
    ],
  },
  {
    name: "Metabolic & Chronic Care",
    href: "/shop?category_handle=metabolic-and-chronic-care",
    subcategories: [
      { name: "Diabetes Care", href: "/shop?category_handle=diabetes-care" },
    ],
  },
  {
    name: "Digestive Health",
    href: "/shop?category_handle=digestive-health",
    subcategories: [
      {
        name: "Digestion Support",
        href: "/shop?category_handle=digestion-support",
      },
    ],
  },
  {
    name: "Ashwagandha",
    href: "/shop?category_handle=ashwagandha",
    subcategories: [
      {
        name: "Ashwagandha Capsules",
        href: "/shop?category_handle=ashwagandha-capsules",
      },
    ],
  },
  {
    name: "Shilajit",
    href: "/shop?category_handle=shilajit",
    subcategories: [
      {
        name: "Pure Shilajit Resin",
        href: "/shop?category_handle=pure-shilajit-resin",
      },
      {
        name: "Shilajit Capsules",
        href: "/shop?category_handle=shilajit-capsules",
      },
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
                <Link href={category.href} className="category-link">
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
                              fontSize: "14px",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "14px",
                              }}
                            >
                              {subcategory.name}
                            </span>
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
