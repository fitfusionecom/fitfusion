import Link from "next/link";

const ShopNotFound = () => {
  return (
    <div
      className="ayur-shop-not-found"
      style={{ textAlign: "center", padding: "60px 0" }}
    >
      {/* <img
        src="/assets/images/empty-box.png"
        alt="No products found"
        style={{ width: 120, marginBottom: 24, opacity: 0.7 }}
      /> */}
      <h2 style={{ fontWeight: 600, marginBottom: 12 }}>No Products Found</h2>
      <p style={{ color: "#888" }}>
        Sorry, we couldn't find any products matching your search or filters.
        <br />
        Please try adjusting your search or browse other categories.
      </p>
      <Link href="/shop" className="ayur-btn">
        View All Products
      </Link>
    </div>
  );
};

export default ShopNotFound;
