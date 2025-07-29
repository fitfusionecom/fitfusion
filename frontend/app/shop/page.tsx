"use client";

import ShopTemplate from "@/components/shop";
import { Suspense } from "react";

export default function Shop() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopTemplate />
    </Suspense>
  );
}
