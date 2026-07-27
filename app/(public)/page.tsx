'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Zap, Users, TrendingUp, Sparkles, MessageCircle, Clock, ShieldCheck } from 'lucide-react';
import Faq from '@/components/Faq';
import HeroVisual from '@/components/HeroVisual';
import Reveal from '@/components/motion/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import Magnetic from '@/components/motion/Magnetic';

const benefits = [
  {
    icon: CheckCircle2,
    title: 'ATS Optimized',
    description: 'Perfectly formatted to pass applicant tracking systems and reach hiring managers.',
  },
  {
    icon: Zap,
    title: 'Career Clarity',
    description: 'Crystal-clear messaging that positions you for the roles you actually want.',
  },
  {
    icon: Users,
    title: 'Human-Centered',
    description: 'Crafted by someone who understands what hiring managers are actually screening for.',
  },
  {
    icon: TrendingUp,
    title: 'Results-Driven',
    description: 'Get more interviews, better conversations, and the offers you deserve.',
  },
];

// Honest, non-numeric trust pillars — no fabricated review counts or ratings
// until there's a real track record to point to.
const trustPillars = [
  {
    icon: MessageCircle,
    title: 'You work directly with me',
    description: 'No account managers, no outsourcing — every order is reviewed and delivered personally.',
  },
  {
    icon: Clock,
    title: '5-7 day turnaround',
    description: "Rush delivery available if you're on a deadline — just flag it in your request.",
  },
  {
    icon: ShieldCheck,
    title: "Revisions until it's right",
    description: "Every tier includes revision rounds, so you're never stuck with a first draft.",
  },
];

const services = [
  {
    title: 'Portfolio Websites',
    description: 'Custom Next.js sites that showcase your projects and convert visitors into interviews.',
  },
  {
    title: 'CV & Career Docs',
    description: 'ATS-optimized resumes with strategic keywords, built to pass screening and impress humans.',
  },
  {
    title: 'LinkedIn Optimization',
    description: 'Headline, summary, and experience section rewritten for recruiter visibility.',
  },
];

