import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from '@/components/toaster';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';

const appName = import.meta.env.VITE_APP_NAME || 'Clash Commander';

initializeTheme();

void createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  layout: (name) => {
    if (name === 'home') {
      return null;
    }

    if (name.startsWith('auth/')) {
      return AuthLayout;
    }

    if (name.startsWith('settings/')) {
      return [AppLayout, SettingsLayout];
    }

    return AppLayout;
  },
  strictMode: true,
  withApp(app) {
    return (
      <>
        {app}
        <Toaster />
      </>
    );
  },
  progress: {
    color: '#4B5563',
  },
});
