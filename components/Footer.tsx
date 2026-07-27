import Link from 'next/link';
import Image from 'next/image';
import { SOCIAL_LINKS } from '@/lib/social-links';
import { InstagramIcon, TiktokIcon, LinkedinIcon, WhatsappIcon } from '@/components/icons/BrandIcons';
import { Mail } from 'lucide-react';

const SERVICE_LINKS = [
  { href: '/services', label: 'Portfolio & Websites' },
  { href: '/services', label: 'CV & Career Docs' },
  { href: '/services', label: 'Presentations' },
  { href: '/services', label: 'LinkedIn Optimization' },
  { href: '/restaurant-websites', label: 'Business Websites' },
];

const COMPANY_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/portfolio', label: 'Our Work' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact', label: 'Contact' },
  { href: '/track', label: 'Track Order' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-aether-deep-teal text-sky-white border-t-4 border-aether-bright-cyan/30">
      <div className="container-aether py-14 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] gap-x-8 gap-y-10 mb-14">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 w-fit">
              <Image
                src="/logos/aether-logo-icon.png"
                alt="AETHER"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-display font-bold text-lg tracking-tight">AETHER</span>
            </Link>
            <p className="text-sky-white/65 text-sm leading-relaxed max-w-xs">
              Portfolios, CVs, presentations, and LinkedIn — built for engineers who want to be taken seriously.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-4 text-aether-bright-cyan uppercase tracking-wide">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sky-white/75 hover:text-aether-bright-cyan transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-4 text-aether-bright-cyan uppercase tracking-wide">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sky-white/75 hover:text-aether-bright-cyan transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-4 text-aether-bright-cyan uppercase tracking-wide">
              Connect
            </h4>
            <div className="flex flex-wrap gap-3">
              <a
                href={SOCIAL_LINKS.email.url}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-sky-white/10 text-sky-white hover:bg-aether-bright-cyan hover:text-aether-deep-teal transition-colors"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
              <a
                href={SOCIAL_LINKS.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-sky-white/10 text-sky-white hover:bg-aether-bright-cyan hover:text-aether-deep-teal transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href={SOCIAL_LINKS.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-sky-white/10 text-sky-white hover:bg-aether-bright-cyan hover:text-aether-deep-teal transition-colors"
                aria-label="TikTok"
              >
                <TiktokIcon size={16} />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-sky-white/10 text-sky-white hover:bg-aether-bright-cyan hover:text-aether-deep-teal transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href={SOCIAL_LINKS.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-sky-white/10 text-sky-white hover:bg-aether-bright-cyan hover:text-aether-deep-teal transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsappIcon size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-sky-white/15 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-sky-white/60">
            <p>&copy; {currentYear} AETHER. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/contact" className="hover:text-aether-bright-cyan transition-colors">
                Privacy Questions
              </Link>
              <Link href="/contact" className="hover:text-aether-bright-cyan transition-colors">
                Terms Questions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
