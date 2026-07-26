'use client';

import { motion, useReducedMotion } from 'motion/react';
import { FileText, Layout, Presentation } from 'lucide-react';
import { LinkedinIcon } from '@/components/icons/BrandIcons';
import { EASE_OUT } from '@/lib/motion-easing';

const CARDS = [
  { icon: Layout, label: 'Portfolio', sub: 'Next.js site', x: '4%', y: '6%', rotate: -4, delay: 0.1 },
  { icon: FileText, label: 'CV', sub: 'ATS-optimized', x: '46%', y: '0%', rotate: 3, delay: 0.25 },
  { icon: Presentation, label: 'Deck', sub: '15 slides', x: '8%', y: '52%', rotate: 2, delay: 0.4 },
  { icon: LinkedinIcon, label: 'LinkedIn', sub: 'Full rewrite', x: '50%', y: '46%', rotate: -3, delay: 0.55 },
];

// Motivation: the previous hero pointed at a stock photo that didn't exist
// in the repo (broken image). This replaces it with an honest composition
// built from the actual four services, so the visual claims nothing that
// isn't true and never breaks.
export default function HeroVisual() {
  const reduce = useReducedMotion();

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      {/* Ambient glow anchored to brand teal, single source, not scattered blobs */}
      <div className="absolute inset-0 rounded-full bg-aether-electric-teal/10 blur-3xl" />

      {CARDS.map((card) => {
        const Icon = card.icon;
        const isBrandIcon = card.label === 'LinkedIn';
        return (
          <motion.div
            key={card.label}
            className="absolute w-[46%] glass rounded-2xl p-4 shadow-[0_20px_60px_-15px_rgba(0,151,167,0.25)]"
            style={{ left: card.x, top: card.y }}
            initial={reduce ? undefined : { opacity: 0, y: 30, rotate: 0 }}
            animate={reduce ? undefined : { opacity: 1, y: 0, rotate: card.rotate }}
            transition={{ duration: 0.7, delay: card.delay, ease: EASE_OUT }}
            whileHover={reduce ? undefined : { y: -6, rotate: 0, transition: { duration: 0.25 } }}
          >
            <div className="w-9 h-9 rounded-lg bg-aether-electric-teal/12 flex items-center justify-center mb-3">
              {isBrandIcon ? (
                <Icon size={18} className="text-aether-deep-teal" />
              ) : (
                <Icon size={18} className="text-aether-deep-teal" strokeWidth={1.75} />
              )}
            </div>
            <p className="font-display font-semibold text-sm text-aether-deep-teal">{card.label}</p>
            <p className="text-xs text-deep-ink/55 mt-0.5">{card.sub}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
