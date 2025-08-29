import React from "react";
import "./SpecialOffer.css";

const SpecialOffer: React.FC = () => {
  return (
    <div className="special-offer-container my-2 mt-3">
      <h5 className="special-offer-heading mb-2">Special Offer</h5>

      <div className="special-offer-box p-2">
        {/* Coupon Code */}
        <div
          className="coupon-code mb-2 p-1"
          onClick={() => {
            navigator.clipboard.writeText("GET10");
            // You can add a toast notification here if you want
          }}
          title="Click to copy coupon code"
        >
          <span>FITFA50</span>
        </div>

        {/* Offer Description */}
        <p className="offer-description mb-2">
          Get <strong>EXTRA 50% OFF</strong> on 1st purchase only on Fitfusion
          Ayurveda Website
        </p>
      </div>

      {/* Disclaimer */}
      <p className="disclaimer mt-1">*Offers can be applied at checkout.</p>
    </div>
  );
};

export default SpecialOffer;
