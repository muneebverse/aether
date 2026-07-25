// app/admin/layout.tsx
//
// This is the ROOT layout for the entire /admin segment (there is no
// app/layout.tsx at the project root — (public) and admin are sibling route
// groups, each providing their own <html>/<body>). Previously this file did
// NOT render <html>/<body> at all, which Next.js requires somewhere in the
// layout chain for a top-level segment — the whole /admin tree was relying
// on that being provided elsewhere, which it wasn't.
//
// This layout intentionally does NOT check auth or render the sidebar —
// it wraps /admin/login too, and redirecting an already-logged-out visitor
// on /admin/login back to /admin/login is an infinite redirect loop. The
// auth check + sidebar chrome live one level down, in
// app/admin/(dashboard)/layout.tsx, which does not wrap /admin/login.
import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Admin | AETHER',
  description: 'AETHER Admin Dashboard',
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0097A7" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-sky-white text-deep-ink">{children}</body>
    </html>
  );
}
