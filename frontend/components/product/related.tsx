import Link from "next/link";
import { HttpTypes } from "@medusajs/types";
import { getRegion } from "@/lib/data/regions";
import ProductCard from "../blocks/product-card";
import { listProducts } from "@/lib/data/products";
// import Product from "@/components/product-preview";

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct;
  countryCode: string;
};

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode);

  if (!region) {
    return null;
  }

  // edit this function to define your related products logic
  const queryParams: HttpTypes.StoreProductParams = {};
  if (region?.id) {
    queryParams.region_id = region.id;
  }
  if (product.collection_id) {
    // @ts-ignore
    queryParams.collection_id = [product.collection_id];
  }
  if (product.tags) {
    // @ts-ignore
    queryParams.tag_id = product.tags
      .map((t) => t.id)
      .filter(Boolean) as string[];
  }
  // @ts-ignore
  queryParams.is_giftcard = false;

  const products = await listProducts({
    queryParams,
    countryCode,
  }).then(({ response }) => {
    return response.products.filter(
      (responseProduct) => responseProduct.id !== product.id
    );
  });

  if (!products.length) {
    return null;
  }
  return (
    <div className="ayur-bgcover ayur-testimonial-sec">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="ayur-heading-wrap">
              <h5>Product</h5>
              <h3>Recommended Products</h3>
            </div>
          </div>
        </div>
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-lg-4 col-md-6 col-sm-6">
              <ProductCard product={product} />
            </div>
          ))}
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="ayur-tpro-viewbtn">
              <Link href="/shop" className="ayur-btn">
                View More
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="ayur-bgshape ayur-trenpro-bgshape">
        <img src="/assets/images/bg-shape3.png" alt="img" />
        <img src="/assets/images/bg-leaf3.png" alt="img" />
      </div>
    </div>
  );
}
