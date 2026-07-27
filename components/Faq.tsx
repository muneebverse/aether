'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { EASE_OUT } from '@/lib/motion-easing';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export default function Faq({ faqs }: { faqs: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id} className="card">
            <button
              onClick={() => toggle(faq.id)}
              className="w-full flex justify-between items-center gap-4 text-left"
              aria-expanded={isOpen}
            >
              <h3 className="font-display font-semibold text-base sm:text-lg text-deep-ink">
                {faq.question}
              </h3>
              <ChevronDown
                size={20}
                className={`text-aether-electric-teal shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <p className="mt-4 text-deep-ink/70 leading-relaxed text-sm sm:text-base">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
