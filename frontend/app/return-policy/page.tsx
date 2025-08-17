import { fitfusionConfig } from "@/lib/fitfusion-config";

export const metadata = {
  title: `Cancellation & Refund Policy - ${fitfusionConfig.brand.name}`,
  description: `Cancellation and Refund Policy for ${fitfusionConfig.brand.name}. Learn about our cancellation process, refund policy, and customer satisfaction guarantee.`,
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
                <h1 className="text-center">Cancellation & Refund Policy</h1>
                <p className="text-center">
                  Last updated: {fitfusionConfig.legal.returnPolicyLastUpdated}
                </p>
              </div>

              <div className="pa-about-text">
                <p>
                  At Fit Fusion Ayurveda, we strive to ensure your satisfaction
                  with every purchase. Please read our Cancellation & Refund
                  Policy carefully before placing an order.
                </p>

                <h3>1. Cancellation Policy</h3>
                <ul>
                  <li>
                    <strong>Telephonic Orders</strong> – You may cancel your
                    order before or during the confirmation call.
                  </li>
                  <li>
                    <strong>Online Orders (COD or Prepaid)</strong> – You may
                    cancel your order within 24 hours of placing it.
                  </li>
                  <li>
                    Once an order has been shipped, it cannot be cancelled.
                  </li>
                </ul>

                <h3>2. Return Policy</h3>
                <ul>
                  <li>
                    <strong>No Partial Returns</strong> – Partially used
                    products will not be accepted for return.
                  </li>
                  <li>
                    <strong>Non-Returnable Items</strong> – Certain products are
                    marked as non-returnable on the product page and will not be
                    eligible for return under any circumstances.
                  </li>
                </ul>

                <h3>3. Refund Policy</h3>
                <ul>
                  <li>
                    Refunds will only be issued for genuine medical reasons and
                    must be supported with valid proof.
                  </li>
                  <li>
                    The seller retains the right to refuse any refund request at
                    their discretion.
                  </li>
                  <li>
                    Refund requests must be made within 7 days of the product
                    delivery date.
                  </li>
                </ul>

                <h3>4. Refund Processing</h3>
                <ul>
                  <li>
                    <strong>Cash on Delivery (COD) Orders</strong> – Refunds
                    will be issued via mobile banking or digital wallets.
                  </li>
                  <li>
                    <strong>Prepaid Orders</strong> – Refunds will be processed
                    back to the original payment method used at the time of
                    purchase.
                  </li>
                  <li>
                    All eligible refunds will be processed within 7 days from
                    the date of product delivery.
                  </li>
                </ul>

                <h3>5. Contact for Cancellations & Refunds</h3>
                <p>
                  For any cancellation or refund-related queries, please contact
                  our customer support team:
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
