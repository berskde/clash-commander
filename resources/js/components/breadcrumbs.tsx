import { Link } from '@inertiajs/react';
import { toUrl } from '@/lib/utils';
import type { BreadcrumbItem } from '@/types';

export function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: BreadcrumbItem[];
}) {
  if (!breadcrumbs.length) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb">
      <ol>
        {breadcrumbs.map((item, index) => (
          <li key={`${toUrl(item.href)}-${index}`}>
            {index > 0 && <span aria-hidden="true">/</span>}
            {index === breadcrumbs.length - 1 ? (
              <span aria-current="page">{item.title}</span>
            ) : (
              <Link href={item.href}>{item.title}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
