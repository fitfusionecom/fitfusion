import ShopTemplate from "@/components/shop";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Shop({ searchParams }: Props) {
  const params = await searchParams;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopTemplate searchParams={params} />
    </Suspense>
  );
}
