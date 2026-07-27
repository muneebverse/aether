import { createClient } from '@/lib/supabase-server';
import PortfolioPageClient, { type PortfolioProject } from '@/components/PortfolioPageClient';

// Public portfolio page — reads from `portfolio_projects`, managed at
// /admin/portfolio. This page didn't exist before even though the admin CRUD
// for it did, so nothing added there ever showed up on the live site.
export const revalidate = 0;

export default async function PortfolioPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from('portfolio_projects')
    .select('*')
    .eq('status', 'active')
    .order('order_index', { ascending: true });

  const projects = (data as PortfolioProject[]) || [];

  return <PortfolioPageClient projects={projects} />;
}
