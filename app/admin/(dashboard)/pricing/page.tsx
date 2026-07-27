// app/admin/pricing/page.tsx
import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';
import { ListPageHeader, ListPageShell, StatusBadge } from '@/components/admin-list-components';
import { togglePricingTierStatus } from './actions';

export const revalidate = 0;

export default async function PricingAdminPage() {
  const supabase = await createClient();

  const { data: tiers, error } = await supabase
    .from('pricing_tiers')
    .select('*, services(title)')
    .order('order_index', { ascending: true });

  async function handleToggle(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    const currentStatus = formData.get('status') as string;
    await togglePricingTierStatus(id, currentStatus);
  }

  return (
    <ListPageShell>
      <ListPageHeader title="Pricing" newHref="/admin/pricing/new" newLabel="New Pricing Tier" />

      <main className="max-w-5xl mx-auto px-6 py-8">
        <p className="text-sm text-neutral mb-6">
          Manage every tier and bundle shown on <code>/pricing</code>. Tiers stay linked to a service —
          edit a service&apos;s name on <Link href="/admin/services" className="text-aether-electric-teal hover:underline">/admin/services</Link> and
          it updates here automatically.
        </p>

        {error && (
          <p className="text-sm text-alert bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
            Failed to load pricing tiers: {error.message}
          </p>
        )}

        {tiers && tiers.length === 0 && (
          <p className="text-sm text-neutral">
            No pricing tiers yet. Click &quot;New Pricing Tier&quot; to add your first one.
          </p>
        )}

        {tiers && tiers.length > 0 && (
          <div className="bg-white border border-aether-electric-teal/10 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-aether-electric-teal/5 border-b border-aether-electric-teal/10">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-aether-deep-teal">Name</th>
                  <th className="text-left px-4 py-3 font-semibold text-aether-deep-teal">Linked Service</th>
                  <th className="text-left px-4 py-3 font-semibold text-aether-deep-teal">Price (PKR)</th>
                  <th className="text-left px-4 py-3 font-semibold text-aether-deep-teal">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-aether-deep-teal">Order</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((t: any) => (
                  <tr
                    key={t.id}
                    className="border-b border-aether-electric-teal/5 last:border-0 hover:bg-aether-electric-teal/5 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-deep-ink">
                      {t.name}
                      {t.is_bundle && (
                        <span className="ml-2 text-xs font-semibold text-aether-electric-teal">BUNDLE</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-deep-ink/70">
                      {t.is_bundle ? '—' : t.services?.title || '—'}
                    </td>
                    <td className="px-4 py-3 text-deep-ink/70">
                      PKR {Number(t.price_pkr).toLocaleString()}
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={t.status} /></td>
                    <td className="px-4 py-3 text-deep-ink/50">{t.order_index}</td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <form action={handleToggle} className="inline">
                        <input type="hidden" name="id" value={t.id} />
                        <input type="hidden" name="status" value={t.status} />
                        <button
                          type="submit"
                          className="text-sm font-semibold text-neutral hover:text-aether-deep-teal hover:underline mr-4"
                        >
                          {t.status === 'active' ? 'Mark unavailable' : 'Mark active'}
                        </button>
                      </form>
                      <Link
                        href={`/admin/pricing/${t.id}`}
                        className="text-sm font-semibold text-aether-electric-teal hover:text-aether-deep-teal hover:underline"
                      >
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
  );
}
