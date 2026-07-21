// app/admin/resources/page.tsx
import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';
import { ListPageHeader, ListPageShell, StatusBadge } from '@/components/admin-list-components';

// Ensure lists are always loaded fresh on every page load
export const revalidate = 0;

export default async function ResourcesPage() {
  const supabase = await createClient();

  const { data: resources, error } = await supabase
    .from('resources')
    .select('*')
    .order('order_index', { ascending: true });

  return (
    <ListPageShell>
      <ListPageHeader title="Resources" newHref="/admin/resources/new" newLabel="New Resource" />

      <main className="max-w-4xl mx-auto px-6 py-8">
        {error && (
          <p className="text-sm text-alert bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
            Failed to load resources: {error.message}
          </p>
        )}

        {resources && resources.length === 0 && (
          <p className="text-sm text-neutral">No resources yet. Click &quot;New Resource&quot; to add one.</p>
        )}

        {resources && resources.length > 0 && (
          <div className="bg-white border border-aether-electric-teal border-opacity-10 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-aether-electric-teal bg-opacity-5 border-b border-aether-electric-teal border-opacity-10">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-aether-deep-teal">Title</th>
                  <th className="text-left px-4 py-3 font-semibold text-aether-deep-teal">Type</th>
                  <th className="text-left px-4 py-3 font-semibold text-aether-deep-teal">Category</th>
                  <th className="text-left px-4 py-3 font-semibold text-aether-deep-teal">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {resources.map((r) => (
                  <tr key={r.id} className="border-b border-aether-electric-teal border-opacity-5 last:border-0 hover:bg-aether-electric-teal hover:bg-opacity-5 transition-colors">
                    <td className="px-4 py-3 font-medium text-deep-ink">{r.title}</td>
                    <td className="px-4 py-3 text-deep-ink text-opacity-70">{r.resource_type}</td>
                    <td className="px-4 py-3 text-deep-ink text-opacity-70">{r.category || '—'}</td>
                    <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/admin/resources/${r.id}`} className="text-sm font-semibold text-aether-electric-teal hover:text-aether-deep-teal hover:underline">Edit</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </ListPageShell>
  );
}
