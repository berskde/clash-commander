export default function Heading({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <header>
      <h2 className={className}>{title}</h2>
      {description && <p>{description}</p>}
    </header>
  );
}
