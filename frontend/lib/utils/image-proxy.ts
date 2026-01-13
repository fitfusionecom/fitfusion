/**
 * Converts HTTP image URLs to use the Next.js image proxy API route
 * This solves the mixed content issue (HTTP images on HTTPS pages)
 */
export function getProxiedImageUrl(imageUrl: string | null | undefined): string {
  if (!imageUrl) {
    return "/placeholder.svg";
  }

  // If the image is already using HTTPS or is a relative path, return as-is
  if (imageUrl.startsWith("https://") || imageUrl.startsWith("/")) {
    return imageUrl;
  }

  // If the image is from the HTTP source that needs proxying
  if (imageUrl.startsWith("http://13.60.77.163/")) {
    // Encode the URL and use the proxy route
    const encodedUrl = encodeURIComponent(imageUrl);
    return `/api/image-proxy?url=${encodedUrl}`;
  }

  // For any other HTTP URLs, proxy them as well
  if (imageUrl.startsWith("http://")) {
    const encodedUrl = encodeURIComponent(imageUrl);
    return `/api/image-proxy?url=${encodedUrl}`;
  }

  // Return as-is for any other cases
  return imageUrl;
}

/**
 * Processes an array of image URLs and returns proxied versions
 */
export function getProxiedImageUrls(
  images: string[] | { url: string }[] | null | undefined
): string[] {
  if (!images || images.length === 0) {
    return [];
  }

  return images.map((img) => {
    const url = typeof img === "string" ? img : img.url;
    return getProxiedImageUrl(url);
  });
}
