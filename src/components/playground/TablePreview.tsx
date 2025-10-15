'use client';

import { type TokenMap } from './types';

type TablePreviewProps = {
  tokens: TokenMap;
};

export const TablePreview = ({ tokens }: TablePreviewProps) => {
  const statusColors = [
    tokens.chart[4], // Warning amber
    tokens.chart[3], // Success green
    tokens.chart[5], // Error red
  ];

  const statusLabels = ["In Review", "Completed", "Blocked"];

  return (
    <div className="overflow-hidden rounded-lg border" style={{ borderColor: tokens.border }}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y text-left text-sm" style={{ color: tokens.textPrimary }}>
          <thead style={{ backgroundColor: tokens.surface, color: tokens.textMuted }}>
            <tr>
              {["Project", "Owner", "Status", "Updated"].map((header) => (
                <th key={header} className="px-4 sm:px-6 py-4 font-semibold uppercase tracking-wide text-xs">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
        <tbody className="divide-y" style={{ borderColor: tokens.surfaceSubtle }}>
          {[1, 2, 3].map((row) => {
            const badgeColor = tokens.multi ? statusColors[row - 1] : tokens.accent;
            return (
              <tr key={row} style={{ backgroundColor: row % 2 ? tokens.surface : tokens.background }}>
                <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium">Vision OS Migration</td>
                <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm" style={{ color: tokens.textMuted }}>
                  Jordan Wells
                </td>
                <td className="px-4 sm:px-6 py-3 sm:py-4">
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ backgroundColor: badgeColor, color: "white", boxShadow: `0 0 0 1px ${badgeColor}20` }}
                  >
                    {statusLabels[row - 1]}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-right" style={{ color: tokens.textMuted }}>
                  {row === 1 ? "2h ago" : row === 2 ? "1d ago" : "3d ago"}
                </td>
              </tr>
            );
          })}
        </tbody>
        </table>
      </div>
    </div>
  );
};
