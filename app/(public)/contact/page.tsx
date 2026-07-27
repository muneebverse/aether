'use client';

import { useState } from 'react';
import { Mail, MessageCircle, Clock } from 'lucide-react';
import RequestForm from '@/components/RequestForm';
import { SOCIAL_LINKS } from '@/lib/social-links';
import Reveal from '@/components/motion/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';

const contactItems = [
  {
    icon: Mail,
    label: 'Email',
    value: SOCIAL_LINKS.email.url.replace('mailto:', ''),
    href: SOCIAL_LINKS.email.url,
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Message us directly',
    href: SOCIAL_LINKS.whatsapp.url,
  },
];

const quickFaqs = [
  {
    q: 'How quickly can you start?',
    a: 'We typically begin within 24 hours of your request. Rush options are available for expedited turnaround.',
  },
  {
    q: "What if I'm not ready to decide yet?",
    a: "No pressure. Send us a message and we'll walk you through your options with no commitment.",
  },
  {
    q: 'Can I upgrade or add services later?',
    a: "Absolutely. Add services anytime and we'll work out the difference. We'll integrate it seamlessly.",
  },
  {
    q: 'Do you work with international clients?',
    a: 'Yes — we work with clients and candidates worldwide and adapt our services for different markets.',
  },
];

export default function Contact() {
  const [orderId, setOrderId] = useState<string | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="bg-aether-electric-teal text-sky-white py-16 lg:py-24">
        <div className="container-aether text-center">
          <Reveal>
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4 text-sky-white">Get In Touch</h1>
            <p className="text-lg text-sky-white/90 max-w-2xl mx-auto">
              Ready to elevate your career? Let&apos;s talk about your goals and how AETHER can help.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="container-aether">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <Reveal className="space-y-8">
              <div>
                <h2 className="font-display font-bold text-2xl mb-8 text-aether-deep-teal">Contact Information</h2>
              </div>

              {contactItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Icon size={24} className="text-aether-bright-cyan" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-deep-ink/70 text-sm mb-1">{item.label}</p>
                      <a
                        href={item.href}
                        className="font-semibold text-aether-electric-teal hover:text-aether-bright-cyan transition-colors"
                      >
                        {item.value}
                      </a>
                    </div>
                  </div>
                );
              })}

              <div className="card bg-aether-electric-teal/10 border-aether-electric-teal">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={16} className="text-aether-electric-teal" />
                  <span className="font-semibold text-sm text-deep-ink">Response Time</span>
                </div>
                <p className="text-sm text-deep-ink/70">
                  Usually within 24 hours. We read every message and respond personally to every inquiry.
                </p>
              </div>

              <div className="text-sm text-deep-ink/60">
                Already submitted a request?{' '}
                <a href="/track" className="text-aether-electric-teal font-semibold hover:underline">
                  Track your order status
                </a>
              </div>
            </Reveal>

            {/* Contact Form */}
            <Reveal delay={0.1} className="lg:col-span-2">
              <div className="card bg-white">
                {orderId ? (
                  <div className="text-center space-y-4 py-8">
                    <h3 className="font-display font-bold text-2xl text-aether-deep-teal">Thank you!</h3>
                    <p className="text-deep-ink/70">
                      Your request has been received. Save your tracking code to check status anytime:
                    </p>
                    <div className="inline-block bg-sky-white border border-aether-electric-teal/20 rounded-lg px-4 py-2 font-mono text-lg font-bold tracking-wider text-deep-ink">
                      {orderId}
                    </div>
                    <div>
                      <a href={`/track?order_id=${orderId}`} className="btn btn-primary">
                        Track Order Status
                      </a>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="font-display font-bold text-2xl mb-8 text-aether-deep-teal">Send us a message</h2>
                    <RequestForm onSuccess={setOrderId} />
                  </>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-aether-electric-teal/5 py-24">
        <div className="container-aether">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-display font-bold text-4xl mb-4 text-aether-deep-teal">Quick Answers</h2>
              <p className="text-lg text-deep-ink/70">Common questions about working with AETHER.</p>
            </div>
          </Reveal>

          <StaggerGroup className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {quickFaqs.map((item) => (
              <StaggerItem key={item.q}>
                <div className="card bg-white h-full">
                  <h3 className="font-display font-bold text-lg mb-2 text-aether-electric-teal">{item.q}</h3>
                  <p className="text-deep-ink/70 text-sm">{item.a}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
