import type { HTMLAttributes } from 'react';

export default function InputError({
  message,
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
  return message ? (
    <p {...props} role="alert" className={className}>
      {message}
    </p>
  ) : null;
}
