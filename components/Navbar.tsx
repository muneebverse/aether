'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Menu, X, Search } from 'lucide-react';

const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'bg-sky-white bg-opacity-80 backdrop-blur-md border-aether-electric-teal border-opacity-10 shadow-sm'
          : 'bg-sky-white border-transparent'
      }`}
    >
      <div className="container-aether flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image
            src="/logos/aether-logo-icon.png"
            alt="AETHER Logo"
            width={40}
            height={40}
            className="w-10 h-10"
            priority
          />
          <span className="font-display font-bold text-lg hidden sm:inline text-aether-deep-teal">AETHER</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-aether-electric-teal hover:text-aether-bright-cyan font-500 text-sm transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/track"
            className="flex items-center gap-1.5 text-deep-ink text-opacity-60 hover:text-aether-electric-teal font-500 text-sm transition-colors duration-200"
          >
            <Search size={14} />
            Track Order
          </Link>

          <Link href="/request" className="btn btn-primary text-sm">
            Request a Quote
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-aether-electric-teal hover:text-aether-bright-cyan transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-sky-white border-t border-aether-electric-teal border-opacity-10 px-6 py-4 space-y-4 animate-fade-in-down">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-aether-electric-teal hover:text-aether-bright-cyan font-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/track"
            className="flex items-center gap-1.5 text-deep-ink text-opacity-60 hover:text-aether-electric-teal font-500 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Search size={14} />
            Track Order
          </Link>
          <Link
            href="/request"
            className="btn btn-primary w-full"
            onClick={() => setIsOpen(false)}
          >
            Request a Quote
          </Link>
        </div>
      )}
    </nav>
  );
}
