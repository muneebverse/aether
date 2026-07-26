'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Users, Zap, Clock, Layout, FileText, Presentation, UtensilsCrossed, Sparkle } from 'lucide-react';
import { LinkedinIcon } from '@/components/icons/BrandIcons';
import Reveal from '@/components/motion/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import Magnetic from '@/components/motion/Magnetic';

export type ServiceCard = {
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  priceRange: string | null;
  slug: string;
};

type IconComponent = (props: { size?: number; className?: string; strokeWidth?: number }) => React.ReactNode;

const CATEGORY_ICON: Record<string, IconComponent> = {
  portfolio: Layout,
  cv: FileText,
  presentation: Presentation,
  linkedin: LinkedinIcon,
  restaurant: UtensilsCrossed,
};

const processSteps = [
  {
    number: '01',
    title: 'You Choose Your Service & Tier',
    description: 'Browse our services and pick the tier that fits your budget and needs.',
  },
  {
    number: '02',
    title: 'Fill Out Intake Form',
    description: 'Share your background, target roles, projects, and preferred timeline with us.',
  },
  {
    number: '03',
    title: 'Secure Your Spot',
    description: 'Pay 50% deposit to lock in your project start date and timeline.',
  },
  {
    number: '04',
    title: 'We Build & Iterate',
    description: 'We create your work and you review — revision rounds included per tier.',
  },
  {
    number: '05',
    title: 'Delivery & Support',
    description: 'Final payment, download all files, and get 7-day support for tweaks.',
  },
];

const whyPoints = [
  'Direct collaboration — you work with me, not account managers',
  'Fast turnaround — 5-7 days standard, rush available',
  "Revisions included — 1-3 rounds per tier until it's right",
  'ATS-optimized — designed to pass screening systems',
  'Brand consistency — teal/cyan aesthetic across all work',
  'Strategic keywords — tailored to your field and target roles',
];

