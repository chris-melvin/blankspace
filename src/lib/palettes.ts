export type PaletteTemplate = {
  id: string;
  name: string;
  description: string;
  colorSeed: string;
  hueShift: number;
  chromaScale: number;
  lightnessBias: number;
  steps: string[];
};

export const PALETTE_TEMPLATES: PaletteTemplate[] = [
  {
    id: "modern-violet",
    name: "Modern Violet",
    description: "Default OKLCH violet ramp with balanced contrast.",
    colorSeed: "#6750A4",
    hueShift: 0,
    chromaScale: 1,
    lightnessBias: 0,
    steps: [
      "#F6EDFF",
      "#EADDFF",
      "#D0BCFF",
      "#B69DF8",
      "#9A82DB",
      "#7F67BE",
      "#6750A4",
      "#4F378B",
      "#381E72",
      "#21005D",
    ],
  },
  {
    id: "sunset-coral",
    name: "Sunset Coral",
    description: "Warm coral gradient inspired by evening skies.",
    colorSeed: "#FF705D",
    hueShift: -4,
    chromaScale: 0.95,
    lightnessBias: -0.01,
    steps: [
      "#FFF1E6",
      "#FFD8CC",
      "#FFB3A5",
      "#FF8A78",
      "#FF705D",
      "#FF5643",
      "#E64835",
      "#CC3C2B",
      "#B03024",
      "#801F16",
    ],
  },
  {
    id: "fresh-mint",
    name: "Fresh Mint",
    description: "Cool mint tones for health and wellness interfaces.",
    colorSeed: "#10B981",
    hueShift: -6,
    chromaScale: 1.05,
    lightnessBias: 0.02,
    steps: [
      "#ECFDF5",
      "#D1FAE5",
      "#A7F3D0",
      "#6EE7B7",
      "#34D399",
      "#10B981",
      "#059669",
      "#047857",
      "#065F46",
      "#064E3B",
    ],
  },
  {
    id: "deep-ocean",
    name: "Deep Ocean",
    description: "High-contrast marine blues suited for dashboards.",
    colorSeed: "#3B82F6",
    hueShift: 2,
    chromaScale: 1.1,
    lightnessBias: -0.02,
    steps: [
      "#EFF6FF",
      "#DBEAFE",
      "#BFDBFE",
      "#93C5FD",
      "#60A5FA",
      "#3B82F6",
      "#2563EB",
      "#1D4ED8",
      "#1E40AF",
      "#1E3A8A",
    ],
  },
];
