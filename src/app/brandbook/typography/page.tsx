import { tokens } from '@/lib/tokens';

export default function TypographyPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Typography</h1>
      <section className="mt-6">
        <h2 className="font-semibold">Scale</h2>
        <div className="mt-4 grid gap-4">
          {tokens.typography.scale.map(step => (
            <div key={step.label} className="rounded border p-4" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
              <div style={{ fontSize: `var(--font-size-${step.label})`, lineHeight: String(step.lineHeight), fontWeight: step.weight }}>
                The quick brown fox jumps over the lazy dog — {step.label}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-10">
        <h2 className="font-semibold">Families</h2>
        <div className="mt-4 grid gap-4">
          <div className="rounded border p-4" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)', fontFamily: 'var(--font-sans)' }}>
            Sans: var(--font-sans)
          </div>
          <div className="rounded border p-4" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)', fontFamily: 'var(--font-mono)' }}>
            Mono: var(--font-mono)
          </div>
        </div>
      </section>
    </main>
  );
}


