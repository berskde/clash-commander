import { Form } from '@inertiajs/react';
import { useState } from 'react';
import AlertError from '@/components/alert-error';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import TwoFactorRecoveryCodes from '@/components/two-factor-recovery-codes';
import { useClipboard } from '@/hooks/use-clipboard';
import { OTP_MAX_LENGTH, useTwoFactorAuth } from '@/hooks/use-two-factor-auth';
import { confirm, disable, enable } from '@/routes/two-factor';

export type Props = {
  canManageTwoFactor?: boolean;
  requiresConfirmation?: boolean;
  twoFactorEnabled?: boolean;
};

export default function ManageTwoFactor({
  canManageTwoFactor = false,
  requiresConfirmation = false,
  twoFactorEnabled = false,
}: Props) {
  const [showSetup, setShowSetup] = useState(false);
  const [copiedText, copy] = useClipboard();
  const {
    qrCodeSvg,
    manualSetupKey,
    recoveryCodesList,
    errors: setupErrors,
    isLoading,
    clearSetupData,
    clearTwoFactorAuthData,
    fetchSetupData,
    fetchRecoveryCodes,
  } = useTwoFactorAuth();

  if (!canManageTwoFactor) {
    return null;
  }

  const hasSetupData = qrCodeSvg !== null && manualSetupKey !== null;

  function closeSetup() {
    setShowSetup(false);

    if (twoFactorEnabled) {
      clearSetupData();
    }
  }

  return (
    <section>
      <Heading title="Two-factor authentication" />
      <p>
        {twoFactorEnabled
          ? 'Two-factor authentication is enabled.'
          : 'Use an authenticator app to add a second step when signing in.'}
      </p>
      {setupErrors.length > 0 && <AlertError errors={setupErrors} />}

      {twoFactorEnabled ? (
        <Form
          {...disable.form()}
          options={{ preserveScroll: true }}
          onSuccess={() => {
            clearTwoFactorAuthData();
            setShowSetup(false);
          }}
        >
          {({ processing, errors }) => (
            <>
              {Object.entries(errors).map(([field, message]) => (
                <InputError key={field} message={message} />
              ))}
              <button type="submit" disabled={processing || isLoading}>
                Disable 2FA
              </button>
            </>
          )}
        </Form>
      ) : hasSetupData ? (
        <button type="button" onClick={() => setShowSetup(true)}>
          Continue setup
        </button>
      ) : (
        <Form
          {...enable.form()}
          options={{ preserveScroll: true }}
          onSuccess={async () => {
            setShowSetup(true);
            await fetchSetupData();
          }}
        >
          {({ processing, errors }) => (
            <>
              {Object.entries(errors).map(([field, message]) => (
                <InputError key={field} message={message} />
              ))}
              <button type="submit" disabled={processing || isLoading}>
                Enable 2FA
              </button>
            </>
          )}
        </Form>
      )}

      {showSetup && (
        <div>
          <h3>Set up your authenticator app</h3>
          <p>
            Scan the QR code or enter the setup key in your app. Save your
            recovery codes after setup.
          </p>
          {isLoading && <p role="status">Loading setup...</p>}
          {qrCodeSvg && (
            <div
              role="img"
              aria-label="Authenticator setup QR code"
              className="w-fit bg-white p-2 [&>svg]:size-48"
              dangerouslySetInnerHTML={{ __html: qrCodeSvg }}
            />
          )}
          {manualSetupKey && (
            <div>
              <label htmlFor="two-factor-key">Setup key</label>
              <input id="two-factor-key" readOnly value={manualSetupKey} />
              <button
                type="button"
                onClick={() => copy(manualSetupKey)}
                aria-live="polite"
              >
                {copiedText === manualSetupKey ? 'Copied' : 'Copy setup key'}
              </button>
            </div>
          )}

          {hasSetupData && requiresConfirmation && !twoFactorEnabled && (
            <Form
              {...confirm.form()}
              errorBag="confirmTwoFactorAuthentication"
              options={{ preserveScroll: true }}
              resetOnError
              onSuccess={() => {
                setShowSetup(false);
                clearSetupData();
              }}
            >
              {({ processing, errors }) => (
                <>
                  <div>
                    <label htmlFor="confirm-code">Authentication code</label>
                    <input
                      id="confirm-code"
                      name="code"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      pattern={`[0-9]{${OTP_MAX_LENGTH}}`}
                      maxLength={OTP_MAX_LENGTH}
                      required
                    />
                    <InputError message={errors.code} />
                  </div>
                  <button type="submit" disabled={processing}>
                    Confirm
                  </button>
                </>
              )}
            </Form>
          )}

          {!hasSetupData && !isLoading && (
            <button type="button" onClick={fetchSetupData}>
              Retry setup
            </button>
          )}
          <button type="button" onClick={closeSetup} disabled={isLoading}>
            Close setup
          </button>
        </div>
      )}

      {twoFactorEnabled && (
        <TwoFactorRecoveryCodes
          recoveryCodesList={recoveryCodesList}
          fetchRecoveryCodes={fetchRecoveryCodes}
          isLoading={isLoading}
        />
      )}
    </section>
  );
}
