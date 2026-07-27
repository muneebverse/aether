import { createClient } from '@/lib/supabase-server';
import RestaurantWebsitesPageClient, { type Sample } from '@/components/RestaurantWebsitesPageClient';

// Public restaurant websites showcase — reads from `service_samples` where
// category = 'restaurant', managed at /admin/restaurant-samples.
export const revalidate = 0;

export default async function RestaurantWebsitesPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from('service_samples')
    .select('*')
    .eq('category', 'restaurant')
    .order('order_index', { ascending: true });

  return <RestaurantWebsitesPageClient samples={(data as Sample[]) || []} />;
}
