import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./AlsoAvailableOn.css";

const AlsoAvailableOn: React.FC = () => {
  return (
    <section className="also-available-section">
      <div className="container">
        <div className="also-available-content">
          <h2 className="section-title">Also available on</h2>
          <div className="platform-logos">
            <Link
              href="https://www.amazon.in/stores/FitFusionAyurveda/page/A550C5B1-A91F-4469-BD61-15A3F250AC0F?is_byline_deeplink=true&deeplink=A550C5B1-A91F-4469-BD61-15A3F250AC0F&redirect_store_id=A550C5B1-A91F-4469-BD61-15A3F250AC0F&lp_asin=B0FJ87KX3K&ref_=ast_bln&store_ref=bl_ast_dp_brandLogo_sto"
              target="_blank"
              rel="noopener noreferrer"
              className="platform-logo amazon"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                alt="Amazon"
                width={120}
                height={60}
                className="logo-image"
                priority
                style={{ objectFit: "contain" }}
              />
            </Link>
            {/* <div className="platform-logo blinkit">
              <Image
                src="/assets/images/logos/blinkit.png"
                alt="Blinkit"
                width={120}
                height={60}
                className="logo-image"
                priority
                style={{ objectFit: "contain" }}
              />
            </div> */}
            <Link
              href="https://www.flipkart.com/search?q=FIT%20FUSION%20AYURVEDA&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off"
              target="_blank"
              rel="noopener noreferrer"
              className="platform-logo flipkart"
            >
              <Image
                src="/assets/images/logos/flipkart.png"
                alt="Flipkart"
                width={120}
                height={60}
                className="logo-image"
                priority
                style={{ objectFit: "contain" }}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlsoAvailableOn;
