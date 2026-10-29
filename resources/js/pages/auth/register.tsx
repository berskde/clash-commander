import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import PasswordInput from '@/components/password-input';
import { login } from '@/routes';
import { store } from '@/routes/register';

export default function Register({ passwordRules }: { passwordRules: string }) {
  return (
    <>
      <Head title="Register" />
      <Form
        {...store.form()}
        resetOnSuccess={['password', 'password_confirmation']}
        disableWhileProcessing
      >
        {({ processing, errors }) => (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                required
                autoFocus
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
                required
                autoComplete="email"
              />
              <InputError message={errors.email} />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <PasswordInput
                id="password"
                name="password"
                required
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
              data-test="register-user-button"
            >
              {processing ? 'Creating account...' : 'Create account'}
            </button>
          </>
        )}
      </Form>

      <p>
        Already have an account? <TextLink href={login()}>Log in</TextLink>
      </p>
    </>
  );
}

Register.layout = {
  title: 'Create an account',
  description: 'Enter your details to create your account.',
};
