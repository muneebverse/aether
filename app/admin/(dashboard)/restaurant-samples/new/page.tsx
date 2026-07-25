import SampleForm from '../sample-form';
import { createSample } from '../actions';
import { FormWrapper } from '@/components/admin-form-components';

export default function NewRestaurantSamplePage() {
  return (
    <FormWrapper title="New Restaurant Project" backHref="/admin/restaurant-samples">
      <SampleForm onSubmit={createSample} />
    </FormWrapper>
  );
}
