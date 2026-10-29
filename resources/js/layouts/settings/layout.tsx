import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { toUrl } from '@/lib/utils';
import { edit as editAppearance } from '@/routes/appearance';
import { edit as editProfile } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';
import type { NavItem } from '@/types';

const items: NavItem[] = [
  { title: 'Profile', href: editProfile() },
  { title: 'Security', href: editSecurity() },
  { title: 'Appearance', href: editAppearance() },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
  const { isCurrentUrl } = useCurrentUrl();

  return (
    <>
      <nav aria-label="Settings">
        {items.map((item) => (
          <Link
            key={toUrl(item.href)}
            href={item.href}
            aria-current={isCurrentUrl(item.href) ? 'page' : undefined}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      {children}
    </>
  );
}
