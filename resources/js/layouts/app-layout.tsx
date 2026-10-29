import { Form, Link, usePage } from '@inertiajs/react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { dashboard, home, logout } from '@/routes';
import { edit as editProfile } from '@/routes/profile';
import type { AppLayoutProps } from '@/types';

export default function AppLayout({
  children,
  breadcrumbs = [],
}: AppLayoutProps) {
  const { name } = usePage().props;
  return (
    <div>
      <header>
        <Link href={home()}>{name}</Link>
        <nav aria-label="Main navigation">
          <Link href={dashboard()}>Dashboard</Link>
          <Link href={editProfile()}>Settings</Link>
          <Form {...logout.form()}>
            {({ processing }) => (
              <button type="submit" disabled={processing}>
                Log out
              </button>
            )}
          </Form>
        </nav>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </header>
      <main>{children}</main>
    </div>
  );
}
