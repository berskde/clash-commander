import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import PasswordInput from '@/components/password-input';
import PasskeyVerify from '@/components/passkey-verify';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
  status?: string;
  canResetPassword: boolean;
  canRegister: boolean;
  canUsePasskeys: boolean;
};

export default function Login({
  status,
  canResetPassword,
  canRegister,
  canUsePasskeys,
}: Props) {
  return (
    <>
      <Head title="Log in" />
      {status && <p role="status">{status}</p>}
      {canUsePasskeys && <PasskeyVerify />}

      <Form {...store.form()} resetOnSuccess={['password']}>
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
                autoComplete="username webauthn"
              />
              <InputError message={errors.email} />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <PasswordInput
                id="password"
                name="password"
                required
                autoComplete="current-password"
              />
              <InputError message={errors.password} />
            </div>

            <label>
              <input type="checkbox" name="remember" value="1" />
              Remember me
            </label>

            <button
              type="submit"
              disabled={processing}
              data-test="login-button"
            >
              {processing ? 'Logging in...' : 'Log in'}
            </button>
          </>
        )}
      </Form>

      {canResetPassword && (
        <p>
          <TextLink href={request()}>Forgot your password?</TextLink>
        </p>
      )}
      {canRegister && (
        <p>
          Don't have an account? <TextLink href={register()}>Sign up</TextLink>
        </p>
      )}
    </>
  );
}

Login.layout = {
  title: 'Log in to your account',
  description: 'Enter your email and password to log in.',
};
