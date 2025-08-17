import { fitfusionConfig } from "@/lib/fitfusion-config";

export const metadata = {
  title: `Shipping & Delivery Policy - ${fitfusionConfig.brand.name}`,
  description: `Shipping and Delivery Policy for ${fitfusionConfig.brand.name}. Learn about our shipping process, delivery times, and order tracking.`,
};

export default function ShippingDeliveryPage() {
  return (
    <div className="ayur-bgcover" style={{ background: "whitesmoke" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container">
        {/* Shipping & Delivery Content */}
        <div className="pa-about-content spacer-top spacer-bottom">
          <div className="row">
            <div className="col-lg-12">
              <div className="pa-heading py-5">
                <h5 className="text-uppercase text-center">
                  Order Fulfillment
                </h5>
                <h1 className="text-center">Shipping & Delivery Policy</h1>
                <p className="text-center">
                  Fast, safe, and reliable delivery across India
                </p>
              </div>

              <div className="pa-about-text">
                <p>
                  At Fit Fusion Ayurveda, we are committed to ensuring that your
                  wellness products reach you quickly, safely, and in perfect
                  condition. This policy outlines how we process and deliver
                  your orders.
                </p>

                <h3>1. Placing an Order</h3>
                <ul>
                  <li>
                    You can easily place your order on our official website:
                    fitfusionayurveda.com.
                  </li>
                  <li>
                    If you need any help during the ordering process, our
                    support team is available via support@fitfusion.com or +91
                    9876543210.
                  </li>
                </ul>

                <h3>2. Order Value Requirement</h3>
                <p>
                  There is no minimum purchase amount — you can order as little
                  or as much as you like.
                </p>

                <h3>3. Product Pricing</h3>
                <p>
                  All prices listed on our website are inclusive of all
                  applicable taxes, so there are no hidden charges at checkout.
                </p>

                <h3>4. Serviceable Locations</h3>
                <p>
                  We deliver across India through our trusted courier and
                  logistics partners.
                </p>

                <h3>5. Payment Methods</h3>
                <p>We offer secure and convenient payment options:</p>
                <ul>
                  <li>Credit Card / Debit Card</li>
                  <li>Net Banking</li>
                  <li>UPI & E-Wallets</li>
                  <li>
                    Cash on Delivery (COD) – available in select locations
                  </li>
                </ul>
                <p>
                  For your safety, all online transactions are processed through
                  secure payment gateways. If you prefer paying on delivery,
                  choose the COD option at checkout (if available for your
                  area).
                </p>

                <h3>6. Order Confirmation & Updates</h3>
                <p>
                  Once you place your order, you will receive a confirmation
                  message via email and/or SMS with your Order ID. When your
                  order is shipped, we will share the tracking details so you
                  can monitor its journey.
                </p>

                <h3>7. Tracking Your Order</h3>
                <p>You can track your shipment using:</p>
                <ul>
                  <li>The Track Order page on our website</li>
                  <li>
                    The courier partner's tracking link provided in your
                    shipping update message
                  </li>
                </ul>

                <h3>8. Estimated Delivery Time</h3>
                <p>
                  Orders are usually delivered within 3–5 working days. Delivery
                  time may vary depending on your location and courier
                  availability.
                </p>

                <h3>9. Invoices</h3>
                <p>
                  Your invoice will be included with your delivery and sent to
                  your registered email ID.
                </p>

                <h3>10. Need Assistance?</h3>
                <p>
                  If you have any questions about shipping or delivery, please
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
