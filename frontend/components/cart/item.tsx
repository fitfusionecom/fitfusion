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
  index?: number;
  isOrder?: boolean;
};

const Item = ({
  item,
  type = "full",
  currencyCode,
  index,
  isOrder = false,
}: ItemProps) => {
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

  // For preview mode (checkout sidebar), show compact layout
  if (type === "preview") {
    return (
      <div className="cart-item-preview">
        <div className="cart-item-preview-content">
          <div className="cart-item-preview-image">
            <ProductImage
              thumbnail={item.thumbnail}
              images={item.variant?.product?.images}
              size="square"
              isFeatured={false}
              className="cursor-pointer"
            />
          </div>
          <div className="cart-item-preview-details">
            <h6 className="cart-item-preview-title">{item.product_title}</h6>
            <div className="cart-item-preview-meta">
              <span className="cart-item-preview-quantity">
                Qty: {item.quantity}
              </span>
              <span className="cart-item-preview-price">
                {convertToLocale({
                  amount: item.unit_price ?? 0,
                  currency_code: currencyCode,
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <tr>
      <td>{index || 1}</td>
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
        <h6
          className="mb-0"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.product_title && item.product_title.length > 30
            ? item.product_title.slice(0, 30) + "..."
            : item.product_title}
        </h6>
      </td>
      <td>
        <LineItemUnitPrice
          item={item}
          style="tight"
          currencyCode={currencyCode}
        />
      </td>
      <td>
        {!isOrder ? (
          <div className="d-flex align-items-center gap-2">
            <input
              type="number"
              value={item.quantity}
              className="form-control text-center"
              style={{ maxWidth: "80px" }}
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
          </div>
        ) : (
          <div className="d-flex align-items-center gap-2">{item.quantity}</div>
        )}
      </td>
      <td>
        <LineItemPrice item={item} style="tight" currencyCode={currencyCode} />
      </td>
      <td>{isOrder ? <div /> : <DeleteButton id={item.id} />}</td>
    </tr>
  );
};

export default Item;
