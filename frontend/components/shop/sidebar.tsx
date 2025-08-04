import { HttpTypes } from "@medusajs/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchBar = ({
  updateQueryParams,
}: {
  updateQueryParams: (
    key: string,
    value: string | number | boolean | string[]
  ) => void;
}) => {
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQueryParams("q", e.target.value);
  };

  return (
    <div className="ayur-widget ayur-shop-search">
      <div className="ayur-form-input">
        <input
          type="text"
          className="form-control"
          placeholder="Search Here..."
          value={currentQuery}
          onChange={handleChange}
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
}: {
  categories: HttpTypes.StoreProductCategory[];
  updateQueryParams: (
    key: string,
    value: string | number | boolean | string[]
  ) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
}) => {
  const searchParams = useSearchParams();
  const currentMinPrice = searchParams.get("minPrice") || "";
  const currentMaxPrice = searchParams.get("maxPrice") || "";

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
      <SearchBar updateQueryParams={updateQueryParams} />

      {/* Categories */}
      <div className="ayur-widget ayur-shop-categories">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h3 className="mb-0">Categories</h3>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setShowCategories(!showCategories)}
          >
            {showCategories ? "−" : "+"}
          </button>
        </div>

        {showCategories && (
          <ul className="list-unstyled">
            <li>
              <a
                onClick={() => updateQueryParams("category_handle", "")}
                style={{ cursor: "pointer" }}
                className="d-flex align-items-center justify-content-between gap-2"
              >
                All
              </a>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <a
                  onClick={() =>
                    updateQueryParams("category_handle", category.handle)
                  }
                  style={{ cursor: "pointer" }}
                  className="d-flex align-items-center justify-content-between gap-2"
                >
                  {category.name}
                  <img src="/assets/images/right-arrow.png" alt="arrow" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Price Range */}
      <div className="ayur-widget ayur-shop-tpro mt-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h3 className="mb-0">Price Range</h3>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setShowPriceRange(!showPriceRange)}
          >
            {showPriceRange ? "−" : "+"}
          </button>
        </div>

        {showPriceRange && (
          <div className="ayur-sidepro-wrap" style={{ padding: "16px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <label htmlFor="minPrice" style={{ minWidth: 60 }}>
                Min:
              </label>
              <input
                id="minPrice"
                type="number"
                min={0}
                className="form-control"
                style={{ width: 80 }}
                value={currentMinPrice}
                onChange={handleMinPriceChange}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginTop: 12,
              }}
            >
              <label htmlFor="maxPrice" style={{ minWidth: 60 }}>
                Max:
              </label>
              <input
                id="maxPrice"
                type="number"
                min={0}
                className="form-control"
                style={{ width: 80 }}
                value={currentMaxPrice}
                onChange={handleMaxPriceChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopSidebar;