export default function ServicesPageClient({ services }: { services: ServiceCard[] }) {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-16 pb-20 sm:pt-20 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-aether-electric-teal/[0.05] to-transparent" />

        <div className="container-aether">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="font-display font-bold text-4xl sm:text-5xl mb-6 text-aether-deep-teal">
                We build your complete professional identity
              </h1>
              <p className="text-lg text-deep-ink/70 mb-8">
                Not templates. Not generic. Custom work built for you. Portfolios, CVs, presentations, LinkedIn — everything you need to stand out and get hired.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Magnetic strength={0.15}>
                  <Link href="/pricing" className="btn btn-primary">
                    View Pricing
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                </Magnetic>
                <Link href="/request" className="btn btn-secondary">
                  Request a Quote
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 sm:py-28 bg-sky-white">
        <div className="container-aether">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4 text-aether-deep-teal">What we do</h2>
              <p className="text-lg text-deep-ink/70 max-w-2xl mx-auto">
                Four core services. One goal: clarify your professional narrative and position you for roles that match your aspirations.
              </p>
            </div>
          </Reveal>

          {services.length === 0 && (
            <p className="text-center text-deep-ink/70">No active services yet — add some from the admin dashboard.</p>
          )}

          <StaggerGroup className="grid md:grid-cols-2 gap-8">
            {services.map((service, idx) => {
              const Icon = CATEGORY_ICON[service.category] || Sparkle;
              return (
                <StaggerItem key={service.slug || idx}>
                  <div className="card h-full hover:border-aether-bright-cyan/40 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 rounded-lg bg-aether-electric-teal/10 flex items-center justify-center mb-4">
                      <Icon size={22} className="text-aether-deep-teal" strokeWidth={1.75} />
                    </div>
                    {service.categoryLabel && (
                      <span className="inline-block bg-aether-electric-teal/10 text-aether-electric-teal px-3 py-1 rounded text-xs font-bold mb-3">
                        {service.categoryLabel}
                      </span>
                    )}
                    <h3 className="font-display font-bold text-xl mb-2 text-aether-deep-teal">{service.title}</h3>
                    <p className="text-deep-ink/70 mb-6">{service.description}</p>
                    {service.priceRange && (
                      <p className="flex gap-2 items-center text-sm mb-6">
                        <CheckCircle2 size={18} className="text-aether-bright-cyan shrink-0" />
                        <span className="text-deep-ink font-semibold">{service.priceRange}</span>
                      </p>
                    )}
                    <Link
                      href={`/pricing#service-${service.slug}`}
                      className="text-aether-electric-teal font-semibold hover:text-aether-bright-cyan transition-colors inline-flex items-center gap-2"
                    >
                      View Pricing <ArrowRight size={16} />
                    </Link>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-28 bg-aether-electric-teal/5">
        <div className="container-aether">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4 text-aether-deep-teal">How AETHER works</h2>
              <p className="text-lg text-deep-ink/70 max-w-2xl mx-auto">
                Five simple steps from idea to delivery. Direct, transparent, no surprises.
              </p>
            </div>
          </Reveal>

          <StaggerGroup className="grid md:grid-cols-5 gap-4 sm:gap-6">
            {processSteps.map((step) => (
              <StaggerItem key={step.number}>
                <div className="relative h-full">
                  <div className="relative bg-white rounded-lg border border-aether-electric-teal/20 p-6 text-center h-full">
                    <div className="w-12 h-12 rounded-full bg-aether-deep-teal flex items-center justify-center text-white font-display font-bold text-lg mx-auto mb-4">
                      {step.number}
                    </div>
                    <h3 className="font-display font-bold text-lg mb-2 text-aether-deep-teal">{step.title}</h3>
                    <p className="text-sm text-deep-ink/70">{step.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Why AETHER */}
      <section className="py-20 sm:py-28 bg-aether-deep-teal">
        <div className="container-aether">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-sky-white mb-6">
                  Why choose AETHER?
                </h2>
                <ul className="space-y-4">
                  {whyPoints.map((point) => (
                    <li key={point} className="flex gap-3 items-start">
                      <CheckCircle2 size={22} className="text-aether-bright-cyan shrink-0 mt-0.5" />
                      <span className="text-sky-white/90 text-base sm:text-lg">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex flex-col gap-4">
                <div className="glass rounded-lg p-6">
                  <Users size={28} className="text-aether-deep-teal mb-3" strokeWidth={1.75} />
                  <h3 className="font-display font-bold text-lg text-aether-deep-teal mb-2">For everyone</h3>
                  <p className="text-deep-ink/70">Recent grads, career changers, experienced professionals — we tailor work to your story.</p>
                </div>
                <div className="glass rounded-lg p-6">
                  <Zap size={28} className="text-aether-deep-teal mb-3" strokeWidth={1.75} />
                  <h3 className="font-display font-bold text-lg text-aether-deep-teal mb-2">Fast &amp; reliable</h3>
                  <p className="text-deep-ink/70">Fixed timelines, direct communication, deliverables you can download and own forever.</p>
                </div>
                <div className="glass rounded-lg p-6">
                  <Clock size={28} className="text-aether-deep-teal mb-3" strokeWidth={1.75} />
                  <h3 className="font-display font-bold text-lg text-aether-deep-teal mb-2">Post-delivery support</h3>
                  <p className="text-deep-ink/70">7-day support window for minor tweaks after delivery. You&apos;re never left stranded.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-sky-white">
        <div className="container-aether">
          <Reveal>
            <div className="bg-aether-deep-teal rounded-2xl p-12 sm:p-16 text-center overflow-hidden relative">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-aether-bright-cyan/15 rounded-full blur-3xl" />

              <div className="relative z-10">
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-sky-white mb-4">
                  Ready to elevate your professional presence?
                </h2>
                <p className="text-lg text-sky-white/85 max-w-2xl mx-auto mb-8">
                  Let&apos;s transform your application from invisible to unmissable. Check out our pricing and pick the service that fits your needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/pricing" className="btn btn-primary bg-aether-bright-cyan text-aether-deep-teal hover:bg-sky-white">
                    View Pricing
                  </Link>
                  <Link href="/request" className="btn btn-primary bg-sky-white text-aether-deep-teal hover:bg-aether-bright-cyan">
                    Request a Quote
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
