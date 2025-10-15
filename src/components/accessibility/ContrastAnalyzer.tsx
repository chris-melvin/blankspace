'use client';

import { Section } from "@/components/Section";
import { evaluateContrast } from "@/lib/contrast";
import { tokens } from "@/lib/tokens";
import { evaluateGradientContrast } from "@/lib/gradients";
import { useEffect, useState } from "react";
import { useTokenStore } from "@/store/useTokenStore";
import { useShallow } from "zustand/react/shallow";

const Badge = ({ label, active }: { label: string; active: boolean }) => (
  <span
    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
      active
        ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:border-emerald-400 dark:bg-emerald-400/10 dark:text-emerald-300"
        : "border-slate-300 bg-slate-100 text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
    }`}
  >
    {label}
  </span>
);

export const ContrastAnalyzer = () => {
  const { foreground, background, scale, actions } = useTokenStore(
    useShallow((state) => ({
      foreground: state.contrast.foreground,
      background: state.contrast.background,
      scale: state.scale,
      actions: state.actions,
    })),
  );

  const contrast = evaluateContrast(foreground, background);
  const [gradientReport, setGradientReport] = useState<{ min: number; avg: number; max: number } | null>(null);

  // Compute gradient contrast only on the client to avoid SSR/CSR mismatch
  useEffect(() => {
    const report = evaluateGradientContrast(tokens.gradient.brandSoft, foreground, 12);
    setGradientReport(report);
  }, [foreground]);

  return (
    <Section
      title="Contrast Analyzer"
      description="Validate WCAG 2.2 compliance with live text previews. Select text and background combinations directly from your generated palette."
    >
      <div className="grid gap-6 sm:grid-cols-[minmax(0,280px)_1fr]">
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
              Text Color
            </span>
            <select
              value={foreground}
              onChange={(event) =>
                actions.setContrastSelection({ foreground: event.target.value })
              }
              className="rounded border border-black/10 bg-white px-3 py-2 text-sm focus:border-slate-400 focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-200"
            >
              {scale.map((step) => (
                <option key={step.id} value={step.hex}>
                  {step.label} — {step.hex.toUpperCase()}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
              Background
            </span>
            <select
              value={background}
              onChange={(event) =>
                actions.setContrastSelection({ background: event.target.value })
              }
              className="rounded border border-black/10 bg-white px-3 py-2 text-sm focus:border-slate-400 focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-200"
            >
              <optgroup label="Neutrals">
                <option value="#FFFFFF">White — #FFFFFF</option>
                <option value="#F8FAFC">Slate 50 — #F8FAFC</option>
                <option value="#F1F5F9">Slate 100 — #F1F5F9</option>
                <option value="#0F172A">Slate 900 — #0F172A</option>
                <option value="#000000">Black — #000000</option>
              </optgroup>
              <optgroup label="Palette">
                {scale.map((step) => (
                  <option key={step.id} value={step.hex}>
                    {step.label} — {step.hex.toUpperCase()}
                  </option>
                ))}
              </optgroup>
            </select>
          </label>
          <div className="rounded-lg border border-dashed border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-inner dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Contrast Ratio
            </p>
            <p className="text-2xl font-semibold">{contrast.ratio}:1</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge label="AA+" active={contrast.aaa} />
              <Badge label="AA" active={contrast.aa} />
              <Badge label="AA Large" active={contrast.aaLarge} />
              <Badge label="AAA Large" active={contrast.aaaLarge} />
            </div>
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Gradient (brandSoft) min/avg/max vs text
              </p>
              {gradientReport ? (
                <>
                  <p className="text-sm">{gradientReport.min.toFixed(2)} / {gradientReport.avg.toFixed(2)} / {gradientReport.max.toFixed(2)}</p>
                  <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="mr-2">AA min ≥ 4.5:</span>
                    <span className={gradientReport.min >= 4.5 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>
                      {gradientReport.min >= 4.5 ? 'Pass' : 'Fail'}
                    </span>
                  </div>
                </>
              ) : (
                <p className="text-sm opacity-60">— / — / —</p>
              )}
            </div>
          </div>
        </div>
        <div
          className="flex min-h-[240px] flex-col rounded-lg border border-black/5 p-6 shadow-inner transition dark:border-white/10"
          style={{
            color: foreground,
            backgroundColor: background,
          }}
        >
          <div>
            <span className="rounded-full bg-black/10 px-3 py-1 text-xs font-semibold tracking-wide uppercase text-black/60 dark:bg-white/20 dark:text-white/80">
              Live Preview
            </span>
            <h3 className="mt-4 text-2xl font-bold">Blankspace Design System</h3>
            <p className="mt-2 text-base">
              Design tokens stay accessible when contrast requirements stay in the
              green. Tune your palette to hit AA or AAA compliance before shipping.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              <a
                href="#"
                className="underline underline-offset-2 hover:opacity-80"
              >
                Learn more
              </a>
              <span className="rounded-full border border-current/40 px-2 py-0.5 text-xs font-semibold">
                New
              </span>
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium">
                Email address
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded border border-current/30 bg-transparent px-3 py-2 text-sm outline-none placeholder:opacity-70 focus:border-current/60"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
