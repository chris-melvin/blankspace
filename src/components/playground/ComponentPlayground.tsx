'use client';

import { type ReactNode, useEffect, useState } from "react";

import { Section } from "@/components/Section";
import { useTokenStore } from "@/store/useTokenStore";
import { type TokenMap } from "./types";

// Import individual preview components
import { StatCardPreview } from "./StatCardPreview";
import { NavigationBarPreview } from "./NavigationBarPreview";
import { PricingPlanPreview } from "./PricingPlanPreview";
import { TestimonialPreview } from "./TestimonialPreview";
import { TabsPreview } from "./TabsPreview";
import { FormPreview } from "./FormPreview";
import { SwitchPreview } from "./SwitchPreview";
import { TablePreview } from "./TablePreview";
import { AccordionPreview } from "./AccordionPreview";

type PreviewProps = {
  tokens: TokenMap;
};

const TokenSwatch = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between rounded-lg border border-black/5 bg-white/60 p-3 text-sm dark:border-white/10 dark:bg-slate-900/60">
    <div className="flex items-center gap-3">
      <span
        className="size-8 rounded-full border border-black/10 shadow-sm dark:border-white/10"
        style={{ backgroundColor: value }}
      />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
          {label}
        </p>
        <p className="font-mono text-xs">{value.toUpperCase()}</p>
      </div>
    </div>
  </div>
);

const PreviewCard = ({
  tokens,
  title,
  description,
  children,
}: {
  tokens: TokenMap;
  title: string;
  description: string;
  children: ReactNode;
}) => (
  <div
    className="flex flex-col gap-4 rounded-xl border p-4 sm:p-5 lg:p-6 shadow-sm transition-shadow hover:shadow-md"
    style={{
      backgroundColor: tokens.surface,
      borderColor: tokens.border,
      color: tokens.textPrimary,
    }}
  >
    <div className="space-y-1">
      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: tokens.textMuted }}>
        {title}
      </p>
      <p className="text-sm" style={{ color: tokens.textMuted }}>
        {description}
      </p>
    </div>
    <div
      className="rounded-lg border p-4 sm:p-5 lg:p-6 overflow-x-auto"
      style={{
        borderColor: tokens.surfaceSubtle,
        backgroundColor: tokens.background,
      }}
    >
      <div className="min-w-max">
        {children}
      </div>
    </div>
  </div>
);



type ComponentDescriptor = {
  id: string;
  title: string;
  description: string;
  category: "Dashboards" | "Navigation" | "Marketing" | "Forms" | "Data" | "Content";
  component: (props: PreviewProps) => React.ReactElement;
};

const componentDescriptors: ComponentDescriptor[] = [
  {
    id: "dashboard-stats",
    title: "Dashboard • Stat Cards",
    description: "Surface key metrics with balanced emphasis and subtle contrast cues.",
    category: "Dashboards",
    component: StatCardPreview,
  },
  {
    id: "navigation-bar",
    title: "Navigation • App Bar",
    description: "Test how navigation items read against primary backgrounds.",
    category: "Navigation",
    component: NavigationBarPreview,
  },
  {
    id: "pricing",
    title: "Marketing • Pricing Plans",
    description: "Stacked tiers that highlight the hero plan using accent tokens.",
    category: "Marketing",
    component: PricingPlanPreview,
  },
  {
    id: "testimonial",
    title: "Marketing • Testimonial",
    description: "Emphasize voice and brand with soft surfaces and accent markers.",
    category: "Marketing",
    component: TestimonialPreview,
  },
  {
    id: "radix-tabs",
    title: "Navigation • Workspace Tabs",
    description: "Radix-style tabs show how accent hues communicate active state.",
    category: "Navigation",
    component: TabsPreview,
  },
  {
    id: "form-settings",
    title: "Forms • Settings Panel",
    description: "Input fields and toggles show how borders and accents communicate state.",
    category: "Forms",
    component: FormPreview,
  },
  {
    id: "data-table",
    title: "Data • Compact Table",
    description: "Tables rely on nuanced surfaces and borders for quick scanning.",
    category: "Data",
    component: TablePreview,
  },
  {
    id: "radix-switches",
    title: "Forms • Notification Toggles",
    description: "Preview Radix-inspired switches driven by semantic tokens.",
    category: "Forms",
    component: SwitchPreview,
  },
  {
    id: "radix-accordion",
    title: "Content • Release Notes",
    description: "Accordion disclosure patterns test surface hierarchy and borders.",
    category: "Content",
    component: AccordionPreview,
  },
];

