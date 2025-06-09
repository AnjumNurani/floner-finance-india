import React from 'react';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          <p className="text-gray-600 mt-2">Last updated: June 3, 2024</p>
        </div>

        <div className="prose max-w-none">
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  By accessing and using Enro ("the Service"), you accept and agree to be bound by 
                  the terms and provision of this agreement. If you do not agree to these terms, 
                  you should not use this service.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  Enro is a financial management application that helps users track expenses, 
                  manage budgets, set financial goals, and calculate income tax obligations 
                  according to Indian taxation laws.
                </p>
                <p><strong>Service Features Include:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Bank account integration and transaction tracking</li>
                  <li>Expense categorization and budget management</li>
                  <li>Financial goal setting and progress tracking</li>
                  <li>Indian income tax calculation and optimization</li>
                  <li>Financial reports and insights</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. User Accounts and Responsibilities</h2>
              <div className="text-gray-700 space-y-3">
                <p><strong>Account Creation:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>You must provide accurate and complete information</li>
                  <li>You are responsible for maintaining account security</li>
                  <li>You must be at least 18 years old to use the service</li>
                  <li>One account per user is permitted</li>
                </ul>
                <p><strong>User Responsibilities:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Provide accurate financial information</li>
                  <li>Keep your login credentials secure</li>
                  <li>Notify us immediately of unauthorized access</li>
                  <li>Use the service in compliance with applicable laws</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Subscription Plans and Billing</h2>
              <div className="text-gray-700 space-y-3">
                <p><strong>Available Plans:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Free Plan:</strong> Basic features with limitations</li>
                  <li><strong>Pro Plan:</strong> ₹98/month with enhanced features</li>
                  <li><strong>Ultra Plan:</strong> ₹198/month with premium features</li>
                </ul>
                <p><strong>Billing Terms:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Subscriptions are billed monthly in advance</li>
                  <li>Auto-renewal unless cancelled before billing cycle</li>
                  <li>7-day money-back guarantee for new subscribers</li>
                  <li>Price changes will be communicated 30 days in advance</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Bank Account Integration</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  When connecting your bank accounts to Enro:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>We use read-only access through secure APIs</li>
                  <li>We do not store banking passwords or credentials</li>
                  <li>You can revoke access at any time</li>
                  <li>We are not liable for bank-imposed connection fees</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Tax Calculation Disclaimer</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  <strong>Important Notice:</strong> Our tax calculation feature is provided for 
                  informational purposes only and should not be considered as professional tax advice.
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Calculations are based on current Indian tax laws</li>
                  <li>Tax laws may change and affect calculations</li>
                  <li>We recommend consulting a qualified tax professional</li>
                  <li>Users are responsible for their tax obligations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Prohibited Uses</h2>
              <div className="text-gray-700 space-y-3">
                <p>You agree not to use the service to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Share false or misleading financial information</li>
                  <li>Attempt to gain unauthorized access to other accounts</li>
                  <li>Use the service for money laundering or illegal activities</li>
                  <li>Reverse engineer or copy our software</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Data Privacy and Security</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  Your privacy is important to us. Please review our Privacy Policy to understand 
                  how we collect, use, and protect your information.
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>We use industry-standard encryption</li>
                  <li>Regular security audits and monitoring</li>
                  <li>Limited access to your personal data</li>
                  <li>You control your data sharing preferences</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  To the maximum extent permitted by law, Enro shall not be liable for any 
                  indirect, incidental, special, or consequential damages arising from your use 
                  of the service.
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>We provide the service "as is" without warranties</li>
                  <li>We are not responsible for third-party service failures</li>
                  <li>Our liability is limited to the amount you paid for the service</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Termination</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  Either party may terminate this agreement at any time:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>You may cancel your account through app settings</li>
                  <li>We may suspend accounts for terms violations</li>
                  <li>Upon termination, access to the service will cease</li>
                  <li>Your data may be retained as per our Privacy Policy</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Governing Law</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  These terms are governed by the laws of India. Any disputes will be resolved 
                  in the courts of Mumbai, Maharashtra.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Contact Information</h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  For questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>Email:</strong> legal@enro.com</p>
                  <p><strong>Phone:</strong> +91 98765 43210</p>
                  <p><strong>Address:</strong> Enro Technologies Pvt. Ltd.<br />
                  123 Finance Street, Mumbai, Maharashtra 400001, India</p>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              These terms are effective as of June 3, 2024
            </p>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200">
              I Agree
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
