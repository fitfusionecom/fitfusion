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
                <h3>1. Information We Collect</h3>
                <p>
                  {fitfusionConfig.brand.name} collects information that you
                  provide directly to us, such as when you create an account,
                  make a purchase, or contact us for support. This may include:
                </p>
                <ul>
                  <li>
                    Personal identification information (Name, email address,
                    phone number, etc.)
                  </li>
                  <li>Billing and shipping addresses</li>
                  <li>Payment information</li>
                  <li>Order history and preferences</li>
                  <li>Communication preferences</li>
                </ul>

                <h3>2. How We Use Your Information</h3>
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Process and fulfill your orders</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Send order confirmations and shipping updates</li>
                  <li>Improve our products and services</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h3>3. Information Sharing</h3>
                <p>
                  We do not sell, trade, or otherwise transfer your personal
                  information to third parties without your consent, except in
                  the following circumstances:
                </p>
                <ul>
                  <li>
                    To trusted third parties who assist us in operating our
                    website, conducting our business, or servicing you
                  </li>
                  <li>
                    To comply with legal requirements or protect our rights
                  </li>
                  <li>In connection with a business transfer or merger</li>
                </ul>

                <h3>4. Data Security</h3>
                <p>
                  We implement appropriate security measures to protect your
                  personal information against unauthorized access, alteration,
                  disclosure, or destruction. These measures include:
                </p>
                <ul>
                  <li>SSL encryption for data transmission</li>
                  <li>Secure payment processing</li>
                  <li>Regular security assessments</li>
                  <li>Limited access to personal information</li>
                </ul>

                <h3>5. Cookies and Tracking Technologies</h3>
                <p>
                  We use cookies and similar tracking technologies to enhance
                  your browsing experience, analyze website traffic, and
                  understand where our visitors are coming from. You can control
                  cookie settings through your browser preferences.
                </p>

                <h3>6. Your Rights</h3>
                <p>You have the right to:</p>
                <ul>
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent for data processing</li>
                </ul>

                <h3>7. Data Retention</h3>
                <p>
                  We retain your personal information for as long as necessary
                  to fulfill the purposes outlined in this privacy policy,
                  unless a longer retention period is required or permitted by
                  law.
                </p>

                <h3>8. Children's Privacy</h3>
                <p>
                  Our website is not intended for children under the age of 13.
                  We do not knowingly collect personal information from children
                  under 13. If you are a parent or guardian and believe your
                  child has provided us with personal information, please
                  contact us.
                </p>

                <h3>9. International Data Transfers</h3>
                <p>
                  Your information may be transferred to and processed in
                  countries other than your own. We ensure that such transfers
                  comply with applicable data protection laws.
                </p>

                <h3>10. Changes to This Policy</h3>
                <p>
                  We may update this privacy policy from time to time. We will
                  notify you of any changes by posting the new policy on this
                  page and updating the "Last updated" date.
                </p>

                <h3>11. Contact Us</h3>
                <p>
                  If you have any questions about this privacy policy or our
                  data practices, please contact us:
                </p>
                <div className="pa-contact-info">
                  <p>
                    <strong>Email:</strong>{" "}
                    {fitfusionConfig.contact.supportEmail}
                  </p>
                  <p>
                    <strong>Phone:</strong> {fitfusionConfig.contact.phone}
                  </p>
                  <p>
                    <strong>Address:</strong>{" "}
                    {fitfusionConfig.contact.address.fullAddress}
                  </p>
                  <p>
                    <strong>Business Hours:</strong>{" "}
                    {fitfusionConfig.contact.officeHours}
                  </p>
                </div>

                <h3>12. Data Protection Officer</h3>
                <p>
                  For any data protection related queries, you can contact our
                  Data Protection Officer at:
                </p>
                <div className="pa-dpo-info">
                  <p>
                    <strong>Email:</strong> dpo@
                    {fitfusionConfig.brand.website.replace("https://", "")}
                  </p>
                  <p>
                    <strong>Response Time:</strong>{" "}
                    {fitfusionConfig.support.responseTime}
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
