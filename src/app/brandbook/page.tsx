import Link from 'next/link';

export default function BrandbookIndex() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>Brandbook</h1>
      <p className="mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
        Foundations and components for a minimal, modern tech brand.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        <li className="rounded-lg border p-4" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
          <h2 className="font-semibold">Tokens</h2>
          <p className="mt-1 text-sm" style={{ color: 'var(--color-text-muted)' }}>Design tokens: color, gradients, typography, spacing.</p>
          <Link className="mt-3 inline-block underline" href="/brandbook/tokens">View tokens</Link>
        </li>
        <li className="rounded-lg border p-4" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
          <h2 className="font-semibold">Colors</h2>
          <p className="mt-1 text-sm" style={{ color: 'var(--color-text-muted)' }}>Brand, accent, semantic colors.</p>
          <Link className="mt-3 inline-block underline" href="/brandbook/colors">View colors</Link>
        </li>
        <li className="rounded-lg border p-4" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
          <h2 className="font-semibold">Gradients</h2>
          <p className="mt-1 text-sm" style={{ color: 'var(--color-text-muted)' }}>Semantic gradient primitives.</p>
          <Link className="mt-3 inline-block underline" href="/brandbook/gradients">View gradients</Link>
        </li>
        <li className="rounded-lg border p-4" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
          <h2 className="font-semibold">Typography</h2>
          <p className="mt-1 text-sm" style={{ color: 'var(--color-text-muted)' }}>Scale, line-height, and families.</p>
          <Link className="mt-3 inline-block underline" href="/brandbook/typography">View typography</Link>
        </li>
        <li className="rounded-lg border p-4 sm:col-span-2" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
          <h2 className="font-semibold">Components</h2>
          <p className="mt-1 text-sm" style={{ color: 'var(--color-text-muted)' }}>Buttons, cards, badges with semantic colors and gradients.</p>
          <Link className="mt-3 inline-block underline" href="/brandbook/components">View components</Link>
        </li>
      </ul>
    </main>
  );
}


