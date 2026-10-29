import { Toaster as Sonner, type ToasterProps } from 'sonner';
import { useAppearance } from '@/hooks/use-appearance';
import { useFlashToast } from '@/hooks/use-flash-toast';

export function Toaster(props: ToasterProps) {
  const { resolvedAppearance } = useAppearance();

  useFlashToast();

  return (
    <Sonner
      theme={resolvedAppearance}
      position="bottom-right"
      closeButton
      {...props}
    />
  );
}
