import { afterEach, beforeEach, expect, test, vi } from 'vite-plus/test';

beforeEach(() => {
  vi.resetModules();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function mockBrowser(storageFailure?: 'read' | 'write') {
  const document = {
    cookie: '',
    documentElement: {
      classList: { toggle: vi.fn() },
      style: { colorScheme: '' },
    },
  };

  vi.stubGlobal('document', document);
  vi.stubGlobal('window', {
    matchMedia: () => ({ matches: false, addEventListener: vi.fn() }),
  });
  vi.stubGlobal('localStorage', {
    getItem: () => {
      if (storageFailure === 'read') {
        throw new Error('Browser storage is unavailable');
      }

      return 'dark';
    },
    setItem: () => {
      if (storageFailure === 'write') {
        throw new Error('Browser storage is unavailable');
      }
    },
  });

  return document;
}

test('restores the saved theme on startup', async () => {
  const document = mockBrowser();
  const { initializeTheme } = await import('@/hooks/use-appearance');

  initializeTheme();

  expect(document.documentElement.style.colorScheme).toBe('dark');
  expect(document.documentElement.classList.toggle).toHaveBeenCalledWith(
    'dark',
    true,
  );
});

test.each(['read', 'write'] as const)(
  'starts the app when browser storage rejects %s access',
  async (operation) => {
    const document = mockBrowser(operation);
    const { initializeTheme } = await import('@/hooks/use-appearance');

    expect(() => initializeTheme()).not.toThrow();
    expect(document.documentElement.style.colorScheme).toBe(
      operation === 'read' ? 'light' : 'dark',
    );
  },
);
