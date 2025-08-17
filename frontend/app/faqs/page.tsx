import { fitfusionConfig } from "@/lib/fitfusion-config";

export const metadata = {
  title: `Frequently Asked Questions - ${fitfusionConfig.brand.name}`,
  description: `Frequently Asked Questions for ${fitfusionConfig.brand.name}. Find answers to common questions about our Ayurvedic products and services.`,
};

export default function FAQsPage() {
  return (
    <div className="ayur-bgcover" style={{ background: "whitesmoke" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container">
        {/* FAQ Content */}
        <div className="pa-about-content spacer-top spacer-bottom">
          <div className="row">
            <div className="col-lg-12">
              <div className="pa-heading py-5">
                <h5 className="text-uppercase text-center">Customer Support</h5>
                <h1 className="text-center">Frequently Asked Questions</h1>
                <p className="text-center">
                  Find answers to the most common questions about our products
                  and services
                </p>
              </div>

              <div className="pa-about-text">
                <h3>1. Are Fit Fusion Ayurveda products 100% natural?</h3>
                <p>
                  Yes. All our products are made from pure, authentic Ayurvedic
                  herbs sourced from trusted suppliers, with no harmful
                  chemicals or artificial additives.
                </p>

                <h3>2. Do your products have any side effects?</h3>
                <p>
                  No. When taken as per the recommended dosage, our herbal
                  formulations are safe and free from side effects. However, if
                  you have a medical condition or are taking prescription
                  medication, we recommend consulting your doctor before use.
                </p>

                <h3>3. How long does it take to see results?</h3>
                <p>
                  Ayurvedic remedies work naturally with your body, so results
                  may vary from person to person. Some customers notice benefits
                  within a few days, while for others, it may take a few weeks
                  of consistent use.
                </p>

                <h3>4. Can I take your supplements with other medicines?</h3>
                <p>
                  In most cases, yes. Our herbal products are safe and mild, but
                  it's always best to consult your healthcare provider if you
                  are on any prescription medication.
                </p>

                <h3>5. Are your products suitable for vegetarians?</h3>
                <p>
                  Yes. Most of our products are 100% vegetarian and plant-based.
                  Any exceptions will be clearly mentioned on the packaging.
                </p>

                <h3>6. Do you ship across India?</h3>
                <p>
                  Yes. We deliver to all major cities and towns in India.
                  Shipping charges and delivery times may vary based on
                  location.
                </p>

                <h3>7. How should I store the products?</h3>
                <p>
                  Keep them in a cool, dry place away from direct sunlight. Make
                  sure the container is tightly closed after use.
                </p>

                <h3>8. Are these products safe for long-term use?</h3>
                <p>
                  Yes. Since they are herbal and chemical-free, they are safe
                  for long-term use, provided you follow the recommended dosage.
                </p>

                <h3>9. Do you offer any discounts or subscription plans?</h3>
                <p>
                  Yes. We often run special offers and bulk purchase discounts.
                  Keep an eye on our website or sign up for our newsletter to
                  stay updated.
                </p>

                <h3>10. Do you provide consultation services?</h3>
                <p>
                  Yes. We offer Ayurvedic health consultations to help you
                  choose the right products and wellness plan based on your
                  individual needs. You can book a consultation through our
                  website.
                </p>

                <h3>11. How can I contact customer support?</h3>
                <p>
                  You can reach us through our website's contact form or via
                  email. Our support team will respond within working (10 am to
                  8pm) hours.
                </p>

                <h3>12. Product-Specific Questions</h3>
                <p>
                  For specific questions about individual products, please refer
                  to the product description pages or contact our customer
                  support team. We're here to help you make informed decisions
                  about your health and wellness journey.
                </p>

                <h3>13. Contact Information</h3>
                <p>
                  For any additional questions or concerns, please contact us:
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

                <h3>14. Additional Support</h3>
                <p>
                  Our customer support team is dedicated to providing you with
                  the best possible service. If you don't find the answer to
                  your question here, please don't hesitate to reach out to us.
                  We're committed to helping you on your wellness journey with
                  our authentic Ayurvedic products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
