"use client";

import Image from "next/image";
import Link from "next/link";

const trendingProducts = [
  {
    id: "1",
    title: "Herbal Oil Medicine",
    image: "https://dummyimage.com/259x244/",
    originalPrice: 100,
    salePrice: 50,
    rating: 4.5,
    badge: "sale" as const,
    badgeText: "Sale",
  },
  {
    id: "2",
    title: "Herbal Oil Medicine",
    image: "https://dummyimage.com/259x244/",
    originalPrice: 100,
    salePrice: 50,
    rating: 4.5,
    badge: "off" as const,
    badgeText: "30% Off",
  },
  {
    id: "3",
    title: "Herbal Oil Medicine",
    image: "https://dummyimage.com/259x244/",
    originalPrice: 100,
    salePrice: 50,
    rating: 4.5,
    badge: "star" as const,
  },
  {
    id: "4",
    title: "Herbal Oil Medicine",
    image: "https://dummyimage.com/259x244/",
    originalPrice: 100,
    salePrice: 50,
    rating: 4.5,
    badge: "star" as const,
  },
];

export default function TrendingProducts() {
  return (
    <div className="ayur-bgcover ayur-trenproduct-sec">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="ayur-heading-wrap">
              <h5>Product</h5>
              <h3>Trending Product</h3>
            </div>
          </div>
        </div>
        <div className="row">
          {trendingProducts.map((product) => (
            <div key={product.id} className="col-lg-3 col-md-6 col-sm-6">
              <div className="ayur-tpro-box ayur-trepro-box">
                <div className="ayur-tpro-img">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={259}
                    height={244}
                  />
                  <div
                    className={
                      product.badge === "sale"
                        ? "ayur-tpro-sale"
                        : product.badge === "off"
                        ? "ayur-tpro-sale ayur-tpro-sale-off"
                        : "ayur-tpro-sale ayur-tpro-sale-star"
                    }
                  >
                    {product.badgeText && <p>{product.badgeText}</p>}
                    <div className="ayur-tpro-like">
                      <a href="javascript:void(0)" className="ayur-tpor-click">
                        <Image
                          src="/assets/images/like.svg"
                          alt="unlike"
                          className="unlike"
                          width={20}
                          height={20}
                        />
                        <Image
                          src="/assets/images/like-fill.svg"
                          alt="like"
                          className="like"
                          width={20}
                          height={20}
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="ayur-tpro-text">
                  <h3>
                    <Link href={`/product/${product.id}`}>{product.title}</Link>
                  </h3>
                  <div className="ayur-tpro-price">
                    <p>
                      <del>${product.originalPrice}</del>${product.salePrice}
                    </p>
                    <div className="ayur-tpro-star">
                      <Image
                        src="/assets/images/star-icon.png"
                        alt="star"
                        width={20}
                        height={20}
                      />
                      <p>{product.rating}/5</p>
                    </div>
                  </div>
                  <div className="ayur-tpro-btn">
                    <Link href="/cart" className="ayur-btn">
                      <span>
                        <svg
                          width="20"
                          height="19"
                          viewBox="0 0 20 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.826087 2.39643e-08C0.606995 2.39643e-08 0.396877 0.0870339 0.241955 0.241955C0.0870339 0.396877 0 0.606995 0 0.826087C0 1.04518 0.0870339 1.2553 0.241955 1.41022C0.396877 1.56514 0.606995 1.65217 0.826087 1.65217H2.29652C2.4166 1.65238 2.53358 1.69029 2.63096 1.76054C2.72834 1.8308 2.8012 1.92986 2.83926 2.04374L5.56287 10.2162C5.6843 10.5797 5.69917 10.9696 5.60665 11.3413L5.38278 12.2393C5.05317 13.5561 6.07835 14.8696 7.43478 14.8696H17.3478C17.5669 14.8696 17.777 14.7825 17.932 14.6276C18.0869 14.4727 18.1739 14.2626 18.1739 14.0435C18.1739 13.8244 18.0869 13.6143 17.932 13.4593C17.777 13.3044 17.5669 13.2174 17.3478 13.2174H7.43478C7.11261 13.2174 6.90609 12.953 6.98457 12.6416L7.15391 11.9659C7.18244 11.8516 7.24833 11.7501 7.34112 11.6775C7.43391 11.6049 7.54828 11.5654 7.66609 11.5652H16.5217C16.6953 11.5654 16.8646 11.511 17.0055 11.4095C17.1463 11.3081 17.2517 11.1649 17.3065 11.0002L19.508 4.39148C19.5494 4.26729 19.5607 4.13505 19.5409 4.00566C19.5211 3.87626 19.4709 3.75342 19.3943 3.64725C19.3178 3.54108 19.2171 3.45463 19.1005 3.39501C18.984 3.33539 18.855 3.30432 18.7241 3.30435H5.415C5.29478 3.30431 5.17762 3.26649 5.08007 3.19622C4.98253 3.12595 4.90954 3.0268 4.87143 2.91278L4.0883 0.565043C4.03349 0.400482 3.92828 0.257348 3.78757 0.15593C3.64686 0.0545128 3.4778 -4.17427e-05 3.30435 2.39643e-08H0.826087ZM6.6087 15.6957C6.17051 15.6957 5.75028 15.8697 5.44043 16.1796C5.13059 16.4894 4.95652 16.9096 4.95652 17.3478C4.95652 17.786 5.13059 18.2062 5.44043 18.5161C5.75028 18.8259 6.17051 19 6.6087 19C7.04688 19 7.46712 18.8259 7.77696 18.5161C8.0868 18.2062 8.26087 17.786 8.26087 17.3478C8.26087 16.9096 8.0868 16.4894 7.77696 16.1796C7.46712 15.8697 7.04688 15.6957 6.6087 15.6957ZM16.5217 15.6957C16.0836 15.6957 15.6633 15.8697 15.3535 16.1796C15.0436 16.4894 14.8696 16.9096 14.8696 17.3478C14.8696 17.786 15.0436 18.2062 15.3535 18.5161C15.6633 18.8259 16.0836 19 16.5217 19C16.9599 19 17.3802 18.8259 17.69 18.5161C17.9998 18.2062 18.1739 17.786 18.1739 17.3478C18.1739 16.9096 17.9998 16.4894 17.69 16.1796C17.3802 15.8697 16.9599 15.6957 16.5217 15.6957Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      Add to Cart
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="ayur-bgshape ayur-trenpro-bgshape">
        <Image
          src="/assets/images/bg-shape3.png"
          alt="shape"
          width={200}
          height={200}
        />
        <Image
          src="/assets/images/bg-leaf3.png"
          alt="leaf"
          width={150}
          height={150}
        />
      </div>
    </div>
  );
}
