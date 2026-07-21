// app/admin/leads/page.tsx
import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';
import { ListPageHeader, ListPageShell } from '@/components/admin-list-components';

// Ensure this page always fetches fresh database entries on every visit
export const revalidate = 0;

export default async function LeadsPage() {
  const supabase = await createClient();

  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <ListPageShell>
      <ListPageHeader title="Leads" />

      <main className="max-w-4xl mx-auto px-6 py-8">
        {error && (
          <p className="text-sm text-alert bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
            Failed to load leads: {error.message}
          </p>
        )}

        {leads && leads.length === 0 && (
          <p className="text-sm text-neutral">No leads yet.</p>
        )}

        {leads && leads.length > 0 && (
          <div className="bg-white border border-aether-electric-teal border-opacity-10 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-aether-electric-teal bg-opacity-5 border-b border-aether-electric-teal border-opacity-10">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-aether-deep-teal">Order ID</th>
                  <th className="text-left px-4 py-3 font-semibold text-aether-deep-teal">Name</th>
                  <th className="text-left px-4 py-3 font-semibold text-aether-deep-teal">Service</th>
                  <th className="text-left px-4 py-3 font-semibold text-aether-deep-teal">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-aether-deep-teal">Received</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id} className="border-b border-aether-electric-teal border-opacity-5 last:border-0 hover:bg-aether-electric-teal hover:bg-opacity-5 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-deep-ink text-opacity-70">{l.order_id}</td>
                    <td className="px-4 py-3 font-medium text-deep-ink">
                      {l.name}
                      {l.is_urgent && (
                        <span className="ml-2 text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-red-100 text-red-700 align-middle">
                          Rush
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-deep-ink text-opacity-70">{l.service_interested}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${
                        l.status === 'completed' ? 'bg-green-100 text-green-800'
                        : l.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                      }`}>
                        {l.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-deep-ink text-opacity-50">
                      {new Date(l.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/admin/leads/${l.id}`} className="text-sm font-semibold text-aether-electric-teal hover:text-aether-deep-teal hover:underline">View</Link>
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
