import { usePasskeyRegister } from '@laravel/passkeys/react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import InputError from '@/components/input-error';

export default function PasskeyRegistration({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [name, setName] = useState('');
  const { register, isLoading, error, isSupported } = usePasskeyRegister({
    onSuccess: () => {
      setName('');
      onSuccess();
    },
  });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (name.trim()) {
      await register(name.trim());
    }
  }

  if (!isSupported) {
    return <p>Passkeys are not supported in this browser.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="passkey-name">Passkey name</label>
        <input
          id="passkey-name"
          name="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="off"
        />
        <InputError message={error ?? undefined} />
      </div>
      <button type="submit" disabled={isLoading || !name.trim()}>
        {isLoading ? 'Registering...' : 'Register passkey'}
      </button>
    </form>
  );
}
