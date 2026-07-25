import ServiceForm from '../service-form';
import { createService } from '@/app/actions';
import { FormWrapper } from '@/components/admin-form-components';

export default function NewServicePage() {
  return (
    <FormWrapper title="New Service" backHref="/admin/services">
      <ServiceForm onSubmit={createService} />
    </FormWrapper>
  );
}
