import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import PricingForm from '../pricing-form';
import { updatePricingTier, deletePricingTier, type PricingTierData } from '../actions';
import { FormWrapper } from '@/components/admin-form-components';

export default async function EditPricingTierPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: tier, error }, { data: services }] = await Promise.all([
    supabase.from('pricing_tiers').select('*').eq('id', id).single(),
    supabase.from('services').select('id, title').order('order_index', { ascending: true }),
  ]);

  if (error || !tier) {
    notFound();
  }

  async function handleUpdate(data: PricingTierData) {
    'use server';
    return updatePricingTier(id, data);
  }

  async function handleDelete() {
    'use server';
    await deletePricingTier(id);
  }

  return (
    <FormWrapper title="Edit Pricing Tier" backHref="/admin/pricing">
      <PricingForm tier={tier} services={services || []} onSubmit={handleUpdate} onDelete={handleDelete} />
    </FormWrapper>
  );
}
