'use server';

import { createClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type SampleData = {
  title: string;
  image_url: string | null;
  live_url: string | null;
  caption: string | null;
  status: string;
  order_index: number;
};

// Creates a new restaurant project sample. Writes to `service_samples` (the
// same table the list and edit pages already use) with category: 'restaurant'
// set automatically, since the list page filters on it.
export async function createSample(data: SampleData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('service_samples')
    .insert([{ ...data, category: 'restaurant' }]);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin/restaurant-samples');
  redirect('/admin/restaurant-samples');
}
