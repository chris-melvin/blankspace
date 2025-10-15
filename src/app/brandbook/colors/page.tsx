const Swatch = ({ label, varName }: { label: string; varName: string }) => (
  <div className="rounded border p-3" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
    <div className="h-12 w-24 rounded" style={{ background: `var(${varName})` }} />
    <p className="mt-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>{label}</p>
    <code className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{varName}</code>
  </div>
);

export default function ColorsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Colors</h1>
      <section className="mt-6">
        <h2 className="font-semibold">Semantic</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          <Swatch label="Surface" varName="--color-surface" />
          <Swatch label="Surface Elevated" varName="--color-surface-elevated" />
          <Swatch label="Surface Muted" varName="--color-surface-muted" />
          <Swatch label="Text" varName="--color-text" />
          <Swatch label="Text Muted" varName="--color-text-muted" />
          <Swatch label="Border" varName="--color-border" />
          <Swatch label="Focus" varName="--color-focus" />
          <Swatch label="Brand FG" varName="--color-brand-fg" />
          <Swatch label="Brand BG" varName="--color-brand-bg" />
        </div>
      </section>
      <section className="mt-10">
        <h2 className="font-semibold">Scales</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          {([30,40,50,60] as const).map(step => (
            <Swatch key={`brand-${step}`} label={`brand ${step}`} varName={`--color-brand-${step}`} />
          ))}
          {([40,50] as const).map(step => (
            <Swatch key={`accent-${step}`} label={`accent ${step}`} varName={`--color-accent-${step}`} />
          ))}
        </div>
      </section>
    </main>
  );
}


