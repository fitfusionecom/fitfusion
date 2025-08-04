"use client";

import dynamic from "next/dynamic";

const DynamicShopTemplate = dynamic(() => import("@/components/shop"), {
  ssr: false,
  loading: () => <div></div>,
});

export default function Shop() {
  return <DynamicShopTemplate />;
}
