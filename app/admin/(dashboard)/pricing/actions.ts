'use server';

import { createClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type PricingTierData = {
  service_id: string | null;
  name: string;
  price_pkr: number;
  badge: string | null;
  features: string[];
  is_bundle: boolean;
  bundle_includes: string | null;
  status: string;
  order_index: number;
};

// Revalidate both admin and public pages so a pricing change (or marking a
// tier unavailable) shows up on the live /pricing and /services pages
// immediately, without a redeploy.
function revalidatePricingPaths() {
  revalidatePath('/admin/pricing');
  revalidatePath('/pricing');
  revalidatePath('/services');
}

export async function createPricingTier(data: PricingTierData) {
  if (!data.name) {
    return { error: 'Name is required' };
  }

  const supabase = await createClient();
  const { error } = await supabase.from('pricing_tiers').insert([data]);

  if (error) {
    return { error: error.message };
  }

  revalidatePricingPaths();
  redirect('/admin/pricing');
}

export async function updatePricingTier(id: string, data: PricingTierData) {
  if (!data.name) {
    return { error: 'Name is required' };
  }

  const supabase = await createClient();
  const { error } = await supabase.from('pricing_tiers').update(data).eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePricingPaths();
  redirect('/admin/pricing');
}

export async function deletePricingTier(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('pricing_tiers').delete().eq('id', id);

  if (error) {
    throw new Error(`Failed to delete pricing tier: ${error.message}`);
  }

  revalidatePricingPaths();
}

// Quick action used directly from the list page — flips a tier between
// active/unavailable in one click without opening the full edit form.
export async function togglePricingTierStatus(id: string, currentStatus: string) {
  const supabase = await createClient();
  const nextStatus = currentStatus === 'active' ? 'unavailable' : 'active';
  const { error } = await supabase
    .from('pricing_tiers')
    .update({ status: nextStatus })
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to update status: ${error.message}`);
  }

  revalidatePricingPaths();
}
