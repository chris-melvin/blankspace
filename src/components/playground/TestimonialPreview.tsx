'use client';

import { type TokenMap } from './types';

type TestimonialPreviewProps = {
  tokens: TokenMap;
};

export const TestimonialPreview = ({ tokens }: TestimonialPreviewProps) => (
  <div
    className="space-y-6 rounded-xl border p-6 sm:p-8 hover:shadow-lg transition-shadow"
    style={{ borderColor: tokens.border, backgroundColor: tokens.surface }}
  >
    <div className="flex items-center gap-4">
      <div 
        className="size-12 sm:size-14 rounded-full border-2 flex items-center justify-center text-white font-bold text-lg"
        style={{ 
          backgroundColor: tokens.multi ? tokens.chart[3] : tokens.accent,
          borderColor: tokens.multi ? tokens.chart[3] : tokens.accent,
        }}
      >
        AR
      </div>
      <div>
        <p className="text-base font-semibold" style={{ color: tokens.textPrimary }}>
          Alex Rivera
        </p>
        <p className="text-sm" style={{ color: tokens.textMuted }}>
          Head of Product, LumenAI
        </p>
      </div>
    </div>
    <blockquote className="text-base leading-relaxed italic" style={{ color: tokens.textPrimary }}>
      &ldquo;Blankspace let our design system team validate palettes with real UI instantly. The token sync is now part of every design review.&rdquo;
    </blockquote>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            className="size-4 rounded-full"
            style={{ backgroundColor: index < 4 ? (tokens.multi ? tokens.chart[4] : tokens.secondary) : tokens.surfaceSubtle }}
          />
        ))}
      </div>
      <div className="text-xs font-medium" style={{ color: tokens.textMuted }}>
        4.8/5 rating
      </div>
    </div>
  </div>
);
