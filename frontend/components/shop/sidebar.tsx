import { HttpTypes } from "@medusajs/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchBar = ({
  updateQueryParams,
  searchParams,
}: {
  updateQueryParams: (
    key: string,
    value: string | number | boolean | string[]
  ) => void;
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const currentQuery = (searchParams.q as string) || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQueryParams("q", e.target.value);
  };

  return (
    <div
      className="ayur-widget ayur-shop-search"
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "24px",
        marginBottom: "24px",
        border: "1px solid #e8f5e8",
        boxShadow: "0 4px 12px rgba(144, 182, 68, 0.08)",
      }}
    >
      <h3
        style={{
          color: "#222222",
          fontSize: "1.4rem",
          fontWeight: "600",
          marginBottom: "16px",
          fontFamily: "Archivo, sans-serif",
        }}
      >
        Search Products
      </h3>
      <div className="ayur-form-input">
        <input
          type="text"
          className="form-control"
          placeholder="Search for products..."
          value={currentQuery}
          onChange={handleChange}
          style={{
            border: "2px solid #e8f5e8",
            borderRadius: "8px",
            padding: "12px 16px",
            fontSize: "1rem",
            transition: "all 0.3s ease",
            background: "#f0f8f0",
          }}
        />
      </div>
    </div>
  );
};

const ShopSidebar = ({
  categories,
  updateQueryParams,
  priceRange,
  setPriceRange,
  searchParams,
}: {
  categories: HttpTypes.StoreProductCategory[];
  updateQueryParams: (
    key: string,
    value: string | number | boolean | string[]
  ) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const currentMinPrice = (searchParams.minPrice as string) || "";
  const currentMaxPrice = (searchParams.maxPrice as string) || "";

  const [showCategories, setShowCategories] = useState(true);
  const [showPriceRange, setShowPriceRange] = useState(true);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value) || 0;
    setPriceRange([value, priceRange[1]]);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value) || 5000;
    setPriceRange([priceRange[0], value]);
  };

  return (
    <div className="ayur-shop-sidebar">
      <SearchBar
        updateQueryParams={updateQueryParams}
        searchParams={searchParams}
      />

      {/* Categories Widget */}
      <div
        className="ayur-widget ayur-shop-categories"
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "24px",
          marginBottom: "24px",
          border: "1px solid #e8f5e8",
          boxShadow: "0 4px 12px rgba(144, 182, 68, 0.08)",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3
            style={{
              color: "#222222",
              fontSize: "1.4rem",
              fontWeight: "600",
              margin: "0",
              fontFamily: "Archivo, sans-serif",
            }}
          >
            Categories
          </h3>
          <button
            onClick={() => setShowCategories(!showCategories)}
            style={{
              background: "transparent",
              border: "2px solid #90b644",
              color: "#90b644",
              borderRadius: "6px",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "1.2rem",
              fontWeight: "bold",
              transition: "all 0.3s ease",
            }}
          >
            {showCategories ? "−" : "+"}
          </button>
        </div>

        {showCategories && (
          <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
            <li style={{ marginBottom: "12px" }}>
              <a
                onClick={() => updateQueryParams("category_handle", "")}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  background: "#f0f8f0",
                  color: "#222222",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  border: "1px solid transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#e8f5e8";
                  e.currentTarget.style.borderColor = "#90b644";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#f0f8f0";
                  e.currentTarget.style.borderColor = "transparent";
                }}
              >
                <span style={{ fontWeight: "500" }}>All Categories</span>
                <span style={{ color: "#90b644", fontSize: "0.9rem" }}>→</span>
              </a>
            </li>
            {categories.map((category) => (
              <li key={category.id} style={{ marginBottom: "12px" }}>
                <a
                  onClick={() =>
                    updateQueryParams("category_handle", category.handle)
                  }
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    background: "#f0f8f0",
                    color: "#222222",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    border: "1px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#e8f5e8";
                    e.currentTarget.style.borderColor = "#90b644";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#f0f8f0";
                    e.currentTarget.style.borderColor = "transparent";
                  }}
                >
                  <span style={{ fontWeight: "500" }}>{category.name}</span>
                  <span style={{ color: "#90b644", fontSize: "0.9rem" }}>
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Price Range Widget */}
      <div
        className="ayur-widget ayur-shop-tpro"
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "24px",
          marginBottom: "24px",
          border: "1px solid #e8f5e8",
          boxShadow: "0 4px 12px rgba(144, 182, 68, 0.08)",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3
            style={{
              color: "#222222",
              fontSize: "1.4rem",
              fontWeight: "600",
              margin: "0",
              fontFamily: "Archivo, sans-serif",
            }}
          >
            Price Range
          </h3>
          <button
            onClick={() => setShowPriceRange(!showPriceRange)}
            style={{
              background: "transparent",
              border: "2px solid #90b644",
              color: "#90b644",
              borderRadius: "6px",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "1.2rem",
              fontWeight: "bold",
              transition: "all 0.3s ease",
            }}
          >
            {showPriceRange ? "−" : "+"}
          </button>
        </div>

        {showPriceRange && (
          <div style={{ padding: "16px 0" }}>
            <div style={{ marginBottom: "16px" }}>
              <label
                htmlFor="minPrice"
                style={{
                  display: "block",
                  color: "#797979",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  marginBottom: "8px",
                }}
              >
                Minimum Price (₹)
              </label>
              <input
                id="minPrice"
                type="number"
                min={0}
                className="form-control"
                value={currentMinPrice}
                onChange={handleMinPriceChange}
                style={{
                  border: "2px solid #e8f5e8",
                  borderRadius: "8px",
                  padding: "10px 12px",
                  fontSize: "1rem",
                  transition: "all 0.3s ease",
                  background: "#f0f8f0",
                  width: "100%",
                }}
              />
            </div>
            <div>
              <label
                htmlFor="maxPrice"
                style={{
                  display: "block",
                  color: "#797979",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  marginBottom: "8px",
                }}
              >
                Maximum Price (₹)
              </label>
              <input
                id="maxPrice"
                type="number"
                min={0}
                className="form-control"
                value={currentMaxPrice}
                onChange={handleMaxPriceChange}
                style={{
                  border: "2px solid #e8f5e8",
                  borderRadius: "8px",
                  padding: "10px 12px",
                  fontSize: "1rem",
                  transition: "all 0.3s ease",
                  background: "#f0f8f0",
                  width: "100%",
                }}
              />
            </div>

            {/* Price Range Display */}
            <div
              style={{
                marginTop: "20px",
                padding: "16px",
                background: "#f0f8f0",
                borderRadius: "8px",
                border: "1px solid #e8f5e8",
              }}
            >
              <p
                style={{
                  color: "#797979",
                  fontSize: "0.9rem",
                  margin: "0 0 8px 0",
                  fontWeight: "500",
                }}
              >
                Current Range:
              </p>
              <p
                style={{
                  color: "#90b644",
                  fontSize: "1.1rem",
                  margin: "0",
                  fontWeight: "600",
                }}
              >
                ₹{priceRange[0]} - ₹{priceRange[1]}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopSidebar;
