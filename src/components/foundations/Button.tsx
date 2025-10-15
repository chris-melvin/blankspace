'use client';

import React from 'react';
import { tokens } from '@/lib/tokens';
import { toCssGradient } from '@/lib/gradients';

type SemanticColor = 'brand' | 'accent' | 'neutral' | 'success' | 'warning' | 'danger';
type Tone = 'solid' | 'subtle' | 'ghost';
type GradientName = keyof typeof tokens.gradient;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: SemanticColor;
  tone?: Tone;
  gradient?: GradientName;
  fullWidth?: boolean;
};

export function Button({ color = 'brand', tone = 'solid', gradient, fullWidth, style, className, children, ...rest }: ButtonProps) {
  const base: React.CSSProperties = {
    borderRadius: '10px',
    padding: '10px 14px',
    fontWeight: 600,
    transition: 'background-color 200ms ease, box-shadow 200ms ease, transform 120ms ease',
  };

  let bg: string | undefined;
  let fg = 'var(--color-text)';
  let border = 'var(--color-border)';

  if (tone === 'ghost') {
    bg = 'transparent';
  } else if (tone === 'subtle') {
    bg = 'var(--color-surface-muted)';
  } else {
    // solid
    if (color === 'brand') {
      bg = 'var(--color-brand-50)';
      fg = 'white';
      border = 'transparent';
    } else if (color === 'accent') {
      bg = 'var(--color-accent-50)';
      fg = 'white';
      border = 'transparent';
    } else if (color === 'neutral') {
      bg = 'var(--color-surface-elevated)';
    } else if (color === 'success') {
      bg = 'hsl(150 65% 46%)';
      fg = 'white';
      border = 'transparent';
    } else if (color === 'warning') {
      bg = 'hsl(35 95% 60%)';
      fg = 'black';
      border = 'transparent';
    } else if (color === 'danger') {
      bg = 'hsl(0 80% 58%)';
      fg = 'white';
      border = 'transparent';
    }
  }

  const gradientStyle: React.CSSProperties | undefined = gradient
    ? { backgroundImage: toCssGradient(tokens.gradient[gradient]) }
    : undefined;

  return (
    <button
      className={className}
      style={{
        ...base,
        width: fullWidth ? '100%' : undefined,
        color: fg,
        backgroundColor: gradient ? undefined : bg,
        border: `1px solid ${border}`,
        boxShadow: tone === 'solid' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
        ...gradientStyle,
        ...style,
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'translateY(1px)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
      }}
      {...rest}
    >
      {children}
    </button>
  );
}


