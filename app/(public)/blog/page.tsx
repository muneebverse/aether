import Link from 'next/link';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase-server';

// Public blog index — pulls live, published posts from the `posts` table
// managed in /admin/posts. Previously this page had hardcoded fake articles
// that never reflected anything written in the admin dashboard.
export const revalidate = 0;

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image_url: string | null;
  status: string;
  published_at: string | null;
};

function formatDate(dateStr: string | null) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function Blog() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, cover_image_url, status, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  const allPosts = (posts as Post[]) || [];
  const [featured, ...rest] = allPosts;

  return (
    <>
      {/* Hero Section */}
      <section className="bg-aether-electric-teal text-sky-white py-16 lg:py-24">
        <div className="container-aether text-center">
          <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4 text-sky-white">
            AETHER Blog
          </h1>
          <p className="text-lg text-sky-white text-opacity-90 max-w-2xl mx-auto">
            Expert insights, career strategies, and practical tips to elevate your professional journey.
          </p>
        </div>
      </section>

      {!allPosts.length && (
        <section className="py-24">
          <div className="container-aether text-center">
            <p className="text-deep-ink text-opacity-70">
              No posts published yet. Check back soon.
            </p>
          </div>
        </section>
      )}

      {/* Featured Post */}
      {featured && (
        <section className="py-12 section-spacing">
          <div className="container-aether">
            <div className="card bg-gradient-to-br from-aether-electric-teal to-aether-bright-cyan text-white p-8 sm:p-12">
              <span className="inline-block bg-aether-bright-cyan text-deep-ink px-3 py-1 rounded text-xs font-bold mb-4">
                LATEST
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4 text-sky-white">
                {featured.title}
              </h2>
              <p className="text-lg text-sky-white text-opacity-90 mb-6">
                {featured.excerpt}
              </p>
              <div className="flex flex-wrap gap-4 items-center mb-6 text-sm text-sky-white">
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} />
                  <span>{formatDate(featured.published_at)}</span>
                </div>
              </div>
              <Link
                href={`/blog/${featured.slug}`}
                className="inline-flex items-center gap-2 bg-sky-white text-aether-electric-teal px-6 py-3 rounded font-bold hover:bg-aether-bright-cyan hover:text-sky-white transition-colors"
              >
                Read Article <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      {rest.length > 0 && (
        <section className="py-24">
          <div className="container-aether">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((post) => (
                <article key={post.id} className="card bg-white flex flex-col h-full hover:shadow-card">
                  <h3 className="font-display font-bold text-xl mb-3 leading-tight">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-deep-ink hover:text-aether-electric-teal transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-deep-ink text-opacity-70 text-sm mb-6 flex-grow">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-4 items-center text-xs text-deep-ink text-opacity-60 mb-4 pt-4 border-t border-aether-electric-teal border-opacity-10">
                    <div className="flex items-center gap-1">
                      <CalendarDays size={14} />
                      <span>{formatDate(post.published_at)}</span>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-aether-electric-teal font-600 hover:text-aether-bright-cyan transition-colors"
                  >
                    Read Article <ArrowRight size={16} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
