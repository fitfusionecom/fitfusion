"use client";

import { clx } from "@medusajs/ui";
import { deleteLineItem, updateLineItem } from "@/lib/data/cart";
import { HttpTypes } from "@medusajs/types";

import { useState } from "react";
import Spinner from "../blocks/spinner";
import ProductImage from "../blocks/product-card/thumbnail";
import { convertToLocale } from "@/lib/util/money";
import { getPercentageDiff } from "@/lib/util/get-precentage-diff";
import LineItemUnitPrice from "./line-item-unit-price";
import LineItemPrice from "./line-item-price";
import DeleteButton from "./delete-button";

type ItemProps = {
  item: HttpTypes.StoreCartLineItem;
  type?: "full" | "preview";
  currencyCode: string;
};

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changeQuantity = async (quantity: number) => {
    setError(null);
    setUpdating(true);

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  // TODO: Update this to grab the actual max inventory
  const maxQtyFromInventory = 10;
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory;

  return (
    <tr>
      <td>1</td>
      <td>
        <ProductImage
          thumbnail={item.thumbnail}
          images={item.variant?.product?.images}
          size="square"
          isFeatured={false}
          className="cursor-pointer"
        />
      </td>
      <td>
        <h6>{item.product_title}</h6>
      </td>
      <td>
        <LineItemUnitPrice
          item={item}
          style="tight"
          currencyCode={currencyCode}
        />
      </td>
      <td>
        {/* <input type="number" defaultValue={1} min={1} /> */}

        <input
          type="number"
          value={item.quantity}
          className="text-center max-w-[100px]"
          onChange={(value: any) => {
            if (
              !isNaN(parseInt(value.target.value)) &&
              parseInt(value.target.value) <= 100
            ) {
              changeQuantity(parseInt(value.target.value));
            }
          }}
        />
        {updating && <Spinner />}
      </td>
      <td>
        <span
          className={clx("!pr-0", {
            "flex flex-col items-end h-full justify-center": type === "preview",
          })}
        >
          {type === "preview" && (
            <span className="flex gap-x-1 ">
              <span className="text-ui-fg-muted">{item.quantity}x </span>
              <LineItemUnitPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </span>
          )}
          <LineItemPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </span>
      </td>
      <td>
        <DeleteButton id={item.id} />
      </td>
    </tr>
  );
};

export default Item;
