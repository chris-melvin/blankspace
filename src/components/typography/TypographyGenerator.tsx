'use client';

import { Section } from "@/components/Section";
import { googleFontPreviews } from "@/lib/typography";
import { useTokenStore } from "@/store/useTokenStore";
import { useShallow } from "zustand/react/shallow";

const SliderField = ({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (value: number) => void;
}) => (
  <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
    <span className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
      {label}
      <span className="font-mono text-xs">
        {value}
        {suffix}
      </span>
    </span>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      className="accent-slate-900 dark:accent-slate-100"
    />
  </label>
);

export const TypographyGenerator = () => {
  const { typography, setTypography } = useTokenStore(
    useShallow((state) => ({
      typography: state.typography,
      setTypography: state.actions.setTypography,
    })),
  );

  return (
    <Section
      title="Typography Generator"
      description="Build an 8-step responsive typography scale. Choose a reference font, tweak the modular ratio, and preview copy in real time."
    >
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
              Font Family
            </span>
            <select
              value={typography.font}
              onChange={(event) =>
                setTypography({ font: event.target.value })
              }
              className="rounded border border-black/10 bg-white px-3 py-2 text-sm focus:border-slate-400 focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-200"
            >
              {googleFontPreviews.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
          </label>
          <SliderField
            label="Base Size"
            min={14}
            max={22}
            step={1}
            value={typography.baseSize}
            suffix="px"
            onChange={(value) => setTypography({ baseSize: value })}
          />
          <SliderField
            label="Scale Ratio"
            min={1.1}
            max={1.6}
            step={0.01}
            value={Number(typography.ratio.toFixed(2))}
            onChange={(value) => setTypography({ ratio: value })}
          />
        </div>
        <div
          className="flex flex-col gap-5 rounded-xl border border-black/5 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/70"
          style={{
            fontFamily: `"${typography.font}", system-ui, sans-serif`,
          }}
        >
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
              Preview
            </span>
            <h3 className="text-3xl font-semibold tracking-tight">
              Design tokens meet editorial rhythm
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {typography.font} stack, {typography.baseSize}px base, {typography.ratio.toFixed(2)}
              × modular scale. Adjust the ratio to align with your design system&apos;s vertical
              rhythm.
            </p>
          </div>
          <div className="grid gap-3">
            {typography.scale.map((step) => (
              <div
                key={step.id}
                className="flex items-center justify-between rounded-lg border border-black/5 bg-white/50 px-4 py-3 font-semibold text-slate-800 shadow-sm dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-100"
                style={{ fontSize: step.rem }}
              >
                <span className="uppercase tracking-wide">{step.label}</span>
                <span className="font-mono text-xs text-slate-500 dark:text-slate-300">
                  {step.px}px / {step.rem}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
