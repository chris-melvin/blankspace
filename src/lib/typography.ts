const TYPO_STEPS = [
  { key: "xs", weight: -2 },
  { key: "sm", weight: -1 },
  { key: "base", weight: 0 },
  { key: "lg", weight: 1 },
  { key: "xl", weight: 2 },
  { key: "2xl", weight: 3 },
  { key: "3xl", weight: 4 },
  { key: "4xl", weight: 5 },
  { key: "5xl", weight: 6 },
  { key: "6xl", weight: 7 },
];

export type TypeScaleStep = {
  id: string;
  px: number;
  rem: string;
  label: string;
};

export const round = (value: number, decimals = 2): number => {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};

export const pxToRem = (value: number) => round(value / 16, 4);

export const createTypeScale = (
  baseSize: number,
  ratio: number,
): TypeScaleStep[] => {
  return TYPO_STEPS.map(({ key, weight }) => {
    const px = round(baseSize * Math.pow(ratio, weight), 2);
    const rem = pxToRem(px);
    return {
      id: key,
      px,
      rem: `${rem}rem`,
      label: key,
    };
  });
};

export const googleFontPreviews = [
  { value: "Inter", label: "Inter" },
  { value: "Manrope", label: "Manrope" },
  { value: "Roboto", label: "Roboto" },
  { value: "Space Grotesk", label: "Space Grotesk" },
  { value: "Lora", label: "Lora" },
  { value: "Open Sans", label: "Open Sans" },
];
