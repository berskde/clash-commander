import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { update } from '@/routes/password';

type Props = {
  token: string;
  email: string | null;
  passwordRules: string;
};

export default function ResetPassword({ token, email, passwordRules }: Props) {
  return (
    <>
      <Head title="Reset password" />
      <Form
        {...update.form()}
        transform={(data) => ({ ...data, token })}
        resetOnSuccess={['password', 'password_confirmation']}
      >
        {({ processing, errors }) => (
          <>
            <div>
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                defaultValue={email ?? ''}
                readOnly={Boolean(email)}
                required
              />
              <InputError message={errors.email} />
            </div>

            <div>
              <label htmlFor="password">New password</label>
              <PasswordInput
                id="password"
                name="password"
                required
                autoFocus
                autoComplete="new-password"
                passwordrules={passwordRules}
              />
              <InputError message={errors.password} />
            </div>

            <div>
              <label htmlFor="password_confirmation">Confirm password</label>
              <PasswordInput
                id="password_confirmation"
                name="password_confirmation"
                required
                autoComplete="new-password"
                passwordrules={passwordRules}
              />
              <InputError message={errors.password_confirmation} />
            </div>

            <button
              type="submit"
              disabled={processing}
              data-test="reset-password-button"
            >
              {processing ? 'Resetting...' : 'Reset password'}
            </button>
          </>
        )}
      </Form>
    </>
  );
}

ResetPassword.layout = {
  title: 'Reset password',
  description: 'Enter your new password.',
};
