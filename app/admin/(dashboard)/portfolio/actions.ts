'use server';

import { createClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type PortfolioCategory = 'robotics' | 'automation' | 'other';

export type PortfolioData = {
  title: string;
  description: string;
  tech_tags: string[];
  image_url: string | null;
  project_url: string | null;
  category: PortfolioCategory;
  order_index: number;
  status: string;
};

export async function createPortfolioProject(data: PortfolioData) {
  if (!data.title) {
    return { error: 'Title is required' };
  }

  const supabase = await createClient();
  const { error } = await supabase.from('portfolio_projects').insert([data]);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin/portfolio');
  redirect('/admin/portfolio');
}

export async function updatePortfolioProject(id: string, data: PortfolioData) {
  if (!data.title) {
    return { error: 'Title is required' };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from('portfolio_projects')
    .update(data)
    .eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin/portfolio');
  redirect('/admin/portfolio');
}

export async function deletePortfolioProject(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('portfolio_projects')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete project: ${error.message}`);
  }

  revalidatePath('/admin/portfolio');
}
