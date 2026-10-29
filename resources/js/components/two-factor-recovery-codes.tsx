import { Form } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import AlertError from '@/components/alert-error';
import { regenerateRecoveryCodes } from '@/routes/two-factor';

type Props = {
  recoveryCodesList: string[];
  fetchRecoveryCodes: () => Promise<void>;
  isLoading?: boolean;
  errors?: string[];
};

export default function TwoFactorRecoveryCodes({
  recoveryCodesList,
  fetchRecoveryCodes,
  isLoading = false,
  errors = [],
}: Props) {
  const [isVisible, setIsVisible] = useState(false);

  async function toggleVisibility() {
    if (!isVisible) {
      await fetchRecoveryCodes();
    }

    setIsVisible(!isVisible);
  }

  return (
    <div>
      <h3>Recovery codes</h3>
      {errors.length > 0 && <AlertError errors={errors} />}
      <p>
        Store these codes somewhere safe. Each code can be used once if you lose
        access to your authenticator app.
      </p>
      <button
        type="button"
        onClick={toggleVisibility}
        disabled={isLoading}
        aria-expanded={isVisible}
        aria-controls="recovery-codes"
      >
        {isVisible ? 'Hide recovery codes' : 'View recovery codes'}
      </button>

      {isVisible && (
        <div id="recovery-codes">
          {isLoading && <p role="status">Loading recovery codes...</p>}
          {!isLoading && recoveryCodesList.length === 0 && (
            <button type="button" onClick={fetchRecoveryCodes}>
              Retry loading recovery codes
            </button>
          )}
          <ul aria-label="Recovery codes">
            {recoveryCodesList.map((code) => (
              <li key={code}>{code}</li>
            ))}
          </ul>
          {recoveryCodesList.length > 0 && (
            <Form
              {...regenerateRecoveryCodes.form()}
              options={{ preserveScroll: true }}
              onSuccess={fetchRecoveryCodes}
            >
              {({ processing, errors }) => (
                <>
                  {Object.entries(errors).map(([field, message]) => (
                    <InputError key={field} message={message} />
                  ))}
                  <button type="submit" disabled={processing || isLoading}>
                    Regenerate codes
                  </button>
                </>
              )}
            </Form>
          )}
          <p>Regenerating codes invalidates all previous codes.</p>
        </div>
      )}
    </div>
  );
}
