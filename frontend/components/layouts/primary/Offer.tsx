import React from "react";
import "./Offer.css";

const Offer: React.FC = () => {
  return (
    <div className="offer-banner">
      <div className="offer-content">
        <span className="offer-code">#FITFA50</span>
        <span className="offer-text">Apply this code and get 50% off</span>
      </div>
    </div>
  );
};

export default Offer;
