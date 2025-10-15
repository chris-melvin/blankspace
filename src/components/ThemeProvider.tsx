'use client';

import React, { useEffect } from 'react';
import { tokens } from '@/lib/tokens';

type Theme = 'light' | 'dark';

function applyCssVariables(root: HTMLElement, theme: Theme) {
  // Base semantic colors
  const isDark = theme === 'dark';
  root.style.setProperty('--color-surface', isDark ? 'hsl(220 10% 6%)' : 'hsl(0 0% 100%)');
  root.style.setProperty('--color-surface-elevated', isDark ? 'hsl(220 9% 10%)' : 'hsl(220 12% 98%)');
  root.style.setProperty('--color-surface-muted', isDark ? 'hsl(220 8% 15%)' : 'hsl(220 14% 96%)');
  root.style.setProperty('--color-text', isDark ? 'hsl(0 0% 100%)' : 'hsl(224 71% 4%)');
  root.style.setProperty('--color-text-muted', isDark ? 'hsl(220 15% 75%)' : 'hsl(220 12% 40%)');
  root.style.setProperty('--color-border', isDark ? 'hsl(220 6% 22%)' : 'hsl(220 16% 88%)');
  root.style.setProperty('--color-focus', isDark ? 'hsl(220 90% 62% / 0.6)' : 'hsl(220 90% 56% / 0.6)');
  root.style.setProperty('--color-brand-fg', 'hsl(220 90% 56%)');
  root.style.setProperty('--color-brand-bg', isDark ? 'hsl(220 15% 18%)' : 'hsl(220 90% 98%)');

  // Brand/accent scales -> CSS variables used by gradients and components
  root.style.setProperty('--color-brand-30', tokens.color.brand[30]);
  root.style.setProperty('--color-brand-40', tokens.color.brand[40]);
  root.style.setProperty('--color-brand-50', tokens.color.brand[50]);
  root.style.setProperty('--color-brand-60', tokens.color.brand[60]);
  root.style.setProperty('--color-accent-40', tokens.color.accent[40]);
  root.style.setProperty('--color-accent-50', tokens.color.accent[50]);

  // Typography
  root.style.setProperty('--font-sans', tokens.typography.fontFamilySans);
  root.style.setProperty('--font-mono', tokens.typography.fontFamilyMono);
  tokens.typography.scale.forEach((step) => {
    const rem = `${(step.px / 16).toFixed(4).replace(/0+$/, '').replace(/\.$/, '')}rem`;
    root.style.setProperty(`--font-size-${step.label}`, rem);
    root.style.setProperty(`--line-height-${step.label}`, String(step.lineHeight));
  });
}

export function ThemeProvider({ children, theme = 'light' as Theme }: { children: React.ReactNode; theme?: Theme }) {
  useEffect(() => {
    const root = document.documentElement;
    applyCssVariables(root, theme);
  }, [theme]);

  return <>{children}</>;
}


