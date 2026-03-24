export default function Terms() {
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-slate-600 text-lg">
            Last Updated: March 2026
          </p>
        </div>

        {/* Card */}
        <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 space-y-10 text-slate-700 leading-7">

          {/* Intro */}
          <section>
            <p>
              These Terms and Conditions ("Terms", "Terms and Conditions") govern your
              relationship with the Aarthika Finserve mobile application and website
              (the "Service") operated by Aarthika Finserve ("we", "us", or "our").
            </p>

            <p className="mt-4">
              Please read these Terms carefully before using our Service. Your access
              to and use of the Service is conditioned on your acceptance of and
              compliance with these Terms.
            </p>

            <p className="mt-4">
              By accessing or using the Service, you agree to be bound by these Terms.
              If you disagree with any part of the terms, you may not use the Service.
            </p>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              1. Eligibility
            </h2>
            <p className="mt-3">
              You must be at least 18 years of age to use our services. By using
              this platform, you confirm that you have the legal right, authority,
              and capacity to enter into this agreement.
            </p>
          </section>

          {/* Services */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              2. Services
            </h2>
            <p className="mt-3">
              Aarthika Finserve provides a platform to connect users with lending
              partners. We are not a lending institution and do not make lending
              decisions.
            </p>

            <ul className="mt-4 list-disc pl-6 space-y-2">
              <li>
                Loan approvals, terms, and conditions are determined solely by the
                lending partners.
              </li>
              <li>
                By applying, you authorize us and our partners to access your
                credit information and related data.
              </li>
              <li>
                You agree to provide accurate, complete, and updated information.
              </li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              3. Intellectual Property
            </h2>
            <p className="mt-3">
              The Service and all its content, features, and functionality are the
              exclusive property of Aarthika Finserve and its licensors.
            </p>
            <p className="mt-3">
              The Service is protected under copyright, trademark, and other laws.
              You may not use our branding without prior written consent.
            </p>
          </section>

          {/* Third Party */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              4. Third-Party Links
            </h2>
            <p className="mt-3">
              Our Service may include links to third-party websites or services.
              We are not responsible for their content, privacy policies, or practices.
            </p>
            <p className="mt-3">
              We recommend reviewing their terms before using those services.
            </p>
          </section>

          {/* Consent */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              5. Consent
            </h2>
            <p className="mt-3">
              By using our platform, you agree to our Privacy Policy and Terms.
            </p>

            <p className="mt-3">
              By submitting your application, you explicitly authorize us to contact
              you via phone, SMS, email, or WhatsApp regarding:
            </p>

            <ul className="mt-3 list-disc pl-6 space-y-2">
              <li>Loan application updates</li>
              <li>Promotional offers</li>
              <li>Marketing campaigns</li>
            </ul>

            <p className="mt-3">
              You also consent to sharing your personal data with lending partners
              and affiliates as per applicable regulations for processing your
              application.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              6. Termination
            </h2>
            <p className="mt-3">
              We may suspend or terminate your access to the Service immediately
              without prior notice if you violate these Terms.
            </p>
          </section>

          {/* Liability */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              7. Limitation of Liability
            </h2>
            <p className="mt-3">
              Aarthika Finserve shall not be liable for any indirect, incidental,
              special, or consequential damages including loss of data, profits,
              or goodwill.
            </p>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              8. Disclaimer
            </h2>
            <p className="mt-3">
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis
              without warranties of any kind.
            </p>

            <ul className="mt-3 list-disc pl-6 space-y-2">
              <li>No guarantee of uninterrupted service</li>
              <li>No guarantee errors will be fixed</li>
              <li>No guarantee results will meet expectations</li>
            </ul>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              9. Governing Law
            </h2>
            <p className="mt-3">
              These Terms are governed by the laws of Telangana, India.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              10. Changes to Terms
            </h2>
            <p className="mt-3">
              We may update these Terms at any time. Continued use of the Service
              after changes means you accept the updated Terms.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              11. Contact Us
            </h2>
            <p className="mt-3">
              If you have any questions regarding these Terms, contact us at:
            </p>
            <p className="mt-2 font-medium text-blue-600">
              info@aarthikafinserve.com
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
