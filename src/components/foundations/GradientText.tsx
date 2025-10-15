'use client';

import React from 'react';
import { tokens } from '@/lib/tokens';
import { toCssGradient } from '@/lib/gradients';

type GradientName = keyof typeof tokens.gradient;

type GradientTextProps = {
  gradient: GradientName;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export function GradientText({ gradient, className, style, children }: GradientTextProps) {
  const css = { backgroundImage: toCssGradient(tokens.gradient[gradient]) } as const;
  return (
    <span
      className={className}
      style={{
        ...css,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        ...style,
      }}
    >
      {children}
    </span>
  );
}


