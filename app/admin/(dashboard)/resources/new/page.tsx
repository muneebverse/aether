// app/admin/resources/new/page.tsx
import { createClient } from '@/lib/supabase-server';
import ResourceForm from '../resource-form';
import { FormWrapper } from '@/components/admin-form-components';

export default function NewResourcePage() {
  async function createResource(data: {
    title: string;
    drive_link: string;
    resource_type: string;
    category: string | null;
    status: string;
    order_index: number;
  }) {
    'use server';
    const supabase = await createClient();
    const { error } = await supabase.from('resources').insert(data);
    if (error) return { error: error.message };
    return {};
  }

  return (
    <FormWrapper title="New Resource" backHref="/admin/resources">
      <ResourceForm onSubmit={createResource} />
    </FormWrapper>
  );
}
