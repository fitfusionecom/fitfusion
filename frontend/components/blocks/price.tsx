//@ts-ignore
import { VariantPrice } from "types/global";

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

  return (
    <div className={`d-flex align-items-center gap-2 ${className || ""}`}>
      <span
        className={`fw-semibold ${
          price.price_type === "sale" ? "text-danger" : "text-secondary"
        } fs-6`}
        data-testid="price"
      >
        {price.calculated_price}
      </span>
      {price.price_type === "sale" && (
        <span
          className="text-muted text-decoration-line-through fs-6"
          data-testid="original-price"
        >
          {price.original_price}
        </span>
      )}
    </div>
  );
}
