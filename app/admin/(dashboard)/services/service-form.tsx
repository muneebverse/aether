'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FormGroup, FormInput, FormTextarea, FormSelect, FormButtons } from '@/components/admin-form-components'

type Service = {
  id?: string
  title: string
  slug: string
  description: string | null
  price_range: string | null
  category: string | null
  status: string
  order_index: number
}

export default function ServiceForm({
  initialData,
  onSubmit,
  onDelete,
}: {
  initialData?: Service
  onSubmit: (data: Omit<Service, 'id'>) => Promise<{ error?: string }>
  onDelete?: () => Promise<void>
}) {
  const router = useRouter()
  const [title, setTitle] = useState(initialData?.title || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [priceRange, setPriceRange] = useState(initialData?.price_range || '')
  const [category, setCategory] = useState(initialData?.category || 'academic')
  const [status, setStatus] = useState(initialData?.status || 'active')
  const [orderIndex, setOrderIndex] = useState(initialData?.order_index ?? 0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Auto-generate slug from title if the slug field hasn't been manually touched
  const [slugTouched, setSlugTouched] = useState(!!initialData)

  function handleTitleChange(value: string) {
    setTitle(value)
    if (!slugTouched) {
      setSlug(
        value
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
      )
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const result = await onSubmit({
      title,
      slug,
      description: description || null,
      price_range: priceRange || null,
      category,
      status,
      order_index: orderIndex,
    })

    setLoading(false)

    if (result.error) {
      setError(result.error)
      return
    }

    router.push('/admin/services')
    router.refresh()
  }

  async function handleDelete() {
    if (!onDelete) return
    if (!confirm('Delete this service? This cannot be undone.')) return
    setLoading(true)
    await onDelete()
    router.push('/admin/services')
    router.refresh()
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
          required
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTitleChange(e.target.value)}
        />

        <FormInput
          label="Slug"
          description="Used in the service page URL"
          required
          value={slug}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSlug(e.target.value)
            setSlugTouched(true)
          }}
          className="font-mono"
        />

        <FormTextarea
          label="Description"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
          rows={4}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Price range"
            value={priceRange}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPriceRange(e.target.value)}
            placeholder="e.g. PKR 1500-3000"
          />

          <FormSelect label="Category" value={category} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}>
            <option value="academic">Academic</option>
            <option value="career">Career</option>
            <option value="restaurant">Restaurant</option>
          </FormSelect>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormSelect label="Status" value={status} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value)}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </FormSelect>

          <FormInput
            label="Order"
            description="Lower shows first"
            type="number"
            value={orderIndex}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrderIndex(Number(e.target.value))}
          />
        </div>
      </FormGroup>

      <FormButtons
        submitLabel={initialData ? 'Save changes' : 'Create service'}
        isLoading={loading}
        cancelHref="/admin/services"
      />

      {onDelete && (
        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          className="mt-4 text-sm text-alert hover:underline"
        >
          Delete service
        </button>
      )}
    </form>
  )
}
