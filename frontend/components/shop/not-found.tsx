import Link from "next/link";

const ShopNotFound = () => {
  return (
    <div
      className="ayur-shop-not-found"
      style={{
        textAlign: "center",
        padding: "80px 20px",
        background: "#f0f8f0",
        borderRadius: "16px",
        border: "2px solid #e8f5e8",
        margin: "40px 0",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        {/* Decorative Icon */}
        <div
          style={{
            width: "80px",
            height: "80px",
            background: "#90b644",
            borderRadius: "50%",
            margin: "0 auto 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: "0.8",
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            🔍
          </span>
        </div>

        <h2
          style={{
            fontWeight: "600",
            marginBottom: "16px",
            color: "#222222",
            fontSize: "2rem",
            fontFamily: "Archivo, sans-serif",
          }}
        >
          No Products Found
        </h2>

        <p
          style={{
            color: "#797979",
            fontSize: "1.1rem",
            lineHeight: "1.6",
            marginBottom: "32px",
          }}
        >
          Sorry, we couldn't find any products matching your search or filters.
          <br />
          Please try adjusting your search or browse other categories.
        </p>

        <Link
          href="/shop"
          className="ayur-btn"
          style={{
            display: "inline-block",
            background: "#90b644",
            color: "white",
            padding: "14px 32px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "500",
            fontSize: "1.1rem",
            transition: "all 0.3s ease",
            border: "2px solid #90b644",
            boxShadow: "0 4px 12px rgba(144, 182, 68, 0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#7da03a";
            e.currentTarget.style.borderColor = "#7da03a";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#90b644";
            e.currentTarget.style.borderColor = "#90b644";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default ShopNotFound;
