// app/admin/services/[id]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import ServiceForm from '../service-form'
import { FormWrapper } from '@/components/admin-form-components'
import { StatusBadge } from '@/components/admin-list-components'

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: service, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !service) {
    notFound()
  }

  const { data: linkedTiers } = await supabase
    .from('pricing_tiers')
    .select('id, name, price_pkr, status')
    .eq('service_id', id)
    .order('order_index', { ascending: true })

  async function updateService(data: {
    title: string
    slug: string
    description: string | null
    price_range: string | null
    category: string | null
    status: string
    order_index: number
  }) {
    'use server'
    const supabase = await createClient()

    const { error } = await supabase
      .from('services')
      .update(data)
      .eq('id', id)

    if (error) {
      return { error: error.message }
    }

    return {}
  }

  async function deleteService() {
    'use server'
    const supabase = await createClient()
    await supabase.from('services').delete().eq('id', id)
  }

  return (
    <FormWrapper title="Edit Service" backHref="/admin/services">
      <ServiceForm
        initialData={service}
        onSubmit={updateService}
        onDelete={deleteService}
      />

      {/* Interlink: pricing tiers that belong to this service */}
      <div className="mt-10 pt-8 border-t border-aether-electric-teal/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-aether-deep-teal">Pricing tiers for this service</h3>
          <Link
            href="/admin/pricing/new"
            className="text-sm font-semibold text-aether-electric-teal hover:text-aether-deep-teal hover:underline"
          >
            + Add tier
          </Link>
        </div>

        {(!linkedTiers || linkedTiers.length === 0) && (
          <p className="text-sm text-neutral">
            No pricing tiers linked yet — add one from{' '}
            <Link href="/admin/pricing/new" className="text-aether-electric-teal hover:underline">
              /admin/pricing/new
            </Link>{' '}
            and select this service.
          </p>
        )}

        {linkedTiers && linkedTiers.length > 0 && (
          <ul className="space-y-2">
            {linkedTiers.map((t) => (
              <li
                key={t.id}
                className="flex items-center justify-between bg-sky-white border border-aether-electric-teal/10 rounded-lg px-4 py-3 text-sm"
              >
                <span className="font-medium text-deep-ink">
                  {t.name} — PKR {Number(t.price_pkr).toLocaleString()}
                </span>
                <div className="flex items-center gap-3">
                  <StatusBadge status={t.status} />
                  <Link
                    href={`/admin/pricing/${t.id}`}
                    className="font-semibold text-aether-electric-teal hover:text-aether-deep-teal hover:underline"
                  >
                    Edit
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </FormWrapper>
  )
}
