import { ContrastAnalyzer } from "@/components/accessibility/ContrastAnalyzer";
import { ExportPanel } from "@/components/export/ExportPanel";
import { ColorScaleGenerator } from "@/components/color/ColorScaleGenerator";
import { ComponentPlayground } from "@/components/playground/ComponentPlayground";
import { ProjectManager } from "@/components/projects/ProjectManager";
import { TypographyGenerator } from "@/components/typography/TypographyGenerator";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20 dark:bg-slate-950">
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pt-16 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-2xl border border-black/5 bg-white/80 p-8 text-slate-900 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/60 dark:text-white">
          <span className="w-fit rounded-full border border-black/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:border-white/20 dark:text-slate-300">
            Internal Design Token Lab
          </span>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            blankspace — generate, stress-test, and export your entire design token stack.
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-200">
            Craft OKLCH color scales, validate contrast, preview real components, and export to
            Tailwind, CSS variables, or JSON. Everything you need to move faster from palette to
            production.
          </p>
        </header>

        <ColorScaleGenerator />
        <ContrastAnalyzer />
        <ComponentPlayground />
        <TypographyGenerator />
        <ExportPanel />
        <ProjectManager />
      </main>
    </div>
  );
}
