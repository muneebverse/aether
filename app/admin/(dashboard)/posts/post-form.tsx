'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FormGroup, FormInput, FormTextarea, FormSelect, FormButtons } from '@/components/admin-form-components'

type PostData = {
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image_url: string | null
  meta_title: string | null
  meta_description: string | null
  status: string
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function PostForm({
  initialData,
  onSubmit,
}: {
  initialData?: PostData
  onSubmit: (data: PostData) => Promise<{ error?: string }>
}) {
  const router = useRouter()
  const [formData, setFormData] = useState<PostData>(
    initialData || {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      cover_image_url: '',
      meta_title: '',
      meta_description: '',
      status: 'draft',
    }
  )
  const [slugTouched, setSlugTouched] = useState(Boolean(initialData?.slug))
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: slugTouched ? prev.slug : slugify(title),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      const result = await onSubmit(formData)
      if (result?.error) {
        setError(result.error)
        return
      }
      router.push('/admin/posts')
      router.refresh()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <p className="mb-6 text-sm text-alert bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <FormGroup>
        <FormInput
          label="Title"
          value={formData.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTitleChange(e.target.value)}
          required
        />

        <FormInput
          label="Slug"
          description={`/blog/${formData.slug || 'your-post-slug'}`}
          value={formData.slug}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSlugTouched(true)
            setFormData({ ...formData, slug: slugify(e.target.value) })
          }}
          required
          className="font-mono"
        />

        <FormTextarea
          label="Excerpt"
          description="Short summary shown on the blog list page"
          value={formData.excerpt}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, excerpt: e.target.value })}
          rows={2}
        />

        <FormTextarea
          label="Content"
          value={formData.content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, content: e.target.value })}
          rows={12}
          required
          className="font-mono text-sm"
        />

        <FormInput
          label="Cover image URL"
          value={formData.cover_image_url ?? ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, cover_image_url: e.target.value })}
          placeholder="https://..."
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <FormInput
            label="Meta title (SEO)"
            value={formData.meta_title ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, meta_title: e.target.value })}
          />
          <FormSelect
            label="Status"
            value={formData.status}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </FormSelect>
        </div>

        <FormTextarea
          label="Meta description (SEO)"
          value={formData.meta_description ?? ''}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, meta_description: e.target.value })}
          rows={2}
        />
      </FormGroup>

      <FormButtons
        submitLabel={initialData ? 'Save changes' : 'Create post'}
        isLoading={isLoading}
        cancelHref="/admin/posts"
      />
    </form>
  )
}
