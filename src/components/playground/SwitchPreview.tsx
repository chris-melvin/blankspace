'use client';

import { useId, useState } from "react";
import { type TokenMap } from './types';

type SwitchPreviewProps = {
  tokens: TokenMap;
};

export const SwitchPreview = ({ tokens }: SwitchPreviewProps) => {
  const [states, setStates] = useState({
    updates: true,
    digests: false,
    automation: true,
  });

  const toggle = (key: keyof typeof states) => {
    setStates((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const baseId = useId();

  return (
    <div className="space-y-4 rounded-xl border p-4 sm:p-5" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
      <header className="space-y-1">
        <p className="text-sm font-semibold" style={{ color: tokens.textPrimary }}>
          Notification toggles
        </p>
        <p className="text-xs" style={{ color: tokens.textMuted }}>
          Switch patterns mirror Radix primitives with semantic tokens.
        </p>
      </header>
      <div className="space-y-4">
        {(
          [
            { key: "updates" as const, label: "Product updates", description: "Launches, invites, and template drops.", color: tokens.chart[3] },
            { key: "digests" as const, label: "Executive digest", description: "Weekly KPIs for leadership inboxes.", color: tokens.chart[4] },
            { key: "automation" as const, label: "Automation nudges", description: "When flows are idle or need approval.", color: tokens.chart[5] },
          ] as const
        ).map((item) => {
          const switchId = `${baseId}-${item.key}`;
          const isOn = states[item.key];

          return (
            <div
              key={item.key}
              className="flex items-center justify-between gap-4 rounded-lg border p-3"
              style={{ borderColor: tokens.surfaceSubtle }}
            >
              <div className="space-y-1 flex-1 min-w-0">
                <label htmlFor={switchId} className="text-sm font-medium block" style={{ color: tokens.textPrimary }}>
                  {item.label}
                </label>
                <p className="text-xs" style={{ color: tokens.textMuted }}>
                  {item.description}
                </p>
              </div>
              <button
                id={switchId}
                type="button"
                role="switch"
                aria-checked={isOn}
                onClick={() => toggle(item.key)}
                className="relative inline-flex h-6 w-11 items-center rounded-full border transition flex-shrink-0"
                style={{
                  borderColor: isOn ? item.color : tokens.surfaceSubtle,
                  backgroundColor: isOn ? item.color : tokens.background,
                }}
              >
                <span
                  className="inline-block size-4 translate-x-1 rounded-full shadow-sm transition"
                  style={{
                    transform: isOn ? "translateX(18px)" : "translateX(4px)",
                    backgroundColor: isOn ? tokens.surface : tokens.textMuted,
                  }}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
