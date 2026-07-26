import { createClient } from '@/lib/supabase-server';
import PricingForm from '../pricing-form';
import { createPricingTier } from '../actions';
import { FormWrapper } from '@/components/admin-form-components';

export default async function NewPricingTierPage() {
  const supabase = await createClient();
  const { data: services } = await supabase
    .from('services')
    .select('id, title')
    .order('order_index', { ascending: true });

  return (
    <FormWrapper title="New Pricing Tier" backHref="/admin/pricing">
      <PricingForm services={services || []} onSubmit={createPricingTier} />
    </FormWrapper>
  );
}
