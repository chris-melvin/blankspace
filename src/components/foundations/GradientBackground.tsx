'use client';

import React from 'react';
import { tokens } from '@/lib/tokens';
import { toCssGradient } from '@/lib/gradients';

type GradientName = keyof typeof tokens.gradient;

type GradientBackgroundProps = {
  gradient: GradientName;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

export function GradientBackground({ gradient, className, style, children }: GradientBackgroundProps) {
  const css = { backgroundImage: toCssGradient(tokens.gradient[gradient]) } as const;
  return (
    <div className={className} style={{ ...css, ...style }}>
      {children}
    </div>
  );
}


