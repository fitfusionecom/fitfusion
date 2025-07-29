"use client";

import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/blocks/product-card";
import { HttpTypes } from "@medusajs/types";

const topProducts = [
  {
    id: "1",
    title: "Black Organic Tea",
    image: "https://dummyimage.com/356x244/",
    originalPrice: 100,
    salePrice: 50,
    rating: 4.5,
    badge: "sale" as const,
    badgeText: "Sale",
  },
  {
    id: "2",
    title: "Loose Leaf Tea",
    image: "https://dummyimage.com/356x244/",
    originalPrice: 100,
    salePrice: 50,
    rating: 4.5,
    badge: "off" as const,
    badgeText: "30% Off",
  },
  {
    id: "3",
    title: "Oolong Tea",
    image: "https://dummyimage.com/356x244/",
    originalPrice: 100,
    salePrice: 50,
    rating: 4.5,
    badge: "star" as const,
  },
  {
    id: "4",
    title: "Black Organic Tea",
    image: "https://dummyimage.com/356x244/",
    originalPrice: 100,
    salePrice: 50,
    rating: 4.5,
    badge: "star" as const,
  },
  {
    id: "5",
    title: "Green Tea",
    image: "https://dummyimage.com/356x244/",
    originalPrice: 100,
    salePrice: 50,
    rating: 4.5,
    badge: "star" as const,
  },
  {
    id: "6",
    title: "Sencha Tea",
    image: "https://dummyimage.com/356x244/",
    originalPrice: 100,
    salePrice: 50,
    rating: 4.5,
    badge: "trending" as const,
    badgeText: "Trending",
  },
];

interface TopProductsProps {
  products: HttpTypes.StoreProduct[];
}

export default function TopProducts({ products }: TopProductsProps) {
  return (
    <div className="ayur-bgcover ayur-topproduct-sec">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="ayur-heading-wrap">
              <h5>Medicine</h5>
              <h3>Our Top Products</h3>
            </div>
          </div>
        </div>
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-lg-4 col-md-6 col-sm-6">
              <ProductCard product={product} />
            </div>
          ))}
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="ayur-tpro-viewbtn">
              <Link href="/shop" className="ayur-btn">
                View More
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="ayur-bgshape ayur-tpro-bgshape">
        <Image
          src="/assets/images/bg-shape1.png"
          alt="shape"
          width={200}
          height={200}
        />
        <Image
          src="/assets/images/bg-leaf1.png"
          alt="leaf"
          width={150}
          height={150}
        />
      </div>
    </div>
  );
}
