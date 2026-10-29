export default function AlertError({
  errors,
  title = 'Something went wrong.',
}: {
  errors: string[];
  title?: string;
}) {
  return (
    <div role="alert">
      <p>{title}</p>
      <ul>
        {Array.from(new Set(errors)).map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </div>
  );
}
