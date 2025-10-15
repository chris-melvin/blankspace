'use client';

import { type TokenMap } from './types';

type StatCardPreviewProps = {
  tokens: TokenMap;
};

export const StatCardPreview = ({ tokens }: StatCardPreviewProps) => {
  const cardColors = tokens.multi
    ? [tokens.primary, tokens.chart[3], tokens.chart[4], tokens.chart[5]]
    : [tokens.accent, tokens.accent, tokens.accent, tokens.accent];

  return (
    <div className="flex flex-wrap gap-4 sm:gap-6">
      {["New Signups", "Active Teams", "Retention", "NPS"].map((title, index) => (
        <div
          key={title}
          className="rounded-lg border p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex-shrink-0 w-full sm:w-auto sm:min-w-[200px]"
          style={{
            backgroundColor: tokens.surface,
            borderTopColor: tokens.border,
            borderRightColor: tokens.border,
            borderBottomColor: tokens.border,
            borderLeftWidth: 4,
            borderLeftColor: cardColors[index],
          }}
        >
          <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: tokens.textMuted }}>
            {title}
          </p>
          <p className="mt-3 text-2xl sm:text-3xl font-bold" style={{ color: tokens.textPrimary }}>
            {index === 0 ? "1,248" : index === 1 ? "87" : index === 2 ? "93%" : "68"}
          </p>
          <p className="mt-2 text-xs flex items-center gap-1" style={{ color: tokens.textMuted }}>
            <span style={{ color: cardColors[index] }}>
              {index % 2 === 0 ? "↗" : "→"}
            </span>
            {index % 2 === 0 ? "4.2% vs last week" : "Trend stable"}
          </p>
        </div>
      ))}
    </div>
  );
};
