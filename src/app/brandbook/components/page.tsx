import { Button } from '@/components/foundations/Button';
import { Card } from '@/components/foundations/Card';
import { Badge } from '@/components/foundations/Badge';

export default function ComponentsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Components</h1>
      <section className="mt-6">
        <h2 className="font-semibold">Buttons</h2>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button color="brand" tone="solid">Primary</Button>
          <Button color="brand" tone="solid" gradient="brandSoft">Primary Gradient</Button>
          <Button color="accent" tone="solid">Accent</Button>
          <Button color="neutral" tone="subtle">Subtle</Button>
          <Button color="neutral" tone="ghost">Ghost</Button>
        </div>
      </section>
      <section className="mt-10">
        <h2 className="font-semibold">Badges</h2>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Badge label="New" color="brand" />
          <Badge label="Beta" color="accent" />
          <Badge label="Stable" color="success" />
          <Badge label="Warning" color="warning" />
          <Badge label="Critical" color="danger" />
        </div>
      </section>
      <section className="mt-10">
        <h2 className="font-semibold">Cards</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Card title="Insights" subtitle="Weekly performance" gradientLeft="brandSoft">
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Your product saw a 4.2% increase in active teams.</p>
          </Card>
          <Card title="Uptime" subtitle="Service health" gradientLeft="brandVibrant">
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>99.98% uptime over the last 30 days.</p>
          </Card>
        </div>
      </section>
    </main>
  );
}


