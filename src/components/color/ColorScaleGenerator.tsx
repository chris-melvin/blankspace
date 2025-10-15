'use client';

import { useMemo } from "react";
import { Section } from "@/components/Section";
import { useTokenStore } from "@/store/useTokenStore";
import { useShallow } from "zustand/react/shallow";

const Slider = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  suffix,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (value: number) => void;
}) => {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
      <span className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
        {label}
        <span className="font-mono text-xs text-slate-600 dark:text-slate-200">
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
};

const ColorCard = ({
  label,
  hex,
  locked,
  onToggleLock,
  onHexChange,
}: {
  label: string;
  hex: string;
  locked: boolean;
  onToggleLock: () => void;
  onHexChange: (value: string) => void;
}) => {
  const handleCopy = () => {
    navigator.clipboard?.writeText(hex).catch(() => {
      // no-op when clipboard is unavailable
    });
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-black/5 shadow-sm dark:border-white/10">
      <div
        className="flex h-24 items-end justify-between bg-gradient-to-br from-black/10 to-black/0 p-3 text-white"
        style={{ backgroundColor: hex }}
      >
        <span className="text-sm font-semibold uppercase tracking-wide drop-shadow">
          {label}
        </span>
        <button
          type="button"
          className="rounded bg-black/40 px-2 py-1 text-xs font-semibold backdrop-blur hover:bg-black/60"
          onClick={handleCopy}
        >
          Copy
        </button>
      </div>
      <div className="flex flex-col gap-3 bg-white p-4 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
        <div className="flex items-center justify-between font-mono text-sm">
          <span>{hex.toUpperCase()}</span>
          <label className="relative flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Lock
            </span>
            <input
              type="checkbox"
              checked={locked}
              onChange={onToggleLock}
              className="size-4 accent-slate-900 dark:accent-slate-100"
            />
          </label>
        </div>
        <input
          aria-label={`Adjust ${label} swatch`}
          type="color"
          value={hex}
          disabled={locked}
          onChange={(event) => onHexChange(event.target.value)}
          className="h-9 w-full rounded border border-black/10 bg-transparent disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10"
        />
      </div>
    </div>
  );
};

export const ColorScaleGenerator = () => {
  const {
    colorSeed,
    hueShift,
    chromaScale,
    lightnessBias,
    locks,
    scale,
    actions,
  } = useTokenStore(
    useShallow((state) => ({
      colorSeed: state.colorSeed,
      hueShift: state.hueShift,
      chromaScale: state.chromaScale,
      lightnessBias: state.lightnessBias,
      locks: state.locks,
      scale: state.scale,
      actions: state.actions,
    })),
  );

  const gradients = useMemo(
    () => ({
      background: `linear-gradient(90deg, ${scale
        .map((step) => step.hex)
        .join(", ")})`,
    }),
    [scale],
  );

  return (
    <Section
      title="Color Scale Generator"
      description="Generate perceptually-uniform 10-step color ramps using OKLCH controls. Fine tune hue, chroma, and lightness and pin steps you want to keep."
      actions={
        <button
          type="button"
          className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-black/5 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/10"
          onClick={actions.reset}
        >
          Reset
        </button>
      }
    >
      <div className="rounded-lg border border-black/5 bg-white dark:border-white/10 dark:bg-slate-950">
        <div
          className="h-3 rounded-t-lg"
          style={{
            backgroundImage: gradients.background,
          }}
        />
        <div className="grid gap-6 p-6 sm:grid-cols-[minmax(0,260px)_1fr]">
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                Seed Color
              </span>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={colorSeed}
                  onChange={(event) => actions.setSeed(event.target.value)}
                  className="h-10 w-14 cursor-pointer rounded border border-black/10 bg-transparent dark:border-white/10"
                />
                <input
                  type="text"
                  value={colorSeed}
                  onChange={(event) => actions.setSeed(event.target.value)}
                  className="w-full rounded border border-black/10 bg-white px-3 py-2 font-mono text-sm shadow-sm focus:border-slate-400 focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-200"
                  placeholder="#6750A4"
                />
              </div>
            </label>
            <Slider
              label="Hue Shift"
              min={-90}
              max={90}
              step={1}
              suffix="°"
              value={hueShift}
              onChange={actions.setHueShift}
            />
            <Slider
              label="Chroma Scale"
              min={0.4}
              max={1.6}
              step={0.05}
              value={Number(chromaScale.toFixed(2))}
              onChange={actions.setChromaScale}
            />
            <Slider
              label="Lightness Bias"
              min={-0.25}
              max={0.25}
              step={0.01}
              value={Number(lightnessBias.toFixed(2))}
              onChange={actions.setLightnessBias}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {scale.map((step) => (
              <ColorCard
                key={step.id}
                label={step.label}
                hex={step.hex}
                locked={Boolean(locks[step.id])}
                onToggleLock={() => actions.toggleLock(step.id)}
                onHexChange={(value) => actions.setStepHex(step.id, value)}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
