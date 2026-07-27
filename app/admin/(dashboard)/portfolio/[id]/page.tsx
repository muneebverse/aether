import { createClient } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
import PortfolioForm from '../portfolio-form';
import { updatePortfolioProject, deletePortfolioProject } from '../actions';
import { FormWrapper } from '@/components/admin-form-components';

export default async function EditPortfolioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: project, error } = await supabase
    .from('portfolio_projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !project) notFound();

  const updateWithId = updatePortfolioProject.bind(null, id);
  const deleteWithId = deletePortfolioProject.bind(null, id);

  return (
    <FormWrapper title="Edit Project" backHref="/admin/portfolio">
      <PortfolioForm project={project} onSubmit={updateWithId} onDelete={deleteWithId} />
    </FormWrapper>
  );
}
