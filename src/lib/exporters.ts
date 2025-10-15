import { ColorStep } from "@/lib/color";
import { TokenTypography } from "@/store/useTokenStore";

const indent = (level: number) => "  ".repeat(level);

const toFontFamilyArray = (font: string) => `["${font}", "system-ui", "sans-serif"]`;

const toTailwindFontSize = (stepLabel: string, px: number) => {
  const rem = (px / 16).toFixed(3).replace(/0+$/, "").replace(/\.$/, "");
  return `${stepLabel}: ["${rem}rem", { lineHeight: "1.2" }]`;
};

export const createTailwindConfig = (
  palette: ColorStep[],
  typography: TokenTypography,
) => {
  const colorEntries = palette
    .map((step) => `${step.label}: "${step.hex.toUpperCase()}"`)
    .join(",\n      ");

  const fontSizeEntries = typography.scale
    .map((step) => toTailwindFontSize(step.label, step.px))
    .join(",\n      ");

  return `import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      colors: {
        brand: {
${indent(4)}${colorEntries}
        }
      },
      fontFamily: {
        sans: ${toFontFamilyArray(typography.font)}
      },
      fontSize: {
${indent(4)}${fontSizeEntries}
      }
    }
  }
} satisfies Config;`;
};

export const createCssVariables = (
  palette: ColorStep[],
  typography: TokenTypography,
) => {
  const colorLines = palette
    .map((step) => `  --color-brand-${step.label}: ${step.hex.toUpperCase()};`)
    .join("\n");

  const fontLines = typography.scale
    .map((step) => `  --font-size-${step.label}: ${step.rem};`)
    .join("\n");

  return `:root {
${colorLines}
${fontLines}
  --font-family-sans: "${typography.font}", system-ui, sans-serif;
}`;
};

export const createJsonTokens = (
  palette: ColorStep[],
  typography: TokenTypography,
) => {
  const json = {
    colors: {
      brand: palette.reduce(
        (acc, step) => ({
          ...acc,
          [step.label]: step.hex.toUpperCase(),
        }),
        {},
      ),
    },
    typography: {
      fontFamily: typography.font,
      scale: typography.scale.reduce(
        (acc, step) => ({
          ...acc,
          [step.label]: {
            px: step.px,
            rem: step.rem,
          },
        }),
        {},
      ),
    },
  };

  return JSON.stringify(json, null, 2);
};
