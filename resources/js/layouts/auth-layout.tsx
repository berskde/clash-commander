import { Link, usePage } from '@inertiajs/react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthLayout({
  title,
  description,
  children,
}: AuthLayoutProps) {
  const { name } = usePage().props;

  return (
    <main>
      <Link href={home()}>{name}</Link>
      <header>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </header>
      {children}
    </main>
  );
}
