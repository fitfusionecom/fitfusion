"use client";

import { HttpTypes } from "@medusajs/types";
import Link from "next/link";
import ProductCard from "../blocks/product-card";
import { listProducts } from "@/lib/data/products";
import { useQuery } from "react-query";

type RelatedProductsInlineProps = {
  product: HttpTypes.StoreProduct;
  countryCode: string;
};

export default function RelatedProductsInline({
  product,
  countryCode,
}: RelatedProductsInlineProps) {
  // Build query params for related products
  const queryParams: HttpTypes.StoreProductParams = {};

  if (product.collection_id) {
    // @ts-ignore
    queryParams.collection_id = [product.collection_id];
  }

  if (product.tags && product.tags.length > 0) {
    // @ts-ignore
    queryParams.tag_id = product.tags
      .map((t) => t.id)
      .filter(Boolean) as string[];
  }

  // @ts-ignore
  queryParams.is_giftcard = false;
  queryParams.limit = 6;

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "related-products",
      product.id,
      product.collection_id,
      product.tags?.map((t) => t.id).join(","),
      countryCode,
    ],
    queryFn: async () => {
      const { response } = await listProducts({
        queryParams,
        countryCode,
      });
      // Filter out the current product
      return response.products.filter(
        (relatedProduct) => relatedProduct.id !== product.id
      );
    },
    enabled: Boolean(product.id),
  });

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (isError || !data || data.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted">No related products found.</p>
        <Link href="/shop" className="ayur-btn">
          Browse All Products
        </Link>
      </div>
    );
  }

  return (
    <div className="related-products-inline">
      <div className="row">
        {data.map((relatedProduct) => (
          <div
            key={relatedProduct.id}
            className="col-lg-4 col-md-6 col-sm-6 mb-4"
          >
            <ProductCard product={relatedProduct} />
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <Link href="/shop" className="ayur-btn">
          View More Products
        </Link>
      </div>
    </div>
  );
}
