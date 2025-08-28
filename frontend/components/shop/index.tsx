"use client";

import { sdk } from "@/lib/config";
import ShopNotFound from "./not-found";
import { HttpTypes } from "@medusajs/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "../blocks/product-card";
import { useInfiniteQuery, useQuery } from "react-query";

// Simple loading skeleton for product cards
const ProductCardSkeleton = () => (
  <div className="col-lg-4 col-md-6 col-sm-6">
    <div
      style={{
        background: "#f6f1ed",
        borderRadius: "12px",
        minHeight: "320px",
        marginBottom: "24px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        boxShadow: "0 4px 12px rgba(144, 182, 68, 0.1)",
        animation: "pulse 1.5s infinite",
        border: "1px solid #e8f5e8",
      }}
      className="ayur-skeleton-card"
    >
      <div
        style={{ background: "#d6cdca", height: "180px", borderRadius: "8px" }}
      />
      <div
        style={{
          background: "#d6cdca",
          height: "20px",
          width: "70%",
          borderRadius: "4px",
        }}
      />
      <div
        style={{
          background: "#d6cdca",
          height: "16px",
          width: "50%",
          borderRadius: "4px",
        }}
      />
      <div
        style={{
          background: "#d6cdca",
          height: "16px",
          width: "40%",
          borderRadius: "4px",
        }}
      />
    </div>
    <style jsx global>{`
      @keyframes pulse {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0.6;
        }
        100% {
          opacity: 1;
        }
      }
    `}</style>
  </div>
);

