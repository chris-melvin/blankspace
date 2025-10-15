'use client';

import { PropsWithChildren, ReactNode } from "react";

type SectionProps = PropsWithChildren<{
  title: string;
  description?: string;
  actions?: ReactNode;
}>;

export const Section = ({ title, description, actions, children }: SectionProps) => {
  return (
    <section className="rounded-xl border border-black/5 bg-white/70 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/60">
      <div className="flex flex-col gap-6 p-6 sm:p-8">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">{title}</h2>
            {description ? (
              <p className="text-sm text-slate-500 dark:text-slate-300 sm:text-base">
                {description}
              </p>
            ) : null}
          </div>
          {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
        </header>
        <div className="flex flex-col gap-6">{children}</div>
      </div>
    </section>
  );
};

export const SectionGrid = ({ children }: PropsWithChildren) => {
  return <div className="grid gap-6 sm:grid-cols-2">{children}</div>;
};
