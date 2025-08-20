import { HttpTypes } from "@medusajs/types";
import { getProductPrice } from "@/lib/util/get-product-price";

/**
 * Renders the product price, including sale and original price if applicable.
 * This implementation follows the Medusa Storefront style:
 * - Shows the calculated price (current price).
 * - If the product is on sale, shows the original price with a strikethrough.
 * - If price is loading, shows a skeleton.
 */
export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct;
  variant?: HttpTypes.StoreProductVariant;
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  });

  const selectedPrice = variant ? variantPrice : cheapestPrice;

  if (!selectedPrice) {
    return (
      <div
        className="h-25 w-100 bg-light rounded"
        style={{ height: "24px", width: "96px" }}
      />
    );
  }

  const isOnSale =
    selectedPrice.price_type === "sale" &&
    selectedPrice.original_price &&
    selectedPrice.original_price !== selectedPrice.calculated_price;

  return (
    <div className="ayur-tpro-price">
      <div className="d-flex align-items-baseline gap-2">
        <span
          className={`fw-semibold fs-4 ${
            isOnSale ? "text-success" : "text-dark"
          }`}
          data-testid="price"
        >
          {selectedPrice.calculated_price}
        </span>
        {isOnSale && (
          <span
            className="text-decoration-line-through text-muted fs-6"
            data-testid="original-price"
          >
            {selectedPrice.original_price}
          </span>
        )}
        {selectedPrice.price_type === "sale" &&
          selectedPrice.percentage_diff && (
            <span
              className="ms-2 text-success small fw-medium"
              data-testid="savings"
            >
              Save {selectedPrice.percentage_diff} %
            </span>
          )}
      </div>
    </div>
  );
}
