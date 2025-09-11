//@ts-ignore
import { VariantPrice } from "types/global";

/**
 * Pricing color approach:
 * - Sale price: "text-danger" (red) to highlight discount
 * - Regular price: "text-secondary" (gray) for less emphasis
 * - Original price (when on sale): "text-muted" and strikethrough
 *
 * This is a common and effective approach for e-commerce, as it draws attention to discounts.
 * However, you could consider using a primary brand color for regular price (e.g., "text-primary")
 * for more emphasis, or a custom color scheme to match your brand identity.
 */

export default function PreviewPrice({
  price,
  className,
}: {
  price: VariantPrice;
  className?: string;
}) {
  if (!price) {
    return null;
  }

  // You could customize these classes for your brand
  const salePriceClass = ""; // red for sale
  const regularPriceClass = ""; // gray for regular
  const originalPriceClass = "text-muted text-decoration-line-through"; // muted and strikethrough

  return (
    <div
      className={`d-md-flex d-grid align-items-center gap-md-2 ${
        className || ""
      }`}
    >
      <span
        className={`fw-bold ${
          price.price_type === "sale" ? salePriceClass : regularPriceClass
        } fs-md-5 fs-8`}
        data-testid="price"
      >
        {price.calculated_price}
      </span>
      {price.price_type === "sale" && (
        <span
          className={`${originalPriceClass} fs-6`}
          data-testid="original-price"
        >
          {price.original_price}
        </span>
      )}
    </div>
  );
}
