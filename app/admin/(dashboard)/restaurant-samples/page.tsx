import Link from 'next/link'
import { createClient } from '@/lib/supabase-server'
import { ListPageHeader, ListPageShell } from '@/components/admin-list-components'

export default async function RestaurantSamplesPage() {
  const supabase = await createClient()

  const { data: samples, error } = await supabase
    .from('service_samples')
    .select('*')
    .eq('category', 'restaurant')
    .order('order_index', { ascending: true })

  return (
    <ListPageShell>
      <ListPageHeader title="Restaurant Projects" newHref="/admin/restaurant-samples/new" newLabel="New Project" />

      <main className="max-w-4xl mx-auto px-6 py-8">
        {error && (
          <p className="text-sm text-alert bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
            Failed to load projects: {error.message}
          </p>
        )}

        {samples && samples.length === 0 && (
          <p className="text-sm text-neutral">No restaurant projects yet. Click &quot;New Project&quot; to add one.</p>
        )}

        {samples && samples.length > 0 && (
          <div className="bg-white border border-aether-electric-teal border-opacity-10 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-aether-electric-teal bg-opacity-5 border-b border-aether-electric-teal border-opacity-10">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-aether-deep-teal">Title</th>
                  <th className="text-left px-4 py-3 font-semibold text-aether-deep-teal">Live URL</th>
                  <th className="text-left px-4 py-3 font-semibold text-aether-deep-teal">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-aether-deep-teal">Order</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {samples.map((s) => (
                  <tr key={s.id} className="border-b border-aether-electric-teal border-opacity-5 last:border-0 hover:bg-aether-electric-teal hover:bg-opacity-5 transition-colors">
                    <td className="px-4 py-3 font-medium text-deep-ink">{s.title}</td>
                    <td className="px-4 py-3 text-deep-ink text-opacity-70">
                      {s.live_url ? (
                        <a href={s.live_url} target="_blank" rel="noopener noreferrer" className="text-aether-electric-teal hover:underline">
                          {s.live_url}
                        </a>
                      ) : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${
                        s.status === 'sold' ? 'bg-blue-100 text-blue-800'
                        : s.status === 'active' ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                      }`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-deep-ink text-opacity-50">{s.order_index}</td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/admin/restaurant-samples/${s.id}`} className="text-sm font-semibold text-aether-electric-teal hover:text-aether-deep-teal hover:underline">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </ListPageShell>
  )
}
