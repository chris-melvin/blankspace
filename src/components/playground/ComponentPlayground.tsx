'use client';

import { Section } from "@/components/Section";
import { useTokenStore } from "@/store/useTokenStore";

const TokenSwatch = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between rounded-lg border border-black/5 bg-white/60 p-3 text-sm dark:border-white/10 dark:bg-slate-900/60">
    <div className="flex items-center gap-3">
      <span
        className="size-8 rounded-full border border-black/10 shadow-sm dark:border-white/10"
        style={{ backgroundColor: value }}
      />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
          {label}
        </p>
        <p className="font-mono text-xs">{value.toUpperCase()}</p>
      </div>
    </div>
  </div>
);

export const ComponentPlayground = () => {
  const scale = useTokenStore((state) => state.scale);

  const tokens = {
    background: scale[0]?.hex ?? "#ffffff",
    surface: scale[1]?.hex ?? "#f6f6f6",
    surfaceSubtle: scale[2]?.hex ?? "#e5e5e5",
    surfaceStrong: scale[8]?.hex ?? "#1f2933",
    textPrimary: scale[8]?.hex ?? "#111827",
    textMuted: scale[6]?.hex ?? "#4b5563",
    accent: scale[5]?.hex ?? "#6366f1",
    accentHover: scale[6]?.hex ?? "#4f46e5",
    border: scale[3]?.hex ?? "#d1d5db",
    chart: [
      scale[9]?.hex ?? "#0f172a",
      scale[7]?.hex ?? "#4338ca",
      scale[4]?.hex ?? "#818cf8",
    ],
  };

  return (
    <Section
      title="Component Playground"
      description="Audit how your tokens apply to real UI primitives. Buttons, forms, cards, badges, and data viz all update instantly as you tweak the palette."
    >
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div
          className="flex flex-col gap-6 rounded-xl border border-black/5 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/80"
          style={{ backgroundColor: tokens.background, color: tokens.textPrimary }}
        >
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="rounded-full px-5 py-2 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5"
              style={{
                backgroundColor: tokens.accent,
                color: tokens.surface,
              }}
            >
              Primary Action
            </button>
            <button
              type="button"
              className="rounded-full border px-5 py-2 text-sm font-semibold transition hover:bg-black/5"
              style={{
                borderColor: tokens.border,
                color: tokens.textPrimary,
              }}
            >
              Secondary
            </button>
            <button
              type="button"
              className="rounded-full border px-5 py-2 text-sm font-semibold transition hover:bg-black/5"
              style={{
                borderColor: tokens.border,
                color: tokens.textMuted,
              }}
            >
              Ghost
            </button>
          </div>

          <div
            className="grid gap-4 rounded-xl border p-6 shadow-inner dark:border-white/10"
            style={{
              backgroundColor: tokens.surface,
              borderColor: tokens.border,
            }}
          >
            <div>
              <span
                className="rounded-full bg-black/10 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-black/60"
                style={{ color: tokens.textMuted }}
              >
                Card
              </span>
              <h3 className="mt-3 text-xl font-semibold">Tokens in Context</h3>
              <p className="mt-2 text-sm" style={{ color: tokens.textMuted }}>
                Update the palette and see surface, accent, and text tokens update live.
                This helps designers sign off before handoff.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <label className="flex flex-col gap-2 text-sm font-semibold">
                Email
                <input
                  type="email"
                  placeholder="alex@blankspace.dev"
                  className="rounded-lg border bg-white/80 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{
                    borderColor: tokens.border,
                    color: tokens.textPrimary,
                  }}
                />
              </label>
              <div
                className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                style={{
                  backgroundColor: tokens.accent,
                  color: tokens.surface,
                }}
              >
                <span>Badge</span>
                <span style={{ color: tokens.surface }}>{tokens.accent.toUpperCase()}</span>
              </div>
            </div>
          </div>

          <div
            className="grid gap-3 rounded-xl border p-6 dark:border-white/10"
            style={{
              backgroundColor: tokens.surfaceSubtle,
              borderColor: tokens.border,
            }}
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold uppercase tracking-wide">
                Accessibility Checklist
              </h4>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600">
                AA 100%
              </span>
            </div>
            <div className="space-y-2 text-sm" style={{ color: tokens.textMuted }}>
              <p>✔️ Buttons pass AA contrast</p>
              <p>✔️ Body copy passes AAA</p>
              <p>⚠️ Tooltips need another review</p>
            </div>
          </div>

          <div
            className="rounded-xl border p-6 dark:border-white/10"
            style={{
              backgroundColor: tokens.surface,
              borderColor: tokens.border,
            }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Theme Metrics
            </h4>
            <div className="mt-4 flex items-end gap-3">
              {tokens.chart.map((value, index) => (
                <div
                  key={value + index}
                  className="flex-1 rounded-t-lg"
                  style={{
                    height: `${120 + index * 20}px`,
                    backgroundColor: value,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <TokenSwatch label="bg.surface" value={tokens.surface} />
          <TokenSwatch label="fg.default" value={tokens.textPrimary} />
          <TokenSwatch label="fg.muted" value={tokens.textMuted} />
          <TokenSwatch label="accent.primary" value={tokens.accent} />
          <TokenSwatch label="border.default" value={tokens.border} />
          <TokenSwatch label="chart.palette[0]" value={tokens.chart[0]} />
        </div>
      </div>
    </Section>
  );
};
