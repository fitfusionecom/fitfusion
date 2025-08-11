"use client";

import { sdk } from "@/lib/config";
import ShopSidebar from "./sidebar";
import ShopNotFound from "./not-found";
import { HttpTypes } from "@medusajs/types";
import { useEffect, useState } from "react";
import ProductCard from "../blocks/product-card";
import { useInfiniteQuery, useQuery } from "react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      }&q=${q}&price_min=${minPrice}&price_max=${maxPrice}&category_handle=${category_handle}&offset=${
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

  const [priceRange, setPriceRange] = useState([
    minPrice ? Number(minPrice) : 0,
    maxPrice ? Number(maxPrice) : 50000,
  ]) as any;

  const [openSections, setOpenSections] = useState({
    availability: true,
    price: true,
    productType: true,
    rating: false,
    categories: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const response = await sdk.client.fetch<{
          product_categories: HttpTypes.StoreProductCategory[];
        }>("/store/product-categories", {
          query: {
            fields:
              "*category_children, *parent_category, *parent_category.parent_category",
          },
          cache: "no-store",
        });
        return response.product_categories || [];
      } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error: productsError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["productData", q, minPrice, maxPrice, category_handle],
    queryFn: ({ pageParam = 1 }) =>
      fetchProducts({
        q,
        minPrice,
        maxPrice,
        category_handle: category_handle || "",
        pageParam,
      }),
    getNextPageParam: (lastPage: any, allPages: any) =>
      lastPage && lastPage.length > 0 ? allPages.length + 1 : undefined,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2,
  });

  const products = data?.pages.flat() || [];

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

  return (
    <div>
      {/*----------- Shop Header Section ---------*/}
      <div
        className="ayur-bgcover ayur-shop-header-sec"
        style={{
          background: "linear-gradient(135deg, #f0f8f0 0%, #fff 100%)",
          padding: "60px 0 40px",
          position: "relative",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10 col-sm-12 text-center">
              <div className="ayur-shop-header">
                <h1
                  className="ayur-shop-title"
                  style={{
                    color: "#222222",
                    fontSize: "3rem",
                    fontWeight: "600",
                    marginBottom: "20px",
                    fontFamily: "Archivo, sans-serif",
                  }}
                >
                  Discover Natural Wellness
                </h1>
                <div
                  className="ayur-shop-line"
                  style={{
                    width: "80px",
                    height: "4px",
                    background: "#90b644",
                    margin: "0 auto 20px",
                    borderRadius: "2px",
                  }}
                ></div>
                <p
                  className="ayur-shop-subtitle"
                  style={{
                    color: "#797979",
                    fontSize: "1.2rem",
                    marginBottom: "0",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Explore our curated collection of authentic Ayurvedic products
                </p>
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
        className="ayur-bgcover ayur-shopsin-sec"
        style={{
          background: "#fdffff",
          padding: "60px 0",
          position: "relative",
        }}
      >
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-lg-3 col-md-4 col-sm-12 mb-4">
              <ShopSidebar
                categories={categories || []}
                updateQueryParams={updateQueryParams}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                searchParams={searchParams}
              />
            </div>

            {/* Products Grid */}
            <div className="col-lg-9 col-md-8 col-sm-12">
              <div className="ayur-shopsin-products">
                {/* Results Header */}
                <div
                  className="ayur-products-header mb-4"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px 0",
                    borderBottom: "2px solid #e8f5e8",
                  }}
                >
                  <div className="ayur-products-title">
                    <h3
                      style={{
                        color: "#222222",
                        fontSize: "1.8rem",
                        fontWeight: "600",
                        margin: "0",
                        fontFamily: "Archivo, sans-serif",
                      }}
                    >
                      {q ? `Search Results for "${q}"` : "All Products"}
                    </h3>
                    <p
                      style={{
                        color: "#797979",
                        margin: "8px 0 0",
                        fontSize: "1rem",
                      }}
                    >
                      {products.length} products found
                    </p>
                  </div>
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
                  ) : products.length === 0 ? (
                    <div className="col-12">
                      <ShopNotFound />
                    </div>
                  ) : (
                    <>
                      {products.map((product) => (
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
