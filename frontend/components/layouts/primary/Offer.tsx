import React from "react";
import "./Offer.css";

const Offer: React.FC = () => {
  return (
    <div
      className="offer-banner"
      style={{
        height: "36px",
      }}
    >
      <div className="offer-content">
        <span style={{ color: "gold", fontWeight: "bold" }}>FITFA15</span>
        <span className="offer-text">
          Apply this code and get 15% off on your first order.
        </span>
      </div>
    </div>
  );
};

export default Offer;
