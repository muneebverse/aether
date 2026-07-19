import Link from 'next/link';
import Image from 'next/image';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-aether-deep-teal to-aether-deep-teal bg-opacity-95 text-sky-white">
      <div className="container-aether py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logos/aether-logo-icon.png"
                alt="AETHER Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="font-display font-bold text-lg">AETHER</span>
            </div>
            <p className="text-sky-white text-opacity-70 text-sm leading-relaxed">
              Transform your professional application from invisible to unmissable. Elevate to clarity.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold mb-4 text-aether-bright-cyan">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/services" 
                  className="text-sky-white text-opacity-70 hover:text-aether-bright-cyan transition-colors duration-200"
                >
                  Resume Optimization
                </Link>
              </li>
              <li>
                <Link 
                  href="/services" 
                  className="text-sky-white text-opacity-70 hover:text-aether-bright-cyan transition-colors duration-200"
                >
                  ATS Optimization
                </Link>
              </li>
              <li>
                <Link 
                  href="/services" 
                  className="text-sky-white text-opacity-70 hover:text-aether-bright-cyan transition-colors duration-200"
                >
                  LinkedIn Branding
                </Link>
              </li>
              <li>
                <Link 
                  href="/services" 
                  className="text-sky-white text-opacity-70 hover:text-aether-bright-cyan transition-colors duration-200"
                >
                  Career Strategy
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-bold mb-4 text-aether-bright-cyan">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/about" 
                  className="text-sky-white text-opacity-70 hover:text-aether-bright-cyan transition-colors duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="text-sky-white text-opacity-70 hover:text-aether-bright-cyan transition-colors duration-200"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-sky-white text-opacity-70 hover:text-aether-bright-cyan transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="text-sky-white text-opacity-70 hover:text-aether-bright-cyan transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-display font-bold mb-4 text-aether-bright-cyan">Connect</h4>
            <div className="flex gap-4">
              <a
                href="mailto:contact@aether.studio"
                className="p-2 rounded-lg bg-aether-electric-teal bg-opacity-20 text-aether-bright-cyan hover:bg-opacity-30 hover:text-sky-white transition-all duration-200"
                aria-label="Email"
                title="Email us"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-aether-electric-teal bg-opacity-20 text-aether-bright-cyan hover:bg-opacity-30 hover:text-sky-white transition-all duration-200"
                aria-label="LinkedIn"
                title="Follow on LinkedIn"
              >
                <LinkedinIcon size={20} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-aether-electric-teal bg-opacity-20 text-aether-bright-cyan hover:bg-opacity-30 hover:text-sky-white transition-all duration-200"
                aria-label="Github"
                title="Visit GitHub"
              >
                <GithubIcon size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-aether-bright-cyan border-opacity-20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-sky-white text-opacity-70">
            <p>&copy; {currentYear} AETHER. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link 
                href="#" 
                className="hover:text-aether-bright-cyan transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link 
                href="#" 
                className="hover:text-aether-bright-cyan transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
