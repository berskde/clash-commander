import type { UrlMethodPair } from '@inertiajs/core';
import { router } from '@inertiajs/react';
import { usePasskeyVerify } from '@laravel/passkeys/react';
import InputError from '@/components/input-error';
import { Spinner } from '@/components/spinner';
import { dashboard } from '@/routes';

type Props = {
  routes?: { options: UrlMethodPair; submit: UrlMethodPair };
  label?: string;
  loadingLabel?: string;
  separator?: string;
};

export default function PasskeyVerify({
  routes,
  label,
  loadingLabel,
  separator,
}: Props = {}) {
  const { verify, isLoading, error, isSupported } = usePasskeyVerify({
    ...(routes && {
      routes: { options: routes.options.url, submit: routes.submit.url },
    }),
    onSuccess: (response) => router.visit(response.redirect ?? dashboard.url()),
  });

  if (!isSupported) {
    return null;
  }

  return (
    <div>
      <button type="button" onClick={verify} disabled={isLoading}>
        {isLoading && <Spinner />}
        {isLoading
          ? (loadingLabel ?? 'Authenticating...')
          : (label ?? 'Sign in with a passkey')}
      </button>
      <InputError message={error ?? undefined} />
      {separator && <p>{separator}</p>}
    </div>
  );
}
