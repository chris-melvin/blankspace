'use client';

import { type TokenMap } from './types';

type PricingPlanPreviewProps = {
  tokens: TokenMap;
};

export const PricingPlanPreview = ({ tokens }: PricingPlanPreviewProps) => {
  const planColors = tokens.multi
    ? [tokens.primary, tokens.accent, tokens.secondary]
    : [tokens.accent, tokens.accent, tokens.accent];

  return (
    <div className="flex flex-wrap gap-6 sm:gap-8">
      {["Starter", "Growth", "Scale"].map((tier, index) => (
        <div
          key={tier}
          className={`flex flex-col gap-6 rounded-xl border p-6 sm:p-8 hover:shadow-lg transition-all flex-shrink-0 w-full sm:w-auto sm:min-w-[280px] ${
            index === 1 ? "ring-2" : ""
          }`}
          style={{
            backgroundColor: tokens.surface,
            borderColor: planColors[index],
            borderWidth: index === 1 ? 2 : 1,
          }}
        >
          <div className="space-y-2">
            <p
              className="text-sm font-bold uppercase tracking-wide"
              style={{ color: tokens.textMuted }}
            >
              {tier}
            </p>
            <p className="text-3xl sm:text-4xl font-bold" style={{ color: tokens.textPrimary }}>
              {index === 0 ? "$19" : index === 1 ? "$49" : "$129"}
            </p>
            <p className="text-sm" style={{ color: tokens.textMuted }}>
              {index === 0 ? "per month" : index === 1 ? "per month" : "per month"}
            </p>
          </div>
          <ul className="space-y-3 text-sm flex-1" style={{ color: tokens.textMuted }}>
            <li className="flex items-center gap-2">
              <span style={{ color: planColors[index] }}>✔</span>
              Unlimited projects
            </li>
            <li className="flex items-center gap-2">
              <span style={{ color: planColors[index] }}>✔</span>
              Team workspaces
            </li>
            <li className="flex items-center gap-2">
              <span style={{ color: planColors[index] }}>
                {index === 0 ? "—" : "✔"}
              </span>
              {index === 0 ? "Email support" : "Priority support"}
            </li>
          </ul>
          <button
            type="button"
            className="w-full rounded-lg px-6 py-3 text-sm font-semibold transition-all hover:shadow-md"
            style={{
              backgroundColor: index === 1 ? tokens.background : planColors[index],
              color: index === 1 ? planColors[index] : "white",
              borderColor: planColors[index],
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
};
