import { Form, Head } from '@inertiajs/react';
import { useRef } from 'react';
import SecurityController from '@/actions/App/Http/Controllers/Settings/SecurityController';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import type { Props as ManagePasskeysProps } from '@/components/manage-passkeys';
import ManagePasskeys from '@/components/manage-passkeys';
import type { Props as ManageTwoFactorProps } from '@/components/manage-two-factor';
import ManageTwoFactor from '@/components/manage-two-factor';

type Props = {
  passwordRules: string;
} & ManagePasskeysProps &
  ManageTwoFactorProps;

export default function Security(props: Props) {
  const passwordInput = useRef<HTMLInputElement>(null);
  const currentPasswordInput = useRef<HTMLInputElement>(null);

  return (
    <>
      <Head title="Security settings" />
      <h1>Security settings</h1>

      <section>
        <h2>Update password</h2>
        <Form
          {...SecurityController.update.form()}
          options={{ preserveScroll: true }}
          resetOnError
          resetOnSuccess
          onError={(errors) => {
            if (errors.password) {
              passwordInput.current?.focus();
            }

            if (errors.current_password) {
              currentPasswordInput.current?.focus();
            }
          }}
        >
          {({ errors, processing }) => (
            <>
              <div>
                <label htmlFor="current_password">Current password</label>
                <PasswordInput
                  id="current_password"
                  name="current_password"
                  ref={currentPasswordInput}
                  required
                  autoComplete="current-password"
                />
                <InputError message={errors.current_password} />
              </div>

              <div>
                <label htmlFor="password">New password</label>
                <PasswordInput
                  id="password"
                  name="password"
                  ref={passwordInput}
                  required
                  autoComplete="new-password"
                  passwordrules={props.passwordRules}
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
                  passwordrules={props.passwordRules}
                />
                <InputError message={errors.password_confirmation} />
              </div>

              <button
                type="submit"
                disabled={processing}
                data-test="update-password-button"
              >
                {processing ? 'Saving...' : 'Save password'}
              </button>
            </>
          )}
        </Form>
      </section>

      <ManageTwoFactor
        canManageTwoFactor={props.canManageTwoFactor}
        requiresConfirmation={props.requiresConfirmation}
        twoFactorEnabled={props.twoFactorEnabled}
      />

      <ManagePasskeys
        canManagePasskeys={props.canManagePasskeys}
        passkeys={props.passkeys}
      />
    </>
  );
}
