import Image from "next/image";
import React, { useState } from "react";

type ProductImageProps = {
  thumbnail?: string | null;
  images?: { url: string }[] | null;
  size?: "small" | "medium" | "large" | "full" | "square";
  isFeatured?: boolean;
  className?: string;
  "data-testid"?: string;
  priority?: boolean;
  alt?: string;
  onClick?: () => void;
};

const ProductImage: React.FC<ProductImageProps> = ({
  thumbnail,
  images,
  size = "medium",
  isFeatured,
  className,
  "data-testid": dataTestid,
  priority = false,
  alt = "Product image",
  onClick,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const initialImage = thumbnail || images?.[0]?.url;

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Bootstrap-based size classes
  const getSizeClass = () => {
    switch (size) {
      case "small":
        return "col-6 col-md-4 col-lg-3";
      case "medium":
        return "col-6 col-md-6 col-lg-4";
      case "large":
        return "col-12 col-md-8 col-lg-6";
      case "full":
        return "col-12";
      case "square":
        return "col-6 col-md-4 col-lg-3";
      default:
        return "col-6 col-md-6 col-lg-4";
    }
  };

  // Aspect ratio classes
  const getAspectClass = () => {
    if (isFeatured) {
      return "ratio ratio-11x14";
    }
    if (size === "square") {
      return "ratio ratio-1x1";
    }
    return "ratio ratio-9x16";
  };

  return (
    <div
      className={`position-relative overflow-hidden rounded-3 shadow-sm transition-all duration-300 hover:shadow-lg ${getSizeClass()} ${getAspectClass()} ${
        className || ""
      }`}
      data-testid={dataTestid || "product-image"}
      onClick={onClick}
      style={{
        backgroundColor: "#f9f9f9",
        cursor: onClick ? "pointer" : "default",
        minHeight:
          size === "small"
            ? "180px"
            : size === "medium"
            ? "290px"
            : size === "large"
            ? "440px"
            : "auto",
      }}
    >
      {initialImage && !hasError ? (
        <>
          <Image
            src={initialImage}
            alt={alt}
            className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
            fill
            sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
            draggable={false}
            priority={priority}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          {isLoading && (
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-light bg-opacity-75">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-light text-muted">
          <div className="text-center">
            <svg
              className="mb-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "48px", height: "48px" }}
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="d-block">No Image</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImage;
