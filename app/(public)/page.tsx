'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Zap, Users, TrendingUp, Sparkles } from 'lucide-react';
import Faq from '@/components/Faq';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const benefits = [
    {
      icon: <CheckCircle2 className="text-aether-bright-cyan" size={32} />,
      title: 'ATS Optimized',
      description: 'Perfectly formatted to pass applicant tracking systems and reach hiring managers.',
    },
    {
      icon: <Zap className="text-aether-bright-cyan" size={32} />,
      title: 'Career Clarity',
      description: 'Crystal-clear messaging that positions you for the roles you actually want.',
    },
    {
      icon: <Users className="text-aether-bright-cyan" size={32} />,
      title: 'Human-Centered',
      description: 'Crafted by professionals who understand what hiring managers seek.',
    },
    {
      icon: <TrendingUp className="text-aether-bright-cyan" size={32} />,
      title: 'Results-Driven',
      description: 'Get more interviews, better conversations, and the job offers you deserve.',
    },
  ];

  const faqs = [
    {
      id: '1',
      question: 'How does AETHER differ from other resume services?',
      answer: 'AETHER combines ATS expertise with human-centered design. We optimize for both algorithm and human reader, ensuring your resume gets past automated systems and resonates with hiring teams. Our tagline "Elevate to Clarity" isn\'t just marketing—it\'s our methodology. We strip away noise and amplify your value.',
    },
    {
      id: '2',
      question: 'What if I\'m a recent graduate or changing careers?',
      answer: 'AETHER specializes in positioning career transitions and early-stage careers. We translate your skills, projects, and potential into language that hiring managers understand. Even without years of experience, we can make your profile compelling.',
    },
    {
      id: '3',
      question: 'How long does the process take?',
      answer: 'Standard optimization takes 5-7 business days. Rush processing is available. We maintain direct communication throughout, so you\'re never left wondering about progress.',
    },
    {
      id: '4',
      question: 'Do you guarantee job offers?',
      answer: 'No service can guarantee job offers—that depends on many factors beyond your resume. However, we guarantee improved interview request rates or your money back. Most clients see 30-50% more interviews within 60 days.',
    },
    {
      id: '5',
      question: 'Can you help with LinkedIn, cover letters, and portfolios?',
      answer: 'Yes! AETHER offers complete professional branding. We optimize LinkedIn profiles, craft tailored cover letters, and build portfolio strategies. Everything works together to create a cohesive professional identity.',
    },
    {
      id: '6',
      question: 'What\'s included in the pricing?',
      answer: 'Each tier includes resume optimization, format adjustment, ATS compatibility testing, and a strategy session. Premium tiers add LinkedIn optimization, cover letter writing, and ongoing support. See our pricing page for full details.',
    },
  ];

  return (
    <>
      {/* Hero Section with Animated Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-sky-white pt-20">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-aether-electric-teal rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-aether-bright-cyan rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-aether-sky-cyan rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Animated Background Grid */}
        <div className="absolute inset-0 -z-10 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(0, 188, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 188, 212, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="container-aether w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              {/* Badge */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-aether-electric-teal border-opacity-30 bg-aether-electric-teal bg-opacity-5 mb-6 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
                <Sparkles size={16} className="text-aether-bright-cyan" />
                <span className="text-sm font-500 text-aether-deep-teal">Transform Your Professional Identity</span>
              </div>

              {/* Main Heading */}
              <h1 className={`text-5xl lg:text-7xl font-display font-bold mb-6 leading-tight text-gradient ${isLoaded ? 'animate-fade-in-up animate-delay-100' : 'opacity-0'}`}>
                Elevate to Clarity
              </h1>

              {/* Subheading */}
              <p className={`text-lg text-deep-ink text-opacity-70 mb-8 max-w-lg leading-relaxed ${isLoaded ? 'animate-fade-in-up animate-delay-200' : 'opacity-0'}`}>
                Transform your professional application from invisible to unmissable. Your resume is your first impression. Let's make it count—ATS optimized, visually stunning, and strategically positioned.
              </p>

              {/* CTA Buttons */}
              <div className={`flex flex-col sm:flex-row gap-4 ${isLoaded ? 'animate-fade-in-up animate-delay-300' : 'opacity-0'}`}>
                <Link href="/services" className="btn btn-primary">
                  Get Started
                  <ArrowRight size={18} className="ml-2" />
                </Link>
                <Link href="/about" className="btn btn-secondary">
                  Learn More
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className={`flex flex-col gap-3 mt-12 text-sm ${isLoaded ? 'animate-fade-in-up animate-delay-400' : 'opacity-0'}`}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-success" />
                  <span className="text-deep-ink">ATS-optimized for 100+ applicant tracking systems</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-success" />
                  <span className="text-deep-ink">30-50% more interview requests (guaranteed or money back)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-success" />
                  <span className="text-deep-ink">Human-centered design + strategic keyword optimization</span>
                </div>
              </div>
            </div>

            {/* Right Visual - Animated Card */}
            <div className={`hidden lg:block ${isLoaded ? 'animate-fade-in-down' : 'opacity-0'}`}>
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-aether-electric-teal via-aether-bright-cyan to-aether-sky-cyan rounded-2xl blur-2xl opacity-30 animate-gradient-shift"></div>

                {/* Card */}
                <div className="relative bg-sky-white rounded-2xl p-8 border border-aether-electric-teal border-opacity-20">
                  {/* Animated Heading Pill */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aether-bright-cyan bg-opacity-10 border border-aether-bright-cyan border-opacity-30 mb-6">
                    <div className="w-2 h-2 bg-aether-bright-cyan rounded-full animate-pulse"></div>
                    <span className="text-xs font-600 text-aether-electric-teal uppercase">Live on 1000+ profiles</span>
                  </div>

                  {/* Preview Content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-display font-bold text-2xl text-aether-deep-teal mb-2">Your Resume, Evolved</h3>
                      <p className="text-deep-ink text-opacity-60 text-sm leading-relaxed">
                        Strategic keywords, human-centered design, and ATS compatibility in one powerful package.
                      </p>
                    </div>

                    {/* Stat Pills */}
                    <div className="grid grid-cols-2 gap-3 pt-4">
                      <div className="bg-aether-electric-teal bg-opacity-5 rounded-lg p-3 border border-aether-electric-teal border-opacity-10">
                        <div className="text-2xl font-display font-bold text-aether-electric-teal">98%</div>
                        <div className="text-xs text-deep-ink text-opacity-60">ATS Pass Rate</div>
                      </div>
                      <div className="bg-aether-bright-cyan bg-opacity-5 rounded-lg p-3 border border-aether-bright-cyan border-opacity-10">
                        <div className="text-2xl font-display font-bold text-aether-bright-cyan">5-7 days</div>
                        <div className="text-xs text-deep-ink text-opacity-60">Turnaround Time</div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-aether-bright-cyan to-aether-sky-cyan rounded-full opacity-20 blur-xl animate-float"></div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-tr from-aether-electric-teal to-aether-bright-cyan rounded-full opacity-15 blur-lg animate-float animate-delay-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 section-spacing bg-sky-white">
        <div className="container-aether">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl mb-4">Why Choose AETHER?</h2>
            <p className="text-lg text-deep-ink text-opacity-70 max-w-2xl mx-auto">
              We don't just update your resume. We clarify your professional narrative and position you for roles that match your aspirations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <div 
                key={idx} 
                className={`card bg-white ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${(idx + 5) * 100}ms` }}
              >
                <div className="mb-4 p-3 w-fit rounded-lg bg-aether-bright-cyan bg-opacity-10 border border-aether-bright-cyan border-opacity-20">
                  {benefit.icon}
                </div>
                <h3 className="font-display font-bold text-lg mb-2 text-aether-deep-teal">{benefit.title}</h3>
                <p className="text-deep-ink text-opacity-70 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="bg-gradient-to-br from-aether-deep-teal from-0% via-aether-electric-teal via-50% to-aether-bright-cyan to-100% py-24">
        <div className="container-aether">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl text-sky-white mb-4">Our Services</h2>
            <p className="text-lg text-sky-white text-opacity-90 max-w-2xl mx-auto">
              Everything you need to stand out and get hired.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Resume Optimization',
                description: 'Complete rewrite with ATS compatibility, keyword optimization, and impact-driven bullet points.',
              },
              {
                title: 'LinkedIn Branding',
                description: 'Profile optimization, headline crafting, and professional positioning for recruiter visibility.',
              },
              {
                title: 'Career Strategy',
                description: 'One-on-one sessions to clarify your career goals and align your professional brand.',
              },
            ].map((service, idx) => (
              <div 
                key={idx} 
                className={`bg-sky-white bg-opacity-10 backdrop-blur-md rounded-xl p-8 border border-sky-white border-opacity-20 hover:border-opacity-40 transition-all ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${(idx + 8) * 100}ms` }}
              >
                <h3 className="font-display font-bold text-xl mb-3 text-sky-white">
                  {service.title}
                </h3>
                <p className="text-sky-white text-opacity-90 mb-4">
                  {service.description}
                </p>
                <Link href="/services" className="text-sky-white font-500 hover:text-aether-bright-cyan transition-colors inline-flex items-center gap-2 group">
                  Learn More 
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="btn btn-primary bg-sky-white text-aether-deep-teal hover:bg-aether-bright-cyan hover:text-aether-deep-teal">
              Explore All Services
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-sky-white">
        <div className="container-aether">
          <div className="relative bg-gradient-to-br from-aether-deep-teal to-aether-electric-teal rounded-2xl p-12 text-center overflow-hidden">
            {/* Background Elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-aether-bright-cyan rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-aether-sky-cyan rounded-full opacity-20 blur-3xl"></div>

            {/* Content */}
            <div className="relative z-10">
              <h2 className="font-display font-bold text-4xl text-sky-white mb-4">Ready to Transform Your Career?</h2>
              <p className="text-lg text-sky-white text-opacity-90 max-w-2xl mx-auto mb-8">
                Your next opportunity is waiting. Let's make sure your application gets you there.
              </p>
              <Link href="/contact" className="btn btn-primary bg-aether-bright-cyan text-aether-deep-teal hover:bg-sky-white">
                Start Your Journey Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 section-spacing bg-sky-white">
        <div className="container-aether">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-deep-ink text-opacity-70">
              Have questions? We've got answers.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Faq faqs={faqs} />
          </div>
        </div>
      </section>

      {/* Blob Animation Styles */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
}
