import { converter, formatHex, modeOklch, parse } from "culori";

void modeOklch;

const toOklch = converter("oklch");

// Minimal OKLCH shape we care about
export type OklchColor = {
  mode: "oklch";
  l: number;
  c: number;
  h: number;
};

export type ColorStep = {
  id: number;
  label: string;
  hex: string;
  oklch: OklchColor;
};

export type ScaleGenerationOptions = {
  hueShift?: number;
  chromaScale?: number;
  lightnessBias?: number;
  locks?: Record<number, boolean>;
  previous?: ColorStep[];
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const wrapHue = (value: number) => {
  if (Number.isNaN(value)) return 0;
  const mod = value % 360;
  return mod < 0 ? mod + 360 : mod;
};

const DEFAULT_LIGHTNESS_STOPS = [
  0.96, 0.92, 0.86, 0.78, 0.7, 0.62, 0.53, 0.44, 0.36, 0.28,
];

const STEP_LABELS = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];

export const parseToOklch = (input: string): OklchColor | null => {
  try {
    const parsed = parse(input);
    if (!parsed) return null;
    const converted = toOklch(parsed) as Partial<OklchColor> | null;
    if (
      !converted ||
      typeof converted.l !== "number" ||
      typeof converted.c !== "number" ||
      typeof converted.h !== "number"
    ) {
      return null;
    }
    const { l, c, h } = converted;
    if (
      typeof l !== "number" ||
      typeof c !== "number" ||
      typeof h !== "number"
    ) {
      return null;
    }
    return {
      mode: "oklch",
      l: clamp(l, 0, 1),
      c: clamp(c, 0, 0.4),
      h: wrapHue(h),
    };
  } catch (error) {
    console.error("Failed to parse color", error);
    return null;
  }
};

export const oklchToHex = (color: OklchColor): string => {
  try {
    return formatHex(color);
  } catch (error) {
    console.error("Failed to format color", error);
    return "#000000";
  }
};

export const generateColorScale = (
  seedHex: string,
  options: ScaleGenerationOptions = {},
): ColorStep[] => {
  const {
    hueShift = 0,
    chromaScale = 1,
    lightnessBias = 0,
    locks = {},
    previous = [],
  } = options;

  const seed = parseToOklch(seedHex);
  if (!seed) {
    return previous.length > 0 ? previous : DEFAULT_LIGHTNESS_STOPS.map((_, index) => ({
      id: index,
      label: STEP_LABELS[index] ?? String(index * 100),
      hex: "#000000",
      oklch: {
        mode: "oklch",
        l: DEFAULT_LIGHTNESS_STOPS[index],
        c: 0,
        h: 0,
      },
    }));
  }

  return DEFAULT_LIGHTNESS_STOPS.map((lightness, index) => {
    const locked = locks[index];
    if (locked) {
      const existing = previous.find((step) => step.id === index);
      if (existing) {
        return existing;
      }
    }

    const l = clamp(lightness + lightnessBias, 0, 1);
    const c = clamp(seed.c * chromaScale, 0, 0.4);
    const h = wrapHue(seed.h + hueShift);

    const computed: OklchColor = {
      mode: "oklch",
      l,
      c,
      h,
    };

    const hex = oklchToHex(computed);

    return {
      id: index,
      label: STEP_LABELS[index] ?? String(index * 100),
      hex,
      oklch: computed,
    };
  });
};
