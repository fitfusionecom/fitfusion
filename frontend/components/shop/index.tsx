"use client";

import { getRegion } from "@/lib/data/regions";
import { sdk } from "@/lib/config";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import ProductCard from "../blocks/product-card";
import { Sidebar } from "lucide-react";
import ShopSidebar from "./sidebar";
import { HttpTypes } from "@medusajs/types";
import ShopNotFound from "./not-found";
import { listCategories } from "@/lib/data/categories";

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
  const region = await getRegion("in");
  const response = await sdk.client.fetch<any>(
    `/store/search?region_id=${
      region?.id
    }&currency_code=inr&q=${q}&price_min=${minPrice}&price_max=${maxPrice}&category_handle=${category_handle}&offset=${
      (pageParam - 1) * 20
    }`,
    {
      cache: "no-cache",
    }
  );
  return response?.result?.products as any;
};

const ShopTemplate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const category_handle = searchParams.get("category_handle") || "";
  const [priceRange, setPriceRange] = useState([
    minPrice ? Number(minPrice) : 0,
    maxPrice ? Number(maxPrice) : 5000,
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

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      sdk.client
        .fetch<{ product_categories: HttpTypes.StoreProductCategory[] }>(
          "/store/product-categories",
          {
            query: {
              fields:
                "*category_children, *parent_category, *parent_category.parent_category",
            },
            cache: "no-store",
          }
        )
        .then(({ product_categories }) => product_categories),
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
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
        lastPage && lastPage.length ? allPages.length + 1 : undefined,
    });

  const products = data?.pages.flat() || [];

  const updateQueryParams = (
    key: string,
    value: string | number | boolean | string[]
  ) => {
    const params = new URLSearchParams(searchParams.toString());
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
                        <a href="index.html">Home</a>
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
                      products.map((product) => (
                        <div
                          key={product.id}
                          className="col-lg-4 col-md-6 col-sm-6"
                        >
                          <ProductCard product={product} />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ayur-bgshape ayur-trenpro-bgshape ayur-shopsin-bg">
            <img src="assets/images/bg-shape1.png" alt="img" />
            <img src="assets/images/bg-leaf1.png" alt="img" />
          </div>
        </div>
        {/*----------- Shop single page Section end ---------*/}
      </>
    </div>
  );
};

export default ShopTemplate;
