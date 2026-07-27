import { createClient } from '@/lib/supabase-server';
import ServicesPageClient, { type ServiceCard } from '@/components/ServicesPageClient';

export const revalidate = 0;

const CATEGORY_LABEL: Record<string, string> = {
  portfolio: 'Portfolio & Website',
  cv: 'CV & Career Docs',
  presentation: 'Presentation & Slides',
  linkedin: 'LinkedIn Optimization',
  restaurant: 'Business Websites',
};

export default async function ServicesPage() {
  const supabase = await createClient();

  const { data: dbServices } = await supabase
    .from('services')
    .select('*')
    .eq('status', 'active')
    .order('order_index', { ascending: true });

  const services: ServiceCard[] = (dbServices || []).map((s) => ({
    title: s.title,
    description: s.description || '',
    category: s.category || '',
    categoryLabel: CATEGORY_LABEL[s.category || ''] || s.category || '',
    priceRange: s.price_range,
    slug: s.slug,
  }));

  return <ServicesPageClient services={services} />;
}
