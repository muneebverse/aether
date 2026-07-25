'use client';

import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';

export default function AdminShell({
  children,
  onSignOut,
  userEmail,
}: {
  children: React.ReactNode;
  onSignOut: () => Promise<void>;
  userEmail?: string | null;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-sky-white">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 min-w-0 flex flex-col">
        <AdminTopbar
          onMenuClick={() => setSidebarOpen(true)}
          onSignOut={onSignOut}
          userEmail={userEmail}
        />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
