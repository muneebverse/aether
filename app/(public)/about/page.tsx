'use client';

import Link from 'next/link';
import { Target, Award, Heart, ArrowRight } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import Magnetic from '@/components/motion/Magnetic';

const values = [
  {
    icon: Target,
    title: 'Clarity First',
    description: 'We strip away noise and focus on what truly matters: your unique value and career direction.',
  },
  {
    icon: Award,
    title: 'Excellence Always',
    description: 'Every resume, every profile, every session is crafted with meticulous attention to detail and impact.',
  },
  {
    icon: Heart,
    title: 'Human-Centered',
    description: 'Behind every client is a person with dreams. We honor that by treating your career like our own.',
  },
];

const facts = [
  { stat: 'Direct', label: '1:1 with your specialist' },
  { stat: '5-7d', label: 'Standard turnaround' },
  { stat: 'ATS', label: 'Tested before delivery' },
  { stat: '100%', label: "Revisions until you're happy" },
];

export default function About() {
  return (
    <>
      {/* Hero — solid brand gradient, no missing/broken photo dependency */}
      <section className="relative text-white py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-aether-deep-teal to-aether-electric-teal">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-aether-bright-cyan/20 rounded-full blur-3xl" />
        <div className="container-aether text-center relative z-10">
          <Reveal>
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4">About AETHER</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              We believe in the power of clarity. When you know who you are and what you want, the right opportunities follow.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="container-aether">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div>
                <h2 className="font-display font-bold text-4xl mb-6 text-aether-deep-teal">Our Story</h2>
                <p className="text-deep-ink/70 mb-4 leading-relaxed">
                  AETHER was born from a simple observation: talented people were getting rejected before hiring managers ever saw their true value. Their resumes didn&apos;t pass ATS systems. Their LinkedIn profiles were invisible. Their professional narrative was unclear.
                </p>
                <p className="text-deep-ink/70 mb-4 leading-relaxed">
                  We realized the problem wasn&apos;t the people — it was their positioning. So we built AETHER: a service that combines ATS expertise, strategic thinking, and human insight to transform professional applications.
                </p>
                <p className="text-deep-ink/70 leading-relaxed">
                  We&apos;re just getting started, and every order gets the same thing: direct, hands-on attention rather than a template pulled off a shelf. This is our mission — to elevate your professional presence and clarify your path forward.
                </p>
              </div>
            </Reveal>

            <StaggerGroup className="grid grid-cols-2 gap-6">
              {facts.map((item) => (
                <StaggerItem key={item.stat}>
                  <div className="card bg-aether-deep-teal text-white text-center h-full flex flex-col justify-center">
                    <p className="text-3xl font-display font-bold mb-2">{item.stat}</p>
                    <p className="text-sm font-medium text-white/85">{item.label}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-aether-electric-teal/5 py-24">
        <div className="container-aether">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-display font-bold text-4xl mb-4 text-aether-deep-teal">Our Values</h2>
              <p className="text-lg text-deep-ink/70">
                These principles guide every decision we make and every client we serve.
              </p>
            </div>
          </Reveal>

          <StaggerGroup className="grid md:grid-cols-3 gap-8">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <StaggerItem key={value.title}>
                  <div className="card bg-white h-full">
                    <div className="mb-4 p-3 w-fit rounded-lg bg-aether-electric-teal/8 border border-aether-electric-teal/15">
                      <Icon size={26} className="text-aether-deep-teal" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-display font-bold text-xl mb-3 text-aether-deep-teal">{value.title}</h3>
                    <p className="text-deep-ink/70">{value.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* Founder — honest single-founder framing, kept as-is in substance */}
      <section className="py-24">
        <div className="container-aether">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-display font-bold text-4xl mb-4 text-aether-deep-teal">Who&apos;s Behind AETHER</h2>
              <p className="text-lg text-deep-ink/70 max-w-2xl mx-auto">
                AETHER is founded and run by a mechanical engineering student who understands exactly what it&apos;s like to be on the other side of a job application — because I&apos;m applying for internships and roles myself.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="max-w-xl mx-auto card text-center">
              <div className="w-24 h-24 bg-aether-deep-teal rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-sky-white font-display font-bold text-2xl">A</span>
              </div>
              <h3 className="font-display font-bold text-xl mb-1 text-aether-deep-teal">Founder &amp; Career Strategist</h3>
              <p className="text-aether-electric-teal text-sm font-semibold mb-4">Every order, personally reviewed</p>
              <p className="text-deep-ink/70 text-sm">
                No account managers, no outsourcing to a team you&apos;ll never meet. When you work with AETHER, you work directly with the person building your resume, portfolio, or presentation.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-deep-ink text-sky-white py-24">
        <div className="container-aether text-center">
          <Reveal>
            <h2 className="font-display font-bold text-4xl mb-6">Our Mission</h2>
            <p className="text-lg text-sky-white/90 max-w-3xl mx-auto leading-relaxed">
              To transform how professionals present themselves to the world. We empower people to gain clarity about their careers, position themselves compellingly, and achieve the roles and opportunities they truly deserve.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container-aether text-center">
          <Reveal>
            <h2 className="font-display font-bold text-4xl mb-4 text-aether-deep-teal">Ready to Get Started?</h2>
            <p className="text-lg text-deep-ink/70 max-w-2xl mx-auto mb-8">
              Let&apos;s clarify your path and elevate your career together.
            </p>
            <Magnetic strength={0.15}>
              <Link href="/request" className="btn btn-primary">
                Start Your Journey
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </>
  );
}
