import { fitfusionConfig } from "@/lib/fitfusion-config";

export const metadata = {
  title: `Terms of Service - ${fitfusionConfig.brand.name}`,
  description: `Terms of Service for ${fitfusionConfig.brand.name}. Read our terms and conditions for using our services and products.`,
};

export default function TermsPage() {
  return (
    <div
      className="ayur-bgcover "
      style={{
        background: "whitesmoke",
      }}
    >
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container">
        {/* Terms Content */}
        <div className="pa-about-content spacer-top spacer-bottom">
          <div className="row">
            <div className="col-lg-12">
              <div className="pa-heading py-5">
                <h5 className="text-uppercase text-center">
                  Legal Information
                </h5>
                <h1 className="text-center ">Terms of Service</h1>
                <p className="text-center">
                  Last updated: {fitfusionConfig.legal.termsLastUpdated}
                </p>
              </div>

              <div className="pa-about-text">
                <h3>1. Acceptance of Terms</h3>
                <p>
                  By accessing and using {fitfusionConfig.brand.name} website
                  and services, you accept and agree to be bound by the terms
                  and provision of this agreement. If you do not agree to abide
                  by the above, please do not use this service.
                </p>

                <h3>2. Use License</h3>
                <p>
                  Permission is granted to temporarily download one copy of the
                  materials (information or software) on{" "}
                  {fitfusionConfig.brand.name} website for personal,
                  non-commercial transitory viewing only. This is the grant of a
                  license, not a transfer of title, and under this license you
                  may not:
                </p>
                <ul>
                  <li>Modify or copy the materials</li>
                  <li>
                    Use the materials for any commercial purpose or for any
                    public display (commercial or non-commercial)
                  </li>
                  <li>
                    Attempt to decompile or reverse engineer any software
                    contained on {fitfusionConfig.brand.name} website
                  </li>
                  <li>
                    Remove any copyright or other proprietary notations from the
                    materials
                  </li>
                  <li>
                    Transfer the materials to another person or "mirror" the
                    materials on any other server
                  </li>
                </ul>

                <h3>3. Disclaimer</h3>
                <p>
                  The materials on {fitfusionConfig.brand.name} website are
                  provided on an 'as is' basis. {fitfusionConfig.brand.name}{" "}
                  makes no warranties, expressed or implied, and hereby
                  disclaims and negates all other warranties including without
                  limitation, implied warranties or conditions of
                  merchantability, fitness for a particular purpose, or
                  non-infringement of intellectual property or other violation
                  of rights.
                </p>

                <h3>4. Limitations</h3>
                <p>
                  In no event shall {fitfusionConfig.brand.name} or its
                  suppliers be liable for any damages (including, without
                  limitation, damages for loss of data or profit, or due to
                  business interruption) arising out of the use or inability to
                  use the materials on {fitfusionConfig.brand.name} website,
                  even if {fitfusionConfig.brand.name} or a{" "}
                  {fitfusionConfig.brand.name} authorized representative has
                  been notified orally or in writing of the possibility of such
                  damage.
                </p>

                <h3>5. Accuracy of Materials</h3>
                <p>
                  The materials appearing on {fitfusionConfig.brand.name}{" "}
                  website could include technical, typographical, or
                  photographic errors. {fitfusionConfig.brand.name} does not
                  warrant that any of the materials on its website are accurate,
                  complete or current. {fitfusionConfig.brand.name} may make
                  changes to the materials contained on its website at any time
                  without notice.
                </p>

                <h3>6. Links</h3>
                <p>
                  {fitfusionConfig.brand.name} has not reviewed all of the sites
                  linked to its website and is not responsible for the contents
                  of any such linked site. The inclusion of any link does not
                  imply endorsement by {fitfusionConfig.brand.name} of the site.
                  Use of any such linked website is at the user's own risk.
                </p>

                <h3>7. Modifications</h3>
                <p>
                  {fitfusionConfig.brand.name} may revise these terms of service
                  for its website at any time without notice. By using this
                  website you are agreeing to be bound by the then current
                  version of these Terms of Service.
                </p>

                <h3>8. Governing Law</h3>
                <p>
                  These terms and conditions are governed by and construed in
                  accordance with the laws of India and you irrevocably submit
                  to the exclusive jurisdiction of the courts in that State or
                  location.
                </p>

                <h3>9. Contact Information</h3>
                <p>
                  If you have any questions about these Terms of Service, please
                  contact us at:
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

                <h3>10. Company Information</h3>
                <div className="pa-company-info">
                  <p>
                    <strong>Company Name:</strong> {fitfusionConfig.brand.name}
                  </p>
                  <p>
                    <strong>Business Type:</strong>{" "}
                    {fitfusionConfig.business.businessType}
                  </p>
                  <p>
                    <strong>GST Number:</strong>{" "}
                    {fitfusionConfig.business.gstNumber}
                  </p>
                  <p>
                    <strong>PAN Number:</strong>{" "}
                    {fitfusionConfig.business.panNumber}
                  </p>
                  <p>
                    <strong>Registration Number:</strong>{" "}
                    {fitfusionConfig.business.companyRegistration}
                  </p>
                  <p>
                    <strong>Industry:</strong>{" "}
                    {fitfusionConfig.business.industry}
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
