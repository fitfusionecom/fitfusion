import { fitfusionConfig } from "@/lib/fitfusion-config";

export const metadata = {
  title: `Privacy Policy - ${fitfusionConfig.brand.name}`,
  description: `Privacy Policy for ${fitfusionConfig.brand.name}. Learn how we collect, use, and protect your personal information.`,
};

export default function PrivacyPage() {
  return (
    <div className="ayur-bgcover" style={{ background: "whitesmoke" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container">
        {/* Privacy Content */}
        <div className="pa-about-content spacer-top spacer-bottom">
          <div className="row">
            <div className="col-lg-12">
              <div className="pa-heading py-5">
                <h5 className="text-uppercase text-center">Data Protection</h5>
                <h1 className="text-center">Privacy Policy</h1>
                <p className="text-center">
                  Last updated: {fitfusionConfig.legal.privacyPolicyLastUpdated}
                </p>
              </div>

              <div className="pa-about-text">
                <p>Welcome to Fit Fusion Ayurveda ("we," "our," "us").</p>
                <p>
                  We value your trust and are committed to protecting your
                  privacy. This Privacy Policy explains how we collect, use, and
                  safeguard your personal information when you visit or make a
                  purchase from fitfusionayurveda.com ("Website").
                </p>

                <h3>1. Information We Collect</h3>
                <p>We may collect the following types of information:</p>
                <ul>
                  <li>
                    <strong>Personal Information:</strong> Name, phone number,
                    email address, billing/shipping address, payment details.
                  </li>
                  <li>
                    <strong>Non-Personal Information:</strong> Browser type,
                    device details, IP address, and browsing behavior on our
                    website.
                  </li>
                  <li>
                    <strong>Health Information:</strong> If voluntarily shared
                    during product inquiries or Ayurvedic consultations, to
                    recommend suitable products.
                  </li>
                </ul>

                <h3>2. How We Use Your Information</h3>
                <p>We use the collected information to:</p>
                <ul>
                  <li>Process and deliver your orders.</li>
                  <li>Provide customer support and respond to inquiries.</li>
                  <li>
                    Send order updates, promotional offers, and newsletters
                    (only if you opt-in).
                  </li>
                  <li>Personalize your shopping experience.</li>
                  <li>
                    Improve our products, services, and website functionality.
                  </li>
                </ul>

                <h3>3. Sharing Your Information</h3>
                <p>We do not sell, rent, or trade your personal information.</p>
                <p>We may share your details only with:</p>
                <ul>
                  <li>
                    <strong>Service Providers</strong> – Delivery partners,
                    payment gateways, and IT service providers to process orders
                    and transactions.
                  </li>
                  <li>
                    <strong>Legal Authorities</strong> – If required by law,
                    regulation, or legal process.
                  </li>
                </ul>

                <h3>4. Cookies & Tracking Technologies</h3>
                <p>
                  Our website uses cookies to enhance your browsing experience,
                  remember your preferences, and analyze site traffic. You can
                  disable cookies in your browser settings, but some features
                  may not function properly.
                </p>

                <h3>5. Data Security</h3>
                <p>
                  We implement strict technical and organizational measures to
                  protect your personal data against unauthorized access, loss,
                  or misuse. However, no method of transmission over the
                  internet is 100% secure.
                </p>

                <h3>6. Your Rights</h3>
                <p>You have the right to:</p>
                <ul>
                  <li>
                    Access and request a copy of your personal information.
                  </li>
                  <li>Request correction or deletion of your data.</li>
                  <li>Withdraw consent for marketing communications.</li>
                </ul>
                <p>
                  To exercise these rights, contact us at support@fitfusion.com.
                </p>

                <h3>7. Third-Party Links</h3>
                <p>
                  Our website may contain links to third-party websites. We are
                  not responsible for the privacy practices or content of these
                  external sites.
                </p>

                <h3>8. Children's Privacy</h3>
                <p>
                  Our products and services are not intended for individuals
                  under the age of 18 without parental consent.
                </p>

                <h3>9. Updates to This Privacy Policy</h3>
                <p>
                  We may update this policy from time to time. Changes will be
                  posted on this page with a revised Effective Date.
                </p>

                <h3>10. Contact Us</h3>
                <p>
                  If you have any questions about this Privacy Policy or how we
                  handle your information, you can reach us at:
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
