import { HttpTypes } from "@medusajs/types";
import React, { useEffect } from "react";
import { getProductPrice } from "@/lib/util/get-product-price";

type OptionSelectProps = {
  product: HttpTypes.StoreProduct;
  variants: HttpTypes.StoreProductVariant[];
  option: HttpTypes.StoreProductOption;
  current: string | undefined;
  updateOption: (title: string, value: string) => void;
  title: string;
  disabled: boolean;
  "data-testid"?: string;
};

const OptionSelect: React.FC<OptionSelectProps> = ({
  product,
  variants,
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value);

  useEffect(() => {
    if (filteredOptions.length >= 1) {
      updateOption(option.id, filteredOptions[0]);
    }
  }, []);

  return (
    <div className="flex flex-col gap-y-3">
      {/* <span className="text-sm">Select {title}</span> */}
      <div
        className="flex flex-wrap justify-between gap-2"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          // Find the variant that matches the current option and value
          const variant = variants.find((variant) =>
            variant.options?.some(
              (opt) => opt.option_id === option.id && opt.value === v
            )
          );

          const { variantPrice } = getProductPrice({
            product: product,
            variantId: variant?.id,
          });

          return (
            <button
              onClick={() => updateOption(option.id, v)}
              key={v}
              // className={clx(
              //   "border-ui-border-base bg-ui-bg-subtle border text-small-regular h-10 rounded-rounded p-2 flex-1 ",
              //   {
              //     "border-ui-border-interactive": v === current,
              //     "hover:shadow-elevation-card-rest transition-shadow ease-in-out duration-150":
              //       v !== current,
              //   }
              // )}
              style={{
                border: "1px solid #005441",
                background: "white",
                minWidth: "200px",
                borderRadius: "10px",
                marginLeft: "10px",
                overflow: "hidden",
              }}
              disabled={disabled}
              data-testid="option-button"
            >
              <div
                style={{
                  padding: "10px",
                  backgroundColor: v == current ? "#005441" : "whitesmoke",
                  color: v == current ? "white" : "#005441",
                  fontWeight: v == current ? "bold" : "normal",
                }}
              >
                {variant?.title}
              </div>
              <div
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                {variantPrice?.calculated_price}
                {variant.material}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OptionSelect;
