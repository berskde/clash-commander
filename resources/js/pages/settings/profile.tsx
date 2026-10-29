import { Form, Head, usePage } from '@inertiajs/react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import DeleteUser from '@/components/delete-user';
import InputError from '@/components/input-error';

export default function Profile() {
  const { auth } = usePage().props;

  return (
    <>
      <Head title="Profile settings" />
      <h1>Profile settings</h1>

      <Form
        {...ProfileController.update.form()}
        options={{ preserveScroll: true }}
      >
        {({ processing, errors }) => (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                defaultValue={auth.user?.name}
                required
                autoComplete="name"
              />
              <InputError message={errors.name} />
            </div>

            <div>
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                name="email"
                defaultValue={auth.user?.email}
                required
                autoComplete="email"
              />
              <InputError message={errors.email} />
            </div>

            <button
              type="submit"
              disabled={processing}
              data-test="update-profile-button"
            >
              {processing ? 'Saving...' : 'Save'}
            </button>
          </>
        )}
      </Form>

      <DeleteUser />
    </>
  );
}
