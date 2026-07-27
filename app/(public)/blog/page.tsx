import { createClient } from '@/lib/supabase-server';
import BlogPageClient, { type Post } from '@/components/BlogPageClient';

export const revalidate = 0;

export default async function Blog() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, cover_image_url, status, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  return <BlogPageClient posts={(posts as Post[]) || []} />;
}
