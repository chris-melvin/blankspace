'use client';

import { type ReactNode, useState } from "react";

import { Section } from "@/components/Section";
import { useTokenStore } from "@/store/useTokenStore";

type TokenMap = {
  background: string;
  surface: string;
  surfaceSubtle: string;
  surfaceStrong: string;
  textPrimary: string;
  textMuted: string;
  accent: string;
  accentHover: string;
  border: string;
  chart: string[];
};

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
    className="flex flex-col gap-4 rounded-xl border p-5 shadow-sm transition-shadow hover:shadow-md"
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
      className="rounded-lg border p-4"
      style={{
        borderColor: tokens.surfaceSubtle,
        backgroundColor: tokens.background,
      }}
    >
      {children}
    </div>
  </div>
);

const StatCardPreview = ({ tokens }: PreviewProps) => (
  <div className="grid gap-4 sm:grid-cols-2">
    {["New Signups", "Active Teams", "Retention", "NPS"].map((title, index) => (
      <div
        key={title}
        className="rounded-lg border p-4 shadow-sm"
        style={{
          backgroundColor: tokens.surface,
          borderColor: tokens.border,
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: tokens.textMuted }}>
          {title}
        </p>
        <p className="mt-2 text-2xl font-semibold" style={{ color: tokens.textPrimary }}>
          {index === 0 ? "1,248" : index === 1 ? "87" : index === 2 ? "93%" : "68"}
        </p>
        <p className="mt-1 text-xs" style={{ color: tokens.textMuted }}>
          {index % 2 === 0 ? "↑ 4.2% vs last week" : "↗ Trend stable"}
        </p>
      </div>
    ))}
  </div>
);

const NavigationBarPreview = ({ tokens }: PreviewProps) => (
  <div
    className="flex items-center justify-between rounded-full border px-5 py-3"
    style={{
      backgroundColor: tokens.surface,
      borderColor: tokens.border,
    }}
  >
    <div className="flex items-center gap-3">
      <span
        className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
        style={{ backgroundColor: tokens.accent, color: tokens.surface }}
      >
        Blankspace
      </span>
      <nav className="hidden gap-4 text-sm font-medium sm:flex" style={{ color: tokens.textMuted }}>
        <span>Overview</span>
        <span>Billing</span>
        <span>Customers</span>
        <span>Automation</span>
      </nav>
    </div>
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="rounded-full border px-4 py-1.5 text-xs font-semibold"
        style={{ borderColor: tokens.border, color: tokens.textPrimary }}
      >
        Invite
      </button>
      <button
        type="button"
        className="rounded-full px-4 py-1.5 text-xs font-semibold shadow-sm transition"
        style={{ backgroundColor: tokens.accent, color: tokens.surface }}
      >
        Upgrade
      </button>
    </div>
  </div>
);

const PricingPlanPreview = ({ tokens }: PreviewProps) => (
  <div className="grid gap-4 md:grid-cols-3">
    {["Starter", "Growth", "Scale"].map((tier, index) => (
      <div
        key={tier}
        className="flex flex-col gap-4 rounded-lg border p-5"
        style={{
          backgroundColor: index === 1 ? tokens.surfaceStrong : tokens.surface,
          borderColor: index === 1 ? tokens.accent : tokens.border,
          color: index === 1 ? tokens.surface : tokens.textPrimary,
        }}
      >
        <div className="space-y-1">
          <p
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ color: index === 1 ? tokens.surface : tokens.textMuted }}
          >
            {tier}
          </p>
          <p className="text-2xl font-semibold">{index === 0 ? "$19" : index === 1 ? "$49" : "$129"}</p>
        </div>
        <ul className="space-y-2 text-sm" style={{ color: index === 1 ? tokens.surface : tokens.textMuted }}>
          <li>✔ Unlimited projects</li>
          <li>✔ Team workspaces</li>
          <li>{index === 0 ? "— Email support" : "✔ Priority support"}</li>
        </ul>
        <button
          type="button"
          className="rounded-full px-4 py-2 text-sm font-semibold"
          style={{
            backgroundColor: index === 1 ? tokens.surface : tokens.accent,
            color: index === 1 ? tokens.accent : tokens.surface,
            borderColor: tokens.accent,
            borderWidth: 1,
            borderStyle: "solid",
          }}
        >
          {index === 1 ? "Current Plan" : "Choose Plan"}
        </button>
      </div>
    ))}
  </div>
);

const TestimonialPreview = ({ tokens }: PreviewProps) => (
  <div
    className="space-y-4 rounded-xl border p-6"
    style={{ backgroundColor: tokens.surfaceSubtle, borderColor: tokens.border }}
  >
    <div className="flex items-center gap-3">
      <span className="size-10 rounded-full border" style={{ backgroundColor: tokens.surface, borderColor: tokens.border }} />
      <div>
        <p className="text-sm font-semibold" style={{ color: tokens.textPrimary }}>
          Alex Rivera
        </p>
        <p className="text-xs" style={{ color: tokens.textMuted }}>
          Head of Product, LumenAI
        </p>
      </div>
    </div>
    <p className="text-sm leading-relaxed" style={{ color: tokens.textPrimary }}>
      “Blankspace let our design system team validate palettes with real UI instantly. The token sync is now part of every design review.”
    </p>
    <div className="flex items-center gap-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className="size-3 rounded-full"
          style={{ backgroundColor: index < 4 ? tokens.accent : tokens.surface }}
        />
      ))}
    </div>
  </div>
);

