import PortfolioForm from '../portfolio-form';
import { createPortfolioProject } from '../actions';
import { FormWrapper } from '@/components/admin-form-components';

export default function NewPortfolioPage() {
  return (
    <FormWrapper title="New Project" backHref="/admin/portfolio">
      <PortfolioForm onSubmit={createPortfolioProject} />
    </FormWrapper>
  );
}
