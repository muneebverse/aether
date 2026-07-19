'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-aether-deep-teal via-aether-electric-teal to-aether-bright-cyan overflow-hidden flex items-center justify-center">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-aether-bright-cyan rounded-full mix-blend-multiply filter blur-3xl opacity-20 morph-blob animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-aether-sky-cyan rounded-full mix-blend-multiply filter blur-3xl opacity-20 morph-blob animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-aether-electric-teal rounded-full mix-blend-multiply filter blur-3xl opacity-10 morph-blob animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-aether text-center space-y-8 py-20">
        {/* Eyebrow */}
        <div className="inline-block">
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full glass">
            <Sparkles size={16} className="text-aether-bright-cyan" />
            <span className="text-sm font-semibold text-aether-sky-white">Transform Your Professional Presence</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-aether-sky-white font-bold leading-tight animate-in fade-in slide-in-from-down-6 duration-1000">
          Elevate to <span className="text-aether-bright-cyan">Clarity</span>
        </h1>

        {/* Subheading */}
        <p className="max-w-2xl mx-auto text-lg text-aether-sky-white text-opacity-90 leading-relaxed animate-in fade-in slide-in-from-down-8 duration-1000" style={{ animationDelay: '200ms' }}>
          Custom portfolios, ATS-optimized CVs, professional presentations, and LinkedIn optimization. Not templates. Not generic. Built for engineers who demand clarity.
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto py-8 animate-in fade-in slide-in-from-down-10 duration-1000" style={{ animationDelay: '400ms' }}>
          <div className="glass rounded-2xl p-4">
            <div className="text-2xl font-bold text-aether-bright-cyan">4+</div>
            <div className="text-sm text-aether-sky-white text-opacity-70">Service Types</div>
          </div>
          <div className="glass rounded-2xl p-4">
            <div className="text-2xl font-bold text-aether-bright-cyan">7-28d</div>
            <div className="text-sm text-aether-sky-white text-opacity-70">Quick Turnaround</div>
          </div>
          <div className="glass rounded-2xl p-4">
            <div className="text-2xl font-bold text-aether-bright-cyan">100%</div>
            <div className="text-sm text-aether-sky-white text-opacity-70">Custom Work</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-in fade-in slide-in-from-down-12 duration-1000" style={{ animationDelay: '600ms' }}>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-aether-bright-cyan hover:bg-aether-sky-cyan text-aether-deep-ink font-bold rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-2xl shadow-lg"
          >
            Explore Services
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white bg-opacity-10 hover:bg-opacity-20 text-aether-sky-white font-bold rounded-lg border border-aether-sky-white border-opacity-30 transition-all duration-200 hover:scale-105"
          >
            Start Now
          </Link>
        </div>

        {/* Trust Badge */}
        <p className="text-sm text-aether-sky-white text-opacity-70 pt-8 animate-in fade-in duration-1000" style={{ animationDelay: '800ms' }}>
          Trusted by engineers and professionals across Pakistan
        </p>
      </div>

      {/* Floating Elements (Accent) */}
      <div className="absolute top-1/4 left-5 w-16 h-16 border-2 border-aether-bright-cyan border-opacity-30 rounded-full floating"></div>
      <div className="absolute bottom-1/3 right-8 w-12 h-12 border-2 border-aether-sky-cyan border-opacity-20 rounded-full floating" style={{ animationDelay: '1s' }}></div>
    </div>
  );
}
