import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

export const PrivacyPage = () => {
  return (
    <Tabs>
      <div className="row y-gap-30">
        <div className="col-lg-3">
          <div className="px-30 py-30 rounded-4 border-light">
            <TabList className="tabs__controls row y-gap-10 js-tabs-controls">
              <Tab className="col-12 tabs__button js-tabs-button">
                Terms and Conditions
              </Tab>
              <Tab className="col-12 tabs__button js-tabs-button">
                Privacy policy
              </Tab>
            </TabList>
          </div>
        </div>
        {/* End .col-lg-3 */}

        <div className="col-lg-9">
          <TabPanel>
            <div className="tabs__content js-tabs-content" data-aos="fade">
              <h1 className="text-30 fw-600 mb-15"> Terms and Conditions </h1>
              <h2 className="text-16 fw-500">Effective Date: 20/12/2024</h2>
              <p className="text-15 text-dark-1 mt-5">
                Welcome to Wedeazzy! These Terms and Conditions govern your
                access to and use of our Website,{" "}
                <a href="www.wedeazzy.com"> www.wedeazzy.com </a>, and services.
                By using our Website, you agree to these Terms.
                <br />
                <br />
                <h2 className="text-16 fw-800">1. Definitions </h2>
                1.1 Users: Refers to vendors, venues, and customers accessing
                the Website. <br />
                1.2 Services: Includes vendor and venue listings, digital
                marketing, ad creation, and other offerings by Wedeazzy.
                <br />
                <br />
                <h2 className="text-16 fw-800">2. Use of Services </h2>
                2.1 Eligibility: Users must be at least 18 years of age to use
                our Website and services. <br />
                2.2 Account Registration: Users must provide accurate and
                complete information during registration. You are responsible
                for maintaining the confidentiality of your account details.{" "}
                <br />
                2.3 Prohibited Activities: You agree not to: - Use the Website
                for illegal purposes. - Post false, misleading, or inappropriate
                content. - Infringe upon the intellectual property rights of
                others. <br />
                <br />
                <h2 className="text-16 fw-800">3. Listings and Upgrades </h2>
                3.1 Free Listings: Vendors and venues are eligible for free
                listings, subject to verification. <br />
                3.2 Premium Listings: Upgrades to premium listings are optional
                and governed by the applicable pricing and benefits stated on
                the Website. <br />
                3.3 Listing Accuracy: You are responsible for the accuracy of
                information provided in your listing. Wedeazzy reserves the
                right to modify or remove listings that violate our policies.{" "}
                <br />
                <br />
                <h2 className="text-16 fw-800">4. Payments</h2>
                4.1 Payment Terms: All payments for premium services must be
                made through authorized payment gateways listed on our Website.
                <br />
                4.2 Refunds: Refunds, if applicable, are processed as per our
                refund policy stated on the Website. <br />
                <br />
                <h2 className="text-16 fw-800">
                  5. Intellectual Property All content, trademarks, and
                  materials on the Website are owned by Wedeazzy or its
                  licensors. You may not reproduce, distribute, or use any
                  material without prior permission.{" "}
                </h2>
                <br />
                <h2 className="text-16 fw-800">
                  6. Limitation of Liability Wedeazzy is not liable for: -
                  Disputes between users and vendors/venues. - Losses arising
                  from the use or inability to use our Website or services. -
                  Errors or inaccuracies in listings or user-generated content.{" "}
                </h2>
                <br />
                <h2 className="text-16 fw-800">
                  7. Termination Wedeazzy reserves the right to suspend or
                  terminate access to the Website for violations of these Terms.
                </h2>
                <br />
                <h2 className="text-16 fw-800">
                  8. Governing Law These Terms are governed by the laws of
                  India. Any disputes will be subject to the exclusive
                  jurisdiction of the courts in Mumbai, Maharashtra.{" "}
                </h2>
                <br />
                <h2 className="text-16 fw-800">
                  9. Contact Us For queries related to these Terms,{" "}
                </h2>
                contact us at: <br />
                <b>Address:</b> Workafella Goregaon, AK Estate, Besides Radisson
                Blu Hotel, S.V. Rd, Goregaon West, Mumbai, Maharashtra 400062{" "}
                <br />
                <b>Email:</b> info@jiokheti.com
              </p>
            </div>
          </TabPanel>
          {/* End  General Terms of Use */}

          <TabPanel>
            <div className="tabs__content js-tabs-content" data-aos="fade">
              <h1 className="text-30 fw-600 mb-15">Privacy Policy</h1>
              <h2 className="text-16 fw-500">Effective Date: 20/12/2024</h2>
              <p className="text-15 text-dark-1 mt-5">
                <i>Wedeazzy Private Limited</i> (“Wedeazzy”, “we”, “us”, or
                “our”) respects your privacy and is committed to protecting the
                personal information you share with us. This Privacy Policy
                outlines how we collect, use, and protect your information when
                you use our website,{" "}
                <a href="www.wedeazzy.com">www.wedeazzy.com</a>, and
                services.
                <br />
                <br />
                <h2 className="text-16 fw-800">1. Information We Collect</h2>
                <b>1.1 Personal Information:</b>
                <br />
                We may collect personal information, such as your name, email
                address, phone number, address, and payment details, when you:
                <ul>
                  <li>Register or claim your listing on our platform.</li>
                  <li>Upgrade to a premium listing.</li>
                  <li>Use our digital marketing or other services.</li>
                </ul>
                <b>1.2 Non-Personal Information:</b>
                <br />
                We may collect non-personal data such as your browser type,
                operating system, IP address, and browsing behavior for
                analytics and improving the user experience.
                <br />
                <b>1.3 Cookies and Tracking Technologies:</b>
                <br />
                We use cookies and similar technologies to enhance your
                experience, track user behavior, and provide targeted
                advertisements. You can manage cookie preferences through your
                browser settings.
                <br />
                <br />
                <h2 className="text-16 fw-800">2. Use of Information</h2>
                We collect your information to:
                <ul>
                  <li>
                    Facilitate the services offered through our platform,
                    including vendor and venue listings.
                  </li>
                  <li>Process transactions and payments securely.</li>
                  <li>Send notifications, updates, and promotional offers.</li>
                  <li>
                    Improve our Website functionality and user experience.
                  </li>
                  <li>Comply with legal obligations.</li>
                </ul>
                <br />
                <h2 className="text-16 fw-800">3. Sharing of Information</h2>
                We do not sell your personal information. However, we may share
                your data with:
                <ul>
                  <li>
                    <b>Service Providers:</b> Trusted third parties who assist
                    us in providing services (e.g., payment gateways, hosting
                    providers).
                  </li>
                  <li>
                    <b>Legal Authorities:</b> When required to comply with legal
                    obligations or protect our rights.
                  </li>
                </ul>
                <br />
                <h2 className="text-16 fw-800">4. Data Retention</h2>
                Your personal information is retained only as long as necessary
                for the purposes outlined above or as required by law.
                <br />
                <br />
                <h2 className="text-16 fw-800">5. Your Rights</h2>
                Under Indian data protection laws, you have the right to:
                <ul>
                  <li>Access your data.</li>
                  <li>Request corrections to inaccurate data.</li>
                  <li>
                    Request the deletion of your data (subject to applicable
                    legal requirements).
                  </li>
                </ul>
                <br />
                <h2 className="text-16 fw-800">6. Data Security</h2>
                We employ industry-standard security measures to protect your
                data. However, no method of transmission or storage is 100%
                secure, and we cannot guarantee absolute security.
                <br />
                <br />
                <h2 className="text-16 fw-800">
                  7. Changes to the Privacy Policy
                </h2>
                We reserve the right to update this Privacy Policy at any time.
                Significant changes will be communicated via the Website.
                <br />
                <br />
                <h2 className="text-16 fw-800">8. Contact Us</h2>
                For questions or concerns regarding our Privacy Policy, please
                contact us at:
                <br />
                <b>Address:</b> Workafella Goregaon, AK Estate, Besides Radisson
                Blu Hotel, S.V. Rd, Goregaon West, Mumbai, Maharashtra 400062
                <br />
                <b>Email:</b> info@jiokheti.com
              </p>
            </div>
          </TabPanel>
          {/* End  Privacy policy */}
        </div>
        {/* End col-lg-9 */}
      </div>
    </Tabs>
  );
};