const faqs = [
  {
    id: '1',
    question: 'How does AETHER differ from other resume services?',
    answer: 'AETHER combines ATS expertise with human-centered design. We optimize for both algorithm and human reader, ensuring your resume gets past automated systems and resonates with hiring teams. Our approach strips away noise and amplifies your actual value.',
  },
  {
    id: '2',
    question: "What if I'm a recent graduate or changing careers?",
    answer: 'AETHER specializes in positioning career transitions and early-stage careers. We translate your skills, projects, and potential into language that hiring managers understand. Even without years of experience, we can make your profile compelling.',
  },
  {
    id: '3',
    question: 'How long does the process take?',
    answer: "Standard turnaround is 5-7 business days depending on the service and tier. Rush processing is available — just flag your timeline in the intake form. We maintain direct communication throughout, so you're never left wondering about progress.",
  },
  {
    id: '4',
    question: 'Do you guarantee job offers?',
    answer: "No service can guarantee job offers — that depends on many factors beyond your resume. What we guarantee is a professionally built, ATS-optimized deliverable and revision rounds until you're satisfied with it.",
  },
  {
    id: '5',
    question: 'Can you help with LinkedIn, cover letters, and portfolios?',
    answer: 'Yes. AETHER offers complete professional branding — LinkedIn optimization, portfolio websites, presentations, and CVs — designed to work together as one consistent professional identity.',
  },
  {
    id: '6',
    question: "What's included in the pricing?",
    answer: 'Each tier lists exactly what\'s included — number of revisions, turnaround time, and deliverable formats. See the pricing page for the full breakdown per service.',
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-20 lg:pb-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-aether-electric-teal/[0.04] to-transparent" />

        <div className="container-aether">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-aether-electric-teal/25 bg-aether-electric-teal/5 mb-6">
                  <Sparkles size={14} className="text-aether-bright-cyan" strokeWidth={1.75} />
                  <span className="text-sm font-medium text-aether-deep-teal">Built for engineers who want to be taken seriously</span>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="text-5xl lg:text-7xl font-display font-bold mb-6 text-aether-deep-teal">
                  Elevate to <span className="text-gradient">clarity</span>
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="text-lg text-deep-ink/70 mb-8 max-w-lg leading-relaxed">
                  Your application is your first impression. Portfolio, CV, LinkedIn, and presentations — built to get you past the filter and into the room.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Magnetic strength={0.15}>
                    <Link href="/request" className="btn btn-primary">
                      Get Started
                      <ArrowRight size={18} className="ml-2" />
                    </Link>
                  </Magnetic>
                  <Link href="/services" className="btn btn-secondary">
                    View Services
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={0.32}>
                <div className="flex flex-col gap-3 mt-12 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-success shrink-0" />
                    <span className="text-deep-ink">ATS-optimized to pass applicant tracking systems</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-success shrink-0" />
                    <span className="text-deep-ink">Direct 1:1 collaboration, revisions included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-success shrink-0" />
                    <span className="text-deep-ink">5-7 day turnaround, rush available</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Visual */}
            <div className="hidden lg:block">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-sky-white">
        <div className="container-aether">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-display font-bold text-4xl mb-4">Why choose AETHER?</h2>
              <p className="text-lg text-deep-ink/70 max-w-2xl mx-auto">
                We don&apos;t just update your resume. We clarify your professional narrative and position you for roles that match your aspirations.
              </p>
            </div>
          </Reveal>

          <StaggerGroup className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <StaggerItem key={benefit.title}>
                  <div className="card bg-white h-full">
                    <div className="mb-4 p-3 w-fit rounded-lg bg-aether-electric-teal/8 border border-aether-electric-teal/15">
                      <Icon size={26} className="text-aether-deep-teal" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-display font-bold text-lg mb-2 text-aether-deep-teal">{benefit.title}</h3>
                    <p className="text-deep-ink/70 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-aether-electric-teal/5">
        <div className="container-aether">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-display font-bold text-4xl mb-4">What working with us looks like</h2>
              <p className="text-lg text-deep-ink/70 max-w-2xl mx-auto">
                We&apos;re early on our journey and growing — here&apos;s exactly what you can expect.
              </p>
            </div>
          </Reveal>

          <StaggerGroup className="grid md:grid-cols-3 gap-8">
            {trustPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <StaggerItem key={pillar.title}>
                  <div className="card bg-white text-center h-full">
                    <div className="mb-4 p-3 w-fit mx-auto rounded-lg bg-aether-electric-teal/8 border border-aether-electric-teal/15">
                      <Icon size={24} className="text-aether-deep-teal" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-display font-bold text-lg mb-2 text-aether-deep-teal">{pillar.title}</h3>
                    <p className="text-deep-ink/70 text-sm leading-relaxed">{pillar.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-aether-deep-teal">
        <div className="container-aether">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-display font-bold text-4xl text-sky-white mb-4">Our services</h2>
              <p className="text-lg text-sky-white/80 max-w-2xl mx-auto">
                Everything you need to stand out and get hired.
              </p>
            </div>
          </Reveal>

          <StaggerGroup className="grid md:grid-cols-3 gap-6">
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <div className="glass rounded-2xl p-8 h-full flex flex-col hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="font-display font-bold text-xl mb-3 text-aether-deep-teal">
                    {service.title}
                  </h3>
                  <p className="text-deep-ink/70 mb-6 flex-grow">
                    {service.description}
                  </p>
                  <Link href="/services" className="text-aether-deep-teal font-semibold hover:text-aether-electric-teal transition-colors inline-flex items-center gap-2 group w-fit">
                    Learn More
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.15}>
            <div className="text-center mt-12">
              <Link href="/services" className="btn btn-primary bg-sky-white text-aether-deep-teal hover:bg-aether-bright-cyan hover:text-aether-deep-teal">
                Explore All Services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-sky-white">
        <div className="container-aether">
          <Reveal>
            <div className="relative bg-aether-deep-teal rounded-2xl p-12 text-center overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-aether-bright-cyan/15 rounded-full blur-3xl" />

              <div className="relative z-10">
                <h2 className="font-display font-bold text-4xl text-sky-white mb-4">Ready to transform your career?</h2>
                <p className="text-lg text-sky-white/85 max-w-2xl mx-auto mb-8">
                  Your next opportunity is waiting. Let&apos;s make sure your application gets you there.
                </p>
                <Magnetic strength={0.15}>
                  <Link href="/request" className="btn btn-primary bg-aether-bright-cyan text-aether-deep-teal hover:bg-sky-white">
                    Start Your Journey Today
                  </Link>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-sky-white">
        <div className="container-aether">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-display font-bold text-4xl mb-4">Frequently asked questions</h2>
              <p className="text-lg text-deep-ink/70">Have questions? We&apos;ve got answers.</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="max-w-3xl mx-auto">
              <Faq faqs={faqs} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
