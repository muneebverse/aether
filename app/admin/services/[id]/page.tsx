// app/admin/services/[id]/page.tsx
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import ServiceForm from '../service-form'
import { FormWrapper } from '@/components/admin-form-components'

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
    </FormWrapper>
  )
}
