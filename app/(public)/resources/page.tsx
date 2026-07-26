import type { ReactNode } from 'react';
import { ExternalLink, FileText, BookOpen, Link2 } from 'lucide-react';
import { createClient } from '@/lib/supabase-server';

// Public resources page — reads from `resources`, managed at /admin/resources.
export const revalidate = 0;

const TYPE_ICON: Record<string, ReactNode> = {
  course_link: <Link2 size={20} className="text-aether-bright-cyan" />,
  guide: <BookOpen size={20} className="text-aether-bright-cyan" />,
  template: <FileText size={20} className="text-aether-bright-cyan" />,
};

const TYPE_LABEL: Record<string, string> = {
  course_link: 'Course Link',
  guide: 'Guide',
  template: 'Template',
};

type Resource = {
  id: string;
  title: string;
  drive_link: string;
  resource_type: string;
  category: string | null;
};

export default async function ResourcesPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from('resources')
    .select('*')
    .eq('status', 'active')
    .order('order_index', { ascending: true });

  const resources = (data as Resource[]) || [];

  // Group by category for easier scanning — falls back to "General" when unset
  const grouped = resources.reduce<Record<string, Resource[]>>((acc, r) => {
    const key = r.category || 'General';
    acc[key] = acc[key] || [];
    acc[key].push(r);
    return acc;
  }, {});

  return (
    <>
      <section className="bg-aether-electric-teal text-sky-white py-16 lg:py-24">
        <div className="container-aether text-center">
          <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4 text-sky-white">
            Resources
          </h1>
          <p className="text-lg text-sky-white/90 max-w-2xl mx-auto">
            Free guides, templates, and course links to help you get ahead.
          </p>
        </div>
      </section>

      <section className="py-24 section-spacing">
        <div className="container-aether max-w-4xl">
          {resources.length === 0 && (
            <p className="text-center text-deep-ink/70">
              No resources published yet. Check back soon.
            </p>
          )}

          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="mb-12 last:mb-0">
              <h2 className="font-display font-bold text-2xl mb-6 text-aether-deep-teal">
                {category}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {items.map((resource) => (
                  <a
                    key={resource.id}
                    href={resource.drive_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card bg-white hover:shadow-card hover:border-aether-bright-cyan transition-all flex items-start gap-3"
                  >
                    <div className="mt-1 p-2 rounded-lg bg-aether-bright-cyan/10 flex-shrink-0">
                      {TYPE_ICON[resource.resource_type] || <FileText size={20} className="text-aether-bright-cyan" />}
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-aether-electric-teal uppercase tracking-wide">
                        {TYPE_LABEL[resource.resource_type] || resource.resource_type}
                      </span>
                      <h3 className="font-display font-bold text-base text-deep-ink mt-1 flex items-center gap-1.5">
                        {resource.title}
                        <ExternalLink size={14} className="text-deep-ink/40 flex-shrink-0" />
                      </h3>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
