export type ContrastResult = {
  ratio: number;
  aa: boolean;
  aaLarge: boolean;
  aaa: boolean;
  aaaLarge: boolean;
};

const channelToLinear = (channel: number) => {
  const normalized = channel / 255;
  return normalized <= 0.03928
    ? normalized / 12.92
    : Math.pow((normalized + 0.055) / 1.055, 2.4);
};

const hexToRgb = (hex: string): [number, number, number] | null => {
  const sanitised = hex.replace("#", "");
  if (sanitised.length !== 6) return null;
  const r = parseInt(sanitised.slice(0, 2), 16);
  const g = parseInt(sanitised.slice(2, 4), 16);
  const b = parseInt(sanitised.slice(4, 6), 16);
  if ([r, g, b].some((channel) => Number.isNaN(channel))) return null;
  return [r, g, b];
};

export const contrastRatio = (foreground: string, background: string): number => {
  const fgRgb = hexToRgb(foreground);
  const bgRgb = hexToRgb(background);
  if (!fgRgb || !bgRgb) return 1;

  const [r1, g1, b1] = fgRgb.map(channelToLinear);
  const [r2, g2, b2] = bgRgb.map(channelToLinear);

  const l1 = 0.2126 * r1 + 0.7152 * g1 + 0.0722 * b1;
  const l2 = 0.2126 * r2 + 0.7152 * g2 + 0.0722 * b2;

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
};

export const evaluateContrast = (
  foreground: string,
  background: string,
): ContrastResult => {
  const ratio = contrastRatio(foreground, background);
  return {
    ratio,
    aa: ratio >= 4.5,
    aaLarge: ratio >= 3,
    aaa: ratio >= 7,
    aaaLarge: ratio >= 4.5,
  };
};
