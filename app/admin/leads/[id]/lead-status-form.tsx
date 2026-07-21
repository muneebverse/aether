'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FormSelect, FormButtons } from '@/components/admin-form-components'

export default function LeadStatusForm({
  currentStatus,
  onUpdate,
}: {
  currentStatus: string
  onUpdate: (status: string) => Promise<{ error?: string }>
}) {
  const [status, setStatus] = useState(currentStatus)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const result = await onUpdate(status)

    if (result.error) {
      setError(result.error)
      setSaving(false)
      return
    }

    router.refresh()
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <p className="mb-4 text-sm text-alert bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <FormSelect label="Status" value={status} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value)}>
        <option value="received">Received</option>
        <option value="in_progress">In progress</option>
        <option value="completed">Completed</option>
      </FormSelect>

      <FormButtons submitLabel={saving ? 'Updating...' : 'Update status'} isLoading={saving} />
    </form>
  )
}
