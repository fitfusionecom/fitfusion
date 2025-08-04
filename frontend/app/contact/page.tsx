import { fitfusionConfig } from "@/lib/fitfusion-config";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaRegClock,
} from "react-icons/fa";

export const metadata = {
  title: `Contact Us - ${fitfusionConfig.brand.name}`,
  description: `Contact ${fitfusionConfig.brand.name} for customer support, sales inquiries, or general questions. We're here to help you with all your ayurvedic product needs.`,
};

export default function ContactPage() {
  return (
    <div className="ayur-bgcover" style={{ background: "whitesmoke" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container">
        {/* Contact Content */}
        <div className="pa-contact spacer-top spacer-bottom">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="pa-contact-form">
                <div className="pa-heading py-5">
                  <h5 className="text-uppercase text-center">Get In Touch</h5>
                  <h1 className="text-center">Contact Us</h1>
                  <p className="text-center">
                    We'd love to hear from you. Send us a message and we'll
                    respond as soon as possible.
                  </p>
                </div>

                <form>
                  <div className="row mb-3">
                    <div className="col-lg-6 col-md-6 ">
                      <div className="pa-form-group">
                        <label>First Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your first name"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="pa-form-group">
                        <label>Last Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-6 col-md-6">
                      <div className="pa-form-group">
                        <label>Email Address *</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter your email address"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="pa-form-group">
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pa-form-group mb-3">
                    <label>Subject *</label>
                    <select className="form-control" required>
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Customer Support</option>
                      <option value="sales">Sales Inquiry</option>
                      <option value="returns">Returns & Refunds</option>
                      <option value="wholesale">Wholesale Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="pa-form-group mb-3">
                    <label>Message *</label>
                    <textarea
                      className="form-control"
                      rows={6}
                      placeholder="Enter your message"
                      required
                    ></textarea>
                  </div>
                  <div className="pa-form-btn">
                    <button type="submit" className="ayur-btn">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* Contact Information Section below the form */}
          <section className="row mt-5">
            <div className="col-lg-12 col-md-12 mx-auto">
              <section className="pa-contact-detail">
                <header className="pa-heading">
                  <h5 className="text-uppercase text-center">
                    Contact Information
                  </h5>
                  <h3 className="text-center">Get In Touch</h3>
                </header>
                <div
                  className="row g-4"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "30px",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  <div className="pa-contact-box d-flex gap-2">
                    <span className="pa-contact-icon">
                      <FaMapMarkerAlt size={24} color="#cd8973" />
                    </span>
                    <div className="pa-contact-content">
                      <h6>Our Location</h6>
                      <address>
                        {fitfusionConfig.contact.address.fullAddress}
                      </address>
                    </div>
                  </div>
                  <div className="pa-contact-box d-flex gap-2">
                    <span className="pa-contact-icon">
                      <FaPhoneAlt size={24} color="#cd8973" />
                    </span>
                    <div className="pa-contact-content">
                      <h6>Phone Number</h6>
                      <p>{fitfusionConfig.contact.phone}</p>
                      <p>WhatsApp: {fitfusionConfig.contact.whatsapp}</p>
                    </div>
                  </div>
                  <div className="pa-contact-box d-flex gap-2">
                    <span className="pa-contact-icon">
                      <FaEnvelope size={24} color="#cd8973" />
                    </span>
                    <div className="pa-contact-content">
                      <h6>Email Address</h6>
                      <ul className="list-unstyled mb-0">
                        <li>Support: {fitfusionConfig.contact.supportEmail}</li>
                        <li>Sales: {fitfusionConfig.contact.salesEmail}</li>
                        <li>General: {fitfusionConfig.contact.infoEmail}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="pa-contact-box d-flex gap-2">
                    <span className="pa-contact-icon">
                      <FaRegClock size={24} color="#cd8973" />
                    </span>
                    <div className="pa-contact-content">
                      <h6>Business Hours</h6>
                      <p>{fitfusionConfig.contact.officeHours}</p>
                      <p>
                        Response Time: {fitfusionConfig.support.responseTime}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
