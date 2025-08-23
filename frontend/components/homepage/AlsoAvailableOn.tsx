import React from "react";
import "./AlsoAvailableOn.css";

const AlsoAvailableOn: React.FC = () => {
  return (
    <section className="also-available-section">
      <div className="container">
        <div className="also-available-content">
          <h2 className="section-title">Also available on</h2>
          <div className="platform-logos">
            <div className="platform-logo amazon">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                alt="Amazon"
                className="logo-image"
              />
            </div>
            <div className="platform-logo blinkit">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Blinkit_logo.svg/2560px-Blinkit_logo.svg.png"
                alt="Blinkit"
                className="logo-image"
              />
            </div>
            <div className="platform-logo flipkart">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flipkart_logo.svg/2560px-Flipkart_logo.svg.png"
                alt="Flipkart"
                className="logo-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlsoAvailableOn;
