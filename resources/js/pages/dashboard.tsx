import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {
  const { auth } = usePage().props;

  return (
    <>
      <Head title="Dashboard" />
      <h1>Dashboard</h1>
      <p>You are signed in as {auth.user?.name}.</p>
    </>
  );
}
