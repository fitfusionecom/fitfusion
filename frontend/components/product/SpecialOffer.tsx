import React from "react";
import "./SpecialOffer.css";

const SpecialOffer: React.FC = () => {
  return (
    <div className="special-offer-container my-4">
      <h4 className="special-offer-heading mb-3">Special Offer</h4>

      <div className="special-offer-box p-3">
        {/* Coupon Code */}
        <div
          className="coupon-code mb-3 p-2"
          onClick={() => {
            navigator.clipboard.writeText("GET10");
            // You can add a toast notification here if you want
          }}
          title="Click to copy coupon code"
        >
          <span>FITFA50</span>
        </div>

        {/* Offer Description */}
        <p className="offer-description mb-3">
          Get <strong>EXTRA 50% OFF</strong> on 1st purchase only on Fitfusion
          Ayurveda Website
        </p>
      </div>

      {/* Disclaimer */}
      <p className="disclaimer mt-2">*Offers can be applied at checkout.</p>
    </div>
  );
};

export default SpecialOffer;