const categories = ["All", ...Array.from(new Set(componentDescriptors.map((item) => item.category)))];

export const ComponentPlayground = () => {
  const scale = useTokenStore((state) => state.scale);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setIsDark(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const tokens: TokenMap = isDark
    ? {
        background: "#0b1220",
        surface: "#0f172a",
        surfaceSubtle: "#111827",
        surfaceStrong: "#e2e8f0",
        textPrimary: "#e5e7eb",
        textMuted: "#94a3b8",
        primary: scale[6]?.hex ?? "#60a5fa",
        secondary: scale[8]?.hex ?? "#2563eb",
        accent: scale[5]?.hex ?? "#6366f1",
        accentHover: scale[6]?.hex ?? "#4f46e5",
        border: "#1f2937",
        chart: [
          // derive from primary/secondary/accent to keep mono-first
          scale[6]?.hex ?? "#60a5fa",
          scale[8]?.hex ?? "#2563eb",
          scale[5]?.hex ?? "#6366f1",
          "#34d399",
          "#f59e0b",
          "#f87171",
          "#a78bfa",
        ],
      }
    : {
        background: "#ffffff",
        surface: "#f8fafc",
        surfaceSubtle: "#f1f5f9",
        surfaceStrong: "#1e293b",
        textPrimary: "#0f172a",
        textMuted: "#64748b",
        primary: scale[6]?.hex ?? "#2563eb",
        secondary: scale[8]?.hex ?? "#1d4ed8",
        accent: scale[5]?.hex ?? "#6366f1",
        accentHover: scale[6]?.hex ?? "#4f46e5",
        border: "#e2e8f0",
        chart: [
          // derive from primary/secondary/accent to keep mono-first
          scale[8]?.hex ?? "#1d4ed8",
          scale[6]?.hex ?? "#2563eb",
          scale[5]?.hex ?? "#6366f1",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
        ],
      };

  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredDescriptors =
    selectedCategory === "All"
      ? componentDescriptors
      : componentDescriptors.filter((descriptor) => descriptor.category === selectedCategory);

  const layoutClasses = "flex flex-col gap-6";

  return (
    <Section
      title="Component Playground"
      description="Audit how your tokens apply to real UI primitives. Buttons, forms, cards, badges, and data viz all update instantly as you tweak the palette."
    >
      <div className="flex flex-col xl:flex-row gap-6 xl:gap-8">
        <div
          className="flex-1 flex flex-col gap-6 sm:gap-8 rounded-xl border p-4 sm:p-6 lg:p-8 shadow-sm"
          style={{
            backgroundColor: tokens.background,
            color: tokens.textPrimary,
            borderColor: isDark ? "#0b1220" : "#0000000D",
          }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const isActive = selectedCategory === category;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className="rounded-full px-4 py-1.5 text-xs font-semibold transition"
                      style={{
                        backgroundColor: isActive ? tokens.accent : tokens.surface,
                        color: isActive ? tokens.surface : tokens.textPrimary,
                        borderColor: isActive ? tokens.accent : tokens.border,
                        borderWidth: 1,
                        borderStyle: "solid",
                      }}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
              {/* Removed layout toggle (grid/list) as it's unused */}
            </div>

            <div className={layoutClasses}>
              {filteredDescriptors.map((descriptor) => (
                <PreviewCard
                  key={descriptor.id}
                  tokens={tokens}
                  title={descriptor.title}
                  description={descriptor.description}
                >
                  <descriptor.component tokens={tokens} />
                </PreviewCard>
              ))}
            </div>
          </div>
        </div>
        <div className="xl:w-80 flex flex-col gap-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: tokens.textMuted }}>
              Design Tokens
            </h3>
            <TokenSwatch label="bg.surface" value={tokens.surface} />
            <TokenSwatch label="fg.default" value={tokens.textPrimary} />
            <TokenSwatch label="fg.muted" value={tokens.textMuted} />
            <TokenSwatch label="brand.primary" value={tokens.primary} />
            <TokenSwatch label="brand.secondary" value={tokens.secondary} />
            <TokenSwatch label="accent.primary" value={tokens.accent} />
            <TokenSwatch label="border.default" value={tokens.border} />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: tokens.textMuted }}>
              Brand Colors
            </h3>
            <TokenSwatch label="Primary" value={tokens.primary} />
            <TokenSwatch label="Secondary" value={tokens.secondary} />
            <TokenSwatch label="Accent" value={tokens.accent} />
          </div>
        </div>
      </div>
    </Section>
  );
};
