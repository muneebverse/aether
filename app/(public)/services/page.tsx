'use client';

import Link from 'next/link';
import { Check, Zap } from 'lucide-react';

interface ServiceTier {
  name: string;
  price: string;
  features: string[];
  timeline: string;
  cta: string;
  highlighted?: boolean;
}

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  tiers: ServiceTier[];
}

const SERVICES: Service[] = [
  {
    id: 'portfolio',
    icon: '🎨',
    title: 'Portfolio & Website',
    description: 'Next.js-powered portfolio websites that showcase your work and convert visitors into opportunities.',
    tiers: [
      {
        name: 'LAUNCH',
        price: '5,999 PKR',
        timeline: '7-14 days',
        features: ['4-page portfolio', '3-5 projects', 'Mobile-responsive', '1 revision'],
        cta: 'Get Started',
      },
      {
        name: 'AMPLIFY',
        price: '9,999 PKR',
        timeline: '14-21 days',
        features: ['Everything in LAUNCH', 'Testimonials', 'Blog setup', 'SEO basics', '2 revisions'],
        cta: 'Upgrade',
        highlighted: true,
      },
      {
        name: 'DOMINATE',
        price: '17,999 PKR',
        timeline: '21-28 days',
        features: ['Everything in AMPLIFY', '3-5 blog posts', 'Advanced SEO', 'Analytics', 'Email capture', '3 revisions'],
        cta: 'Go Pro',
      },
    ],
  },
  {
    id: 'cv',
    icon: '📄',
    title: 'CV & Career Documents',
    description: 'ATS-optimized CVs with modern design. Your CV gets 6 seconds—we make them count.',
    tiers: [
      {
        name: 'GET NOTICED',
        price: '1,999 PKR',
        timeline: '3-5 days',
        features: ['1-page ATS-optimized CV', 'Keyword audit', 'Modern design', 'PDF + DOCX', '1 revision'],
        cta: 'Order Now',
      },
      {
        name: 'STAND OUT',
        price: '4,999 PKR',
        timeline: '4-6 days',
        features: ['Everything in GET NOTICED', '3 tailored versions', 'Advanced keywords', 'LinkedIn headline', '2 revisions'],
        cta: 'Upgrade',
        highlighted: true,
      },
      {
        name: 'OWN IT',
        price: '7,999 PKR',
        timeline: '5-7 days',
        features: ['Everything in STAND OUT', 'Visual CV summary', 'Cover letter', '15 company leads', 'Full LinkedIn strategy', '3 revisions'],
        cta: 'Go Premium',
      },
    ],
  },
  {
    id: 'presentations',
    icon: '🎬',
    title: 'Presentations & Slide Decks',
    description: 'Professional presentations that impress. Strategic flow, modern design, delivery confidence.',
    tiers: [
      {
        name: 'IMPRESS',
        price: '999 PKR',
        timeline: '3-5 days',
        features: ['5-10 slides', 'Content + design', 'Modern template design', 'PowerPoint/Google Slides', '1 revision'],
        cta: 'Order Now',
      },
      {
        name: 'CAPTIVATE',
        price: '2,999 PKR',
        timeline: '3-5 days',
        features: ['10-15 slides', 'Advanced design', 'Data visualization', 'Speaker notes', '2 revisions'],
        cta: 'Upgrade',
        highlighted: true,
      },
      {
        name: 'COMMAND',
        price: '3,999 PKR',
        timeline: '3-5 days',
        features: ['15-20 slides', 'Luxury design', 'Animations', 'Full strategy', 'Delivery coaching', '3 revisions'],
        cta: 'Go Luxury',
      },
    ],
  },
  {
    id: 'linkedin',
    icon: '💼',
    title: 'LinkedIn Optimization',
    description: 'Optimize your professional identity for discoverability, credibility, and opportunities.',
    tiers: [
      {
        name: 'PROFILE BOOST',
        price: '1,499 PKR',
        timeline: '2-3 days',
        features: [
          'Headline rewrite (ATS-friendly)',
          'Professional summary optimization',
          'Experience restructure',
          'Skills optimization',
          'Photo + banner alignment',
          'Copy-paste ready',
        ],
        cta: 'Get Optimized',
        highlighted: true,
      },
    ],
  },
];

