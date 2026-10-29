import { Link } from '@inertiajs/react';
import type { ComponentProps } from 'react';

export default function TextLink({
  className,
  ...props
}: ComponentProps<typeof Link>) {
  return <Link className={className} {...props} />;
}
