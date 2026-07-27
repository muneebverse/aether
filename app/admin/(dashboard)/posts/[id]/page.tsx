import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import PostForm from '../post-form'
import { FormWrapper } from '@/components/admin-form-components'

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: post } = await supabase.from('posts').select('*').eq('id', id).single()

  if (!post) redirect('/admin/posts')

  async function updatePost(data: {
    title: string
    slug: string
    excerpt: string
    content: string
    cover_image_url: string | null
    meta_title: string | null
    meta_description: string | null
    status: string
  }) {
    'use server'
    const supabase = await createClient()

    const published_at =
      data.status === 'published' && !post!.published_at
        ? new Date().toISOString()
        : post!.published_at

    const { error } = await supabase
      .from('posts')
      .update({ ...data, published_at, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) return { error: error.message }
    return {}
  }

  return (
    <FormWrapper title="Edit Post" backHref="/admin/posts">
      <PostForm initialData={post} onSubmit={updatePost} />
    </FormWrapper>
  )
}
