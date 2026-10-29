import { Head } from '@inertiajs/react';
import AppearanceTabs from '@/components/appearance-tabs';

export default function Appearance() {
  return (
    <>
      <Head title="Appearance settings" />
      <h1>Appearance settings</h1>
      <p>Choose a light or dark appearance, or follow your system setting.</p>
      <AppearanceTabs />
    </>
  );
}
