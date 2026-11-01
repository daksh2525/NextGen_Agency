import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — NextGen Agency',
  description: 'Terms and conditions for using NextGen Agency\'s website and engaging our services.',
};

const LAST_UPDATED = '2 November 2026';

export default function TermsOfServicePage() {
  return (
    <section className="bg-charcoal section-padding pt-36">
      <div className="container-site">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold tracking-widest text-orange uppercase mb-4">
            Legal
          </p>
          <h1 className="font-heading font-bold text-warm-white text-[clamp(2rem,5vw,3rem)] leading-tight mb-3">
            Terms of Service
          </h1>
          <p className="text-muted-grey text-sm mb-12">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="space-y-10">
            {[
              {
                title: '1. Acceptance of Terms',
                body: 'By accessing and using this website, you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use this website.',
              },
              {
                title: '2. Use of Website',
                body: 'This website is provided for informational purposes and to allow potential clients to enquire about our services. You may not use this website for any unlawful purpose or in a way that could damage, disable, or impair the website.',
              },
              {
                title: '3. Service Enquiries',
                body: 'Submitting the contact form on this website does not constitute a binding agreement or contract. Any engagement for services requires a separate written agreement signed by both parties.',
              },
              {
                title: '4. Intellectual Property',
                body: 'All content on this website, including text, design, and code, is the intellectual property of NextGen Agency unless otherwise stated. You may not reproduce, distribute, or use any content without prior written permission.',
              },
              {
                title: '5. Limitation of Liability',
                body: 'NextGen Agency shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website. The website is provided "as is" without warranties of any kind.',
              },
              {
                title: '6. External Links',
                body: 'This website may contain links to third-party websites. We have no control over the content of those websites and accept no responsibility for them or for any loss or damage that may arise from your use of them.',
              },
              {
                title: '7. Changes to Terms',
                body: 'We reserve the right to update these terms at any time. Continued use of the website after changes constitutes acceptance of the updated terms.',
              },
              {
                title: '8. Governing Law',
                body: 'These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of India.',
              },
              {
                title: '9. Contact',
                body: 'For any questions about these terms, please contact us at hello@nextgenagency.dev.',
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
