import { Form } from '@inertiajs/react';
import { destroy } from '@/actions/Laravel/Passkeys/Http/Controllers/PasskeyRegistrationController';
import InputError from '@/components/input-error';
import type { Passkey } from '@/types';

export default function PasskeyItem({ passkey }: { passkey: Passkey }) {
  return (
    <li>
      <p>
        {passkey.name}
        {passkey.authenticator && ` (${passkey.authenticator})`}
      </p>
      <p>
        Added {passkey.created_at_diff}.
        {passkey.last_used_at_diff &&
          ` Last used ${passkey.last_used_at_diff}.`}
      </p>
      <details>
        <summary>Remove {passkey.name}</summary>
        <p>You will no longer be able to sign in with this passkey.</p>
        <Form {...destroy.form(passkey.id)} options={{ preserveScroll: true }}>
          {({ processing, errors }) => (
            <>
              {Object.entries(errors).map(([field, message]) => (
                <InputError key={field} message={message} />
              ))}
              <button type="submit" disabled={processing}>
                {processing ? 'Removing...' : 'Remove passkey'}
              </button>
            </>
          )}
        </Form>
      </details>
    </li>
  );
}
