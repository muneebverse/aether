'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FormGroup, FormInput, FormTextarea, FormSelect, FormButtons } from '@/components/admin-form-components'

type SampleData = {
  title: string
  image_url: string | null
  live_url: string | null
  caption: string | null
  status: string
  order_index: number
}

export default function SampleForm({
  initialData,
  onSubmit,
}: {
  initialData?: Partial<SampleData>
  onSubmit: (data: SampleData) => Promise<{ error?: string }>
}) {
  const router = useRouter()
  const [title, setTitle] = useState(initialData?.title || '')
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || '')
  const [liveUrl, setLiveUrl] = useState(initialData?.live_url || '')
  const [caption, setCaption] = useState(initialData?.caption || '')
  const [status, setStatus] = useState(initialData?.status || 'showcase')
  const [orderIndex, setOrderIndex] = useState(initialData?.order_index ?? 0)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const result = await onSubmit({
      title,
      image_url: imageUrl || null,
      live_url: liveUrl || null,
      caption: caption || null,
      status,
      order_index: orderIndex,
    })

    if (result.error) {
      setError(result.error)
      setSaving(false)
      return
    }

    router.push('/admin/restaurant-samples')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <p className="mb-6 text-sm text-alert bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
      )}

      <FormGroup>
        <FormInput label="Title (restaurant name)" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} required />

        <FormInput label="Screenshot URL" value={imageUrl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImageUrl(e.target.value)} placeholder="https://..." />

        <FormInput
          label="Live URL"
          description="Optional — leave blank if sold/offline"
          value={liveUrl}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLiveUrl(e.target.value)}
          placeholder="https://..."
        />

        <FormTextarea label="Caption / summary" value={caption} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCaption(e.target.value)} rows={2} />

        <div className="grid grid-cols-2 gap-4">
          <FormInput label="Order" type="number" value={orderIndex} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrderIndex(Number(e.target.value))} />

          <FormSelect label="Status" value={status} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value)}>
            <option value="showcase">Showcase</option>
            <option value="active">Active (currently live/maintained)</option>
            <option value="sold">Sold</option>
          </FormSelect>
        </div>
      </FormGroup>

      <FormButtons
        submitLabel={initialData ? 'Save changes' : 'Create project'}
        isLoading={saving}
        cancelHref="/admin/restaurant-samples"
      />
    </form>
  )
}
