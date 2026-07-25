'use client';

import { useTransition } from 'react';
import { Menu, LogOut, Search } from 'lucide-react';

export default function AdminTopbar({
  onMenuClick,
  onSignOut,
  userEmail,
}: {
  onMenuClick: () => void;
  onSignOut: () => Promise<void>;
  userEmail?: string | null;
}) {
  const [isPending, startTransition] = useTransition();

  function handleSignOut() {
    startTransition(async () => {
      await onSignOut();
    });
  }
  return (
    <header className="sticky top-0 z-30 h-16 flex items-center justify-between gap-4 px-4 sm:px-6 bg-white bg-opacity-95 backdrop-blur-sm border-b border-aether-electric-teal border-opacity-10">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-deep-ink hover:text-aether-electric-teal transition-colors flex-shrink-0"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        {/* Non-functional search placeholder for now — matches the reference
            layout; wire this up if/when admin search is worth building. */}
        <div className="hidden sm:flex items-center gap-2 max-w-xs w-full bg-aether-electric-teal bg-opacity-5 border border-aether-electric-teal border-opacity-10 rounded-lg px-3 py-2 text-sm text-deep-ink text-opacity-40">
          <Search size={16} />
          <span>Search (coming soon)</span>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        {userEmail && (
          <span className="hidden sm:inline text-sm text-deep-ink text-opacity-60 truncate max-w-[160px]">
            {userEmail}
          </span>
        )}
        <button
          onClick={handleSignOut}
          disabled={isPending}
          className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-deep-ink hover:text-aether-electric-teal transition-colors rounded-lg hover:bg-aether-electric-teal hover:bg-opacity-10 disabled:opacity-50"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">{isPending ? 'Signing out…' : 'Sign Out'}</span>
        </button>
      </div>
    </header>
  );
}
