import Services from '@/components/Services';

export const metadata = {
  title: 'Services | AETHER | Elevate to Clarity',
  description: 'Portfolios, CVs, presentations, and LinkedIn optimization for engineers. Tiers and bundles to fit your budget.',
  openGraph: {
    title: 'Services | AETHER',
    description: 'Custom digital presence services for engineers',
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-sky-white">
      {/* Services Hero */}
      <section className="relative bg-gradient-to-r from-aether-deep-teal via-aether-electric-teal to-aether-bright-cyan py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-96 h-96 bg-aether-bright-cyan rounded-full blur-3xl morph-blob"></div>
          <div className="absolute -bottom-20 left-20 w-72 h-72 bg-aether-sky-cyan rounded-full blur-3xl morph-blob" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container-aether relative z-10 text-center space-y-6">
          <h1 className="text-aether-sky-white font-bold text-4xl sm:text-5xl animate-in fade-in slide-in-from-down-6 duration-1000">
            All the Services. All the Tiers.
          </h1>
          <p className="text-lg text-aether-sky-white text-opacity-90 max-w-2xl mx-auto animate-in fade-in slide-in-from-down-8 duration-1000" style={{ animationDelay: '200ms' }}>
            Four core services, three tiers each. Pick what fits your budget and timeline. No surprises, just clarity.
          </p>
        </div>
      </section>

      {/* Services Component */}
      <Services />

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-sky-white to-aether-electric-teal to-opacity-5">
        <div className="container-aether">
          <div className="text-center mb-16 space-y-4">
            <div className="eyebrow">COMMON QUESTIONS</div>
            <h2 className="text-aether-deep-teal font-bold text-3xl">Clarity on How We Work</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-aether-deep-teal">How long does each service take?</h3>
              <p className="text-deep-ink text-opacity-70 leading-relaxed">
                Timelines vary by tier. Portfolio services: 7-28 days. CVs: 3-7 days. Presentations: 3-5 days. LinkedIn: 2-3 days. Express timelines available.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-aether-deep-teal">Can I mix and match services?</h3>
              <p className="text-deep-ink text-opacity-70 leading-relaxed">
                Yes. Our bundles offer savings, but you can also request custom combinations. Contact us for a quote on mixed services.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-aether-deep-teal">What's included in revisions?</h3>
              <p className="text-deep-ink text-opacity-70 leading-relaxed">
                Each tier includes 1-3 revision rounds. That means you provide feedback, we iterate, until you're happy. Quality guaranteed.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-aether-deep-teal">How do I pay?</h3>
              <p className="text-deep-ink text-opacity-70 leading-relaxed">
                50% deposit to lock in your spot. 50% on delivery. Methods: Bank transfer, JazzCash, easypaisa, PayPal for international clients.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-aether-deep-teal">Do you offer rush services?</h3>
              <p className="text-deep-ink text-opacity-70 leading-relaxed">
                Yes. Requests within 5 days are flagged as rush. We can often accommodate them, but rush fees apply. Ask during intake.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-aether-deep-teal">What if I don't like the work?</h3>
              <p className="text-deep-ink text-opacity-70 leading-relaxed">
                We iterate within your tier's revision limit. If after those revisions you're not happy, we refund the remaining balance. No questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-sky-white">
        <div className="container-aether text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-aether-deep-teal font-bold text-4xl">Ready to Start?</h2>
            <p className="text-lg text-deep-ink text-opacity-70 max-w-2xl mx-auto">
              Pick your service. Choose your tier. Tell us what you need. We'll handle the rest.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/request"
              className="inline-flex items-center justify-center px-8 py-3 bg-aether-bright-cyan hover:bg-aether-sky-cyan text-aether-deep-ink font-bold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Request Service
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-aether-deep-teal text-aether-deep-teal hover:bg-aether-deep-teal hover:text-white font-bold rounded-lg transition-all duration-200 hover:scale-105"
            >
              Talk to Us First
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
