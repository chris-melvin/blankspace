'use client';

import { useMemo, useState } from "react";
import { Section } from "@/components/Section";
import { createCssVariables, createJsonTokens, createTailwindConfig } from "@/lib/exporters";
import { useTokenStore } from "@/store/useTokenStore";
import { useShallow } from "zustand/react/shallow";

type ExportFormat = "tailwind" | "css" | "json";

const FORMAT_LABELS: Record<ExportFormat, string> = {
  tailwind: "Tailwind Config",
  css: "CSS Variables",
  json: "W3C JSON",
};

const downloadFile = (filename: string, content: string) => {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

export const ExportPanel = () => {
  const { scale, typography } = useTokenStore(
    useShallow((state) => ({
      scale: state.scale,
      typography: state.typography,
    })),
  );
  const [format, setFormat] = useState<ExportFormat>("tailwind");

  const exportContent = useMemo(() => {
    switch (format) {
      case "css":
        return createCssVariables(scale, typography);
      case "json":
        return createJsonTokens(scale, typography);
      case "tailwind":
      default:
        return createTailwindConfig(scale, typography);
    }
  }, [format, scale, typography]);

  const handleCopy = () => {
    navigator.clipboard?.writeText(exportContent).catch(() => {
      // ignore clipboard errors
    });
  };

  const handleDownload = () => {
    const filename =
      format === "tailwind"
        ? "tokens.tailwind.ts"
        : format === "css"
        ? "tokens.css"
        : "tokens.json";
    downloadFile(filename, exportContent);
  };

  return (
    <Section
      title="Export Tokens"
      description="Ship your tokens directly to engineering with ready-to-use Tailwind, CSS, and JSON exports."
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(FORMAT_LABELS) as ExportFormat[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setFormat(key)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                format === key
                  ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-950"
                  : "border-black/10 bg-white text-slate-700 hover:bg-black/5 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-white/10"
              }`}
            >
              {FORMAT_LABELS[key]}
            </button>
          ))}
        </div>
        <div className="rounded-xl border border-black/5 bg-slate-950 text-white shadow-inner dark:border-white/10">
          <pre className="max-h-[360px] overflow-auto rounded-xl p-6 text-sm leading-relaxed">
            <code>{exportContent}</code>
          </pre>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-full border border-slate-900 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-slate-950"
          >
            Copy to Clipboard
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-black/5 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/10"
          >
            Download File
          </button>
          <p className="text-xs text-slate-500 dark:text-slate-300">
            Tailwind extends `brand.*`, CSS exposes `--color-brand-50`, JSON follows the W3C Design
            Tokens draft.
          </p>
        </div>
      </div>
    </Section>
  );
};
