'use client';

import { type TokenMap } from './types';

type NavigationBarPreviewProps = {
  tokens: TokenMap;
};

export const NavigationBarPreview = ({ tokens }: NavigationBarPreviewProps) => (
  <div
    className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6 rounded-xl border px-6 py-4"
    style={{
      borderColor: tokens.border,
      backgroundColor: tokens.surface,
      color: tokens.textPrimary,
    }}
  >
    <div className="flex items-center gap-4 w-full lg:w-auto">
      <span
        className="rounded-lg px-4 py-2 text-sm font-bold uppercase tracking-wide"
        style={{ backgroundColor: tokens.accent, color: "white" }}
      >
        Blankspace
      </span>
      <nav className="hidden md:flex gap-6 text-sm font-medium" style={{ color: tokens.textMuted }}>
        <span className="hover:cursor-pointer hover:opacity-80 transition-opacity">Overview</span>
        <span className="hover:cursor-pointer hover:opacity-80 transition-opacity">Billing</span>
        <span className="hover:cursor-pointer hover:opacity-80 transition-opacity">Customers</span>
        <span className="hover:cursor-pointer hover:opacity-80 transition-opacity">Automation</span>
      </nav>
    </div>
    <div className="flex items-center gap-3 w-full lg:w-auto">
      <button
        type="button"
        className="flex-1 lg:flex-none rounded-lg border px-4 py-2 text-sm font-semibold transition-colors"
        style={{
          backgroundColor: tokens.background,
          borderColor: tokens.border,
          color: tokens.textPrimary,
        }}
      >
        Invite
      </button>
      <button
        type="button"
        className="flex-1 lg:flex-none rounded-lg px-4 py-2 text-sm font-semibold shadow-sm hover:shadow-md transition-all"
        style={{ backgroundColor: tokens.accent, color: "white" }}
      >
        Upgrade
      </button>
    </div>
  </div>
);