const BUNDLES = [
  {
    name: 'STARTUP BUNDLE',
    savings: 'Save 999 PKR',
    price: '6,999 PKR',
    services: ['LAUNCH Portfolio', 'GET NOTICED CV'],
    color: 'from-aether-electric-teal to-aether-sky-cyan',
  },
  {
    name: 'PROFESSIONAL BUNDLE',
    savings: 'Save 1,998 PKR',
    price: '13,999 PKR',
    services: ['AMPLIFY Portfolio', 'STAND OUT CV'],
    color: 'from-aether-sky-cyan to-aether-bright-cyan',
  },
  {
    name: 'COMPLETE PRESENCE BUNDLE',
    savings: 'Save 7,994 PKR',
    price: '24,999 PKR',
    services: ['DOMINATE Portfolio', 'OWN IT CV', 'LinkedIn Optimization'],
    color: 'from-aether-bright-cyan to-aether-electric-teal',
  },
  {
    name: 'ALL-IN BUNDLE',
    savings: 'Save 10,494 PKR',
    price: '28,999 PKR',
    services: ['DOMINATE Portfolio', 'OWN IT CV', 'COMMAND Presentation', 'LinkedIn Optimization'],
    color: 'from-aether-deep-teal to-aether-bright-cyan',
  },
];

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="text-5xl">{service.icon}</div>
        <h3 className="text-2xl font-bold text-aether-deep-teal">{service.title}</h3>
        <p className="text-deep-ink text-opacity-70 text-sm leading-relaxed">{service.description}</p>
      </div>

      <div className="space-y-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {service.tiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative rounded-2xl p-6 border-2 transition-all duration-300 ${
              tier.highlighted
                ? 'bg-gradient-to-br from-aether-electric-teal to-aether-sky-cyan border-aether-bright-cyan shadow-lg scale-105'
                : 'bg-white border-aether-electric-teal border-opacity-20 hover:border-opacity-100'
            }`}
          >
            {tier.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-aether-bright-cyan text-aether-deep-ink text-xs font-bold rounded-full whitespace-nowrap">
                Most Popular
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h4 className={`text-lg font-bold ${tier.highlighted ? 'text-white' : 'text-aether-deep-teal'}`}>
                  {tier.name}
                </h4>
                <div className={`text-3xl font-bold mt-2 ${tier.highlighted ? 'text-white' : 'text-aether-electric-teal'}`}>
                  {tier.price}
                </div>
                <p className={`text-xs mt-2 ${tier.highlighted ? 'text-white text-opacity-80' : 'text-neutral'}`}>
                  Timeline: {tier.timeline}
                </p>
              </div>

              <div className="space-y-2">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex gap-2 items-start">
                    <Check size={16} className={`mt-0.5 flex-shrink-0 ${tier.highlighted ? 'text-white' : 'text-aether-bright-cyan'}`} />
                    <span className={`text-sm ${tier.highlighted ? 'text-white' : 'text-deep-ink text-opacity-80'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href={`/request?service=${service.title}&tier=${tier.name}`}
                className={`block text-center py-2.5 font-bold rounded-lg transition-all duration-200 ${
                  tier.highlighted
                    ? 'bg-white text-aether-deep-teal hover:bg-aether-sky-white hover:scale-105'
                    : 'bg-aether-electric-teal text-white hover:bg-aether-deep-teal hover:scale-105'
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <div className="bg-sky-white py-16 sm:py-24">
      <div className="container-aether">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="eyebrow">OUR SERVICES</div>
          <h2 className="text-aether-deep-teal font-bold">Choose Your Path to Growth</h2>
          <p className="text-deep-ink text-opacity-70 leading-relaxed">
            Four core services, three tiers each, designed for engineers at every career stage. Pick your service, choose your tier, level up.
          </p>
        </div>

        {/* Services Grid */}
        <div className="space-y-16">
          {SERVICES.map((service) => (
            <div key={service.id}>
              <ServiceCard service={service} />
            </div>
          ))}
        </div>

        {/* Bundles Section */}
        <div className="mt-24 space-y-8">
          <div className="text-center space-y-4">
            <div className="eyebrow">SAVE MORE WITH BUNDLES</div>
            <h3 className="text-3xl font-bold text-aether-deep-teal">Complete Packages, Maximum Savings</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BUNDLES.map((bundle) => (
              <div
                key={bundle.name}
                className={`relative rounded-2xl bg-gradient-to-br ${bundle.color} p-8 text-white overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105`}
              >
                <div className="absolute inset-0 opacity-10 mix-blend-overlay">
                  <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl"></div>
                </div>

                <div className="relative space-y-4">
                  <div className="flex items-start justify-between">
                    <h4 className="text-lg font-bold flex-1">{bundle.name}</h4>
                    <span className="bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-2">
                      {bundle.savings}
                    </span>
                  </div>

                  <div className="text-4xl font-bold">{bundle.price}</div>

                  <ul className="space-y-2 text-sm text-opacity-90">
                    {bundle.services.map((service) => (
                      <li key={service} className="flex gap-2 items-start">
                        <Zap size={16} className="mt-0.5 flex-shrink-0" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/request?bundle=${bundle.name}`}
                    className="block mt-6 py-2.5 px-4 bg-white text-aether-deep-ink font-bold rounded-lg text-center hover:bg-opacity-90 transition-all duration-200 hover:scale-105"
                  >
                    Get This Bundle
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center space-y-6">
          <p className="text-deep-ink text-opacity-70 max-w-xl mx-auto">
            Still deciding? Talk to us first. No pressure, just clarity.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-aether-deep-teal hover:bg-aether-electric-teal text-white font-bold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
          >
            Schedule a Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
