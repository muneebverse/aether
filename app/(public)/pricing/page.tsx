import { createClient } from '@/lib/supabase-server';
import PricingClient, { type PricingTier, type ServiceGroup } from '@/components/PricingClient';

// Public pricing page — reads from `pricing_tiers`, managed at /admin/pricing.
// Tiers are linked to a `services` row (interlinked: renaming a service on
// /admin/services updates the heading here automatically). Bundles
// (is_bundle = true) aren't linked to a single service and render separately.
// Anything marked "unavailable" in the admin disappears from this page
// immediately (revalidated on every write).
export const revalidate = 0;

export default async function Pricing() {
  const supabase = await createClient();

  const { data } = await supabase
    .from('pricing_tiers')
    .select('*, services(id, title, slug)')
    .eq('status', 'active')
    .order('order_index', { ascending: true });

  const rows = data || [];

  const bundles: PricingTier[] = rows
    .filter((r) => r.is_bundle)
    .map((r) => ({
      id: r.id,
      name: r.name,
      price_pkr: r.price_pkr,
      badge: r.badge,
      features: r.features || [],
      is_bundle: true,
      bundle_includes: r.bundle_includes,
    }));

  const groupsMap = new Map<string, ServiceGroup>();
  for (const r of rows) {
    if (r.is_bundle || !r.services) continue;
    const key = r.services.id;
    if (!groupsMap.has(key)) {
      groupsMap.set(key, {
        service_id: r.services.id,
        service_title: r.services.title,
        service_slug: r.services.slug,
        tiers: [],
      });
    }
    groupsMap.get(key)!.tiers.push({
      id: r.id,
      name: r.name,
      price_pkr: r.price_pkr,
      badge: r.badge,
      features: r.features || [],
      is_bundle: false,
      bundle_includes: null,
    });
  }

  return <PricingClient serviceGroups={Array.from(groupsMap.values())} bundles={bundles} />;
}
