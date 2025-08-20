import { notFound } from "next/navigation";
import { getRegion } from "@/lib/data/regions";
import { listProducts } from "@/lib/data/product";
import { Metadata } from "next";
import ProductDetails from "@/components/product";
import RelatedProducts from "@/components/product/related";
import { Suspense } from "react";
import ProductAccordion from "@/components/product/product-accordion";

type Props = {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// export async function generateStaticParams() {
//   try {
//     // Only use "in" as the country code
//     const countryCode = "in";

//     const products = await listProducts({
//       countryCode,
//       queryParams: { fields: "handle" },
//     }).then(({ response }) => response.products);

//     if (!products) {
//       return [];
//     }

//     return products
//       .filter((product) => product.handle)
//       .map((product) => ({
//         countryCode,
//         handle: product.handle,
//       }));
//   } catch (error) {
//     console.error(
//       `Failed to generate static paths for product pages: ${
//         error instanceof Error ? error.message : "Unknown error"
//       }.`
//     );
//     return [];
//   }
// }

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
    title: `${product.title} | Medusa Store`,
    description: `${product.title}`,
    openGraph: {
      title: `${product.title} | Medusa Store`,
      description: `${product.title}`,
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

  if (!pricedProduct) {
    notFound();
  }

  return (
    <>
      <ProductDetails
        product={pricedProduct}
        region={region}
        countryCode={country_code}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <ProductAccordion product={pricedProduct} countryCode={country_code} />
        <RelatedProducts product={pricedProduct} countryCode={country_code} />
      </Suspense>
    </>
  );
}
