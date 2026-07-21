import Link from 'next/link';
import { ChevronLeft, Plus } from 'lucide-react';

/**
 * ListPageHeader - Consistent header bar for every admin list page.
 * Usage: <ListPageHeader title="Services" newHref="/admin/services/new" newLabel="New Service" />
 */
export function ListPageHeader({
  title,
  newHref,
  newLabel,
}: {
  title: string;
  newHref?: string;
  newLabel?: string;
}) {
  return (
    <header className="bg-sky-white border-b border-aether-electric-teal border-opacity-10 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link
          href="/admin"
          className="flex items-center gap-1 text-sm font-semibold text-aether-electric-teal hover:text-aether-deep-teal transition-colors"
        >
          <ChevronLeft size={16} />
          Dashboard
        </Link>
        <span className="text-aether-electric-teal text-opacity-30">/</span>
        <h1 className="font-display font-bold text-lg text-aether-deep-teal">{title}</h1>
      </div>

      {newHref && (
        <Link
          href={newHref}
          className="flex items-center gap-1.5 bg-gradient-to-r from-aether-electric-teal to-aether-bright-cyan text-white rounded-lg px-4 py-2 text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all"
        >
          <Plus size={16} />
          {newLabel}
        </Link>
      )}
    </header>
  );
}

/** Shared page shell so every list page has the same background + max-width. */
export function ListPageShell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}

/** Consistent status badge used across every admin list table. */
export function StatusBadge({ status }: { status: string | null | undefined }) {
  const normalized = (status || '').toLowerCase();
  const isActive = normalized === 'active' || normalized === 'published' || normalized === 'showcase';
  const isDraftLike = normalized === 'draft' || normalized === 'inactive' || normalized === 'archived';

  const classes = isActive
    ? 'bg-green-100 text-green-800'
    : isDraftLike
    ? 'bg-gray-100 text-gray-800'
    : 'bg-aether-electric-teal bg-opacity-10 text-aether-deep-teal';

  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded ${classes}`}>
      {status || '—'}
    </span>
  );
}
