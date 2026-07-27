'use client';

import Link from 'next/link';
import { ExternalLink, ArrowRight } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';

const CATEGORY_LABEL: Record<string, string> = {
  robotics: 'Robotics',
  automation: 'Automation',
  other: 'Other',
};

export type PortfolioProject = {
  id: string;
  title: string;
  description: string;
  tech_tags: string[] | null;
  image_url: string | null;
  project_url: string | null;
  category: string;
  status: string;
};

export default function PortfolioPageClient({ projects }: { projects: PortfolioProject[] }) {
  return (
    <>
      <section className="bg-aether-electric-teal text-sky-white py-16 lg:py-24">
        <div className="container-aether text-center">
          <Reveal>
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4 text-sky-white">Portfolio</h1>
            <p className="text-lg text-sky-white/90 max-w-2xl mx-auto">
              Robotics, automation, and engineering projects — a look at what we build.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container-aether">
          {projects.length === 0 && (
            <p className="text-center text-deep-ink/70">
              No portfolio projects published yet. Check back soon.
            </p>
          )}

          <StaggerGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <StaggerItem key={project.id}>
                <div className="card bg-white flex flex-col h-full hover:shadow-card">
                  {project.image_url && (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 -mx-6 -mt-6 w-[calc(100%+3rem)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <span className="inline-block bg-aether-electric-teal/10 text-aether-electric-teal px-3 py-1 rounded text-xs font-bold mb-3 w-fit">
                    {CATEGORY_LABEL[project.category] || project.category}
                  </span>

                  <h3 className="font-display font-bold text-xl mb-2 text-aether-deep-teal">{project.title}</h3>

                  <p className="text-deep-ink/70 text-sm mb-4 flex-grow">{project.description}</p>

                  {project.tech_tags && project.tech_tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech_tags.map((tag) => (
                        <span key={tag} className="text-xs bg-aether-bright-cyan/10 text-aether-deep-teal px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {project.project_url && (
                    <a
                      href={project.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-aether-electric-teal font-600 hover:text-aether-bright-cyan transition-colors text-sm"
                    >
                      View Project <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="py-16 bg-aether-electric-teal/5">
        <div className="container-aether text-center">
          <Reveal>
            <h2 className="font-display font-bold text-2xl sm:text-3xl mb-4 text-aether-deep-teal">
              Want something built for you?
            </h2>
            <Link href="/request" className="btn btn-primary">
              Request a Quote <ArrowRight size={18} className="ml-2" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
