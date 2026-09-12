import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Aether",
  description:
    "The terms that govern your use of Aether's website and services.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-aether-deep-ink">
          Terms and Conditions
        </h1>
        <p className="mt-4 text-sm text-aether-deep-ink/60">
          Effective Date: [Insert Launch Date] &middot; Last Updated: September 12, 2026
        </p>
      </div>

      <div className="prose prose-neutral max-w-none space-y-10">
        <p className="text-aether-deep-ink/80 leading-relaxed">
          Welcome to Aether (aethers.studio). These Terms and Conditions
          (&ldquo;Terms&rdquo;) govern your use of our website and your purchase of any
          service from us. By placing an order or using our website, you agree to be
          bound by these Terms. If you do not agree, please do not use our services.
        </p>

        <Section title="1. Who We Are">
          <p>Aether is a digital services provider offering:</p>
          <ul>
            <li>Portfolio &amp; Website Design &mdash; PKR 5,999&ndash;17,999</li>
            <li>CV &amp; Career Documents (ATS-optimized) &mdash; PKR 1,999&ndash;7,999</li>
            <li>Presentations &amp; Slide Decks &mdash; PKR 999&ndash;3,999</li>
            <li>LinkedIn Profile Optimization &mdash; PKR 1,499</li>
          </ul>
          <p>
            Prices are listed in Pakistani Rupees (PKR) and are subject to change without
            prior notice. The price confirmed at the time of your order is the price that
            applies to that order.
          </p>
        </Section>

        <Section title="2. Placing an Order">
          <p>When you place an order with Aether, you agree to:</p>
          <ul>
            <li>
              Provide accurate, complete, and truthful information relevant to your
              project (e.g., real work history for a CV, accurate business details for a
              website)
            </li>
            <li>
              Respond to requests for clarification or additional material in a timely
              manner, since delays on your end may delay delivery
            </li>
            <li>Review and approve deliverables within a reasonable time after delivery</li>
          </ul>
          <p>
            We reserve the right to decline or cancel any order, at our discretion,
            particularly if the requested content is unlawful, fraudulent, or
            misrepresents facts (e.g., fabricated credentials on a CV).
          </p>
        </Section>

        <Section title="3. Payment Terms">
          <ul>
            <li>
              Payment is currently accepted via bank transfer, JazzCash, or Easypaisa.
            </li>
            <li>
              Unless otherwise agreed in writing, an upfront deposit or full payment is
              required before work begins, depending on the service and arrangement
              communicated to you at the time of ordering.
            </li>
            <li>
              You are responsible for sending accurate proof of payment (transaction ID,
              screenshot, or receipt) to confirm your order.
            </li>
            <li>
              We are not a licensed payment processor. All transfers occur directly
              between you and Aether through your bank or mobile wallet; we do not store
              your banking credentials.
            </li>
            <li>
              Prices do not include any transaction fees charged by your bank or mobile
              wallet provider &mdash; those are your responsibility.
            </li>
          </ul>
        </Section>

        <Section title="4. Revisions and Delivery">
          <ul>
            <li>
              Each service includes a reasonable number of revisions as communicated to
              you at the time of order (typically 1&ndash;2 rounds, depending on the
              package).
            </li>
            <li>
              Revisions must relate to the original brief. Requests that materially
              change the original scope (e.g., asking for a completely different CV
              format after a final draft was approved, or requesting entirely new website
              pages) may be treated as a new order and charged accordingly.
            </li>
            <li>
              Delivery timelines are estimates communicated per project and may vary
              based on project complexity, your responsiveness, and current workload. We
              will communicate any expected delays as early as possible.
            </li>
          </ul>
        </Section>

        <Section title="5. Refund Policy">
          <ul>
            <li>
              Because our services involve custom work and personal time investment,
              refunds are evaluated on a case-by-case basis.
            </li>
            <li>
              If work has not yet started, a full refund may be issued upon request.
            </li>
            <li>
              If work is in progress or a first draft has been delivered, a partial
              refund may be considered depending on work completed.
            </li>
            <li>
              Once a final deliverable has been approved and delivered in full, refunds
              are generally not issued, except where Aether has failed to deliver the
              agreed scope.
            </li>
          </ul>
          <p>
            To request a refund or raise a dispute, email{" "}
            <a href="mailto:contact@aethers.studio">contact@aethers.studio</a> with your
            order details.
          </p>
        </Section>

        <Section title="6. Intellectual Property & Ownership">
          <ul>
            <li>
              Once a project is paid in full and delivered, ownership of the final
              deliverable (website files, CV document, presentation, LinkedIn copy)
              transfers to you, the client, for your own use.
            </li>
            <li>
              Aether retains the right to showcase completed work in its portfolio or
              marketing materials unless you explicitly request otherwise in writing (see
              our Privacy Policy, Section 7).
            </li>
            <li>
              Any templates, frameworks, code snippets, or design systems Aether uses as
              part of its own internal process remain the intellectual property of Aether
              and are not transferred as part of any order.
            </li>
            <li>
              You are responsible for ensuring that any content you provide us (text,
              images, logos, work history) does not infringe on the rights of any third
              party. Aether is not liable for client-provided content that turns out to
              be inaccurate, plagiarized, or infringing.
            </li>
          </ul>
        </Section>

        <Section title="7. No Guarantee of Outcomes">
          <p>
            Aether provides professional services designed to improve the quality and
            presentation of your materials. However, we do <strong>not guarantee</strong>:
          </p>
          <ul>
            <li>
              That a CV or LinkedIn optimization will result in a job offer or interview
            </li>
            <li>
              That a website will generate a specific amount of traffic, leads, or sales
            </li>
            <li>
              That a presentation will result in approval, funding, or a specific outcome
            </li>
          </ul>
          <p>
            Outcomes depend on many factors outside our control, including market
            conditions, employer decisions, and how the deliverable is used after
            handoff.
          </p>
        </Section>

        <Section title="8. Limitation of Liability">
          <p>To the maximum extent permitted by applicable law:</p>
          <ul>
            <li>
              Aether&apos;s total liability for any claim arising from our services is
              limited to the amount you paid for that specific order.
            </li>
            <li>
              Aether is not liable for indirect, incidental, or consequential damages,
              including lost income, lost opportunities, or reputational harm, arising
              from the use of our deliverables.
            </li>
            <li>
              This limitation applies regardless of your country of residence, though
              nothing in this section limits rights that cannot be waived under your
              local consumer protection law.
            </li>
          </ul>
        </Section>

        <Section title="9. Client Conduct">
          <p>
            We ask that all communication with Aether remain respectful. We reserve the
            right to decline service or end a working relationship, at our discretion, in
            cases of abusive, harassing, or fraudulent conduct.
          </p>
        </Section>

        <Section title="10. Governing Law">
          <p>
            These Terms are governed by the laws of Pakistan. However, if you are located
            in a jurisdiction (such as the EU, UK, or US) that grants you non-waivable
            consumer protection rights under local law, those rights remain unaffected by
            this clause, and nothing here is intended to override protections
            you&apos;re legally entitled to.
          </p>
        </Section>

        <Section title="11. Changes to These Terms">
          <p>
            We may update these Terms from time to time to reflect changes in our
            services or applicable law. The &ldquo;Last Updated&rdquo; date above
            reflects the most recent revision. Continued use of our services after
            changes are posted constitutes acceptance of the updated Terms.
          </p>
        </Section>

        <Section title="12. Contact & Appeals">
          <p>
            For questions about these Terms, order disputes, refund requests, or any
            appeal related to how we&apos;ve applied this policy:
          </p>
          <p>
            <strong>Email: </strong>
            <a href="mailto:contact@aethers.studio">contact@aethers.studio</a>
          </p>
          <p>We aim to respond to all inquiries within 7&ndash;14 business days.</p>
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
