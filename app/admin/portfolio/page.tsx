import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';
import { ListPageHeader, ListPageShell, StatusBadge } from '@/components/admin-list-components';

export default async function PortfolioAdminPage() {
  const supabase = await createClient();

  const { data: projects, error } = await supabase
    .from('portfolio_projects')
    .select('*')
    .order('order_index', { ascending: true });

  return (
    <ListPageShell>
      <ListPageHeader title="Portfolio" newHref="/admin/portfolio/new" newLabel="New Project" />

      <main className="max-w-4xl mx-auto px-6 py-8">
        {error && (
          <p className="text-sm text-alert bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
            Failed to load projects: {error.message}
          </p>
        )}

        {projects && projects.length === 0 && (
          <p className="text-sm text-neutral">
            No projects yet. Click &quot;New Project&quot; to add your first one.
          </p>
        )}

        {projects && projects.length > 0 && (
          <div className="bg-white border border-aether-electric-teal border-opacity-10 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-aether-electric-teal bg-opacity-5 border-b border-aether-electric-teal border-opacity-10">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-aether-deep-teal">Title</th>
                  <th className="text-left px-4 py-3 font-semibold text-aether-deep-teal">Category</th>
                  <th className="text-left px-4 py-3 font-semibold text-aether-deep-teal">Order</th>
                  <th className="text-left px-4 py-3 font-semibold text-aether-deep-teal">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b border-aether-electric-teal border-opacity-5 last:border-0 hover:bg-aether-electric-teal hover:bg-opacity-5 transition-colors">
                    <td className="px-4 py-3 font-medium text-deep-ink">{project.title}</td>
                    <td className="px-4 py-3 text-deep-ink text-opacity-70 capitalize">{project.category}</td>
                    <td className="px-4 py-3 text-deep-ink text-opacity-50">{project.order_index}</td>
                    <td className="px-4 py-3"><StatusBadge status={project.status} /></td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/portfolio/${project.id}`}
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
