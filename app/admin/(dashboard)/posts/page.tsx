// app/admin/posts/page.tsx
import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';
import { ListPageHeader, ListPageShell, StatusBadge } from '@/components/admin-list-components';

export default async function PostsPage() {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <ListPageShell>
      <ListPageHeader title="Posts" newHref="/admin/posts/new" newLabel="New Post" />

      <main className="max-w-4xl mx-auto px-6 py-8">
        {error && (
          <p className="text-sm text-alert bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
            Failed to load posts: {error.message}
          </p>
        )}

        {posts && posts.length === 0 && (
          <p className="text-sm text-neutral">
            No posts yet. Click &quot;New Post&quot; to write your first one.
          </p>
        )}

        {posts && posts.length > 0 && (
          <div className="bg-white border border-aether-electric-teal border-opacity-10 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-aether-electric-teal bg-opacity-5 border-b border-aether-electric-teal border-opacity-10">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-aether-deep-teal">Title</th>
                  <th className="text-left px-4 py-3 font-semibold text-aether-deep-teal">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-aether-deep-teal">Published</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {posts.map((p) => (
                  <tr key={p.id} className="border-b border-aether-electric-teal border-opacity-5 last:border-0 hover:bg-aether-electric-teal hover:bg-opacity-5 transition-colors">
                    <td className="px-4 py-3 font-medium text-deep-ink">{p.title}</td>
                    <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                    <td className="px-4 py-3 text-deep-ink text-opacity-50">
                      {p.published_at ? new Date(p.published_at).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/admin/posts/${p.id}`} className="text-sm font-semibold text-aether-electric-teal hover:text-aether-deep-teal hover:underline">
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
