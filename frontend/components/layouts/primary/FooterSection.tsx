"use client";

import Link from "next/link";
import { FaPlus, FaMinus } from "react-icons/fa";

interface FooterSectionProps {
  title: string;
  items: Array<{ name: string; href: string } | string>;
  isOpen: boolean;
  onToggle: () => void;
  linkType?: "category" | "product" | "custom";
}

export default function FooterSection({
  title,
  items,
  isOpen,
  onToggle,
  linkType = "custom",
}: FooterSectionProps) {
  const generateHref = (item: string | { name: string; href: string }) => {
    if (typeof item === "object") {
      return item.href;
    }

    const itemName = item;
    switch (linkType) {
      case "category":
        return `/shop?category=${itemName.toLowerCase().replace(/\s+/g, "-")}`;
      case "product":
        return `/shop?search=${itemName.toLowerCase().replace(/\s+/g, "-")}`;
      default:
        return itemName.toLowerCase().replace(/\s+/g, "-");
    }
  };

  const getItemName = (item: string | { name: string; href: string }) => {
    return typeof item === "object" ? item.name : item;
  };

  return (
    <div className="ayur-footer-box">
      <div
        className="d-flex align-items-center justify-content-between mb-3"
        style={{ cursor: "pointer" }}
        onClick={onToggle}
      >
        <h4
          className="fw-semibold mb-0"
          style={{
            fontSize: "14px",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            color: "black",
          }}
        >
          {title}
        </h4>
        <span className="d-md-none">
          {isOpen ? (
            <FaMinus style={{ fontSize: "14px", color: "black" }} />
          ) : (
            <FaPlus style={{ fontSize: "14px", color: "black" }} />
          )}
        </span>
      </div>
      <ul
        className={`ayur-links list-unstyled ${
          isOpen ? "d-block" : "d-none d-md-block"
        }`}
      >
        {items.map((item, index) => (
          <li key={index} className="mb-2">
            <Link
              href={generateHref(item)}
              className="text-muted text-decoration-none"
              style={{ fontSize: "13px", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e67e22")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6c757d")}
            >
              {getItemName(item)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
