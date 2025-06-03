
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="text-gray-600 mt-2">Last updated: June 3, 2024</p>
        </div>

        <div className="prose max-w-none">
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  We collect information you provide directly to us, such as when you create an account, 
                  connect your bank accounts, or contact us for support.
                </p>
                <p><strong>Personal Information:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Name, email address, and phone number</li>
                  <li>Bank account information and transaction data</li>
                  <li>Financial goals and preferences</li>
                  <li>Communication preferences</li>
                </ul>
                <p><strong>Automatically Collected Information:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Device information and IP address</li>
                  <li>Usage patterns and app interactions</li>
                  <li>Location data (with your permission)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <div className="text-gray-700 space-y-3">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Provide and maintain our financial management services</li>
                  <li>Process transactions and calculate tax obligations</li>
                  <li>Send you important notifications about your account</li>
                  <li>Improve our app's functionality and user experience</li>
                  <li>Comply with legal obligations and prevent fraud</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  without your consent, except in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal requirements</li>
                  <li>To protect our rights and prevent fraud</li>
                  <li>With trusted service providers who assist in app operations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  We implement industry-standard security measures to protect your information:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>256-bit SSL encryption for data transmission</li>
                  <li>Multi-factor authentication options</li>
                  <li>Regular security audits and monitoring</li>
                  <li>Secure data storage with limited access</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Bank Account Security</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  When connecting your bank accounts:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>We use read-only access through secure banking APIs</li>
                  <li>We never store your banking passwords or PINs</li>
                  <li>All connections are encrypted and monitored</li>
                  <li>You can revoke access at any time</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
              <div className="text-gray-700 space-y-3">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Access and update your personal information</li>
                  <li>Delete your account and associated data</li>
                  <li>Export your data in a portable format</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent for data processing</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  We retain your information for as long as necessary to provide our services 
                  and comply with legal obligations. You can request data deletion at any time 
                  through your account settings.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Children's Privacy</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  Our service is not intended for children under 18 years of age. We do not 
                  knowingly collect personal information from children under 18.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Changes to Privacy Policy</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of 
                  significant changes via email or through the app.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  If you have questions about this Privacy Policy or our data practices, 
                  please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>Email:</strong> privacy@floner.com</p>
                  <p><strong>Phone:</strong> +91 98765 43210</p>
                  <p><strong>Address:</strong> Floner Technologies Pvt. Ltd.<br />
                  123 Finance Street, Mumbai, Maharashtra 400001, India</p>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              This privacy policy is effective as of June 3, 2024
            </p>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200">
              I Understand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
