import { createClient } from '@/lib/supabase-server';
import ResourcesPageClient, { type Resource } from '@/components/ResourcesPageClient';

// Public resources page — reads from `resources`, managed at /admin/resources.
export const revalidate = 0;

export default async function ResourcesPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from('resources')
    .select('*')
    .eq('status', 'active')
    .order('order_index', { ascending: true });

  return <ResourcesPageClient resources={(data as Resource[]) || []} />;
}
