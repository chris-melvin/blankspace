import type { GradientDef } from './tokens';
import { contrastRatio } from './contrast';

export function toCssGradient(def: GradientDef): string {
  const stops = def.stops
    .map((s) => `var(${s.colorVar})${s.at ? ' ' + s.at : ''}`)
    .join(', ');
  if (def.type === 'linear') return `linear-gradient(${def.angle ?? '180deg'}, ${stops})`;
  if (def.type === 'radial') return `radial-gradient(${def.shape ?? 'circle'}, ${stops})`;
  return `conic-gradient(${stops})`;
}

export function cssGradientBackground(def: GradientDef): React.CSSProperties {
  return { backgroundImage: toCssGradient(def) };
}

// Sample a linear gradient by interpolating stops and computing hex at positions, then contrast.
// NOTE: Simplified: expects CSS variables to resolve to hex colors in computed styles.
export function evaluateGradientContrast(
  gradient: GradientDef,
  foregroundHex: string,
  samples: number = 12,
): { min: number; avg: number; max: number } {
  // We cannot resolve CSS variables here without DOM; approximate by comparing against first and last stop colors only
  const extractVar = (s: string) => s.replace('var(', '').replace(')', '').trim();
  const first = gradient.stops[0];
  const last = gradient.stops[gradient.stops.length - 1];
  const firstVar = extractVar(first.colorVar);
  const lastVar = extractVar(last.colorVar);
  // Try to read computed style if running in browser; fallback to black/white
  let firstHex = '#000000';
  let lastHex = '#FFFFFF';
  if (typeof window !== 'undefined') {
    const cs = getComputedStyle(document.documentElement);
    const a = cs.getPropertyValue(firstVar).trim();
    const b = cs.getPropertyValue(lastVar).trim();
    if (a.startsWith('#')) firstHex = a; // expecting hex after ThemeProvider injection
    if (b.startsWith('#')) lastHex = b;
  }
  const ratios: number[] = [];
  for (let i = 0; i < samples; i++) {
    const t = i / Math.max(1, samples - 1);
    // naive mix in sRGB hex space
    const mix = (hx1: string, hx2: string, p: number) => {
      const n = (h: string) => parseInt(h, 16);
      const r1 = n(hx1.slice(1, 3));
      const g1 = n(hx1.slice(3, 5));
      const b1 = n(hx1.slice(5, 7));
      const r2 = n(hx2.slice(1, 3));
      const g2 = n(hx2.slice(3, 5));
      const b2 = n(hx2.slice(5, 7));
      const toHex = (v: number) => v.toString(16).padStart(2, '0');
      const r = Math.round(r1 + (r2 - r1) * p);
      const g = Math.round(g1 + (g2 - g1) * p);
      const b = Math.round(b1 + (b2 - b1) * p);
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
    };
    const bg = mix(firstHex, lastHex, t);
    ratios.push(contrastRatio(foregroundHex, bg));
  }
  const min = Math.min(...ratios);
  const max = Math.max(...ratios);
  const avg = Number((ratios.reduce((a, b) => a + b, 0) / ratios.length).toFixed(2));
  return { min, avg, max };
}


