declare module "culori" {
  export const formatHex: (color: unknown) => string;
  export const parse: (color: string) => unknown;
  export const converter: (mode: string) => (color: unknown) => unknown;
  export const clampChroma: (color: unknown, options?: unknown) => unknown;
  export const modeOklch: unknown;
  export const modeOklab: unknown;
}
