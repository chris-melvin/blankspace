'use client';

import React from 'react';
import { tokens } from '@/lib/tokens';
import { toCssGradient } from '@/lib/gradients';

type SemanticColor = 'brand' | 'accent' | 'neutral' | 'success' | 'warning' | 'danger';
type GradientName = keyof typeof tokens.gradient;

type BadgeProps = {
  label: string;
  color?: SemanticColor;
  gradient?: GradientName;
  className?: string;
  style?: React.CSSProperties;
};

export function Badge({ label, color = 'neutral', gradient, className, style }: BadgeProps) {
  let bg: string | undefined;
  let fg = 'var(--color-text-muted)';
  let border = 'var(--color-border)';

  if (!gradient) {
    if (color === 'brand') {
      bg = 'hsl(220 90% 56% / 0.10)';
      fg = 'hsl(220 90% 56%)';
      border = 'hsl(220 90% 56% / 0.40)';
    } else if (color === 'accent') {
      bg = 'hsl(260 85% 66% / 0.10)';
      fg = 'hsl(260 85% 66%)';
      border = 'hsl(260 85% 66% / 0.40)';
    } else if (color === 'success') {
      bg = 'hsl(150 65% 46% / 0.10)';
      fg = 'hsl(150 65% 46%)';
      border = 'hsl(150 65% 46% / 0.40)';
    } else if (color === 'warning') {
      bg = 'hsl(35 95% 60% / 0.10)';
      fg = 'hsl(35 95% 60%)';
      border = 'hsl(35 95% 60% / 0.40)';
    } else if (color === 'danger') {
      bg = 'hsl(0 80% 58% / 0.10)';
      fg = 'hsl(0 80% 58%)';
      border = 'hsl(0 80% 58% / 0.40)';
    } else {
      bg = 'var(--color-surface-muted)';
    }
  }

  const gradientStyle: React.CSSProperties | undefined = gradient
    ? { backgroundImage: toCssGradient(tokens.gradient[gradient]) }
    : undefined;

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 10px',
        borderRadius: 999,
        fontSize: 'var(--font-size-xs)',
        fontWeight: 600,
        color: fg,
        backgroundColor: gradient ? undefined : bg,
        border: `1px solid ${border}`,
        ...gradientStyle,
        ...style,
      }}
    >
      {label}
    </span>
  );
}


