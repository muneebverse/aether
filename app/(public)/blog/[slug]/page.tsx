import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CalendarDays, ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase-server';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

// Individual blog post page. Previously /blog linked to /blog/[id] but this
// route didn't exist at all — every "Read Article" link 404'd. This fixes
// that and pulls the real post content from the `posts` table.
export const revalidate = 0;

const window = new JSDOM('').window;
const purify = DOMPurify(window as unknown as Window & typeof globalThis);

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const supabase = await createClient();

    const { data: post, error: dbError } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (dbError) {
      console.error('BLOG POST DB ERROR:', dbError);
    }

    if (!post) {
      notFound();
    }

    const publishedDate = post.published_at
      ? new Date(post.published_at).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : '';

    let sanitizedContent = '';
    try {
      sanitizedContent = purify.sanitize(post.content || '');
    } catch (sanitizeErr) {
      console.error('BLOG POST SANITIZE ERROR:', sanitizeErr);
      throw sanitizeErr;
    }

    return (
      <article className="animate-fade-in-up">
        <section className="bg-aether-electric-teal text-sky-white py-16 lg:py-20">
          <div className="container-aether max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sky-white/80 hover:text-sky-white text-sm mb-6 transition-colors"
            >
              <ArrowLeft size={16} /> Back to Blog
            </Link>
            <h1 className="text-3xl lg:text-5xl font-display font-bold mb-4 text-sky-white">
              {post.title}
            </h1>
            {publishedDate && (
              <div className="flex items-center gap-2 text-sm text-sky-white/80">
                <CalendarDays size={16} />
                <span>{publishedDate}</span>
              </div>
            )}
          </div>
        </section>

        {post.cover_image_url && (
          <div className="container-aether max-w-3xl -mt-8 sm:-mt-10">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.cover_image_url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        <section className="py-16 section-spacing">
          <div className="container-aether max-w-3xl">
            {post.excerpt && (
              <p className="text-lg text-deep-ink/70 mb-8 leading-relaxed italic">
                {post.excerpt}
              </p>
            )}
            <div
              className="prose prose-lg max-w-none text-deep-ink leading-relaxed"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />

            <div className="mt-12 pt-8 border-t border-aether-electric-teal/10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-aether-electric-teal font-600 hover:text-aether-bright-cyan transition-colors"
              >
                <ArrowLeft size={16} /> Back to all articles
              </Link>
            </div>
          </div>
        </section>
      </article>
    );
  } catch (err) {
    console.error('BLOG POST PAGE CRASH:', err);
    throw err;
  }
}