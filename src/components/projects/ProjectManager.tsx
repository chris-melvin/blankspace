'use client';

import { ChangeEvent, useState } from "react";
import { Section } from "@/components/Section";
import { ProjectSnapshot, useTokenStore } from "@/store/useTokenStore";
import { useShallow } from "zustand/react/shallow";

const createSnapshot = (state: ReturnType<typeof useTokenStore.getState>): ProjectSnapshot => ({
  colorSeed: state.colorSeed,
  hueShift: state.hueShift,
  chromaScale: state.chromaScale,
  lightnessBias: state.lightnessBias,
  locks: state.locks,
  scale: state.scale,
  typography: state.typography,
  contrast: state.contrast,
  updatedAt: new Date().toISOString(),
});

const downloadJson = (filename: string, content: string) => {
  const blob = new Blob([content], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

export const ProjectManager = () => {
  const { savedProjects, actions } = useTokenStore(
    useShallow((state) => ({
      savedProjects: state.savedProjects,
      actions: state.actions,
    })),
  );
  const [projectName, setProjectName] = useState("My Token Set");

  const handleSave = () => {
    actions.saveProject(projectName);
  };

  const handleExport = () => {
    const snapshot = createSnapshot(useTokenStore.getState());
    const payload = {
      name: projectName,
      exportedAt: new Date().toISOString(),
      snapshot,
    };
    downloadJson(
      `${projectName.toLowerCase().replace(/\s+/g, "-") || "blankspace"}-project.json`,
      JSON.stringify(payload, null, 2),
    );
  };

  const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    try {
      const payload = JSON.parse(text);
      if (payload?.snapshot) {
        actions.importProject(payload.snapshot, payload.name ?? file.name.replace(".json", ""));
      } else {
        actions.importProject(payload, file.name.replace(".json", ""));
      }
    } catch (error) {
      console.error("Failed to import project", error);
    } finally {
      event.target.value = "";
    }
  };

  return (
    <Section
      title="Project Management"
      description="Save token configurations to the browser, export snapshots for teammates, or import JSON files to continue iterating."
      actions={
        <label className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-black/5 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/10">
          Import JSON
          <input
            type="file"
            accept="application/json"
            className="hidden"
            onChange={handleImport}
          />
        </label>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,320px)_1fr]">
        <div className="flex flex-col gap-3">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
              Project Name
            </span>
            <input
              value={projectName}
              onChange={(event) => setProjectName(event.target.value)}
              className="rounded border border-black/10 bg-white px-3 py-2 text-sm focus:border-slate-400 focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-200"
              placeholder="Brand Tokens v1.0"
            />
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-full border border-slate-900 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-slate-950"
            >
              Save to Browser
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-black/5 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/10"
            >
              Export JSON
            </button>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-300">
            Projects persist locally via `localStorage`. Use JSON export to share with your team or
            migrate to Supabase later.
          </p>
        </div>
        <div className="rounded-xl border border-dashed border-black/10 bg-white/60 p-4 shadow-inner dark:border-white/10 dark:bg-slate-900/60">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
            Saved Projects
          </h3>
          {Object.keys(savedProjects).length === 0 ? (
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-300">
              Nothing saved yet. Store a snapshot to enable quick comparisons.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {Object.entries(savedProjects).map(([name, project]) => (
                <li
                  key={name}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-black/5 bg-white/70 p-3 text-sm dark:border-white/10 dark:bg-slate-950/70"
                >
                  <div>
                    <p className="font-semibold">{name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Updated {new Date(project.updatedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => actions.loadProject(name)}
                      className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-black/5 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/10"
                    >
                      Load
                    </button>
                    <button
                      type="button"
                      onClick={() => actions.removeProject(name)}
                      className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-black/5 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/10"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Section>
  );
};
