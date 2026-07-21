import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import ResourceForm from '../resource-form'
import { FormWrapper } from '@/components/admin-form-components'

export default async function EditResourcePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: resource } = await supabase.from('resources').select('*').eq('id', id).single()

  if (!resource) redirect('/admin/resources')

  async function updateResource(data: {
    title: string
    drive_link: string
    resource_type: string
    category: string | null
    status: string
    order_index: number
  }) {
    'use server'
    const supabase = await createClient()
    const { error } = await supabase.from('resources').update(data).eq('id', id)
    if (error) return { error: error.message }
    return {}
  }

  return (
    <FormWrapper title="Edit Resource" backHref="/admin/resources">
      <ResourceForm initialData={resource} onSubmit={updateResource} />
    </FormWrapper>
  )
}
