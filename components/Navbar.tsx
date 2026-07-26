'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Magnetic from '@/components/motion/Magnetic';
import { EASE_OUT } from '@/lib/motion-easing';

const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled
          ? 'bg-sky-white/90 backdrop-blur-md border-b border-aether-electric-teal/10 shadow-[0_1px_0_rgba(0,151,167,0.06)]'
          : 'bg-sky-white border-b border-transparent'
      }`}
    >
      <div className="container-aether flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/logos/aether-logo-icon.png"
            alt="AETHER"
            width={36}
            height={36}
            className="w-9 h-9"
            priority
          />
          <span className="font-display font-bold text-lg tracking-tight hidden sm:inline text-aether-deep-teal">
            AETHER
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                  active
                    ? 'text-aether-deep-teal'
                    : 'text-deep-ink/70 hover:text-aether-deep-teal'
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-aether-electric-teal/8"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
          <Magnetic strength={0.2}>
            <Link href="/contact" className="btn btn-primary ml-3">
              Contact Us
            </Link>
          </Magnetic>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="md:hidden text-aether-deep-teal p-2 -mr-2"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className="md:hidden overflow-hidden border-t border-aether-electric-teal/10 bg-sky-white"
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-2.5 text-base font-medium text-deep-ink/80 hover:text-aether-deep-teal transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/contact" className="btn btn-primary w-full mt-3">
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
