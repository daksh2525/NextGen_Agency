import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — NextGen Agency',
  description: 'How NextGen Agency collects, uses, and protects your personal information.',
};

const LAST_UPDATED = '2 November 2026';

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-charcoal section-padding pt-36">
      <div className="container-site">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold tracking-widest text-orange uppercase mb-4">
            Legal
          </p>
          <h1 className="font-heading font-bold text-warm-white text-[clamp(2rem,5vw,3rem)] leading-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-muted-grey text-sm mb-12">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="prose prose-invert max-w-none space-y-10">
            {[
              {
                title: '1. Information We Collect',
                body: 'When you submit the contact form on our website, we collect your name, email address, phone number (if provided), company name (if provided), the service you are interested in, your estimated budget range, and the message you send us. We do not collect any information automatically beyond standard server logs.',
              },
              {
                title: '2. How We Use Your Information',
                body: 'We use the information you provide solely to respond to your enquiry, assess whether we can help with your project, and communicate with you throughout the project lifecycle if you become a client. We do not sell, rent, or share your personal information with third parties for marketing purposes.',
              },
              {
                title: '3. Data Storage',
                body: 'Contact form submissions are transmitted via Resend (a transactional email service) to our internal email address. We do not store form submissions in a database. Emails are stored on our secure email provider\'s servers.',
              },
              {
                title: '4. Cookies',
                body: 'Our website does not currently use tracking cookies or analytics scripts. We do not use Google Analytics, Meta Pixel, or any third-party tracking technology. If this changes, this policy will be updated.',
              },
              {
                title: '5. Your Rights',
                body: 'You have the right to request access to, correction of, or deletion of any personal information we hold about you. To exercise these rights, contact us at hello@nextgenagency.dev.',
              },
              {
                title: '6. Third-Party Services',
                body: 'Our website is hosted on Vercel. Email delivery is handled by Resend. Please refer to their respective privacy policies for information on how they handle data.',
              },
              {
                title: '7. Contact',
                body: 'If you have questions about this privacy policy, please contact us at hello@nextgenagency.dev.',
              },
            ].map(({ title, body }) => (
              <div key={title}>
                <h2 className="font-heading font-bold text-warm-white text-xl mb-3">{title}</h2>
                <p className="text-muted-grey leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
