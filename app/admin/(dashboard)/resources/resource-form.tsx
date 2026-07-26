'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FormGroup, FormInput, FormSelect, FormButtons } from '@/components/admin-form-components'

type ResourceData = {
  title: string
  drive_link: string
  resource_type: string
  category: string | null
  status: string
  order_index: number
}

export default function ResourceForm({
  initialData,
  onSubmit,
}: {
  initialData?: Partial<ResourceData>
  onSubmit: (data: ResourceData) => Promise<{ error?: string }>
}) {
  const router = useRouter()
  const [title, setTitle] = useState(initialData?.title || '')
  const [driveLink, setDriveLink] = useState(initialData?.drive_link || '')
  const [resourceType, setResourceType] = useState(initialData?.resource_type || 'course_link')
  const [category, setCategory] = useState(initialData?.category || '')
  const [status, setStatus] = useState(initialData?.status || 'active')
  const [orderIndex, setOrderIndex] = useState(initialData?.order_index ?? 0)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const result = await onSubmit({
      title,
      drive_link: driveLink,
      resource_type: resourceType,
      category: category || null,
      status,
      order_index: orderIndex,
    })

    if (result.error) {
      setError(result.error)
      setSaving(false)
      return
    }

    router.push('/admin/resources')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <p className="mb-6 text-sm text-alert bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
      )}

      <FormGroup>
        <FormInput label="Title" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} required />

        <FormInput
          label="Drive link"
          value={driveLink}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDriveLink(e.target.value)}
          required
          placeholder="https://drive.google.com/..."
        />

        <FormSelect label="Type" value={resourceType} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setResourceType(e.target.value)}>
          <option value="course_link">Course link</option>
          <option value="guide">Guide</option>
          <option value="template">Template</option>
        </FormSelect>

        <FormInput label="Category" description="Optional" value={category} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)} />

        <div className="grid grid-cols-2 gap-4">
          <FormInput label="Order" type="number" value={orderIndex} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrderIndex(Number(e.target.value))} />

          <FormSelect label="Status" value={status} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value)}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </FormSelect>
        </div>
      </FormGroup>

      <FormButtons
        submitLabel={initialData ? 'Save changes' : 'Create resource'}
        isLoading={saving}
        cancelHref="/admin/resources"
      />
    </form>
  )
}
