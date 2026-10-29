import { Form } from '@inertiajs/react';
import { useRef } from 'react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';

export default function DeleteUser() {
  const passwordInput = useRef<HTMLInputElement>(null);

  return (
    <section>
      <h2>Delete account</h2>
      <details>
        <summary data-test="delete-user-button">Delete account</summary>
        <p>
          This permanently deletes your account and its data. Enter your
          password to confirm.
        </p>
        <Form
          {...ProfileController.destroy.form()}
          options={{ preserveScroll: true }}
          onError={() => passwordInput.current?.focus()}
          resetOnSuccess
        >
          {({ processing, errors }) => (
            <>
              <div>
                <label htmlFor="delete_password">Password</label>
                <PasswordInput
                  id="delete_password"
                  name="password"
                  ref={passwordInput}
                  required
                  autoComplete="current-password"
                />
                <InputError message={errors.password} />
              </div>
              <button
                type="submit"
                disabled={processing}
                data-test="confirm-delete-user-button"
              >
                {processing ? 'Deleting...' : 'Permanently delete account'}
              </button>
            </>
          )}
        </Form>
      </details>
    </section>
  );
}
