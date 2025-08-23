import React from "react";
import Image from "next/image";
import "./AlsoAvailableOn.css";

const AlsoAvailableOn: React.FC = () => {
  return (
    <section className="also-available-section">
      <div className="container">
        <div className="also-available-content">
          <h2 className="section-title">Also available on</h2>
          <div className="platform-logos">
            <div className="platform-logo amazon">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                alt="Amazon"
                width={140}
                height={80}
                className="logo-image"
                priority
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="platform-logo blinkit">
              <Image
                src="/assets/images/logos/blinkit.png"
                alt="Blinkit"
                width={140}
                height={80}
                className="logo-image"
                priority
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="platform-logo flipkart">
              <Image
                src="/assets/images/logos/flipkart.png"
                alt="Flipkart"
                width={140}
                height={80}
                className="logo-image"
                priority
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlsoAvailableOn;