const FormPreview = ({ tokens }: PreviewProps) => (
  <form className="space-y-4">
    <label className="flex flex-col gap-2 text-sm font-medium" style={{ color: tokens.textPrimary }}>
      Team Name
      <input
        type="text"
        placeholder="Acme Inc."
        className="rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2"
        style={{
          backgroundColor: tokens.surface,
          borderColor: tokens.border,
          color: tokens.textPrimary,
          boxShadow: `0 0 0 1px ${tokens.border}`,
        }}
      />
    </label>
    <label className="flex flex-col gap-2 text-sm font-medium" style={{ color: tokens.textPrimary }}>
      Notification Email
      <input
        type="email"
        placeholder="team@acme.com"
        className="rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2"
        style={{
          backgroundColor: tokens.surface,
          borderColor: tokens.border,
          color: tokens.textPrimary,
          boxShadow: `0 0 0 1px ${tokens.border}`,
        }}
      />
    </label>
    <div className="flex items-center justify-between text-sm" style={{ color: tokens.textMuted }}>
      <label className="inline-flex items-center gap-2">
        <input type="checkbox" className="size-4 rounded border" style={{ borderColor: tokens.border }} />
        Weekly summary
      </label>
      <button
        type="button"
        className="rounded-full px-4 py-2 text-xs font-semibold"
        style={{ backgroundColor: tokens.accent, color: tokens.surface }}
      >
        Save settings
      </button>
    </div>
  </form>
);

const TablePreview = ({ tokens }: PreviewProps) => (
  <div className="overflow-hidden rounded-lg border" style={{ borderColor: tokens.border }}>
    <table className="min-w-full divide-y text-left text-sm" style={{ color: tokens.textPrimary }}>
      <thead style={{ backgroundColor: tokens.surfaceSubtle, color: tokens.textMuted }}>
        <tr>
          {["Project", "Owner", "Status", "Updated"].map((header) => (
            <th key={header} className="px-4 py-3 font-semibold uppercase tracking-wide">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y" style={{ borderColor: tokens.surfaceSubtle }}>
        {[1, 2, 3].map((row) => (
          <tr key={row} style={{ backgroundColor: row % 2 ? tokens.surface : tokens.background }}>
            <td className="px-4 py-3">Vision OS Migration</td>
            <td className="px-4 py-3" style={{ color: tokens.textMuted }}>
              Jordan Wells
            </td>
            <td className="px-4 py-3">
              <span
                className="rounded-full px-2 py-1 text-xs font-semibold"
                style={{ backgroundColor: tokens.accent, color: tokens.surface }}
              >
                In Review
              </span>
            </td>
            <td className="px-4 py-3" style={{ color: tokens.textMuted }}>
              2h ago
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

type ComponentDescriptor = {
  id: string;
  title: string;
  description: string;
  category: "Dashboards" | "Navigation" | "Marketing" | "Forms" | "Data";
  component: (props: PreviewProps) => JSX.Element;
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
];

const categories = ["All", ...Array.from(new Set(componentDescriptors.map((item) => item.category)))];

export const ComponentPlayground = () => {
  const scale = useTokenStore((state) => state.scale);

  const tokens: TokenMap = {
    background: scale[0]?.hex ?? "#ffffff",
    surface: scale[1]?.hex ?? "#f6f6f6",
    surfaceSubtle: scale[2]?.hex ?? "#e5e5e5",
    surfaceStrong: scale[8]?.hex ?? "#1f2933",
    textPrimary: scale[8]?.hex ?? "#111827",
    textMuted: scale[6]?.hex ?? "#4b5563",
    accent: scale[5]?.hex ?? "#6366f1",
    accentHover: scale[6]?.hex ?? "#4f46e5",
    border: scale[3]?.hex ?? "#d1d5db",
    chart: [
      scale[9]?.hex ?? "#0f172a",
      scale[7]?.hex ?? "#4338ca",
      scale[4]?.hex ?? "#818cf8",
    ],
  };

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  const filteredDescriptors =
    selectedCategory === "All"
      ? componentDescriptors
      : componentDescriptors.filter((descriptor) => descriptor.category === selectedCategory);

  const layoutClasses = layout === "grid" ? "grid gap-4 sm:grid-cols-2" : "flex flex-col gap-4";

  return (
    <Section
      title="Component Playground"
      description="Audit how your tokens apply to real UI primitives. Buttons, forms, cards, badges, and data viz all update instantly as you tweak the palette."
    >
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div
          className="flex flex-col gap-6 rounded-xl border border-black/5 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/80"
          style={{ backgroundColor: tokens.background, color: tokens.textPrimary }}
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
              <div className="flex items-center gap-2 rounded-full border p-1" style={{ borderColor: tokens.border }}>
                {["grid", "list"].map((value) => {
                  const isActive = layout === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setLayout(value as "grid" | "list")}
                      className="rounded-full px-3 py-1 text-xs font-semibold capitalize"
                      style={{
                        backgroundColor: isActive ? tokens.accent : tokens.surface,
                        color: isActive ? tokens.surface : tokens.textMuted,
                      }}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
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
        <div className="grid gap-4">
          <TokenSwatch label="bg.surface" value={tokens.surface} />
          <TokenSwatch label="fg.default" value={tokens.textPrimary} />
          <TokenSwatch label="fg.muted" value={tokens.textMuted} />
          <TokenSwatch label="accent.primary" value={tokens.accent} />
          <TokenSwatch label="border.default" value={tokens.border} />
          <TokenSwatch label="chart.palette[0]" value={tokens.chart[0]} />
        </div>
      </div>
    </Section>
  );
};
