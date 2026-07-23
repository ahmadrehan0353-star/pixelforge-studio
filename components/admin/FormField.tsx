export default function FormField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-mist-500">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1.5 block text-xs text-mist-700">{hint}</span>}
    </label>
  );
}
