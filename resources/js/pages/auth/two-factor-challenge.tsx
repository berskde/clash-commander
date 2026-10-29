import { Form, Head } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { OTP_MAX_LENGTH } from '@/hooks/use-two-factor-auth';
import { store } from '@/routes/two-factor/login';

export default function TwoFactorChallenge() {
  const [useRecoveryCode, setUseRecoveryCode] = useState(false);
  const field = useRecoveryCode ? 'recovery_code' : 'code';

  return (
    <>
      <Head title="Two-factor authentication" />
      <p>
        {useRecoveryCode
          ? 'Enter one of your emergency recovery codes.'
          : 'Enter the six-digit code from your authenticator app.'}
      </p>

      <Form key={field} {...store.form()} resetOnError resetOnSuccess>
        {({ errors, processing }) => (
          <>
            <div>
              <label htmlFor={field}>
                {useRecoveryCode ? 'Recovery code' : 'Authentication code'}
              </label>
              <input
                id={field}
                name={field}
                required
                autoFocus
                autoComplete="one-time-code"
                inputMode={useRecoveryCode ? 'text' : 'numeric'}
                pattern={
                  useRecoveryCode ? undefined : `[0-9]{${OTP_MAX_LENGTH}}`
                }
                maxLength={useRecoveryCode ? undefined : OTP_MAX_LENGTH}
              />
              <InputError message={errors[field]} />
            </div>
            <button type="submit" disabled={processing}>
              {processing ? 'Checking...' : 'Continue'}
            </button>
            <button
              type="button"
              disabled={processing}
              onClick={() => setUseRecoveryCode(!useRecoveryCode)}
            >
              {useRecoveryCode
                ? 'Use an authentication code'
                : 'Use a recovery code'}
            </button>
          </>
        )}
      </Form>
    </>
  );
}

TwoFactorChallenge.layout = {
  title: 'Two-factor authentication',
};
