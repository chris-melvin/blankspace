'use client';

import React from 'react';
import { tokens } from '@/lib/tokens';
import { toCssGradient } from '@/lib/gradients';

type GradientName = keyof typeof tokens.gradient;

type CardProps = {
  title?: string;
  subtitle?: string;
  gradientLeft?: GradientName;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export function Card({ title, subtitle, gradientLeft, children, className, style }: CardProps) {
  const leftBar: React.CSSProperties | undefined = gradientLeft
    ? { backgroundImage: toCssGradient(tokens.gradient[gradientLeft]) }
    : { backgroundColor: 'var(--color-brand-50)' };
  return (
    <div
      className={className}
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div style={{ display: 'flex' }}>
        <div style={{ width: 4, ...leftBar }} />
        <div style={{ padding: '16px' }}>
          {title ? (
            <h3 style={{ margin: 0, color: 'var(--color-text)', fontSize: 'var(--font-size-lg)' }}>{title}</h3>
          ) : null}
          {subtitle ? (
            <p style={{ marginTop: 6, color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>{subtitle}</p>
          ) : null}
          <div style={{ marginTop: title || subtitle ? 12 : 0 }}>{children}</div>
        </div>
      </div>
    </div>
  );
}


