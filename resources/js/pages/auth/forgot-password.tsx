import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { login } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
  return (
    <>
      <Head title="Forgot password" />
      {status && <p role="status">{status}</p>}

      <Form {...email.form()}>
        {({ processing, errors }) => (
          <>
            <div>
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                name="email"
                required
                autoFocus
                autoComplete="email"
              />
              <InputError message={errors.email} />
            </div>
            <button
              type="submit"
              disabled={processing}
              data-test="email-password-reset-link-button"
            >
              {processing ? 'Sending...' : 'Email password reset link'}
            </button>
          </>
        )}
      </Form>

      <p>
        <TextLink href={login()}>Return to log in</TextLink>
      </p>
    </>
  );
}

ForgotPassword.layout = {
  title: 'Forgot password',
  description: 'Enter your email to receive a password reset link.',
};
