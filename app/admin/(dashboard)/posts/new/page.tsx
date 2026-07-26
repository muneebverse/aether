import PostForm from '../post-form';
import { createPost } from '@/app/actions';
import { FormWrapper } from '@/components/admin-form-components';

export default function NewPostPage() {
  return (
    <FormWrapper title="New Post" backHref="/admin/posts">
      <PostForm onSubmit={createPost} />
    </FormWrapper>
  );
}
