// app/admin/(dashboard)/layout.tsx
//
// This layout wraps every protected admin route (everything except
// /admin/login, which lives outside this route group) — this is where the
// auth guard and the sidebar/topbar chrome actually belong. It's nested
// inside app/admin/layout.tsx, which provides <html>/<body> for the whole
// /admin segment, so this one just returns plain JSX.
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import AdminShell from '@/components/admin/AdminShell';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  async function handleSignOut() {
    'use server';
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/admin/login');
  }

  return (
    <AdminShell onSignOut={handleSignOut} userEmail={user.email}>
      {children}
    </AdminShell>
  );
}
