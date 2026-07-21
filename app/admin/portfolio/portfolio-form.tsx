'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormGroup, FormInput, FormTextarea, FormSelect, FormButtons } from '@/components/admin-form-components';
import type { PortfolioCategory, PortfolioData } from './actions';

type PortfolioProject = {
  id?: string;
  title?: string;
  description?: string;
  tech_tags?: string[];
  image_url?: string | null;
  project_url?: string | null;
  category?: PortfolioCategory;
  order_index?: number;
  status?: string;
};

export default function PortfolioForm({
  project,
  onSubmit,
  onDelete,
}: {
  project?: PortfolioProject;
  onSubmit: (data: PortfolioData) => Promise<{ error?: string } | void>;
  onDelete?: () => Promise<void>;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(project?.title || '');
  const [description, setDescription] = useState(project?.description || '');
  const [techTags, setTechTags] = useState(project?.tech_tags?.join(', ') || '');
  const [imageUrl, setImageUrl] = useState(project?.image_url || '');
  const [projectUrl, setProjectUrl] = useState(project?.project_url || '');
  const [category, setCategory] = useState<PortfolioCategory>(project?.category || 'robotics');
  const [orderIndex, setOrderIndex] = useState(project?.order_index ?? 0);
  const [status, setStatus] = useState(project?.status || 'active');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await onSubmit({
      title,
      description,
      tech_tags: techTags.split(',').map((t) => t.trim()).filter(Boolean),
      image_url: imageUrl || null,
      project_url: projectUrl || null,
      category,
      order_index: orderIndex,
      status,
    });

    setLoading(false);
    if (result?.error) {
      setError(result.error);
      return;
    }
    router.push('/admin/portfolio');
    router.refresh();
  }

  async function handleDelete() {
    if (!onDelete) return;
    if (!confirm('Delete this project? This cannot be undone.')) return;
    setLoading(true);
    await onDelete();
    router.push('/admin/portfolio');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <p className="mb-6 text-sm text-alert bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <FormGroup>
        <FormInput label="Title" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} required />

        <FormTextarea label="Description" value={description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} rows={4} />

        <FormInput
          label="Tech tags"
          description="Comma-separated"
          value={techTags}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTechTags(e.target.value)}
          placeholder="Arduino, Python, ROS"
        />

        <FormInput label="Image URL" value={imageUrl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImageUrl(e.target.value)} />

        <FormInput label="Project URL" description="Optional" value={projectUrl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProjectUrl(e.target.value)} />

        <div className="grid grid-cols-3 gap-4">
          <FormSelect label="Category" value={category} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value as PortfolioCategory)}>
            <option value="robotics">Robotics</option>
            <option value="automation">Automation</option>
            <option value="other">Other</option>
          </FormSelect>

          <FormInput label="Order" type="number" value={orderIndex} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrderIndex(Number(e.target.value))} />

          <FormSelect label="Status" value={status} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value)}>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
          </FormSelect>
        </div>
      </FormGroup>

      <FormButtons
        submitLabel={project?.id ? 'Save changes' : 'Create project'}
        isLoading={loading}
        cancelHref="/admin/portfolio"
      />

      {onDelete && (
        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          className="mt-4 text-sm text-alert hover:underline"
        >
          Delete project
        </button>
      )}
    </form>
  );
}
