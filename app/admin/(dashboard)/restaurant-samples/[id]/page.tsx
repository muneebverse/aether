import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import SampleForm from '../sample-form'
import { FormWrapper } from '@/components/admin-form-components'

export default async function EditRestaurantSamplePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: sample } = await supabase.from('service_samples').select('*').eq('id', id).single()

  if (!sample) redirect('/admin/restaurant-samples')

  async function updateSample(data: {
    title: string
    image_url: string | null
    live_url: string | null
    caption: string | null
    status: string
    order_index: number
  }) {
    'use server'
    const supabase = await createClient()
    const { error } = await supabase.from('service_samples').update(data).eq('id', id)
    if (error) return { error: error.message }
    return {}
  }

  return (
    <FormWrapper title="Edit Restaurant Project" backHref="/admin/restaurant-samples">
      <SampleForm initialData={sample} onSubmit={updateSample} />
    </FormWrapper>
  )
}
