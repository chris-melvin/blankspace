import { tokens } from '@/lib/tokens';

export default function TokensPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Tokens</h1>
      <section className="mt-8">
        <h2 className="font-semibold">Typography</h2>
        <div className="mt-4 grid gap-3">
          {tokens.typography.scale.map(step => (
            <div key={step.label} className="flex items-center justify-between rounded border p-3" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
              <span style={{ fontSize: `var(--font-size-${step.label})`, lineHeight: String(step.lineHeight), fontWeight: step.weight }}>{step.label}</span>
              <code className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{step.px}px</code>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-10">
        <h2 className="font-semibold">Radii</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {Object.entries(tokens.radii).map(([k, v]) => (
            <div key={k} className="rounded border p-3" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
              <div className="h-10 w-20" style={{ background: 'var(--color-surface-muted)', borderRadius: v }} />
              <p className="mt-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>{k}: {v}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-10">
        <h2 className="font-semibold">Shadows</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {Object.entries(tokens.shadows).map(([k, v]) => (
            <div key={k} className="rounded border p-6" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)', boxShadow: v }}>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{k}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}


