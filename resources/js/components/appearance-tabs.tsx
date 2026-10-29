import { Monitor, Moon, Sun } from 'lucide-react';
import type { ComponentProps } from 'react';
import { useAppearance } from '@/hooks/use-appearance';
import type { Appearance } from '@/hooks/use-appearance';

const options = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
] satisfies { value: Appearance; label: string; icon: typeof Sun }[];

export default function AppearanceTabs({
  className,
  ...props
}: ComponentProps<'fieldset'>) {
  const { appearance, updateAppearance } = useAppearance();

  return (
    <fieldset className={className} {...props}>
      <legend>Color scheme</legend>
      <div>
        {options.map(({ value, label, icon: Icon }) => (
          <label key={value}>
            <input
              type="radio"
              name="appearance"
              value={value}
              checked={appearance === value}
              onChange={() => updateAppearance(value)}
            />
            <Icon aria-hidden="true" />
            {label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
