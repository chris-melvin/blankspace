'use client';

import { type TokenMap } from './types';
import { Card } from '@/components/foundations/Card';
import { tokens as designTokens } from '@/lib/tokens';

type StatCardPreviewProps = {
  tokens: TokenMap;
};

export const StatCardPreview = ({ tokens: uiTokens }: StatCardPreviewProps) => {
  type GradientName = Extract<keyof typeof designTokens.gradient, string>;
  const gradients: GradientName[] = uiTokens.multi
    ? ['brandSoft', 'brandVibrant', 'accentSoft', 'brandSoft']
    : ['accentSoft', 'accentSoft', 'accentSoft', 'accentSoft'];

  return (
    <div className="flex flex-wrap gap-4 sm:gap-6">
      {["New Signups", "Active Teams", "Retention", "NPS"].map((title, index) => (
        <div key={title} className="flex-shrink-0 w-full sm:w-auto sm:min-w-[220px]">
          <Card title={title} gradientLeft={gradients[index]}>
            <p className="mt-1 text-2xl sm:text-3xl font-bold" style={{ color: uiTokens.textPrimary }}>
              {index === 0 ? "1,248" : index === 1 ? "87" : index === 2 ? "93%" : "68"}
            </p>
            <p className="mt-2 text-xs flex items-center gap-1" style={{ color: uiTokens.textMuted }}>
              <span>
                {index % 2 === 0 ? "↗" : "→"}
              </span>
              {index % 2 === 0 ? "4.2% vs last week" : "Trend stable"}
            </p>
          </Card>
        </div>
      ))}
    </div>
  );
};
