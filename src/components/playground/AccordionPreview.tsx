'use client';

import { useState } from "react";
import { type TokenMap } from './types';

type AccordionPreviewProps = {
  tokens: TokenMap;
};

export const AccordionPreview = ({ tokens }: AccordionPreviewProps) => {
  const [openItem, setOpenItem] = useState<string | null>("1");

  const items = [
    {
      value: "1",
      title: "Automations now support branching",
      content: "Design tokens sync across all flow variants so QA sees every edge.",
      color: tokens.chart[3], // Success green
    },
    {
      value: "2",
      title: "Figma plugin parity",
      content: "Preview new gradients, primitives, and typography sets directly in Figma.",
      color: tokens.chart[4], // Warning amber
    },
    {
      value: "3",
      title: "CLI pipelines",
      content: "Trigger token exports in CI with signed manifests and audit trails.",
      color: tokens.chart[5], // Error red
    },
  ];

  return (
    <div className="space-y-3 rounded-xl border p-4 sm:p-5" style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}>
      <header className="space-y-1">
        <p className="text-sm font-semibold" style={{ color: tokens.textPrimary }}>
          Release cadence
        </p>
        <p className="text-xs" style={{ color: tokens.textMuted }}>
          Accordion patterns reveal how surfaces, borders, and text tokens layer.
        </p>
      </header>
      <div className="space-y-2">
        {items.map((item) => {
          const isOpen = openItem === item.value;

          return (
            <div key={item.value} className="overflow-hidden rounded-lg border" style={{ borderColor: tokens.surfaceSubtle }}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`accordion-${item.value}`}
                id={`accordion-${item.value}-trigger`}
                className="flex w-full items-center justify-between gap-4 px-3 sm:px-4 py-3 text-left text-sm font-medium"
                style={{
                  backgroundColor: isOpen ? tokens.surface : tokens.background,
                  color: tokens.textPrimary,
                }}
                onClick={() => setOpenItem(isOpen ? null : item.value)}
              >
                <span className="text-left">{item.title}</span>
                <span
                  aria-hidden="true"
                  className="inline-flex size-6 items-center justify-center rounded-full text-xs font-semibold flex-shrink-0"
                  style={{
                    backgroundColor: isOpen ? item.color : tokens.surface,
                    color: isOpen ? "white" : tokens.textMuted,
                    borderColor: tokens.surfaceSubtle,
                    borderWidth: 1,
                    borderStyle: "solid",
                  }}
                >
                  {isOpen ? "–" : "+"}
                </span>
              </button>
              {isOpen ? (
                <div
                  id={`accordion-${item.value}`}
                  role="region"
                  aria-labelledby={`accordion-${item.value}-trigger`}
                  className="border-t px-3 sm:px-4 py-3 text-sm"
                  style={{
                    backgroundColor: tokens.surface,
                    borderColor: tokens.surfaceSubtle,
                    color: tokens.textMuted,
                  }}
                >
                  {item.content}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
