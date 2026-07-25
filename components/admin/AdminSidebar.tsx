'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Inbox,
  Briefcase,
  DollarSign,
  FileText,
  ImageIcon,
  BookOpen,
  Utensils,
  X,
} from 'lucide-react';
import { ADMIN_NAV, type AdminNavItem } from '@/lib/admin-nav';

const ICONS: Record<AdminNavItem['iconName'], React.ElementType> = {
  dashboard: LayoutDashboard,
  leads: Inbox,
  services: Briefcase,
  pricing: DollarSign,
  posts: FileText,
  portfolio: ImageIcon,
  resources: BookOpen,
  restaurant: Utensils,
};

function isActive(pathname: string, href: string) {
  if (href === '/admin') return pathname === '/admin';
  return pathname === href || pathname.startsWith(href + '/');
}

export default function AdminSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile scrim */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 flex-shrink-0 z-50 bg-aether-deep-teal text-sky-white flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-5 border-b border-sky-white border-opacity-10 flex-shrink-0">
          <Link href="/admin" className="flex items-center gap-2" onClick={onClose}>
            <Image src="/logos/aether-logo-icon.png" alt="AETHER" width={28} height={28} className="w-7 h-7" />
            <span className="font-display font-bold text-lg text-sky-white">AETHER</span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-sky-white text-opacity-70 hover:text-opacity-100"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-8">
          {ADMIN_NAV.map((group) => (
            <div key={group.label}>
              <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-sky-white text-opacity-40">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = ICONS[item.iconName];
                  const active = isActive(pathname, item.href);
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        active
                          ? 'bg-aether-bright-cyan bg-opacity-20 text-aether-bright-cyan'
                          : 'text-sky-white text-opacity-70 hover:bg-sky-white hover:bg-opacity-10 hover:text-opacity-100'
                      }`}
                    >
                      <Icon size={18} className="flex-shrink-0" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-sky-white border-opacity-10 flex-shrink-0">
          <Link
            href="/"
            className="text-xs text-sky-white text-opacity-50 hover:text-opacity-80 transition-colors"
          >
            ← Back to live site
          </Link>
        </div>
      </aside>
    </>
  );
}
