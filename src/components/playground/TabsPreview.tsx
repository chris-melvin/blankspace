'use client';

import { type KeyboardEvent, useState } from "react";
import { type TokenMap } from './types';

type TabsPreviewProps = {
  tokens: TokenMap;
};

export const TabsPreview = ({ tokens }: TabsPreviewProps) => {
  const [activeTab, setActiveTab] = useState("metrics");
  const tabs = [
    {
      value: "metrics",
      label: "Metrics",
      description: "Usage, activation, retention in one stream.",
    },
    {
      value: "engagement",
      label: "Engagement",
      description: "Collaboration stats, comments, and reactions.",
    },
    {
      value: "billing",
      label: "Billing",
      description: "Revenue, seats, and overage alerts for finance.",
    },
  ];

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
      return;
    }

    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + tabs.length) % tabs.length;
    setActiveTab(tabs[nextIndex]?.value ?? tabs[0]!.value);
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        role="tablist"
        aria-label="Workspace insights"
        className="inline-flex items-center gap-1 rounded-lg border p-1 overflow-x-auto w-full sm:w-auto"
        style={{
          borderColor: tokens.border,
          backgroundColor: tokens.surface,
        }}
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${tab.value}-panel`}
              id={`${tab.value}-trigger`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.value)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className="rounded-md px-4 py-2 text-sm font-semibold transition whitespace-nowrap flex-1 sm:flex-none"
              style={{
                backgroundColor: isActive ? tokens.accent : tokens.background,
                color: isActive ? "white" : tokens.textMuted,
                boxShadow: isActive ? `0 0 0 1px ${tokens.accent}` : undefined,
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        id={`${activeTab}-panel`}
        role="tabpanel"
        aria-labelledby={`${activeTab}-trigger`}
        className="space-y-3 rounded-lg border p-4 sm:p-5"
        style={{
          borderColor: tokens.surfaceSubtle,
          backgroundColor: tokens.surface,
        }}
      >
        {(() => {
          const active = tabs.find((tab) => tab.value === activeTab) ?? tabs[0]!;

          return (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold" style={{ color: tokens.textPrimary }}>
                  {active.label}
                </p>
                <p className="text-xs" style={{ color: tokens.textMuted }}>
                  {active.description}
                </p>
              </div>
              <button
                type="button"
                className="rounded-full px-3 py-1 text-xs font-semibold w-full sm:w-auto"
                style={{
                  backgroundColor: tokens.background,
                  color: tokens.accent,
                  borderColor: tokens.accent,
                  borderWidth: 1,
                  borderStyle: "solid",
                }}
              >
                View report
              </button>
            </div>
          );
        })()}
        <div className="flex flex-wrap gap-4">
          {[
            { label: "Active seats", value: "248" },
            { label: "Weekly retention", value: "92%" },
            { label: "Automation saves", value: "14.3h" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border p-3 flex-shrink-0 w-full sm:w-auto sm:min-w-[180px]"
              style={{
                borderColor: tokens.surfaceSubtle,
                backgroundColor: tokens.background,
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: tokens.textMuted }}>
                {stat.label}
              </p>
              <p className="mt-1 text-lg font-semibold" style={{ color: tokens.textPrimary }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
