import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ColorStep, generateColorScale } from "@/lib/color";
import { TypeScaleStep, createTypeScale } from "@/lib/typography";

export type TokenTypography = {
  font: string;
  baseSize: number;
  ratio: number;
  scale: TypeScaleStep[];
};

export type ContrastSelection = {
  foreground: string;
  background: string;
};

export type ProjectSnapshot = {
  colorSeed: string;
  hueShift: number;
  chromaScale: number;
  lightnessBias: number;
  locks: Record<number, boolean>;
  scale: ColorStep[];
  typography: TokenTypography;
  contrast: ContrastSelection;
  updatedAt: string;
};

const DEFAULT_SEED = "#6750A4";
const DEFAULT_HUE_SHIFT = 0;
const DEFAULT_CHROMA_SCALE = 1;
const DEFAULT_LIGHTNESS_BIAS = 0;

const defaultScale = generateColorScale(DEFAULT_SEED);
const defaultTypography: TokenTypography = {
  font: "Inter",
  baseSize: 16,
  ratio: 1.25,
  scale: createTypeScale(16, 1.25),
};

type TokenStore = {
  colorSeed: string;
  hueShift: number;
  chromaScale: number;
  lightnessBias: number;
  locks: Record<number, boolean>;
  scale: ColorStep[];
  typography: TokenTypography;
  contrast: ContrastSelection;
  savedProjects: Record<string, ProjectSnapshot>;
  actions: {
    setSeed: (value: string) => void;
    setHueShift: (value: number) => void;
    setChromaScale: (value: number) => void;
    setLightnessBias: (value: number) => void;
    toggleLock: (index: number) => void;
    regenerateScale: () => void;
    setStepHex: (index: number, hex: string) => void;
    setTypography: (updater: Partial<TokenTypography>) => void;
    setContrastSelection: (selection: Partial<ContrastSelection>) => void;
    saveProject: (name: string) => void;
    loadProject: (name: string) => void;
    removeProject: (name: string) => void;
    importProject: (project: ProjectSnapshot, name: string) => void;
    reset: () => void;
  };
};

export const useTokenStore = create<TokenStore>()(
  persist(
    (set, get) => ({
      colorSeed: DEFAULT_SEED,
      hueShift: DEFAULT_HUE_SHIFT,
      chromaScale: DEFAULT_CHROMA_SCALE,
      lightnessBias: DEFAULT_LIGHTNESS_BIAS,
      locks: {},
      scale: defaultScale,
      typography: defaultTypography,
      contrast: {
        foreground: defaultScale[7]?.hex ?? "#111111",
        background: defaultScale[1]?.hex ?? "#FFFFFF",
      },
      savedProjects: {},
      actions: {
        setSeed: (value) => {
          set({ colorSeed: value });
          get().actions.regenerateScale();
        },
        setHueShift: (value) => {
          set({ hueShift: value });
          get().actions.regenerateScale();
        },
        setChromaScale: (value) => {
          set({ chromaScale: value });
          get().actions.regenerateScale();
        },
        setLightnessBias: (value) => {
          set({ lightnessBias: value });
          get().actions.regenerateScale();
        },
        toggleLock: (index) =>
          set((state) => ({
            locks: {
              ...state.locks,
              [index]: !state.locks[index],
            },
          })),
        regenerateScale: () => {
          const {
            colorSeed,
            hueShift,
            chromaScale,
            lightnessBias,
            locks,
            scale,
          } = get();
          const nextScale = generateColorScale(colorSeed, {
            hueShift,
            chromaScale,
            lightnessBias,
            locks,
            previous: scale,
          });
          set({ scale: nextScale });
        },
        setStepHex: (index, hex) =>
          set((state) => ({
            scale: state.scale.map((step) =>
              step.id === index
                ? {
                    ...step,
                    hex,
                  }
                : step,
            ),
          })),
        setTypography: (updater) =>
          set((state) => {
            const typography = {
              ...state.typography,
              ...updater,
            };
            const baseSize = updater.baseSize ?? typography.baseSize;
            const ratio = updater.ratio ?? typography.ratio;
            return {
              typography: {
                ...typography,
                scale: createTypeScale(baseSize, ratio),
              },
            };
          }),
        setContrastSelection: (selection) =>
          set((state) => ({
            contrast: {
              ...state.contrast,
              ...selection,
            },
          })),
        saveProject: (name) => {
          if (!name.trim()) return;
          const snapshot: ProjectSnapshot = {
            colorSeed: get().colorSeed,
            hueShift: get().hueShift,
            chromaScale: get().chromaScale,
            lightnessBias: get().lightnessBias,
            locks: get().locks,
            scale: get().scale,
            typography: get().typography,
            contrast: get().contrast,
            updatedAt: new Date().toISOString(),
          };

          set((state) => ({
            savedProjects: {
              ...state.savedProjects,
              [name]: snapshot,
            },
          }));
        },
        loadProject: (name) => {
          const project = get().savedProjects[name];
          if (!project) return;
          set({
            colorSeed: project.colorSeed,
            hueShift: project.hueShift,
            chromaScale: project.chromaScale,
            lightnessBias: project.lightnessBias,
            locks: project.locks,
            scale: project.scale,
            typography: project.typography,
            contrast: project.contrast,
          });
        },
        removeProject: (name) =>
          set((state) => {
            const copy = { ...state.savedProjects };
            delete copy[name];
            return {
              savedProjects: copy,
            };
          }),
        importProject: (project, name) => {
          set((state) => ({
            savedProjects: {
              ...state.savedProjects,
              [name]: project,
            },
          }));
          set({
            colorSeed: project.colorSeed,
            hueShift: project.hueShift,
            chromaScale: project.chromaScale,
            lightnessBias: project.lightnessBias,
            locks: project.locks,
            scale: project.scale,
            typography: project.typography,
            contrast: project.contrast,
          });
        },
        reset: () =>
          set({
            colorSeed: DEFAULT_SEED,
            hueShift: DEFAULT_HUE_SHIFT,
            chromaScale: DEFAULT_CHROMA_SCALE,
            lightnessBias: DEFAULT_LIGHTNESS_BIAS,
            locks: {},
            scale: defaultScale,
            typography: defaultTypography,
            contrast: {
              foreground: defaultScale[7]?.hex ?? "#111111",
              background: defaultScale[1]?.hex ?? "#FFFFFF",
            },
          }),
      },
    }),
    {
      name: "blankspace-tokens",
      version: 1,
      partialize: (state) => ({
        colorSeed: state.colorSeed,
        hueShift: state.hueShift,
        chromaScale: state.chromaScale,
        lightnessBias: state.lightnessBias,
        locks: state.locks,
        scale: state.scale,
        typography: state.typography,
        contrast: state.contrast,
        savedProjects: state.savedProjects,
      }),
    },
  ),
);
