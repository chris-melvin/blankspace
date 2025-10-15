import { tokens } from '@/lib/tokens';
import { toCssGradient } from '@/lib/gradients';

export default function GradientsPage() {
  const entries = Object.entries(tokens.gradient);
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Gradients</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {entries.map(([name, def]) => (
          <div key={name} className="rounded border p-4" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
            <div className="h-24 w-full rounded" style={{ backgroundImage: toCssGradient(def) }} />
            <p className="mt-2 text-sm font-medium" style={{ color: 'var(--color-text)' }}>{name}</p>
            <code className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{JSON.stringify(def)}</code>
          </div>
        ))}
      </div>
    </main>
  );
}


