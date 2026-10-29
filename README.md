# Clash Commander

Laravel, Inertia.js, React and TypeScript with Vite+. Development uses SQLite.
The setup includes unstyled pages, native forms and reusable infrastructure.
Layout and design will be developed later. The domain-specific rewrite has not
started yet.

## Development

For the initial setup:

```sh
composer install
cp .env.example .env
touch database/database.sqlite
php artisan key:generate
php artisan migrate
npm ci
```

Keep `DB_CONNECTION=sqlite` and set the desired `APP_NAME` in `.env`.
Then run `composer dev` to start Laravel, Vite and the other development
processes. Laravel and Vite can also be started separately with
`php artisan serve` and `npm run dev`.

Frontend code uses two spaces for indentation. PHP, Blade and `composer.json`
use four. EditorConfig and the formatters follow these conventions.

## Included infrastructure

- Laravel routing, form requests, validation, migrations and SQLite.
- Inertia integration with basic React layouts and native HTML forms.
- Fortify registration, login, logout and password resets, plus profile
  management and account deletion.
- Two-factor authentication, including setup and recovery codes.
- Passkey registration, authentication and removal.
- Appearance settings with light, dark and system modes, persistence and theme
  application before the first render.
- Global toast notifications with Sonner and typed Inertia flash messages.
- Independent helpers for breadcrumbs, user information, icons and spinners.
- `cn` for conditional classes and class merging, CVA for future typed component
  variants and `tw-animate-css` for animations.
- Reusable hooks for the clipboard, current URLs, initials and mobile views,
  plus form helpers such as password visibility controls.
- Wayfinder for typed routes, Vite+ for builds, formatting and linting with
  React Hooks rules, and the React Compiler.

Tailwind CSS, Sonner, Lucide, CVA, `tw-animate-css`, `clsx` and `tailwind-merge`
are available independently of a component framework. Helpers in
`resources/js/components` use native React and HTML elements.
`resources/css/app.css` contains CSS imports, Tailwind source paths and light/dark
mode integration through the native `color-scheme`. Custom global styles for
the body, headings, links, buttons and inputs, along with predefined page widths,
spacing and typography, have been removed. Layouts provide semantic structure
and navigation to the available features.

Compose dynamic classes with `cn` from `@/lib/utils`, which uses `clsx` and
`tailwind-merge` internally. CVA is available for future component variants;
additional classes can be merged with `cn`. Animations are available through the
`tw-animate-css` import. Functional styling, such as loading animations and
contrast for the 2FA QR code, is retained. OTP entry uses a native input without
an additional library.

The toaster in `resources/js/components/toaster.tsx` is mounted in
`resources/js/app.tsx`. Trigger toasts directly with `toast.success(...)`,
`toast.error(...)` and other helpers from `sonner`, or send a typed Inertia flash
message from the server, for example:

```php
Inertia::flash('toast', ['type' => 'success', 'message' => 'Saved.']);
```

Hooks for appearance, the clipboard, URLs, initials, mobile views and 2FA remain
reusable. The 2FA hook provides QR codes, setup keys, recovery codes, loading
states and error handling. Passkey authentication supports custom routes and
labels. Authentication, navigation, layout and flash message types are available
for custom interfaces.

shadcn/ui, Radix, their design tokens and associated configuration have been
removed, along with demo content and predefined header, sidebar and auth layout
variants. Login, registration, account management, 2FA and passkeys remain usable
with native forms. Favicons, the Apple touch icon and font integration are kept
as replaceable foundations.

The project uses npm and `package-lock.json`. The pnpm configuration has been
removed. Setup, development and CI use the same package manager.

The build tools manage compatible native platform packages for Tailwind Oxide
and Lightning CSS. Additional direct Linux/Windows dependencies and the old
Rollup pins are unnecessary; the current Vite+ build uses Rolldown.
`@laravel/multiplex` and `concurrently` are retained for `composer dev` on Linux
and Windows, respectively.

## Checks

```sh
npm run build
npm run build:ssr
npm run types:check
npm run test
composer ci:check
```

`composer ci:check` runs frontend formatting and lint checks, TypeScript checks,
frontend tests, Pint, PHPStan and the existing PHP tests. PHPStan uses the PHP
environment's memory limit. PHP tests use a separate in-memory SQLite database.

Frontend tests live in `resources/js/tests/` and use the test runner bundled with
Vite+. They cover theme initialization, including unavailable browser storage.
