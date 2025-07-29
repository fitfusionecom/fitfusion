import { HttpTypes } from "@medusajs/types";
import Link from "next/link";

const SearchBar = ({
  updateQueryParams,
}: {
  updateQueryParams: (
    key: string,
    value: string | number | boolean | string[]
  ) => void;
}) => {
  const handleSearch = (e: React.ChangeEvent<HTMLButtonElement>) => {
    updateQueryParams("q", e.target.value);
  };

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
          onChange={handleChange}
        />
      </div>
      <button className="ayur-btn" onClick={handleSearch as any}>
        search
      </button>
    </div>
  );
};

const ShopSidebar = ({
  categories,
  updateQueryParams,
}: {
  categories: HttpTypes.StoreProductCategory[];
  updateQueryParams: (
    key: string,
    value: string | number | boolean | string[]
  ) => void;
}) => {
  return (
    <div className="ayur-shop-sidebar">
      <SearchBar updateQueryParams={updateQueryParams} />
      <div className="ayur-widget ayur-shop-categories">
        <h3>Categories</h3>

        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/shop?category_handle=${category.handle}`}
                className="d-flex align-items-center justify-content-between gap-2"
              >
                {category.name}
                <img src="assets/images/right-arrow.png" alt="arrow" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="ayur-widget ayur-shop-tpro">
        <h3>Price Range</h3>
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
              value={
                typeof window !== "undefined"
                  ? new URLSearchParams(window.location.search).get(
                      "minPrice"
                    ) || ""
                  : ""
              }
              onChange={(e) => {
                const params = new URLSearchParams(window.location.search);
                params.set("minPrice", e.target.value);
                window.location.search = params.toString();
              }}
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
              value={
                typeof window !== "undefined"
                  ? new URLSearchParams(window.location.search).get(
                      "maxPrice"
                    ) || ""
                  : ""
              }
              onChange={(e) => {
                const params = new URLSearchParams(window.location.search);
                params.set("maxPrice", e.target.value);
                window.location.search = params.toString();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopSidebar;
