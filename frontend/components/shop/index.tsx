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
        background: "#f3f3f3",
        borderRadius: "8px",
        minHeight: "320px",
        marginBottom: "24px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        animation: "pulse 1.5s infinite",
      }}
      className="ayur-skeleton-card"
    >
      <div
        style={{ background: "#e0e0e0", height: "180px", borderRadius: "6px" }}
      />
      <div
        style={{
          background: "#e0e0e0",
          height: "20px",
          width: "70%",
          borderRadius: "4px",
        }}
      />
      <div
        style={{
          background: "#e0e0e0",
          height: "16px",
          width: "50%",
          borderRadius: "4px",
        }}
      />
      <div
        style={{
          background: "#e0e0e0",
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
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <h2>Error loading products</h2>
        <p style={{ color: "#666", marginBottom: "20px" }}>
          {productsError instanceof Error
            ? productsError.message
            : "Failed to load products"}
        </p>
        <button
          onClick={() => refetch()}
          style={{
            background: "#007bff",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div>
      <>
        {/*----------- Breadcrumb Section start ---------*/}
        <div className="ayur-bread-section">
          <div className="ayur-breadcrumb-wrapper">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="ayur-bread-content">
                    <h2>Shop</h2>
                    <div className="ayur-bread-list">
                      <span>
                        <Link href="/">Home</Link>
                      </span>
                      <span className="ayur-active-page">Shop</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*----------- Breadcrumb Section end ---------*/}
        {/*----------- Shop single page Section start ---------*/}
        <div className="ayur-bgcover ayur-shopsin-sec">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12">
                <ShopSidebar
                  categories={categories || []}
                  updateQueryParams={updateQueryParams}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  searchParams={searchParams}
                />
              </div>

              <div className="col-lg-8 col-md-6 col-sm-12">
                {/* Loading skeleton for products */}
                <div className="ayur-shopsin-products">
                  <div className="row">
                    {isLoading ? (
                      Array.from({ length: 6 }).map((_, idx) => (
                        <ProductCardSkeleton key={idx} />
                      ))
                    ) : products.length === 0 ? (
                      <ShopNotFound />
                    ) : (
                      <>
                        {products.map((product) => (
                          <div
                            key={product.id}
                            className="col-lg-4 col-md-6 col-sm-6"
                          >
                            <ProductCard product={product} />
                          </div>
                        ))}

                        {/* Load more button */}
                        {hasNextPage && (
                          <div className="col-12 text-center mt-4">
                            <button
                              onClick={() => fetchNextPage()}
                              disabled={isFetchingNextPage}
                              className="ayur-btn"
                              style={{
                                background: isFetchingNextPage
                                  ? "#ccc"
                                  : "#007bff",
                                cursor: isFetchingNextPage
                                  ? "not-allowed"
                                  : "pointer",
                              }}
                            >
                              {isFetchingNextPage ? "Loading..." : "Load More"}
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
          <div className="ayur-bgshape ayur-trenpro-bgshape ayur-shopsin-bg">
            <img src="/assets/images/bg-shape1.png" alt="img" />
            <img src="/assets/images/bg-leaf1.png" alt="img" />
          </div>
        </div>
        {/*----------- Shop single page Section end ---------*/}
      </>
    </div>
  );
};

export default ShopTemplate;
