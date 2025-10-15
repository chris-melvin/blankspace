'use client';

import { type TokenMap } from './types';

type FormPreviewProps = {
  tokens: TokenMap;
};

export const FormPreview = ({ tokens }: FormPreviewProps) => (
  <form className="space-y-6">
    <div className="flex flex-col sm:flex-row gap-6">
      <label className="flex flex-col gap-3 text-sm font-medium flex-1" style={{ color: tokens.textPrimary }}>
        Team Name
        <input
          type="text"
          placeholder="Blankspace Inc."
          className="rounded-lg border px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-all"
          style={{
            backgroundColor: tokens.background,
            borderColor: tokens.border,
            color: tokens.textPrimary,
            boxShadow: `0 0 0 1px ${tokens.border}`,
          }}
        />
      </label>
      <label className="flex flex-col gap-3 text-sm font-medium flex-1" style={{ color: tokens.textPrimary }}>
        Notification Email
        <input
          type="email"
          placeholder="team@blankspace.com"
          className="rounded-lg border px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-all"
          style={{
            backgroundColor: tokens.background,
            borderColor: tokens.border,
            color: tokens.textPrimary,
            boxShadow: `0 0 0 1px ${tokens.border}`,
          }}
        />
      </label>
    </div>
    <div className="space-y-4">
      <label className="flex items-center gap-3 text-sm" style={{ color: tokens.textMuted }}>
        <input 
          type="checkbox" 
          className="size-5 rounded border-2 focus:ring-2 focus:ring-blue-500" 
          style={{ borderColor: tokens.border }} 
        />
        <span>Weekly summary</span>
      </label>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          className="rounded-lg px-6 py-3 text-sm font-semibold w-full sm:w-auto hover:shadow-md transition-all"
          style={{ backgroundColor: tokens.accent, color: "white" }}
        >
          Save settings
        </button>
        <button
          type="button"
          className="rounded-lg border px-6 py-3 text-sm font-semibold w-full sm:w-auto hover:bg-gray-50 transition-colors"
          style={{
            backgroundColor: tokens.background,
            borderColor: tokens.border,
            color: tokens.textPrimary,
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  </form>
);
