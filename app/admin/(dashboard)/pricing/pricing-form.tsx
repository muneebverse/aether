'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FormGroup, FormInput, FormTextarea, FormSelect, FormButtons } from '@/components/admin-form-components'
import type { PricingTierData } from './actions'

type ServiceOption = { id: string; title: string }

type PricingTier = {
  id?: string
  service_id?: string | null
  name?: string
  price_pkr?: number
  badge?: string | null
  features?: string[]
  is_bundle?: boolean
  bundle_includes?: string | null
  status?: string
  order_index?: number
}

export default function PricingForm({
  tier,
  services,
  onSubmit,
  onDelete,
}: {
  tier?: PricingTier
  services: ServiceOption[]
  onSubmit: (data: PricingTierData) => Promise<{ error?: string } | void>
  onDelete?: () => Promise<void>
}) {
  const router = useRouter()
  const [name, setName] = useState(tier?.name || '')
  const [serviceId, setServiceId] = useState(tier?.service_id || '')
  const [pricePkr, setPricePkr] = useState(tier?.price_pkr ?? 0)
  const [badge, setBadge] = useState(tier?.badge || '')
  const [featuresText, setFeaturesText] = useState((tier?.features || []).join('\n'))
  const [isBundle, setIsBundle] = useState(tier?.is_bundle ?? false)
  const [bundleIncludes, setBundleIncludes] = useState(tier?.bundle_includes || '')
  const [status, setStatus] = useState(tier?.status || 'active')
  const [orderIndex, setOrderIndex] = useState(tier?.order_index ?? 0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const result = await onSubmit({
      service_id: isBundle ? null : serviceId || null,
      name,
      price_pkr: Number(pricePkr),
      badge: badge || null,
      features: featuresText
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean),
      is_bundle: isBundle,
      bundle_includes: isBundle ? bundleIncludes || null : null,
      status,
      order_index: Number(orderIndex),
    })

    setLoading(false)

    if (result?.error) {
      setError(result.error)
    }
  }

  async function handleDelete() {
    if (!onDelete) return
    if (!confirm('Delete this pricing tier? This cannot be undone.')) return
    setLoading(true)
    await onDelete()
    router.push('/admin/pricing')
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
        <FormSelect
          label="Type"
          description="Bundles aren't linked to a single service — tiers are."
          value={isBundle ? 'bundle' : 'tier'}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setIsBundle(e.target.value === 'bundle')}
        >
          <option value="tier">Service tier</option>
          <option value="bundle">Bundle</option>
        </FormSelect>

        {!isBundle && (
          <FormSelect
            label="Linked service"
            description="Which service this tier belongs to — shown together on both /services and /pricing."
            value={serviceId}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setServiceId(e.target.value)}
            required
          >
            <option value="">Select a service…</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </FormSelect>
        )}

        <FormInput
          label="Tier / bundle name"
          required
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          placeholder="e.g. Launch, Amplify, Startup Bundle"
        />

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Price (PKR)"
            type="number"
            required
            value={pricePkr}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPricePkr(Number(e.target.value))}
          />
          <FormInput
            label="Badge"
            description="Optional, e.g. MOST POPULAR"
            value={badge}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBadge(e.target.value)}
          />
        </div>

        {isBundle ? (
          <FormTextarea
            label="What's included"
            description="Plain summary, e.g. Launch Portfolio + Get Noticed CV"
            value={bundleIncludes}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBundleIncludes(e.target.value)}
            rows={2}
          />
        ) : (
          <FormTextarea
            label="Features"
            description="One feature per line"
            value={featuresText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFeaturesText(e.target.value)}
            rows={6}
          />
        )}

        <div className="grid grid-cols-2 gap-4">
          <FormSelect
            label="Status"
            description="'Unavailable' hides it from the public site instantly"
            value={status}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value)}
          >
            <option value="active">Active</option>
            <option value="unavailable">Unavailable</option>
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
        submitLabel={tier?.id ? 'Save changes' : 'Create pricing tier'}
        isLoading={loading}
        cancelHref="/admin/pricing"
      />

      {onDelete && (
        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          className="mt-4 text-sm text-alert hover:underline"
        >
          Delete pricing tier
        </button>
      )}
    </form>
  )
}
