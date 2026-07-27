'use server';

// Server actions for the admin dashboard's "new" (create) flows.
//
// Note: these use the plain session-scoped Supabase client (same as every
// admin edit/update action elsewhere in the app), relying on RLS policies
// tied to the authenticated admin user — not the service-role client. The
// service-role client (lib/supabase-admin.ts) is reserved for the two
// genuinely anonymous, pre-auth endpoints: /api/leads and /api/track.
import { createClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type ServiceData = {
  title: string;
  slug: string;
  description: string | null;
  price_range: string | null;
  category: string | null;
  status: string;
  order_index: number;
};

// Admin: create a new Service listing. Matches ServiceForm's onSubmit contract
// so the "new" page can use the exact same form component as "edit".
export async function createService(data: ServiceData) {
  const supabase = await createClient();
  const { error } = await supabase.from('services').insert([data]);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin/services');
  redirect('/admin/services');
}

type PostData = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  status: string;
};

// Admin: create a new Blog Post. Matches PostForm's onSubmit contract.
export async function createPost(data: PostData) {
  const supabase = await createClient();
  const { error } = await supabase.from('posts').insert([
    {
      ...data,
      published_at: data.status === 'published' ? new Date().toISOString() : null,
    },
  ]);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin/posts');
  redirect('/admin/posts');
}
