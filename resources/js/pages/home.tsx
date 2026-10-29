import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';

export default function Home({ canRegister }: { canRegister: boolean }) {
  const { auth, name } = usePage().props;

  return (
    <main>
      <Head title={name} />
      <h1>{name}</h1>
      <nav aria-label="Main navigation">
        {auth.user ? (
          <Link href={dashboard()}>Dashboard</Link>
        ) : (
          <>
            <Link href={login()}>Log in</Link>
            {canRegister && <Link href={register()}>Register</Link>}
          </>
        )}
      </nav>
    </main>
  );
}
