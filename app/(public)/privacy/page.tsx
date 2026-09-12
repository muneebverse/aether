import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Aether",
  description:
    "How Aether collects, uses, and protects your information across all our services.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-aether-deep-ink">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-aether-deep-ink/60">
          Effective Date: [Insert Launch Date] &middot; Last Updated: September 12, 2026
        </p>
      </div>

      <div className="prose prose-neutral max-w-none space-y-10">
        <p className="text-aether-deep-ink/80 leading-relaxed">
          Aether (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our,&rdquo; &ldquo;Aether,&rdquo;
          &ldquo;aethers.studio&rdquo;) provides digital services including portfolio and
          website design, CV and career document writing, presentation and slide deck
          design, and LinkedIn profile optimization. This Privacy Policy explains what
          information we collect, how we use it, and the rights you have regarding your
          data &mdash; no matter where in the world you&apos;re located.
        </p>
        <p className="text-aether-deep-ink/80 leading-relaxed">
          By using our website or purchasing our services, you agree to the practices
          described in this policy.
        </p>

        <Section title="1. Information We Collect">
          <p>
            We only collect what&apos;s needed to deliver your order and communicate with
            you. Depending on the service you request, this may include:
          </p>
          <ul>
            <li>
              <strong>Contact information</strong> &mdash; name, email address,
              phone/WhatsApp number
            </li>
            <li>
              <strong>Project content</strong> &mdash; the material you send us to
              complete your order, such as CV/resume details, work history, education,
              LinkedIn profile content, portfolio content, images, or presentation
              material
            </li>
            <li>
              <strong>Payment-related information</strong> &mdash; when you pay via bank
              transfer, JazzCash, or Easypaisa, we may see transaction details (e.g.,
              sender name, transaction ID, amount) needed to confirm payment. We do{" "}
              <strong>not</strong> store your card numbers, bank account credentials, or
              PINs &mdash; we are not a payment processor, and payment confirmation
              happens through your bank/wallet app, not through us.
            </li>
            <li>
              <strong>Communications</strong> &mdash; messages you send us via WhatsApp,
              email, Instagram, or our contact form
            </li>
          </ul>
          <p>
            We do <strong>not</strong> currently use cookies, analytics tools, or tracking
            pixels on aethers.studio. If this changes in the future, this policy will be
            updated and, where required by law, you will be asked for consent.
          </p>
        </Section>

        <Section title="2. How We Use Your Information">
          <p>We use the information you provide solely to:</p>
          <ul>
            <li>
              Deliver the service you ordered (build your website, write your CV, design
              your presentation, optimize your LinkedIn profile)
            </li>
            <li>
              Communicate with you about your order &mdash; updates, revisions, delivery,
              and support
            </li>
            <li>Confirm and reconcile payments</li>
            <li>
              Improve our services based on your feedback (only if you agree to share a
              testimonial &mdash; see Section 7)
            </li>
            <li>Respond to inquiries or appeals you send us</li>
          </ul>
          <p>
            We do <strong>not</strong> sell, rent, or trade your personal information to
            third parties. We do not use your data for advertising or share it with
            marketing networks.
          </p>
        </Section>

        <Section title="3. How Your Information Is Stored">
          <p>
            Client files and project materials are currently stored on a local,
            password-protected device managed directly by Aether. We do not use
            third-party cloud storage for client data at this time.
          </p>
          <p>
            We take reasonable technical and organizational precautions to protect your
            information from unauthorized access, loss, or misuse. However, no method of
            storage or transmission is 100% secure, and we cannot guarantee absolute
            security.
          </p>
          <p>
            We retain your information only as long as necessary to complete your order
            and provide reasonable after-delivery support (e.g., revisions, re-sends of
            final files). If you&apos;d like your data deleted sooner, see Section 6.
          </p>
        </Section>

        <Section title="4. Legal Basis for Processing (GDPR — European Users)">
          <p>
            If you are located in the European Economic Area (EEA), UK, or Switzerland,
            we process your personal data under the following legal bases as required by
            the General Data Protection Regulation (GDPR):
          </p>
          <ul>
            <li>
              <strong>Contractual necessity</strong> &mdash; processing your CV, project
              details, or content is required to deliver the service you purchased
            </li>
            <li>
              <strong>Consent</strong> &mdash; where you voluntarily provide information
              (e.g., a testimonial, marketing opt-in)
            </li>
            <li>
              <strong>Legitimate interest</strong> &mdash; responding to inquiries,
              preventing fraud, and improving our services
            </li>
          </ul>
          <p>Under GDPR, you have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request erasure (&ldquo;right to be forgotten&rdquo;)</li>
            <li>Restrict or object to processing</li>
            <li>Request data portability (a copy of your data in a portable format)</li>
            <li>Lodge a complaint with your local data protection authority</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{" "}
            <a href="mailto:contact@aethers.studio">contact@aethers.studio</a>.
          </p>
        </Section>

        <Section title="5. California Privacy Rights (CCPA/CPRA — US Users)">
          <p>
            If you are a California resident, the California Consumer Privacy Act (CCPA),
            as amended by the CPRA, gives you the right to:
          </p>
          <ul>
            <li>Know what personal information we collect and how it&apos;s used</li>
            <li>Request deletion of your personal information</li>
            <li>Correct inaccurate personal information</li>
            <li>
              Opt out of the sale or sharing of personal information &mdash; we do not
              sell or share your personal information, so this does not apply, but you
              may still request confirmation
            </li>
            <li>Non-discrimination for exercising your privacy rights</li>
          </ul>
          <p>
            To make a request, email{" "}
            <a href="mailto:contact@aethers.studio">contact@aethers.studio</a>. We will
            respond within the timeframe required by law.
          </p>
        </Section>

        <Section title="6. Your Rights, Wherever You Are">
          <p>
            Regardless of your location &mdash; Pakistan, the US, the EU, UK, Canada, or
            elsewhere &mdash; you can always:
          </p>
          <ul>
            <li>Ask what data we hold about you</li>
            <li>Ask us to correct or update it</li>
            <li>
              Ask us to delete your data once your order is complete (subject to any
              legal recordkeeping requirements, e.g., transaction records)
            </li>
            <li>Withdraw consent for optional uses (like testimonials) at any time</li>
            <li>Appeal any decision we make about your data or this policy</li>
          </ul>
          <p>
            <strong>
              To make any request or appeal, email{" "}
              <a href="mailto:contact@aethers.studio">contact@aethers.studio</a>.
            </strong>{" "}
            We aim to respond within 7&ndash;14 business days.
          </p>
        </Section>

        <Section title="7. Testimonials and Portfolio Use">
          <p>
            If you agree to let us feature your project (e.g., a before/after CV example,
            a website screenshot, a testimonial quote) in our marketing or portfolio, we
            will only do so with your explicit permission, and you may withdraw that
            permission at any time by emailing us.
          </p>
        </Section>

        <Section title="8. Children's Privacy">
          <p>
            Our services are not directed at children under 16. We do not knowingly
            collect personal information from children. If you believe a child has
            provided us with personal data, contact us at{" "}
            <a href="mailto:contact@aethers.studio">contact@aethers.studio</a> and we
            will delete it.
          </p>
        </Section>

        <Section title="9. International Data Transfers">
          <p>
            Aether operates from Pakistan. If you are located outside Pakistan, your
            information will be processed in Pakistan. By using our services, you consent
            to this transfer. We take reasonable steps to ensure your data is treated
            securely and in line with this policy regardless of where it&apos;s processed.
          </p>
        </Section>

        <Section title="10. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time as our services or legal
            obligations change. The &ldquo;Last Updated&rdquo; date at the top will
            reflect the most recent revision. Material changes will be communicated via
            the website or direct notice where appropriate.
          </p>
        </Section>

        <Section title="11. Contact Us">
          <p>
            For questions, privacy policy appeals, data requests, or any other
            suggestions regarding this policy:
          </p>
          <p>
            <strong>Email: </strong>
            <a href="mailto:contact@aethers.studio">contact@aethers.studio</a>
          </p>
          <p>We take every request seriously and will respond as promptly as possible.</p>
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-aether-deep-ink mb-3">{title}</h2>
      <div className="text-aether-deep-ink/80 leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_a]:text-[#0B428E] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#0B428E]/80">
        {children}
      </div>
    </section>
  );
}
