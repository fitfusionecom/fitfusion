import { fitfusionConfig } from "@/lib/fitfusion-config";

export const metadata = {
  title: `Return & Refund Policy - ${fitfusionConfig.brand.name}`,
  description: `Return and Refund Policy for ${fitfusionConfig.brand.name}. Learn about our return process, refund policy, and customer satisfaction guarantee.`,
};

export default function ReturnPolicyPage() {
  return (
    <div className="ayur-bgcover" style={{ background: "whitesmoke" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container">
        {/* Return Policy Content */}
        <div className="pa-about-content spacer-top spacer-bottom">
          <div className="row">
            <div className="col-lg-12">
              <div className="pa-heading py-5">
                <h5 className="text-uppercase text-center">
                  Customer Satisfaction
                </h5>
                <h1 className="text-center">Return & Refund Policy</h1>
                <p className="text-center">
                  Last updated: {fitfusionConfig.legal.returnPolicyLastUpdated}
                </p>
              </div>

              <div className="pa-about-text">
                <h3>1. Return Window</h3>
                <p>
                  At {fitfusionConfig.brand.name}, we want you to be completely
                  satisfied with your purchase. You have{" "}
                  {fitfusionConfig.return.returnWindow} from the date of
                  delivery to return your order for a full refund or exchange.
                </p>

                <h3>2. Return Conditions</h3>
                <p>
                  To be eligible for a return, your item must meet the following
                  conditions:
                </p>
                <ul>
                  {fitfusionConfig.return.returnConditions.map(
                    (condition, index) => (
                      <li key={index}>{condition}</li>
                    )
                  )}
                </ul>

                <h3>3. Non-Returnable Items</h3>
                <p>The following items are not eligible for return:</p>
                <ul>
                  {fitfusionConfig.return.nonReturnableItems.map(
                    (item, index) => (
                      <li key={index}>{item}</li>
                    )
                  )}
                </ul>

                <h3>4. How to Initiate a Return</h3>

                <p>To start your return, please follow these steps:</p>
                <ol>
                  <li>
                    Contact our customer support team at{" "}
                    {fitfusionConfig.contact.supportEmail} or call{" "}
                    {fitfusionConfig.contact.phone}
                  </li>
                  <li>Provide your order number and reason for return</li>
                  <li>
                    Our team will review your request and provide return
                    instructions
                  </li>
                  <li>
                    Package your item securely with all original packaging
                  </li>
                  <li>Ship the item back using the provided return label</li>
                </ol>

                <h3>5. Refund Process</h3>
                <p>
                  Once we receive and inspect your return, we will notify you of
                  the approval or rejection of your refund. If approved, your
                  refund will be processed within{" "}
                  {fitfusionConfig.return.refundWindow}. The refund will be
                  credited to your original payment method.
                </p>

                <h3>6. Shipping Costs</h3>
                <p>
                  Return shipping costs are the responsibility of the customer
                  unless the return is due to our error (wrong item shipped,
                  defective product, etc.). In such cases, we will provide a
                  prepaid return label.
                </p>

                <h3>7. Damaged or Defective Items</h3>
                <p>
                  If you receive a damaged or defective item, please contact us
                  immediately. We will arrange for a replacement or refund at no
                  additional cost to you. Please include photos of the damage
                  when contacting us.
                </p>

                <h3>8. Exchanges</h3>
                <p>
                  We offer exchanges for items of equal value. If you wish to
                  exchange for a different item, please contact our customer
                  support team. Any price difference will be charged or refunded
                  accordingly.
                </p>

                <h3>9. Partial Returns</h3>
                <p>
                  If you ordered multiple items and only want to return some of
                  them, you can do so within the return window. The refund will
                  be calculated based on the returned items only.
                </p>

                <h3>10. Gift Returns</h3>
                <p>
                  Gift purchases can be returned within the same return window.
                  The refund will be issued to the original purchaser. Please
                  include the gift receipt or order confirmation when returning
                  gift items.
                </p>

                <h3>11. International Returns</h3>
                <p>
                  For international orders, return shipping costs and customs
                  duties are the responsibility of the customer. Please ensure
                  all customs documentation is properly completed for the return
                  shipment.
                </p>

                <h3>12. Contact Information</h3>
                <p>
                  For any questions about our return policy or to initiate a
                  return, please contact us:
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
                    <strong>WhatsApp:</strong>{" "}
                    {fitfusionConfig.contact.whatsapp}
                  </p>
                  <p>
                    <strong>Address:</strong>{" "}
                    {fitfusionConfig.contact.address.fullAddress}
                  </p>
                  <p>
                    <strong>Business Hours:</strong>{" "}
                    {fitfusionConfig.contact.officeHours}
                  </p>
                  <p>
                    <strong>Response Time:</strong>{" "}
                    {fitfusionConfig.support.responseTime}
                  </p>
                </div>

                <h3>13. Customer Satisfaction Guarantee</h3>
                <p>
                  At {fitfusionConfig.brand.name}, your satisfaction is our top
                  priority. If you're not completely satisfied with your
                  purchase for any reason, we're here to help. Our customer
                  support team is available during business hours to assist you
                  with any questions or concerns.
                </p>

                <h3>14. Policy Updates</h3>
                <p>
                  We may update this return policy from time to time. Any
                  changes will be posted on this page with an updated "Last
                  updated" date. We encourage you to review this policy
                  periodically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
