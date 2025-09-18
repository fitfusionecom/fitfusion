import { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getRegion } from "@/lib/data/regions";
import ProductDetails from "@/components/product";
import { listProducts, getProductReviews, getInfo } from "@/lib/data/product";
import dynamic from "next/dynamic";

const RelatedProducts = dynamic(() => import("@/components/product/related"));
const ProductReviews = dynamic(() => import("@/components/product/reviews"));
const ProductAccordion = dynamic(
  () => import("@/components/product/product-accordion")
);

type Props = {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  try {
    // Only use "in" as the country code
    const countryCode = "in";

    const products = await listProducts({
      countryCode,
      queryParams: { fields: "handle" },
      useStatic: true,
    }).then(({ response }) => response.products);

    if (!products) {
      return [];
    }

    return products
      .filter((product) => product.handle)
      .map((product) => ({
        countryCode,
        handle: product.handle,
      }));
  } catch (error) {
    console.error(
      `Failed to generate static paths for product pages: ${
        error instanceof Error ? error.message : "Unknown error"
      }.`
    );
    return [];
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const countryCode = "in";
  const params = await props.params;
  const { handle } = params;
  const region = await getRegion(countryCode);

  if (!region) {
    notFound();
  }

  const product = await listProducts({
    countryCode: countryCode,
    // @ts-ignore
    queryParams: { handle },
  }).then(({ response }) => response.products[0]);

  if (!product) {
    notFound();
  }

  return {
    title: `${product.title}`,
    description: `${product.subtitle}`,
    openGraph: {
      title: `${product.title}`,
      description: `${product.subtitle}`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  };
}

export default async function Product(props: Props) {
  const country_code = "in";
  const params = await props.params;
  const region = await getRegion(country_code);

  if (!region) {
    notFound();
  }

  const pricedProduct = await listProducts({
    regionId: region.id,
    countryCode: country_code,
    // @ts-ignore
    queryParams: { handle: params.handle },
  }).then(({ response }) => response.products[0]);

  const reviews = await getProductReviews({
    productId: pricedProduct.id,
    limit: 0,
    offset: 0,
  });

  const info = await getInfo();

  if (!pricedProduct) {
    notFound();
  }

  return (
    <>
      <ProductDetails
        reviews={reviews}
        product={pricedProduct}
        region={region}
        countryCode={country_code}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <ProductAccordion
          info={info.info.find(
            (item: any) => item.product_id === pricedProduct.id
          )}
          product={pricedProduct}
          countryCode={country_code}
        />
        <ProductReviews productId={pricedProduct.id} />
        <RelatedProducts product={pricedProduct} countryCode={country_code} />
      </Suspense>
    </>
  );
}
