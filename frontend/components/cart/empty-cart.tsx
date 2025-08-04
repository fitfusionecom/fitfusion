import Link from "next/link";
import React from "react";

const EmptyCartMessage = () => {
  return (
    <div>
      <div className="ayur-bread-section">
        <div className="ayur-breadcrumb-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="ayur-bread-content">
                  <h2>Cart</h2>
                  <div className="ayur-bread-list">
                    <span>
                      <a href="/">Home</a>
                    </span>
                    <span className="ayur-active-page">Cart</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container py-5 d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "400px" }}
      >
        <div>
          <h2
            className="h4 fw-bold mb-2 animate__animated animate__fadeInDown text-center"
            style={{ color: "#222222" }}
          >
            Your Cart is Empty
          </h2>
          <p
            className="text-secondary text-center mb-4 animate__animated animate__fadeIn"
            style={{ color: "#666666" }}
          >
            Looks like you haven&apos;t added anything to your cart yet. Explore
            our shop and discover amazing products!
          </p>
          <div className="d-flex justify-content-center align-items-center">
            <Link
              href="/shop"
              className="btn btn-light fw-semibold px-4 py-2 shadow d-inline-flex align-items-center gap-2 animate__animated animate__fadeInUp"
              style={{
                color: "#000",
                transition: "all 0.2s",
                outline: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCartMessage;
