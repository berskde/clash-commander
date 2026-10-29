import { Eye, EyeOff } from 'lucide-react';
import type { ComponentProps } from 'react';
import { useState } from 'react';

export default function PasswordInput({
  className,
  ref,
  ...props
}: Omit<ComponentProps<'input'>, 'type'>) {
  const [showPassword, setShowPassword] = useState(false);
  const Icon = showPassword ? EyeOff : Eye;

  return (
    <div>
      <input
        type={showPassword ? 'text' : 'password'}
        className={className}
        ref={ref}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword((previous) => !previous)}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
        aria-pressed={showPassword}
        aria-controls={props.id}
        disabled={props.disabled}
      >
        <Icon aria-hidden="true" />
      </button>
    </div>
  );
}
