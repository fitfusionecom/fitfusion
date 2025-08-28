"use client";

import repeat from "@/lib/util/repeat";
import { HttpTypes } from "@medusajs/types";
import { Table, clx } from "@medusajs/ui";

import Item from "@/components/cart/item";

type ItemsTemplateProps = {
  cart: HttpTypes.StoreCart;
};

const ItemsPreviewTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart.items;
  const hasOverflow = items && items.length > 4;

  return (
    <div
      className={`items-preview-container ${
        hasOverflow ? "items-preview-scrollable" : ""
      }`}
    >
      <div className="items-preview-list">
        {items
          ? items
              .sort((a, b) => {
                return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1;
              })
              .map((item) => {
                return (
                  <Item
                    key={item.id}
                    item={item}
                    type="preview"
                    currencyCode={cart.currency_code}
                  />
                );
              })
          : repeat(5).map((i) => {
              return <SkeletonLineItem key={i} />;
            })}
      </div>
    </div>
  );
};

export default ItemsPreviewTemplate;

const SkeletonLineItem = () => {
  return (
    <div className="d-flex align-items-center justify-content-between skeleton-line-item">
      <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
    </div>
  );
};
