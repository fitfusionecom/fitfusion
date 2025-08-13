"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { sdk } from "@/lib/config";
import { HttpTypes } from "@medusajs/types";
import ProductCard from "@/components/blocks/product-card";
import Link from "next/link";
import "./SearchModal.css";
import { BiArrowBack } from "react-icons/bi";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Popular search terms - you can customize these based on your business
const popularSearches = [
  "Herbal Medicine",
  "Organic Tea",
  "Ayurvedic Products",
  "Natural Supplements",
  "Wellness Products",
  "Health Supplements",
  "Traditional Medicine",
  "Herbal Remedies",
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<HttpTypes.StoreProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const router = useRouter();

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const searchProducts = async (query: string) => {
    if (!query.trim()) {
      setProducts([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      // Get region data
      const regionsResponse = await sdk.client.fetch<{
        regions: HttpTypes.StoreRegion[];
      }>("/store/regions");

      const region =
        regionsResponse.regions?.find((r) =>
          r.countries?.some((c) => c.iso_2 === "in")
        ) || regionsResponse.regions?.[0];

      if (!region) {
        throw new Error("No region found");
      }

      const response = await sdk.client.fetch<any>(
        `/store/search?region_id=${region.id}&currency_code=${
          region.currency_code || "inr"
        }&q=${query}&limit=6`,
        {
          cache: "no-cache",
        }
      );

      setProducts(response?.result?.products || []);
    } catch (error) {
      console.error("Error searching products:", error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset search when modal opens
  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setDebouncedQuery("");
      setProducts([]);
      setHasSearched(false);
    }
  }, [isOpen]);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Auto-search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim()) {
      searchProducts(debouncedQuery);
    } else {
      setProducts([]);
      setHasSearched(false);
    }
  }, [debouncedQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is now automatic, but we can still handle form submission if needed
    if (searchQuery.trim()) {
      setDebouncedQuery(searchQuery);
    }
  };

  const handlePopularSearchClick = (term: string) => {
    setSearchQuery(term);
    setDebouncedQuery(term);
  };

  const handleShowAll = () => {
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
    }
  };

  const handleProductClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="search-modal-overlay"
      onClick={handleBackdropClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "white",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        className="search-modal"
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Search Input with Clear and Back Buttons */}
        <div style={{ padding: "24px 32px" }}>
          {/* Header with Back Button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <button
              onClick={onClose}
              className="back-button"
              style={{
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                color: "#6b7280",
                padding: "8px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
                marginRight: "16px",
              }}
            >
              <BiArrowBack />
            </button>
            <h2
              style={{
                margin: 0,
                fontSize: "20px",
                fontWeight: "600",
                color: "#111827",
              }}
            >
              Search Products
            </h2>
          </div>

          {/* Search Input Container */}
          <div style={{ position: "relative" }}>
            {/* Search Icon on the Left */}
            <div
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#6b7280",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
                zIndex: 2,
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5 15.5L11.5 11.5M13.1667 7.33333C13.1667 10.555 10.555 13.1667 7.33333 13.1667C4.11167 13.1667 1.5 10.555 1.5 7.33333C1.5 4.11167 4.11167 1.5 7.33333 1.5C10.555 1.5 13.1667 4.11167 13.1667 7.33333Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              style={{
                width: "100%",
                padding: "16px 20px 16px 48px",
                fontSize: "16px",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                outline: "none",
                transition: "all 0.2s ease",
                backgroundColor: "#f9fafb",
                color: "black",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#3b82f6";
                e.target.style.backgroundColor = "white";
                e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.backgroundColor = "#f9fafb";
                e.target.style.boxShadow = "none";
              }}
            />

            {/* Clear Button (X) - Only show when there's text */}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="clear-button"
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "#f3f4f6",
                  border: "none",
                  fontSize: "16px",
                  cursor: "pointer",
                  color: "#6b7280",
                  padding: "6px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                  zIndex: 2,
                  width: "24px",
                  height: "24px",
                }}
              >
                ×
              </button>
            )}

            {/* Loading Spinner - Show when typing but before search triggers */}
            {searchQuery && !debouncedQuery && (
              <div
                style={{
                  position: "absolute",
                  right: searchQuery ? "44px" : "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "#f59e0b",
                  borderRadius: "50%",
                  padding: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                  zIndex: 1,
                  width: "20px",
                  height: "20px",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    border: "2px solid white",
                    borderTop: "2px solid transparent",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                ></div>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            padding: "0 32px 32px",
            overflowY: "auto",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Popular Searches - Show when no search or no results */}
          {(!hasSearched ||
            (hasSearched && products.length === 0 && !isLoading)) && (
            <div style={{ marginBottom: "32px" }}>
              <h3
                style={{
                  margin: "0 0 16px 0",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Popular Searches
              </h3>
              <div
                className="popular-searches"
                style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
              >
                {popularSearches.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => handlePopularSearchClick(term)}
                    className="popular-search-btn"
                    style={{
                      background: "#f3f4f6",
                      border: "1px solid #e5e7eb",
                      borderRadius: "20px",
                      padding: "8px 16px",
                      fontSize: "14px",
                      cursor: "pointer",
                      color: "#374151",
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {hasSearched && products.length > 0 && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#374151",
                  }}
                >
                  Search Results
                </h3>
                <button
                  onClick={handleShowAll}
                  className="show-all-btn"
                  style={{
                    background: "#3b82f6",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "10px 20px",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  Show All Results
                </button>
              </div>

              <div className="search-results-grid">
                {products.map((product) => (
                  <div key={product.id} onClick={handleProductClick}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* View All Products Button */}
              <div style={{ textAlign: "center", marginTop: "32px" }}>
                <button
                  onClick={() => {
                    router.push("/shop");
                    onClose();
                  }}
                  className="view-all-products-btn"
                  style={{
                    background: "#10b981",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px 24px",
                    fontSize: "16px",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  View All Products
                </button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ fontSize: "16px", color: "#6b7280" }}>
                Searching...
              </div>
            </div>
          )}

          {/* No Results Message */}
          {hasSearched &&
            !isLoading &&
            products.length === 0 &&
            searchQuery.trim() && (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ fontSize: "16px", color: "#6b7280" }}>
                  No products found for "{searchQuery}"
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
