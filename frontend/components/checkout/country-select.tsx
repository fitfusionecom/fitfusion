import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { HttpTypes } from "@medusajs/types";

type CountrySelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  region?: HttpTypes.StoreRegion;
  placeholder?: string;
  defaultValue?: string;
};

const CountrySelect = forwardRef<HTMLSelectElement, CountrySelectProps>(
  ({ placeholder = "Country", region, defaultValue, ...props }, ref) => {
    const innerRef = useRef<HTMLSelectElement>(null);

    useImperativeHandle(ref, () => innerRef.current);

    const countryOptions = useMemo(() => {
      if (!region) {
        return [];
      }
      return (
        region.countries?.map((country) => ({
          value: country.iso_2,
          label: country.display_name,
        })) || []
      );
    }, [region]);

    return (
      <div className="ayur-form-input ayur-check-form">
        <label>
          Select Country <span>*</span>
        </label>
        <select
          className="form-control"
          ref={innerRef}
          defaultValue={defaultValue || ""}
          {...props}
        >
          {countryOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

CountrySelect.displayName = "CountrySelect";

export default CountrySelect;