const fetchProducts = async ({
  q,
  minPrice,
  maxPrice,
  category_handle,
  pageParam = 1,
}: {
  q: string;
  minPrice: string;
  maxPrice: string;
  category_handle: string;
  pageParam: number;
}) => {
  try {
    const currency_code = "inr";
    const region_id = process.env.NEXT_PUBLIC_REGION_ID;

    const response = await sdk.client.fetch<any>(
      `/store/search?region_id=${region_id}&currency_code=${currency_code}&q=${q}&price_min=${minPrice}&price_max=${maxPrice}&category_handle=${category_handle}&offset=${
        (pageParam - 1) * 20
      }`,
      {
        cache: "no-cache",
      }
    );

    return response?.result?.products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const ShopTemplate = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const router = useRouter();
  const q = (searchParams.q as string) || "";
  const minPrice = (searchParams.minPrice as string) || "0";
  const maxPrice = (searchParams.maxPrice as string) || "50000";
  const category_handle = (searchParams.category_handle as string) || "";
  const sortBy = (searchParams.sortBy as string) || "price-low-high";

  const [priceRange, setPriceRange] = useState([
    minPrice ? Number(minPrice) : 0,
    maxPrice ? Number(maxPrice) : 50000,
  ]) as any;

  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const [openSections, setOpenSections] = useState({
    availability: true,
    price: true,
    productType: true,
    rating: false,
    categories: true,
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".sort-dropdown-container")) {
        setSortDropdownOpen(false);
      }
    };

    if (sortDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sortDropdownOpen]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error: productsError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["productData", q, minPrice, maxPrice, category_handle, sortBy],
    queryFn: ({ pageParam = 1 }) =>
      fetchProducts({
        q,
        minPrice,
        maxPrice,
        // category_handle: category_handle || "",
        category_handle: "",
        pageParam,
      }),
    getNextPageParam: (lastPage: any, allPages: any) =>
      lastPage && lastPage.length > 0 ? allPages.length + 1 : undefined,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2,
  });

  const products = data?.pages.flat() || [];

  // Sort products based on selected option
  const getSortedProducts = () => {
    if (!products.length) return [];

    const sortedProducts = [...products];

    switch (sortBy) {
      case "price-low-high":
        return sortedProducts.sort((a, b) => {
          const priceA = a.variants?.[0]?.prices?.[0]?.amount || 0;
          const priceB = b.variants?.[0]?.prices?.[0]?.amount || 0;
          return priceA - priceB;
        });
      case "price-high-low":
        return sortedProducts.sort((a, b) => {
          const priceA = a.variants?.[0]?.prices?.[0]?.amount || 0;
          const priceB = b.variants?.[0]?.prices?.[0]?.amount || 0;
          return priceB - priceA;
        });
      default:
        // Default to price low to high
        return sortedProducts.sort((a, b) => {
          const priceA = a.variants?.[0]?.prices?.[0]?.amount || 0;
          const priceB = b.variants?.[0]?.prices?.[0]?.amount || 0;
          return priceA - priceB;
        });
    }
  };

  const sortedProducts = getSortedProducts();

  const updateQueryParams = (
    key: string,
    value: string | number | boolean | string[]
  ) => {
    const params = new URLSearchParams();

    // Add current search params
    Object.entries(searchParams).forEach(([k, v]) => {
      if (v !== undefined) {
        params.set(k, Array.isArray(v) ? v.join(",") : String(v));
      }
    });

    // Update the specific key
    if (Array.isArray(value)) {
      params.set(key, value.join(","));
    } else {
      params.set(key, String(value));
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    updateQueryParams("minPrice", priceRange[0]);
  }, [priceRange[0]]);

  useEffect(() => {
    updateQueryParams("maxPrice", priceRange[1]);
  }, [priceRange[1]]);

  // Handle errors
  if (productsError) {
    return (
      <div
        className="ayur-bgcover ayur-error-section"
        style={{ textAlign: "center", padding: "80px 20px" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-sm-12">
              <div className="ayur-error-content">
                <h2
                  style={{
                    color: "#90b644",
                    marginBottom: "20px",
                    fontSize: "2.5rem",
                  }}
                >
                  Oops! Something went wrong
                </h2>
                <p
                  style={{
                    color: "#797979",
                    marginBottom: "30px",
                    fontSize: "1.1rem",
                  }}
                >
                  {productsError instanceof Error
                    ? productsError.message
                    : "Failed to load products"}
                </p>
                <button
                  onClick={() => refetch()}
                  className="ayur-btn"
                  style={{
                    background: "#90b644",
                    borderColor: "#90b644",
                    color: "white",
                    border: "none",
                    padding: "12px 30px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: "500",
                    transition: "all 0.3s ease",
                  }}
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSortChange = (sortValue: string) => {
    updateQueryParams("sortBy", sortValue);
    setSortDropdownOpen(false);
  };

  const getSortDisplayText = () => {
    switch (sortBy) {
      case "price-low-high":
        return "Price, low to high";
      case "price-high-low":
        return "Price, high to low";
      default:
        return "Price, low to high";
    }
  };

  return (
    <div>
      {/*----------- Shop Header Section ---------*/}
      <div
        className="ayur-bgcover"
        style={{
          padding: "60px 0 40px",
          position: "relative",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Breadcrumb Navigation */}
              <nav aria-label="breadcrumb" style={{ marginBottom: "20px" }}>
                <ol
                  className="breadcrumb"
                  style={{
                    background: "transparent",
                    padding: "0",
                    margin: "0",
                    fontSize: "0.9rem",
                    color: "#797979",
                  }}
                >
                  <li className="breadcrumb-item">
                    <a
                      href="/"
                      style={{
                        color: "#90b644",
                        textDecoration: "none",
                        fontWeight: "500",
                      }}
                    >
                      Home
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {category_handle || "Shop"}
                  </li>
                </ol>
              </nav>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3
                  style={{
                    color: "#222222",
                    fontWeight: "700",
                    margin: "0",
                    fontFamily: "Archivo, sans-serif",
                    lineHeight: "1.2",
                    textTransform: "capitalize",
                  }}
                >
                  {category_handle.replace(/-/g, " ") || "All Products"}
                </h3>

                {/* Sort Dropdown */}
                <div
                  className="sort-dropdown-container"
                  style={{ position: "relative" }}
                >
                  <button
                    onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                    style={{
                      background: "white",
                      border: "1px solid #e0e0e0",
                      borderRadius: "6px",
                      padding: "4px 8px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "0.75rem",
                      color: "#333",
                      minWidth: "110px",
                      justifyContent: "space-between",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.07)",
                      height: "32px",
                    }}
                  >
                    <span
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {getSortDisplayText()}
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{
                        transform: sortDropdownOpen
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                        marginLeft: "2px",
                      }}
                    >
                      <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                  </button>

                  {sortDropdownOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        right: "0",
                        background: "white",
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        zIndex: 1000,
                        minWidth: "140px",
                        marginTop: "4px",
                      }}
                    >
                      <div
                        onClick={() => handleSortChange("price-low-high")}
                        style={{
                          padding: "8px 12px",
                          cursor: "pointer",
                          borderBottom: "1px solid #f0f0f0",
                          color:
                            sortBy === "price-low-high" ? "#90b644" : "#666",
                          background:
                            sortBy === "price-low-high"
                              ? "#f8f9fa"
                              : "transparent",
                          fontSize: "0.8rem",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            sortBy === "price-low-high" ? "#f8f9fa" : "#f5f5f5";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            sortBy === "price-low-high"
                              ? "#f8f9fa"
                              : "transparent";
                        }}
                      >
                        Price, low to high
                      </div>
                      <div
                        onClick={() => handleSortChange("price-high-low")}
                        style={{
                          padding: "8px 12px",
                          cursor: "pointer",
                          color:
                            sortBy === "price-high-low" ? "#90b644" : "#666",
                          background:
                            sortBy === "price-high-low"
                              ? "#f8f9fa"
                              : "transparent",
                          fontSize: "0.8rem",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            sortBy === "price-high-low" ? "#f8f9fa" : "#f5f5f5";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            sortBy === "price-high-low"
                              ? "#f8f9fa"
                              : "transparent";
                        }}
                      >
                        Price, high to low
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="ayur-bgshape ayur-shop-header-bgshape"
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            opacity: "0.1",
          }}
        >
          <img
            src="/assets/images/bg-leaf1.png"
            alt="leaf"
            style={{ width: "80px", height: "80px" }}
          />
        </div>
      </div>

      {/*----------- Shop Main Section ---------*/}
      <div
        style={{
          background: "#fdffff",
          padding: "10px 0",
          position: "relative",
        }}
      >
        <div className="container">
          <div className="row">
            {/* Products Grid */}
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="ayur-shopsin-products">
                {/* Results Header */}
                <div
                  className="ayur-products-header"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  {q && (
                    <button
                      onClick={() => updateQueryParams("q", "")}
                      className="ayur-btn"
                      style={{
                        background: "transparent",
                        border: "2px solid #90b644",
                        color: "#90b644",
                        padding: "8px 20px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        transition: "all 0.3s ease",
                      }}
                    >
                      Clear Search
                    </button>
                  )}
                </div>

                {/* Products Grid */}
                <div className="row">
                  {isLoading ? (
                    Array.from({ length: 6 }).map((_, idx) => (
                      <ProductCardSkeleton key={idx} />
                    ))
                  ) : sortedProducts.length === 0 ? (
                    <div className="col-12">
                      <ShopNotFound />
                    </div>
                  ) : (
                    <>
                      {sortedProducts.map((product) => (
                        <div
                          key={product.id}
                          className="col-lg-4 col-md-6 col-sm-6 mb-4"
                        >
                          <ProductCard product={product} />
                        </div>
                      ))}

                      {/* Load more button */}
                      {hasNextPage && (
                        <div className="col-12 text-center mt-5">
                          <button
                            onClick={() => fetchNextPage()}
                            disabled={isFetchingNextPage}
                            className="ayur-btn"
                            style={{
                              background: isFetchingNextPage
                                ? "#d6cdca"
                                : "#90b644",
                              borderColor: isFetchingNextPage
                                ? "#d6cdca"
                                : "#90b644",
                              color: "white",
                              border: "none",
                              padding: "15px 40px",
                              borderRadius: "8px",
                              cursor: isFetchingNextPage
                                ? "not-allowed"
                                : "pointer",
                              fontSize: "1.1rem",
                              fontWeight: "500",
                              transition: "all 0.3s ease",
                              boxShadow: "0 4px 12px rgba(144, 182, 68, 0.3)",
                            }}
                          >
                            {isFetchingNextPage
                              ? "Loading..."
                              : "Load More Products"}
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Shapes */}
        <div
          className="ayur-bgshape ayur-trenpro-bgshape ayur-shopsin-bg"
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            opacity: "0.1",
          }}
        >
          <img
            src="/assets/images/bg-shape1.png"
            alt="shape"
            style={{ width: "120px", height: "120px" }}
          />
        </div>
        <div
          className="ayur-bgshape ayur-shopsin-bg"
          style={{
            position: "absolute",
            top: "40px",
            right: "40px",
            opacity: "0.08",
          }}
        >
          <img
            src="/assets/images/bg-leaf1.png"
            alt="leaf"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopTemplate;
