// Source-of-truth design tokens for Blankspace (minimal modern tech)

export type GradientStop = {
  colorVar: string; // CSS variable reference (e.g., --color-brand-40)
  at?: string; // optional stop position like '0%', '60%'
};

export type GradientDef = {
  type: 'linear' | 'radial' | 'conic';
  angle?: string; // for linear
  shape?: string; // for radial
  stops: GradientStop[];
};

export type TypographyScaleStep = {
  label: string; // e.g., 'xs', 'sm', 'base', 'lg', 'xl', '2xl'
  px: number;
  lineHeight: number; // unitless multiplier
  weight?: number; // optional font-weight suggestion
};

export type Tokens = {
  color: {
    neutral: Record<number, string>;
    brand: Record<number, string>;
    accent: Record<number, string>;
    success: Record<number, string>;
    warning: Record<number, string>;
    danger: Record<number, string>;
    semantic: {
      surface: string;
      surfaceElevated: string;
      surfaceMuted: string;
      text: string;
      textMuted: string;
      border: string;
      focus: string;
      brandFg: string;
      brandBg: string;
    };
  };
  gradient: Record<string, GradientDef>;
  typography: {
    fontFamilySans: string;
    fontFamilyMono: string;
    scale: TypographyScaleStep[];
  };
  spacing: Record<string, string>; // e.g., { xs: '4px', sm: '8px', ... }
  radii: Record<string, string>; // e.g., { sm: '6px', md: '10px', ... }
  shadows: Record<string, string>;
  motion: {
    duration: Record<string, string>;
    easing: Record<string, string>;
  };
};

// HSL values tuned for a clean, high-contrast, minimal tech look
export const tokens: Tokens = {
  color: {
    neutral: {
      0: 'hsl(0 0% 0%)',
      5: 'hsl(220 10% 6%)',
      10: 'hsl(220 9% 10%)',
      20: 'hsl(220 8% 15%)',
      30: 'hsl(220 7% 22%)',
      40: 'hsl(220 7% 30%)',
      50: 'hsl(220 6% 40%)',
      60: 'hsl(220 6% 52%)',
      70: 'hsl(220 7% 65%)',
      80: 'hsl(220 9% 78%)',
      90: 'hsl(220 12% 90%)',
      95: 'hsl(220 14% 96%)',
      100: 'hsl(0 0% 100%)',
    },
    brand: {
      30: 'hsl(220 85% 48%)',
      40: 'hsl(220 88% 56%)',
      50: 'hsl(220 90% 62%)',
      60: 'hsl(220 92% 67%)',
    },
    accent: {
      40: 'hsl(260 80% 60%)',
      50: 'hsl(260 85% 66%)',
    },
    success: {
      40: 'hsl(150 60% 40%)',
      50: 'hsl(150 65% 46%)',
    },
    warning: {
      40: 'hsl(35 90% 55%)',
      50: 'hsl(35 95% 60%)',
    },
    danger: {
      40: 'hsl(0 75% 52%)',
      50: 'hsl(0 80% 58%)',
    },
    semantic: {
      surface: 'var(--color-surface)',
      surfaceElevated: 'var(--color-surface-elevated)',
      surfaceMuted: 'var(--color-surface-muted)',
      text: 'var(--color-text)',
      textMuted: 'var(--color-text-muted)',
      border: 'var(--color-border)',
      focus: 'var(--color-focus)',
      brandFg: 'var(--color-brand-fg)',
      brandBg: 'var(--color-brand-bg)',
    },
  },
  gradient: {
    brandSoft: {
      type: 'linear',
      angle: '135deg',
      stops: [
        { colorVar: '--color-brand-40', at: '0%' },
        { colorVar: '--color-brand-50', at: '100%' },
      ],
    },
    brandVibrant: {
      type: 'linear',
      angle: '180deg',
      stops: [
        { colorVar: '--color-brand-60', at: '0%' },
        { colorVar: '--color-brand-40', at: '100%' },
      ],
    },
    accentSoft: {
      type: 'linear',
      angle: '135deg',
      stops: [
        { colorVar: '--color-accent-40', at: '0%' },
        { colorVar: '--color-accent-50', at: '100%' },
      ],
    },
  },
  typography: {
    fontFamilySans: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
    fontFamilyMono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    scale: [
      { label: 'xs', px: 12, lineHeight: 1.2, weight: 500 },
      { label: 'sm', px: 14, lineHeight: 1.25, weight: 500 },
      { label: 'base', px: 16, lineHeight: 1.35, weight: 500 },
      { label: 'lg', px: 18, lineHeight: 1.35, weight: 600 },
      { label: 'xl', px: 20, lineHeight: 1.3, weight: 600 },
      { label: '2xl', px: 24, lineHeight: 1.25, weight: 700 },
      { label: '3xl', px: 30, lineHeight: 1.2, weight: 700 },
    ],
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
  },
  radii: {
    xs: '4px',
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '20px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.06)',
    md: '0 2px 8px rgba(0,0,0,0.08)',
    lg: '0 4px 16px rgba(0,0,0,0.10)',
    xl: '0 8px 30px rgba(0,0,0,0.12)',
  },
  motion: {
    duration: {
      fast: '120ms',
      normal: '200ms',
      slow: '320ms',
    },
    easing: {
      standard: 'cubic-bezier(0.2, 0.6, 0.2, 1)',
      emphasize: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      de_emphasize: 'cubic-bezier(0.2, 0.4, 0.2, 1)',
    },
  },
};

export type TokenMap = Tokens;


