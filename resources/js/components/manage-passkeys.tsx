import { router } from '@inertiajs/react';
import Heading from '@/components/heading';
import PasskeyItem from '@/components/passkey-item';
import PasskeyRegistration from '@/components/passkey-register';
import type { Passkey } from '@/types';

export type Props = {
  canManagePasskeys?: boolean;
  passkeys?: Passkey[];
};

export default function ManagePasskeys({
  canManagePasskeys = false,
  passkeys = [],
}: Props) {
  if (!canManagePasskeys) {
    return null;
  }

  return (
    <section>
      <Heading title="Passkeys" />
      {passkeys.length ? (
        <ul>
          {passkeys.map((passkey) => (
            <PasskeyItem key={passkey.id} passkey={passkey} />
          ))}
        </ul>
      ) : (
        <p>No passkeys registered.</p>
      )}
      <PasskeyRegistration onSuccess={() => router.reload()} />
    </section>
  );
}
