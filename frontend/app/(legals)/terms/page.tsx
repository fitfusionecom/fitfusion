import { fitfusionConfig } from "@/lib/fitfusion-config";

export const metadata = {
  title: `Terms & Conditions - ${fitfusionConfig.brand.name}`,
  description: `Terms & Conditions for ${fitfusionConfig.brand.name}. Read our terms and conditions for using our services and products.`,
};

export default function TermsPage() {
  return (
    <div
      className="ayur-bgcover"
      style={{
        background: "whitesmoke",
      }}
    >
      <div className="container">
        {/* Terms Content */}
        <div className="pa-about-content spacer-top spacer-bottom">
          <div className="row">
            <div className="col-lg-12">
              <div className="pa-heading py-5">
                <h5 className="text-uppercase text-center">
                  Legal Information
                </h5>
                <h1 className="text-center ">Terms & Conditions</h1>
                <p className="text-center">
                  Last updated: {fitfusionConfig.legal.termsLastUpdated}
                </p>
              </div>

              <div className="pa-about-text">
                <p>
                  Welcome to Fit Fusion Ayurveda ("we," "our," "us"). By
                  accessing and using our website fitfusionayurveda.com, you
                  agree to be bound by these Terms & Conditions. Please read
                  them carefully before making any purchase.
                </p>

                <h5>1. General</h5>
                <ul>
                  <li>
                    These Terms & Conditions govern your use of our website,
                    products, and services.
                  </li>
                  <li>
                    We may update these terms at any time without prior notice.
                    The revised version will be posted on our website.
                  </li>
                  <li>
                    Your continued use of our services constitutes acceptance of
                    any changes.
                  </li>
                </ul>

                <h5>2. Eligibility</h5>
                <ul>
                  <li>
                    You must be at least 18 years old to place an order on our
                    website.
                  </li>
                  <li>
                    If you are under 18, you may use our services only with the
                    involvement of a parent or legal guardian.
                  </li>
                </ul>

                <h5>3. Products & Usage</h5>
                <ul>
                  <li>All our products are herbal and Ayurvedic in nature.</li>
                  <li>
                    They are not intended to diagnose, treat, cure, or prevent
                    any disease.
                  </li>
                  <li>Results may vary from person to person.</li>
                  <li>
                    We advise consulting a qualified healthcare practitioner
                    before starting any new supplement, especially if you are
                    pregnant, nursing, or have a medical condition.
                  </li>
                </ul>

                <h5>4. Pricing & Payment</h5>
                <ul>
                  <li>
                    All prices listed on the website are inclusive of applicable
                    taxes.
                  </li>
                  <li>
                    We reserve the right to change prices without prior notice.
                  </li>
                  <li>
                    Payment must be made via approved methods: Credit/Debit
                    Card, Net Banking, UPI, E-Wallets, or Cash on Delivery (COD
                    where available).
                  </li>
                </ul>

                <h5>5. Orders & Acceptance</h5>
                <ul>
                  <li>
                    Placing an order does not guarantee acceptance. We reserve
                    the right to refuse or cancel any order due to:
                  </li>
                  <ul>
                    <li>Product unavailability</li>
                    <li>Pricing errors</li>
                    <li>Fraudulent activity or suspicious transactions</li>
                  </ul>
                  <li>
                    Order confirmation will be sent via email/SMS after
                    successful payment or COD verification.
                  </li>
                </ul>

                <h5>6. Shipping & Delivery</h5>
                <ul>
                  <li>
                    We deliver across Pan India via trusted courier partners.
                  </li>
                  <li>
                    Estimated delivery time is generally 3–5 business days, but
                    this may vary based on location.
                  </li>
                  <li>
                    For detailed information, please refer to our Shipping
                    Policy.
                  </li>
                </ul>

                <h5>7. Cancellations, Returns & Refunds</h5>
                <ul>
                  <li>
                    Cancellations are accepted within 24 hours for online orders
                    or before confirmation call for telephonic orders.
                  </li>
                  <li>
                    Returns are not accepted for partially used products or for
                    non-returnable items marked on the product page.
                  </li>
                  <li>
                    Refunds are processed only for genuine medical reasons with
                    proof, and the final decision rests with the seller.
                  </li>
                  <li>
                    For more details, refer to our Cancellation & Refund Policy.
                  </li>
                </ul>

                <h5>8. Limitation of Liability</h5>
                <ul>
                  <li>
                    We are not liable for any indirect, incidental, or
                    consequential damages resulting from the use or misuse of
                    our products.
                  </li>
                  <li>
                    You agree that your sole remedy for dissatisfaction is to
                    discontinue using our products and services.
                  </li>
                </ul>

                <h5>9. Intellectual Property</h5>
                <ul>
                  <li>
                    All content on this website, including text, images, product
                    descriptions, and logos, is the property of Fit Fusion
                    Ayurveda and is protected under applicable copyright laws.
                  </li>
                  <li>
                    You may not copy, reproduce, or distribute any content
                    without our prior written consent.
                  </li>
                </ul>

                <h5>10. Governing Law & Jurisdiction</h5>
                <ul>
                  <li>
                    These Terms & Conditions shall be governed by the laws of
                    India.
                  </li>
                  <li>
                    Any disputes will be subject to the exclusive jurisdiction
                    of the courts in Pilibhit, Uttar Pradesh.
                  </li>
                </ul>

                <h5>11. Contact Us</h5>
                <p>
                  For any questions regarding these Terms & Conditions, please
                  contact:
                </p>
                <div className="pa-contact-info">
                  <p>
                    <strong>Fit Fusion Ayurveda</strong>
                  </p>
                  <p>Amaria, Pilibhit, Uttar Pradesh - 262121, India</p>
                  <p>
                    <strong>Email:</strong> support@fitfusion.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +91 9876543210
                  </p>
                  <p>
                    <strong>Website:</strong> fitfusionayurveda.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
