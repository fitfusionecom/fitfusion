import { HttpTypes } from "@medusajs/types";
import { clx, Text } from "@medusajs/ui";
import { getProductPrice } from "@/lib/util/get-product-price";

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
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse" />;
  }

  return (
    <>
      <Text
        className={clx("md:text-lg text-xs font-semibold !text-gray-400", {
          "text-ui-fg-interactive----": selectedPrice.price_type === "sale",
        })}
        data-testid="price"
      >
        {selectedPrice.calculated_price}
      </Text>

      {selectedPrice.price_type === "sale" && (
        <Text
          className="line-through text-gray-400 text-xs md:text-md"
          data-testid="original-price"
        >
          {selectedPrice.original_price}
        </Text>
      )}
    </>
  );
}
