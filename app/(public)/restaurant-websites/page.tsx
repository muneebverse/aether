import Link from 'next/link';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase-server';

// Public restaurant websites showcase — reads from `service_samples` where
// category = 'restaurant', managed at /admin/restaurant-samples. Same as
// /portfolio, this page never existed even though the admin CRUD did.
export const revalidate = 0;

const STATUS_BADGE: Record<string, { label: string; className: string }> = {
  showcase: { label: 'Showcase', className: 'bg-aether-electric-teal bg-opacity-10 text-aether-electric-teal' },
  active: { label: 'Live & Maintained', className: 'bg-success/10 text-success' },
  sold: { label: 'Sold', className: 'bg-neutral/10 text-neutral' },
};

type Sample = {
  id: string;
  title: string;
  image_url: string | null;
  live_url: string | null;
  caption: string | null;
  status: string;
};

export default async function RestaurantWebsitesPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from('service_samples')
    .select('*')
    .eq('category', 'restaurant')
    .order('order_index', { ascending: true });

  const samples = (data as Sample[]) || [];

  return (
    <>
      <section className="bg-aether-electric-teal text-sky-white py-16 lg:py-24">
        <div className="container-aether text-center">
          <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4 text-sky-white">
            Restaurant Websites
          </h1>
          <p className="text-lg text-sky-white text-opacity-90 max-w-2xl mx-auto">
            Custom-built websites for restaurants and food businesses — mobile-first, fast, and built to convert visitors into orders.
          </p>
        </div>
      </section>

      <section className="py-24 section-spacing">
        <div className="container-aether">
          {samples.length === 0 && (
            <p className="text-center text-deep-ink text-opacity-70">
              No restaurant projects published yet. Check back soon.
            </p>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {samples.map((sample) => {
              const badge = STATUS_BADGE[sample.status] || STATUS_BADGE.showcase;
              return (
                <div key={sample.id} className="card bg-white flex flex-col h-full hover:shadow-card">
                  {sample.image_url && (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 -mx-6 -mt-6 w-[calc(100%+3rem)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={sample.image_url}
                        alt={sample.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <span className={`inline-block px-3 py-1 rounded text-xs font-bold mb-3 w-fit ${badge.className}`}>
                    {badge.label}
                  </span>

                  <h3 className="font-display font-bold text-xl mb-2 text-aether-deep-teal">
                    {sample.title}
                  </h3>

                  {sample.caption && (
                    <p className="text-deep-ink text-opacity-70 text-sm mb-4 flex-grow">
                      {sample.caption}
                    </p>
                  )}

                  {sample.live_url && (
                    <a
                      href={sample.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-aether-electric-teal font-600 hover:text-aether-bright-cyan transition-colors text-sm"
                    >
                      Visit Site <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-aether-electric-teal bg-opacity-5">
        <div className="container-aether text-center">
          <h2 className="font-display font-bold text-2xl sm:text-3xl mb-4 text-aether-deep-teal">
            Need a website for your restaurant?
          </h2>
          <Link href="/request" className="btn btn-primary">
            Request a Quote <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </section>
    </>
  );
}
