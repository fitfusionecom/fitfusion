import { HttpTypes } from "@medusajs/types";
import React, { useEffect } from "react";
import { getProductPrice } from "@/lib/util/get-product-price";
import "./option-select.css";

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
    <div className="option-select">
      {/* <span className="text-sm">Select {title}</span> */}
      <div className="option-select__container" data-testid={dataTestId}>
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

          const isSelected = v === current;

          return (
            <button
              onClick={() => updateOption(option.id, v)}
              key={v}
              className={`option-select__button ${
                isSelected ? "option-select__button--selected" : ""
              }`}
              disabled={disabled}
              data-testid="option-button"
            >
              <div className="option-select__title">{variant?.title}</div>
              <div className="option-select__details">
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
